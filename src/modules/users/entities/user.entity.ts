import { Dish } from 'src/modules/dishes/entites/dish.entity';
import { Landmark } from 'src/modules/landmark/entities/landmark.entity';
import { Restaurant } from 'src/modules/restaurants/entities/restaurant.entity';
import { BaseEntity } from 'src/utils/entity/base-entity';
import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth: Date;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  avt: string;

  @Column()
  hash_password: string;

  @ManyToMany(() => Restaurant)
  @JoinTable()
  favoriteRestaurants: Restaurant[];

  @ManyToMany(() => Dish)
  @JoinTable()
  favoriteDishes: Dish[];

  @ManyToMany(() => Landmark)
  @JoinTable()
  favoriteLandmarks: Landmark[];
}
