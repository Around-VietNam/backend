import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LandmarksService } from './landmark.service';
import { LandmarksResponseDto } from './dtos/response-landmarks.dto';
import { UpsertLandmarksDto } from './dtos/upsert-landmarks.dto';
import { Landmark } from './entities/landmark.entity';
import { GetManyLandmarkFeedbacksResponseDto } from './dtos/response-landmark-feedbacks.dto';
import { QueryLandmarkFeedbacksDto } from './dtos/query-landmark-feedbacks.dto';
import { LandmarkFeedbacksService } from './landmark-feedbacks.service';

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
}
