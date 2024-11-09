import { User } from 'src/modules/users/entities/user.entity';
import { BaseEntity } from 'src/utils/entity/base-entity';
import { Column, Entity, Index } from 'typeorm';

@Entity('dish_feedback')
export class Dish extends BaseEntity {
  @Column({ nullable: false })
  @Index()
  dish_id: number;

  @Column(() => User)
  user: User;

  @Column({ nullable: false })
  comment: string;

  @Column({ nullable: true })
  image: string;
}
