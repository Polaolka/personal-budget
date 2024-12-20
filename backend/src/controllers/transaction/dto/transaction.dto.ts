import { CategoryTypes } from '@enums/category-type.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ example: 12345, description: 'category id' })
  @IsNumber()
  category: number;

  @ApiProperty({ example: 1000, description: 'amount of transaction' })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: 'some description',
    description: 'transaction description',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: 'income', description: 'Category type' })
  @IsEnum(CategoryTypes)
  type: CategoryTypes;
}

export class UpdateTransactionDto {
  @ApiPropertyOptional({ example: 12345, description: 'category id' })
  @IsOptional()
  @IsNumber()
  category?: number;

  @ApiPropertyOptional({ example: 1000, description: 'amount of transaction' })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiPropertyOptional({
    example: 'some description',
    description: 'transaction description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'income', description: 'Category type' })
  @IsEnum(CategoryTypes)
  @IsOptional()
  type?: CategoryTypes;
}

export class GetTransactionByParamsDto {
  @ApiPropertyOptional({ example: 123, description: 'Transaction id' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiPropertyOptional({ example: 12345, description: 'category id' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 1000, description: 'amount of transaction' })
  @IsOptional()
  @IsString()
  amount?: string;

  @ApiPropertyOptional({
    example: 'some description',
    description: 'transaction description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'income', description: 'Category type' })
  @IsOptional()
  @IsEnum(CategoryTypes)
  type?: CategoryTypes;

  @ApiPropertyOptional({ example: '10', description: 'page' })
  @IsOptional()
  @IsString()
  page?: string;

  @ApiPropertyOptional({ example: '10', description: 'limit' })
  @IsOptional()
  @IsString()
  limit?: string;

  @ApiPropertyOptional({ example: '10', description: 'limit' })
  @IsOptional()
  @IsString()
  date?: string;
}
