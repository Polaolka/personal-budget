import { CategoryTypes } from '@enums/category-type.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Food', description: 'Category name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'income', description: 'Category type' })
  @IsEnum(CategoryTypes)
  type: CategoryTypes;
}

export class UpdateCategoryDto {
  @ApiPropertyOptional({ example: 'Food', description: 'Category name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'income', description: 'Category type' })
  @IsOptional()
  @IsEnum(CategoryTypes)
  type?: CategoryTypes;
}

export class GetCategoryByParamsDto {
  @ApiPropertyOptional({ example: 123, description: 'Category id' })
  @IsOptional()
  id?: number;

  @ApiPropertyOptional({ example: 'Food', description: 'Category name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'income', description: 'Category type' })
  @IsOptional()
  @IsEnum(CategoryTypes)
  type?: CategoryTypes;

  @ApiPropertyOptional({ example: 10, description: 'skip' })
  @IsOptional()
  @IsNumber()
  skip?: number;
}
