import { CategoryTypes } from '@enums/category-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionPresenter {
  @ApiProperty({ example: 123, description: 'Transaction id' })
  id: number;

  @ApiProperty({
    example: 1000,
    description: 'Transaction amount',
  })
  amount: number;

  @ApiProperty({ example: 'income', description: 'Category type' })
  type: CategoryTypes;

  @ApiProperty({
    example: 'some description',
    description: 'Transaction description',
  })
  description: string;

  @ApiProperty({
    description: 'date of creation',
    example: '2024-10-16T14:53:45.246Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: 123,
    description: 'related category id',
  })
  categoryId: number;

  @ApiProperty({
    example: 'Food',
    description: 'category name',
  })
  categoryName: string;
}

export class DeleteTransactionPresenter {
  @ApiProperty({ example: 'success', description: 'info message' })
  message: string;
}
