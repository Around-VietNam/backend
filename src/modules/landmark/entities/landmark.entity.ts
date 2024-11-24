import { BaseEntity } from 'src/utils/entity/base-entity';
import {
  Column,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { LandmarkFeedback } from './feedback.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('landmark')
export class Landmark extends BaseEntity {
  @Column({ nullable: false })
  @Index({ unique: true })
  name: string;

  @Column({ nullable: false })
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
    nullable: false,
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

  @OneToMany(() => LandmarkFeedback, (feedback) => feedback.landmark)
  feedbacks: LandmarkFeedback[];

  @ManyToMany(() => User, (user) => user.favoriteLandmarks)
  @JoinTable()
  users: User[];
}
