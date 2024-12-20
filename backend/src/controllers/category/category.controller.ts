import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoggerService } from '@common/logger/logger.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  GetCategoryByParamsDto,
} from './dto/category.dto';
import { CreateCategoryPresenter } from './category.presenter';
import { CategoryService } from '@services/category.service';

@Controller('/categories')
@ApiTags('categories')
@ApiResponse({ status: 500, description: 'Internal error' })
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly loggerService: LoggerService,
  ) {}

  @ApiResponse({ status: 201, type: CreateCategoryPresenter })
  @Post('')
  async createCategoryRecord(@Body() body: CreateCategoryDto) {
    const record = await this.categoryService.createCategory({ ...body });

    const response = new CreateCategoryPresenter();

    response.id = record.id;
    response.name = record.name;
    response.type = record.type;
    return response;
  }

  @ApiResponse({ status: 201, type: [CreateCategoryPresenter] })
  @Get('')
  async getCategories(@Query() query: GetCategoryByParamsDto) {
    const categories = await this.categoryService.getCategoryByParams(query);

    return categories;
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'Category id',
    example: '12345',
  })
  @ApiResponse({ status: 200, type: CreateCategoryPresenter })
  @Put(':id')
  async updateCategory(@Param() { id }, @Body() body: UpdateCategoryDto) {
    const updatedCategory = await this.categoryService.updateCategory(id, body);
    return updatedCategory;
  }
}
