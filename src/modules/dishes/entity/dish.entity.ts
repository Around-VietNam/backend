import { BaseEntity } from 'src/utils/entity/base-entity';
import { Column, Entity, Index } from 'typeorm';

@Entity('dish')
export class DishFeedback extends BaseEntity {
  @Column({ nullable: false })
  @Index({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({ nullable: false })
  image: string;

  @Column({ type: 'int', default: 0 })
  min_price: number;

  @Column({ type: 'int', default: 999999999 })
  max_price: number;

  @Column({ type: 'boolean', default: true })
  special: boolean;
}
