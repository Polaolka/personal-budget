import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, EntityTarget, Repository } from 'typeorm';
import { BaseHelper } from '@common/helpers/base.helper';
import { Category } from '@models/Category.model';
import { CategoryTypes } from '@enums/category-type.enum';
import { LoggerService } from '@common/logger/logger.service';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(
    manager: EntityManager,
    target: EntityTarget<Category>,
    private readonly dataSource: DataSource,
    private readonly loggerService: LoggerService,
    private readonly baseHelper: BaseHelper,
  ) {
    super(target, manager);
  }
  async createCategory({ name, type }: { name: string; type: CategoryTypes }) {
    const queryRunner = this.dataSource.createQueryRunner();

    return await this.baseHelper.createTransaction(
      queryRunner,
      async (manager) => {
        const categoryEntity = manager.create(Category, {
          name,
          type,
        });
        const category = await manager.save(Category, categoryEntity);
        return category;
      },
    );
  }

  async getByParams(params: {
    type?: CategoryTypes;
    name?: string;
    skip?: number;
  }) {
    return this.find({
      where: params,
      skip: params.skip,
    });
  }

  async findOneById(id: number): Promise<Category | null> {
    return this.findOne({
      where: { id },
      loadRelationIds: true,
    });
  }

  async saveCategory(
    category: Category,
    manager?: EntityManager,
  ): Promise<Category> {
    const repo = manager ? manager.getRepository(Category) : this;
    return repo.save(category);
  }
}
