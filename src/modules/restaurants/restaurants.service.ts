import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { UpsertRestaurantsDto } from './dto/upsert-restautrants.dto';

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

  async create(dto: UpsertRestaurantsDto): Promise<Restaurant> {
    const existRestaurant = await this.getRestaurantByName(dto.name);
    if (existRestaurant) {
      throw new Error('Restaurant already exists');
    }

    const restaurant = this.repository.create(dto);
    await restaurant.save({ reload: true });
    return restaurant;
  }
}
