import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dish } from './entities/dish.entity';
import { DishFeedback } from './entities/feedback.entity';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { FeedbackDto } from './dto/feedback.dto';

@Injectable()
export class DishesService {
    constructor(
        @InjectRepository(Dish)
        private readonly dishRepository: Repository<Dish>,
        @InjectRepository(DishFeedback)
        private readonly feedbackRepository: Repository<DishFeedback>,
    ) { }

    async create(createDishDto: CreateDishDto): Promise<Dish> {
        const dish = this.dishRepository.create(createDishDto);
        return await this.dishRepository.save(dish);
    }

    async findById(id: number): Promise<Dish> {
        const dish = await this.dishRepository.findOne({
            where: { id },
            relations: ['feedbacks'],
        });
        if (!dish) {
            throw new NotFoundException(`Dish with ID ${id} not found`);
        }
        return dish;
    }

    async update(id: number, updateDishDto: UpdateDishDto): Promise<Dish> {
        const dish = await this.findById(id);
        Object.assign(dish, updateDishDto);
        return await this.dishRepository.save(dish);
    }

    async delete(id: number): Promise<void> {
        const dish = await this.findById(id);
        await this.dishRepository.remove(dish);
    }

    async addFeedback(dishId: number, feedbackDto: FeedbackDto): Promise<DishFeedback> {
        const dish = await this.findById(dishId);
        const feedback = this.feedbackRepository.create({ ...feedbackDto, dish });
        return await this.feedbackRepository.save(feedback);
    }

    async getFeedbacks(dishId: number): Promise<DishFeedback[]> {
        const dish = await this.findById(dishId);
        return dish.feedbacks;
    }

    async getRestaurantsWithDish(dishName: string): Promise<string[]> {
        // Đây là ví dụ đơn giản, thực tế bạn cần điều chỉnh query.
        const dishes = await this.dishRepository.find({ where: { name: dishName } });
        return dishes.map((dish) => `Restaurant for ${dish.name}`);
    }
}
