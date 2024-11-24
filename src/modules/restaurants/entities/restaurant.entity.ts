import { BaseEntity } from 'src/utils/entity/base-entity';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { RestaurantFeedback } from './feedback.entity';
import { Dish } from 'src/modules/dishes/entites/dish.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('restaurant')
export class Restaurant extends BaseEntity {
  @Column({ nullable: false })
  @Index({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: false })
  image: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: true, type: 'decimal', precision: 9, scale: 6 })
  latitude: number;

  @Column({ nullable: true, type: 'decimal', precision: 9, scale: 6 })
  longitude: number;

  @Column({
    nullable: true,
    type: 'decimal',
    precision: 2,
    scale: 1,
    default: 0,
  })
  rating: number;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  website: string;

  @OneToMany(() => RestaurantFeedback, (feedback) => feedback.restaurant)
  feedbacks: RestaurantFeedback[];

  @OneToMany(() => Dish, (dish) => dish.restaurant)
  dishes: Dish[];

  @ManyToOne(() => User, (user) => user.favoriteRestaurants, { nullable: true })
  owner: User;
}
