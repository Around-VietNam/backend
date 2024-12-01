import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrafficService } from './traffic.service';
import { Controller, Get, Query } from '@nestjs/common';
import { ResponseTrafficStatusDto } from './dtos/response-traffic-status.dto';

@ApiTags('Traffic')
@Controller('traffic')
export class TrafficController {
  constructor(public service: TrafficService) {}

  @ApiResponse({
    status: 201,
    type: ResponseTrafficStatusDto,
    description: 'Calculate Traffic Status',
  })
  @Get('/status')
  async createUser(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ): Promise<ResponseTrafficStatusDto> {
    return this.service.getTrafficStatus(latitude, longitude);
  }
}
