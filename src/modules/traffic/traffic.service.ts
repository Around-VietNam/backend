import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { env } from 'src/config';
import { ResponseTrafficStatusDto } from './dtos/response-traffic-status.dto';

@Injectable()
export class TrafficService {
  constructor(private readonly httpService: HttpService) {}
  private baseUrl = 'api.tomtom.com';
  private versionNumber = 4;
  private style = 'relative0';
  private zoom = 10;
  private format = 'json';

  async getTrafficStatus(
    latitude: number,
    longitude: number,
  ): Promise<ResponseTrafficStatusDto> {
    const url = `https://${this.baseUrl}/traffic/services/${this.versionNumber}/flowSegmentData/${this.style}/${this.zoom}/${this.format}`;
    const params: Record<string, any> = {
      point: `${latitude},${longitude}`,
      unit: 'KMPH',
      openLr: false,
      key: env.tomtom.apiKey,
    };
    try {
      const response = await this.httpService.get(url, { params }).toPromise();
      const data = response.data;

      const { flowSegmentData } = data;
      if (!flowSegmentData) {
        throw new Error('Invalid response from traffic service');
      }

      const { currentSpeed, freeFlowSpeed, confidence, roadClosure } =
        flowSegmentData;

      let trafficStatus = 'Unknown';
      if (roadClosure) {
        trafficStatus = 'Road Closed';
      } else if (confidence < 0.5) {
        trafficStatus = 'Low Confidence in Traffic Data';
      } else if (currentSpeed < freeFlowSpeed * 0.5) {
        trafficStatus = 'Heavy Traffic';
      } else if (currentSpeed < freeFlowSpeed * 0.8) {
        trafficStatus = 'Moderate Traffic';
      } else {
        trafficStatus = 'Light Traffic';
      }

      return {
        status: trafficStatus,
        currentSpeed,
        freeFlowSpeed,
        confidence,
        roadClosure,
      };
    } catch (error) {
      throw new Error(`Error fetching traffic data: ${error.message}`);
    }
  }
}
