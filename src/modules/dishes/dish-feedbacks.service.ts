import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginateData } from 'src/common/dtos';
import { User } from '../users/entities/user.entity';
import { DishFeedback } from './entities/feedback.entity';
import { Dish } from './entities/dish.entity';
import {
  DishFeedbacksResponseDto,
  GetManyDishFeedbacksResponseDto,
} from './dtos/response-dish-feedbacks.dto';
import { QueryDishFeedbacksDto } from './dtos/query-dish-feedbacks.dto';
import {
  CreateDishFeedBacksDto,
  UpdateDishFeedbacksDto,
} from './dtos/upsert-dish-feedbacks.dto';

@Injectable()
export class DishFeedbacksService
  extends TypeOrmCrudService<DishFeedback>
  implements OnModuleInit
{
  private readonly logger: Logger = new Logger(DishFeedback.name);
  constructor(
    @InjectRepository(DishFeedback)
    public repository: Repository<DishFeedback>,
    @InjectRepository(Dish)
    private readonly dishRepository: Repository<Dish>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(repository);
  }

  onModuleInit() {
    this.logger.log('Init Dish Feedback Service');
  }

  private async convertFeedbackToDto(
    feedback: DishFeedback,
  ): Promise<DishFeedbacksResponseDto> {
    return {
      id: feedback.id,
      create_at: feedback.created_at,
      update_at: feedback.updated_at,
      username: feedback.user.username,
      comment: feedback.comment,
      image: feedback.image,
    };
  }

  async getFeedbacksByDishId(
    dishId: number,
    query: QueryDishFeedbacksDto,
  ): Promise<GetManyDishFeedbacksResponseDto> {
    try {
      const feedbacks = await this.repository.find({
        where: {
          dish: {
            id: dishId,
          },
        },
        relations: ['user'],
      });

      const feedbackDetails = await Promise.all(
        feedbacks.map((feedback) => this.convertFeedbackToDto(feedback)),
      );
      return paginateData(feedbackDetails, query);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async createFeedback(
    dishId: number,
    dto: CreateDishFeedBacksDto,
  ): Promise<DishFeedback> {
    const dish = await this.dishRepository.findOneBy({
      id: dishId,
    });
    if (!dish) {
      throw new Error('Dish not found');
    }

    const user = await this.userRepository.findOneBy({
      username: dto.username,
    });
    if (!user) {
      throw new Error('User not found');
    }

    const feedback = new DishFeedback();
    feedback.comment = dto.comment;
    feedback.image = dto.image;
    feedback.user = user;
    feedback.dish = dish;

    await this.repository.save(feedback);
    return feedback;
  }

  async updateFeedback(
    feedbackId: number,
    dto: UpdateDishFeedbacksDto,
  ): Promise<DishFeedback> {
    const feedback = await this.repository.findOneBy({
      id: feedbackId,
    });
    if (!feedback) {
      throw new Error('Feedback not found');
    }

    feedback.comment = dto.comment;
    feedback.image = dto.image;

    await feedback.save({ reload: true });
    return feedback;
  }

  async deleteFeedback(feedbackId: number): Promise<void> {
    const feedback = await this.repository.findOneBy({
      id: feedbackId,
    });
    if (!feedback) {
      throw new Error('Feedback not found');
    }

    await feedback.remove();
  }
}
