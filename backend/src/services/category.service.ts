import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { ExceptionsService } from '@common/exceptions/exceptions.service';
import { BaseHelper } from '@common/helpers/base.helper';
import { LoggerService } from '@common/logger/logger.service';
import { CategoryRepository } from '@repositories/category.repository';
import { CreatedCategoryResponse } from '@interfaces/services/medicine.interfaces';
import { CategoryTypes } from '@enums/category-type.enum';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly loggerService: LoggerService,
    private readonly exceptionService: ExceptionsService,
    private readonly dataSource: DataSource,
    private readonly baseHelper: BaseHelper,
  ) {}
  async createCategory({
    type,
    name,
  }: {
    type: CategoryTypes;
    name: string;
  }): Promise<CreatedCategoryResponse> {
    const result = await this.categoryRepository.createCategory({
      name,
      type,
    });
    return result as CreatedCategoryResponse;
  }

  async getCategoryByParams(params: {
    name?: string;
    type?: CategoryTypes;
    skip?: number;
  }) {
    const records = await this.categoryRepository.getByParams(params);
    return records;
  }

  async updateCategory(
    id: string,
    updateData: Partial<{
      name?: string;
      type?: CategoryTypes;
    }>,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    return await this.baseHelper.createTransaction(
      queryRunner,
      async (manager) => {
        const existedCategory = await this.categoryRepository.findOneById(
          Number(id),
        );

        if (!existedCategory) {
          this.exceptionService.BAD_REQUEST_EXCEPTION({
            message: 'Record not found',
          });
        }

        Object.assign(existedCategory, updateData);

        const category = await this.categoryRepository.saveCategory(
          existedCategory,
          manager,
        );
        return category;
      },
    );
  }
}
