import { BaseEntity } from 'src/utils/entity/base-entity';
import { Column, Entity, Index, ManyToMany, OneToMany } from 'typeorm';
import { LandmarkFeedback } from './feedback.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('landmark')
export class Landmark extends BaseEntity {
  @Column({ nullable: false })
  @Index({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({ nullable: false })
  image: string;

  @Column()
  address: string;

  @Column()
  rating: number;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  website: string;

  @OneToMany(() => LandmarkFeedback, (feedback) => feedback.landmark)
  feedbacks: LandmarkFeedback[];

  @ManyToMany(() => User, (user) => user.favoriteLandmarks)
  users: Landmark[];
}
