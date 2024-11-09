import { BaseEntity } from 'src/utils/entity/base-entity';
import { Column, Entity, Index } from 'typeorm';

@Entity('dish_feedback')
export class User extends BaseEntity {
  @Column({ nullable: false })
  @Index()
  dish_id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false })
  comment: string;
}
