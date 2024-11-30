import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginateData } from 'src/common/dtos';
import { Landmark } from './entities/landmark.entity';
import { LandmarkFeedback } from './entities/feedback.entity';
import { User } from '../users/entities/user.entity';
import {
  GetManyLandmarkFeedbacksResponseDto,
  LandmarkFeedbacksResponseDto,
} from './dtos/response-landmark-feedbacks.dto';
import { QueryLandmarkFeedbacksDto } from './dtos/query-landmark-feedbacks.dto';
import {
  CreateLandmarkFeedBacksDto,
  UpdateLandmarkFeedbacksDto,
} from './dtos/upsert-landmark-feedbacks.dto';

@Injectable()
export class LandmarkFeedbacksService
  extends TypeOrmCrudService<LandmarkFeedback>
  implements OnModuleInit
{
  private readonly logger: Logger = new Logger(LandmarkFeedback.name);
  constructor(
    @InjectRepository(LandmarkFeedback)
    public repository: Repository<LandmarkFeedback>,
    @InjectRepository(Landmark)
    private readonly landmarkRepository: Repository<Landmark>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(repository);
  }

  onModuleInit() {
    this.logger.log('Init Landmark Feedback Service');
  }

  private async convertFeedbackToDto(
    feedback: LandmarkFeedback,
  ): Promise<LandmarkFeedbacksResponseDto> {
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

  async getFeedbacksByLandmarkId(
    landmarkId: number,
    query: QueryLandmarkFeedbacksDto,
  ): Promise<GetManyLandmarkFeedbacksResponseDto> {
    try {
      const feedbacks = await this.repository.find({
        where: {
          landmark: {
            id: landmarkId,
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
    landmarkId: number,
    dto: CreateLandmarkFeedBacksDto,
  ): Promise<LandmarkFeedback> {
    const landmark = await this.landmarkRepository.findOneBy({
      id: landmarkId,
    });
    if (!landmark) {
      throw new Error('Landmark not found');
    }

    const user = await this.userRepository.findOneBy({
      username: dto.username,
    });
    if (!user) {
      throw new Error('User not found');
    }

    const feedback = new LandmarkFeedback();
    feedback.comment = dto.comment;
    feedback.rating = dto.rating;
    feedback.image = dto.image;
    feedback.user = user;
    feedback.landmark = landmark;

    await this.repository.save(feedback);
    return feedback;
  }

  async updateFeedback(
    feedbackId: number,
    dto: UpdateLandmarkFeedbacksDto,
  ): Promise<LandmarkFeedback> {
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
