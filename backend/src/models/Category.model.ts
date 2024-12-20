import { CategoryTypes } from 'src/enums';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  type: CategoryTypes;
}
