import { ApiResponseProperty } from '@nestjs/swagger';

export class ResponseTrafficStatusDto {
  @ApiResponseProperty({ type: String })
  status: string;

  @ApiResponseProperty({ type: Number })
  currentSpeed: number;

  @ApiResponseProperty({ type: Number })
  freeFlowSpeed: number;

  @ApiResponseProperty({ type: Number })
  confidence: number;

  @ApiResponseProperty({ type: Boolean })
  roadClosure: boolean;
}
