import { CategoryTypes } from 'src/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category.model';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'varchar', length: 50 })
  type: CategoryTypes;

  @Column({ type: 'varchar' })
  description: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  categoryId: Category;
}
