import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantFeedback } from './entities/feedback.entity';
import {
  GetManyRestaurantFeedbacksResponseDto,
  RestaurantFeedbackResponseDto,
} from './dto/response-restaurant-feedbacks.dto';
import { paginateData } from 'src/common/dtos';
import { QueryRestaurantFeedbacksDto } from './dto/query-restaurant-feedbacks.dto';

@Injectable()
export class RestaurantFeedbacksService
  extends TypeOrmCrudService<RestaurantFeedback>
  implements OnModuleInit
{
  private readonly logger: Logger = new Logger(RestaurantFeedback.name);
  constructor(
    @InjectRepository(RestaurantFeedback)
    public repository: Repository<RestaurantFeedback>,
  ) {
    super(repository);
  }

  onModuleInit() {
    this.logger.log('Init Restaurant Service');
  }

  private async convertFeedbackToDto(
    feedback: RestaurantFeedback,
  ): Promise<RestaurantFeedbackResponseDto> {
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
    query: QueryRestaurantFeedbacksDto,
  ): Promise<GetManyRestaurantFeedbacksResponseDto> {
    try {
      const feedbacks = await this.repository.find({
        where: {
          restaurant: {
            id: query.restaurantId,
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
}
