import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantFeedback } from './entities/feedback.entity';
import {
  GetManyRestaurantFeedbacksResponseDto,
  RestaurantFeedbacksResponseDto,
} from './dto/response-restaurant-feedbacks.dto';
import { paginateData } from 'src/common/dtos';
import { QueryRestaurantFeedbacksDto } from './dto/query-restaurant-feedbacks.dto';
import { Restaurant } from './entities/restaurant.entity';
import { User } from '../users/entities/user.entity';
import {
  CreateRestaurantFeedBacksDto,
  UpdateRestaurantFeedbacksDto,
} from './dto/upsert-restaurant-feedbacks.dto';

@Injectable()
export class RestaurantFeedbacksService
  extends TypeOrmCrudService<RestaurantFeedback>
  implements OnModuleInit
{
  private readonly logger: Logger = new Logger(RestaurantFeedback.name);
  constructor(
    @InjectRepository(RestaurantFeedback)
    public repository: Repository<RestaurantFeedback>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(repository);
  }

  onModuleInit() {
    this.logger.log('Init Restaurant Service');
  }

  private async convertFeedbackToDto(
    feedback: RestaurantFeedback,
  ): Promise<RestaurantFeedbacksResponseDto> {
    return {
      id: feedback.id,
      create_at: feedback.created_at,
      update_at: feedback.updated_at,
      username: feedback.user.username,
      comment: feedback.comment,
      image: feedback.image,
      rating: feedback.rating,
    };
  }

  async getFeedbacksByRestaurantId(
    restaurantId: number,
    query: QueryRestaurantFeedbacksDto,
  ): Promise<GetManyRestaurantFeedbacksResponseDto> {
    try {
      const feedbacks = await this.repository.find({
        where: {
          restaurant: {
            id: restaurantId,
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
    restaurantId: number,
    dto: CreateRestaurantFeedBacksDto,
  ): Promise<RestaurantFeedback> {
    const restaurant = await this.restaurantRepository.findOneBy({
      id: restaurantId,
    });
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    const user = await this.userRepository.findOneBy({
      username: dto.username,
    });
    if (!user) {
      throw new Error('User not found');
    }

    const feedback = new RestaurantFeedback();
    feedback.comment = dto.comment;
    feedback.rating = dto.rating;
    feedback.image = dto.image;
    feedback.user = user;
    feedback.restaurant = restaurant;

    await this.repository.save(feedback);
    return feedback;
  }

  async updateFeedback(
    feedbackId: number,
    dto: UpdateRestaurantFeedbacksDto,
  ): Promise<RestaurantFeedback> {
    const feedback = await this.repository.findOneBy({
      id: feedbackId,
    });
    if (!feedback) {
      throw new Error('Feedback not found');
    }

    feedback.comment = dto.comment;
    feedback.rating = dto.rating;
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
