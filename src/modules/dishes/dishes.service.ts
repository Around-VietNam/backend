import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dish } from './entities/dish.entity';
import { UpsertDishesDto } from './dtos/upsert-dishes.dto';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import {
  DishesResponseDto,
  GetManyDishesResponseDto,
} from './dtos/response-dishes.dto';
import { paginateData } from 'src/common/dtos';
import { QueryDishesDto } from './dtos/query-dishes.dto';

@Injectable()
export class DishesService
  extends TypeOrmCrudService<Dish>
  implements OnModuleInit
{
  private readonly logger: Logger = new Logger(Dish.name);
  constructor(
    @InjectRepository(Dish)
    public repository: Repository<Dish>,
    @InjectRepository(Restaurant)
    public restaurantRepository: Repository<Restaurant>,
  ) {
    super(repository);
  }

  onModuleInit() {
    this.logger.log('Init Dish Service');
  }

  async getDishByName(name: string): Promise<Dish> {
    return this.repository.findOneBy({ name });
  }

  async getDishById(id: number): Promise<Dish> {
    const dish = await this.repository.findOneBy({ id });
    if (!dish) {
      throw new Error('Dish not found');
    }
    return dish;
  }

  async create(dto: UpsertDishesDto): Promise<Dish> {
    const existDish = await this.getDishByName(dto.name);
    if (existDish) {
      throw new Error('Dish already exist');
    }

    const restaurant = await this.repository.manager.findOne(Restaurant, {
      where: { id: dto.restaurantId },
    });
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    const dish = this.repository.create({ ...dto, restaurant });
    await dish.save({ reload: true });
    return dish;
  }

  async updateDish(id: number, dto: UpsertDishesDto): Promise<Dish> {
    const dish = await this.getDishById(id);
    const restaurant = await this.repository.manager.findOne(Restaurant, {
      where: { id: dto.restaurantId },
    });
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    dish.name = dto.name;
    dish.description = dto.description;
    dish.image = dto.image;
    dish.price = dto.price;
    dish.special = dto.special;
    dish.restaurant = restaurant;
    await dish.save({ reload: true });
    return dish;
  }

  async deleteDish(id: number): Promise<void> {
    const dish = await this.getDishById(id);
    await dish.remove();
  }

  private async convertDishesToDto(dish: Dish): Promise<DishesResponseDto> {
    return {
      created_at: dish.created_at,
      updated_at: dish.updated_at,
      id: dish.id,
      name: dish.name,
      image: dish.image,
      description: dish.description,
      price: dish.price,
      special: dish.special,
    };
  }

  async getDishesFromRestaurant(
    restaurantId: number,
    query: QueryDishesDto,
  ): Promise<GetManyDishesResponseDto> {
    try {
      const restaurant = await this.restaurantRepository.findOne({
        where: { id: restaurantId },
        relations: ['dishes'],
      });
      if (!restaurant) {
        throw new Error('Restaurant not found');
      }

      const dishes = await Promise.all(
        restaurant.dishes.map((dish) => this.convertDishesToDto(dish)),
      );
      return paginateData(dishes, query);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
