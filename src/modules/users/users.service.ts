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
import { CreateUsersDto, UpdateUserDto } from './dtos/upsert-users.dto';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import {
  FavoriteRestaurantsResponseDto,
  GetManyFavoriteRestaurantsResponseDto,
} from '../restaurants/dtos/response-restaurants.dto';
import { Landmark } from '../landmark/entities/landmark.entity';
import {
  FavoriteLandmarksResponseDto,
  GetManyFavoriteLandmarksResponseDto,
} from '../landmark/dtos/response-landmarks.dto';
import { Dish } from '../dishes/entities/dish.entity';
import {
  FavoriteDishesResponseDto,
  GetManyFavoriteDishesResponseDto,
} from '../dishes/dtos/response-dishes.dto';

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
    @InjectRepository(Landmark)
    private readonly landmarkRepository: Repository<Landmark>,
    @InjectRepository(Dish)
    private readonly dishRepository: Repository<Dish>,
  ) {
    super(repository);
  }

  onModuleInit() {
    this.logger.log('Init UsersService');
  }

  async findByUserName(username: string): Promise<User> {
    return await this.repository.findOne({
      where: { username },
      relations: ['favoriteRestaurants', 'favoriteLandmarks', 'favoriteDishes'],
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

  async removeFavoriteRestaurant(
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

    user.favoriteRestaurants = user.favoriteRestaurants.filter(
      (favoriteRestaurant) => favoriteRestaurant.id !== restaurantId,
    );
    await user.save({ reload: true });
  }

  private async convertFavoriteLandmarksToDto(
    landmark: Landmark,
  ): Promise<FavoriteLandmarksResponseDto> {
    return {
      id: landmark.id,
      name: landmark.name,
      image: landmark.image,
      description: landmark.description,
      address: landmark.address,
      phone: landmark.phone,
      website: landmark.website,
      rating: landmark.rating,
    };
  }

  async getFavoriteLandmarks(
    username: string,
  ): Promise<GetManyFavoriteLandmarksResponseDto> {
    try {
      const user = await this.findByUserName(username);
      const data = await Promise.all(
        user.favoriteLandmarks.map((favoriteLandmark) =>
          this.convertFavoriteLandmarksToDto(favoriteLandmark),
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

  async addFavoriteLandmark(
    username: string,
    landmarkId: number,
  ): Promise<void> {
    const user = await this.findByUserName(username);
    if (!user) {
      throw new BadRequestException({
        message: `User with user name ${username} not found`,
      });
    }

    const landmark = await this.landmarkRepository.findOneBy({
      id: landmarkId,
    });
    if (!landmark) {
      throw new BadRequestException({
        message: `Landmark with id ${landmarkId} not found`,
      });
    }

    user.favoriteLandmarks.push(landmark);
    await user.save({ reload: true });
  }

  async removeFavoriteLandmark(
    username: string,
    landmarkId: number,
  ): Promise<void> {
    const user = await this.findByUserName(username);
    if (!user) {
      throw new BadRequestException({
        message: `User with user name ${username} not found`,
      });
    }

    const landmark = await this.landmarkRepository.findOneBy({
      id: landmarkId,
    });
    if (!landmark) {
      throw new BadRequestException({
        message: `Landmark with id ${landmarkId} not found`,
      });
    }

    user.favoriteLandmarks = user.favoriteLandmarks.filter(
      (favoriteLandmark) => favoriteLandmark.id !== landmarkId,
    );
    await user.save({ reload: true });
  }

  private async convertFavoriteDishesToDto(
    dish: Dish,
  ): Promise<FavoriteDishesResponseDto> {
    return {
      id: dish.id,
      name: dish.name,
      image: dish.image,
      description: dish.description,
      price: dish.price,
      special: dish.special,
    };
  }

  async getFavoriteDishes(
    username: string,
  ): Promise<GetManyFavoriteDishesResponseDto> {
    try {
      const user = await this.findByUserName(username);
      const data = await Promise.all(
        user.favoriteDishes.map((favoriteDish) =>
          this.convertFavoriteDishesToDto(favoriteDish),
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

  async addFavoriteDish(username: string, dishId: number): Promise<void> {
    const user = await this.findByUserName(username);
    if (!user) {
      throw new BadRequestException({
        message: `User with user name ${username} not found`,
      });
    }

    const dish = await this.dishRepository.findOneBy({
      id: dishId,
    });
    if (!dish) {
      throw new BadRequestException({
        message: `Dish with id ${dishId} not found`,
      });
    }

    user.favoriteDishes.push(dish);
    await user.save({ reload: true });
  }

  async removeFavoriteDish(username: string, dishId: number): Promise<void> {
    const user = await this.findByUserName(username);
    if (!user) {
      throw new BadRequestException({
        message: `User with user name ${username} not found`,
      });
    }

    const dish = await this.dishRepository.findOneBy({
      id: dishId,
    });
    if (!dish) {
      throw new BadRequestException({
        message: `Dish with id ${dishId} not found`,
      });
    }

    user.favoriteDishes = user.favoriteDishes.filter(
      (favoriteDish) => favoriteDish.id !== dishId,
    );
    await user.save({ reload: true });
  }
}
