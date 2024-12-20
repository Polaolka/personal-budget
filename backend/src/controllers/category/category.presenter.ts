import { CategoryTypes } from '@enums/category-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryPresenter {
  @ApiProperty({ example: 123, description: 'Category id' })
  id: number;

  @ApiProperty({ example: 'Food', description: 'Category name' })
  name: string;

  @ApiProperty({ example: 'income', description: 'Category type' })
  type: CategoryTypes;
}
