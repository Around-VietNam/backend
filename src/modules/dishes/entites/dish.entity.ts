import { BaseEntity } from 'src/utils/entity/base-entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { DishFeedback } from './feedback.entity';

@Entity('dish')
export class Dish extends BaseEntity {
  @Column({ nullable: false })
  @Index({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({ nullable: false })
  image: string;

  @Column({ type: 'int', default: 999999999 })
  price: number;

  @Column({ type: 'boolean', default: true })
  special: boolean;

  @OneToMany(() => DishFeedback, (feedback) => feedback.dish)
  feedbacks: DishFeedback[];
}
