import { BaseEntity } from 'src/utils/entity/base-entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { DishFeedback } from './feedback.entity';
import { Restaurant } from 'src/modules/restaurants/entities/restaurant.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('dish')
export class Dish extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column()
  description: string;

  @Column({ nullable: false })
  image: string;

  @Column({ type: 'int', default: 999999999 })
  price: number;

  @Column({ type: 'boolean', default: true })
  special: boolean;

  @OneToMany(() => DishFeedback, (feedback) => feedback.dish, { cascade: true })
  feedbacks: DishFeedback[];

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.dishes)
  restaurant: Restaurant;

  @ManyToMany(() => User, (user) => user.favoriteDishes)
  users: User[];
}