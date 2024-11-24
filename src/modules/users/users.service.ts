import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import {
  BadRequestException,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersDto, UpdateUserDto } from './dto/upsert-users.dto';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import {
  FavoriteRestaurantsResponseDto,
  GetManyFavoriteRestaurantsResponseDto,
} from '../restaurants/dto/response-restaurants.dto';

@Injectable()
export class UsersService
  extends TypeOrmCrudService<User>
  implements OnModuleInit
{
  private readonly logger: Logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    public repository: Repository<User>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {
    super(repository);
  }

  onModuleInit() {
    this.logger.log('Init UsersService');
  }

  async findByUserName(username: string): Promise<User> {
    return await this.repository.findOne({
      where: { username },
      relations: ['favoriteRestaurants'],
    });
  }

  async create(dto: CreateUsersDto): Promise<User> {
    const existUser = await this.findByUserName(dto.username);

    if (existUser) {
      throw new BadRequestException({
        message: `User with user name ${dto.username} already exists`,
      });
    }

    const user = this.repository.create(dto);
    await user.save({ reload: true });
    return user;
  }

  async updateUser(username: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findByUserName(username);

    if (!user) {
      throw new BadRequestException({
        message: `User with user name ${username} not found`,
      });
    }

    user.name = dto.name;
    user.email = dto.email;
    user.gender = dto.gender;
    user.date_of_birth = dto.date_of_birth;
    user.location = dto.location;
    user.avt = dto.avt;
    user.hash_password = dto.hash_password;

    await user.save({ reload: true });
    return user;
  }

  private async convertFavoriteRestaurantsToDto(
    restaurant: Restaurant,
  ): Promise<FavoriteRestaurantsResponseDto> {
    return {
      id: restaurant.id,
      name: restaurant.name,
      image: restaurant.image,
      description: restaurant.description,
      address: restaurant.address,
      phone: restaurant.phone,
      website: restaurant.website,
      rating: restaurant.rating,
    };
  }

  async getFavoriteRestaurants(
    username: string,
  ): Promise<GetManyFavoriteRestaurantsResponseDto> {
    try {
      const user = await this.findByUserName(username);
      const data = await Promise.all(
        user.favoriteRestaurants.map((favoriteRestaurant) =>
          this.convertFavoriteRestaurantsToDto(favoriteRestaurant),
        ),
      );
      return {
        data,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async addFavoriteRestaurant(
    username: string,
    restaurantId: number,
  ): Promise<void> {
    const user = await this.findByUserName(username);
    if (!user) {
      throw new BadRequestException({
        message: `User with user name ${username} not found`,
      });
    }

    const restaurant = await this.restaurantRepository.findOneBy({
      id: restaurantId,
    });
    if (!restaurant) {
      throw new BadRequestException({
        message: `Restaurant with id ${restaurantId} not found`,
      });
    }

    user.favoriteRestaurants.push(restaurant);
    await user.save({ reload: true });
  }
}
