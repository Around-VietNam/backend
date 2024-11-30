import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LandmarksService } from './landmark.service';
import { LandmarksResponseDto } from './dtos/response-landmarks.dto';
import { UpsertLandmarksDto } from './dtos/upsert-landmarks.dto';
import { Landmark } from './entities/landmark.entity';

@ApiTags('Landmarks')
@Controller('landmarks')
export class LandmarksController {
  constructor(public landmarkService: LandmarksService) {}

  @ApiResponse({
    status: 201,
    type: LandmarksResponseDto,
    description: 'Create a new restaurant',
  })
  @Post()
  async createLandmark(@Body() dto: UpsertLandmarksDto): Promise<Landmark> {
    return this.landmarkService.create(dto);
  }
}
