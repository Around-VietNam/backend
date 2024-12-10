import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dish } from './entities/dish.entity';
import { UpsertDishesDto } from './dtos/upsert-dishes.dto';
import { Restaurant } from '../restaurants/entities/restaurant.entity';

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
}
