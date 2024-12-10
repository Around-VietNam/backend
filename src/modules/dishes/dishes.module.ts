import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dish } from './entites/dish.entity';

@Injectable()
export class DishesService
  extends TypeOrmCrudService<Dish>
  implements OnModuleInit
{
  private readonly logger: Logger = new Logger(Dish.name);
  constructor(
    @InjectRepository(Dish)
    public repository: Repository<Dish>,
  ) {
    super(repository);
  }

  onModuleInit() {
    this.logger.log('Init Dish Service');
  }
}
