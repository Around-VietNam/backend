import { User } from 'src/modules/users/entities/user.entity';
import { BaseEntity } from 'src/utils/entity/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity('restaurant_feedback')
export class RestaurantFeedback extends BaseEntity {
  @ManyToOne(() => User, { nullable: false })
  user: User;

  @Column({ nullable: false, type: 'text' })
  comment: string;

  @Column({ nullable: true })
  image: string;

  @Column({
    nullable: true,
    type: 'decimal',
    precision: 2,
    scale: 1,
    default: 0,
  })
  rating: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.feedbacks, {
    nullable: false,
  })
  restaurant: Restaurant;
}
