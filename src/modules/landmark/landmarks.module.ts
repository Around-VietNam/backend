import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Landmark } from './entities/landmark.entity';
import { LandmarksController } from './landmarks.controller';
import { LandmarksService } from './landmark.service';
import { LandmarkFeedback } from './entities/feedback.entity';
import { User } from '../users/entities/user.entity';
import { LandmarkFeedbacksService } from './landmark-feedbacks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Landmark, LandmarkFeedback, User])],
  controllers: [LandmarksController],
  providers: [LandmarksService, LandmarkFeedbacksService],
  exports: [LandmarksService, LandmarkFeedbacksService],
})
export class LandmarksModule {}
