import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LandmarksService } from './landmark.service';
import { LandmarksResponseDto } from './dtos/response-landmarks.dto';
import { UpsertLandmarksDto } from './dtos/upsert-landmarks.dto';
import { Landmark } from './entities/landmark.entity';
import {
  GetManyLandmarkFeedbacksResponseDto,
  LandmarkFeedbacksResponseDto,
} from './dtos/response-landmark-feedbacks.dto';
import { QueryLandmarkFeedbacksDto } from './dtos/query-landmark-feedbacks.dto';
import { LandmarkFeedbacksService } from './landmark-feedbacks.service';
import { LandmarkFeedback } from './entities/feedback.entity';
import {
  CreateLandmarkFeedBacksDto,
  UpdateLandmarkFeedbacksDto,
} from './dtos/upsert-landmark-feedbacks.dto';

@ApiTags('Landmarks')
@Controller('landmarks')
export class LandmarksController {
  constructor(
    public landmarkService: LandmarksService,
    public landmarkFeedbackService: LandmarkFeedbacksService,
  ) {}

  @ApiResponse({
    status: 201,
    type: LandmarksResponseDto,
    description: 'Create a new landmark',
  })
  @Post()
  async createLandmark(@Body() dto: UpsertLandmarksDto): Promise<Landmark> {
    return this.landmarkService.create(dto);
  }

  @ApiResponse({
    status: 200,
    type: LandmarksResponseDto,
    description: 'Get landmark details',
  })
  @Get(':id')
  async getRestaurant(@Param('id') id: number): Promise<Landmark> {
    return this.landmarkService.getLandmarkById(id);
  }

  @ApiResponse({
    status: 200,
    type: LandmarksResponseDto,
    description: 'Update landmark details',
  })
  @Post(':id')
  async updateLandmark(
    @Param('id') id: number,
    @Body() dto: UpsertLandmarksDto,
  ): Promise<Landmark> {
    return this.landmarkService.updateLandmark(id, dto);
  }

  @Delete(':id')
  async deleteLandmark(@Param('id') id: number): Promise<void> {
    return this.landmarkService.deleteLandmark(id);
  }

  @ApiResponse({
    status: 200,
    type: GetManyLandmarkFeedbacksResponseDto,
    description: 'Get restaurant feedbacks',
  })
  @Get(':id/feedbacks')
  async getFeedbacksByRestaurantId(
    @Param('id') id: number,
    @Query() query: QueryLandmarkFeedbacksDto,
  ): Promise<GetManyLandmarkFeedbacksResponseDto> {
    return this.landmarkFeedbackService.getFeedbacksByLandmarkId(id, query);
  }

  @ApiResponse({
    status: 201,
    type: LandmarkFeedbacksResponseDto,
    description: 'Create a new feedback for a landmark',
  })
  @Post(':id/feedbacks')
  async createFeedback(
    @Param('id') id: number,
    @Body() dto: CreateLandmarkFeedBacksDto,
  ): Promise<LandmarkFeedback> {
    console.log(dto);
    return this.landmarkFeedbackService.createFeedback(id, dto);
  }

  @ApiResponse({
    status: 200,
    type: LandmarkFeedbacksResponseDto,
    description: 'Update feedback for a landmark',
  })
  @Put('feedbacks/:feedbackId')
  async updateFeedback(
    @Param('feedbackId') feedbackId: number,
    @Body() dto: UpdateLandmarkFeedbacksDto,
  ): Promise<LandmarkFeedback> {
    return this.landmarkFeedbackService.updateFeedback(feedbackId, dto);
  }

  @Delete('feedbacks/:feedbackId')
  async deleteFeedback(@Param('feedbackId') feedbackId: number): Promise<void> {
    return this.landmarkFeedbackService.deleteFeedback(feedbackId);
  }
}
