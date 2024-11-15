import { BaseEntity } from 'src/utils/entity/base-entity';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { RestaurantFeedBack } from './feedback.entity';
import { Dish } from 'src/modules/dishes/entites/dish.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('restaurant')
export class Restaurant extends BaseEntity {
  @Column({ nullable: false })
  @Index({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({ nullable: false })
  image: string;

  @Column()
  address: string;

  @Column({ nullable: true, type: 'decimal', precision: 9, scale: 6 })
  latitude: number;

  @Column({ nullable: true, type: 'decimal', precision: 9, scale: 6 })
  longitude: number;

  @Column()
  rating: number;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  website: string;

  @OneToMany(() => RestaurantFeedBack, (feedback) => feedback.restaurant)
  feedbacks: RestaurantFeedBack[];

  @OneToMany(() => Dish, (dish) => dish.restaurant)
  dishes: Dish[];

  @ManyToOne(() => User, (user) => user.favoriteRestaurants)
  users: User[];
}
