import { User } from 'src/modules/users/entities/user.entity';
import { BaseEntity } from 'src/utils/entity/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Landmark } from './landmark.entity';

@Entity('landmark_feedback')
export class LandmarkFeedback extends BaseEntity {
  @ManyToOne(() => User, { nullable: false })
  user: User;

  @Column({ nullable: false })
  comment: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true, type: 'decimal', precision: 2, scale: 1 })
  rating: number;

  @ManyToOne(() => Landmark, (landmark) => landmark.feedbacks, {
    nullable: false,
  })
  landmark: Landmark;
}
