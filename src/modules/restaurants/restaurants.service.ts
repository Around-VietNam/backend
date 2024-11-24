import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { UpsertRestaurantsDto } from './dto/upsert-restaurants.dto';

@Injectable()
export class RestaurantsService
  extends TypeOrmCrudService<Restaurant>
  implements OnModuleInit
{
  private readonly logger: Logger = new Logger(Restaurant.name);
  constructor(
    @InjectRepository(Restaurant)
    public repository: Repository<Restaurant>,
  ) {
    super(repository);
  }

  onModuleInit() {
    this.logger.log('Init Restaurant Service');
  }

  async getRestaurantByName(name: string): Promise<Restaurant> {
    return this.repository.findOneBy({ name });
  }

  async getRestaurantById(id: number): Promise<Restaurant> {
    const restaurant = await this.repository.findOneBy({ id });
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }
    return restaurant;
  }

  async create(dto: UpsertRestaurantsDto): Promise<Restaurant> {
    const existRestaurant = await this.getRestaurantByName(dto.name);
    if (existRestaurant) {
      throw new Error('Restaurant already exists');
    }

    const restaurant = this.repository.create(dto);
    await restaurant.save({ reload: true });
    return restaurant;
  }

  async updateRestaurant(
    id: number,
    dto: UpsertRestaurantsDto,
  ): Promise<Restaurant> {
    const restaurant = await this.getRestaurantById(id);
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    restaurant.name = dto.name;
    restaurant.description = dto.description;
    restaurant.image = dto.image;
    restaurant.address = dto.address;
    restaurant.latitude = dto.latitude;
    restaurant.longitude = dto.longitude;
    restaurant.phone = dto.phone;
    restaurant.website = dto.website;
    await restaurant.save({ reload: true });
    return restaurant;
  }

  async deleteRestaurant(id: number): Promise<void> {
    const restaurant = await this.getRestaurantById(id);
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    await restaurant.remove();
  }
}
