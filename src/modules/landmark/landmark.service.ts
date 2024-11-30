import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Landmark } from './entities/landmark.entity';
import { UpsertLandmarksDto } from './dtos/upsert-landmarks.dto';

@Injectable()
export class LandmarksService
  extends TypeOrmCrudService<Landmark>
  implements OnModuleInit
{
  private readonly logger: Logger = new Logger(Landmark.name);
  constructor(
    @InjectRepository(Landmark)
    public repository: Repository<Landmark>,
  ) {
    super(repository);
  }

  onModuleInit() {
    this.logger.log('Init Landmark Service');
  }

  async getLandmarkByName(name: string): Promise<Landmark> {
    return this.repository.findOneBy({ name });
  }

  async getLandmarkById(id: number): Promise<Landmark> {
    const landmark = await this.repository.findOneBy({ id });
    if (!landmark) {
      throw new Error('Landmark not found');
    }
    return landmark;
  }

  async create(dto: UpsertLandmarksDto): Promise<Landmark> {
    const existLandmark = await this.getLandmarkByName(dto.name);
    if (existLandmark) {
      throw new Error('Landmark already exists');
    }

    const landmark = this.repository.create(dto);
    await landmark.save({ reload: true });
    return landmark;
  }

  async updateLandmark(id: number, dto: UpsertLandmarksDto): Promise<Landmark> {
    const landmark = await this.getLandmarkById(id);
    if (!landmark) {
      throw new Error('Landmark not found');
    }

    landmark.name = dto.name;
    landmark.description = dto.description;
    landmark.image = dto.image;
    landmark.address = dto.address;
    landmark.latitude = dto.latitude;
    landmark.longitude = dto.longitude;
    landmark.phone = dto.phone;
    landmark.website = dto.website;
    await landmark.save({ reload: true });
    return landmark;
  }

  async deleteLandmark(id: number): Promise<void> {
    const landmark = await this.getLandmarkById(id);
    if (!landmark) {
      throw new Error('Landmark not found');
    }

    await landmark.remove();
  }
}
