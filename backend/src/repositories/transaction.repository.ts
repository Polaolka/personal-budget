import { Injectable } from '@nestjs/common';
import {
  DataSource,
  EntityManager,
  EntityTarget,
  Repository,
  Between,
} from 'typeorm';
import { BaseHelper } from '@common/helpers/base.helper';
import { Transaction } from '@models/Transaction.model';
import { CategoryTypes } from '@enums/category-type.enum';
import { LoggerService } from '@common/logger/logger.service';

@Injectable()
export class TransactionRepository extends Repository<Transaction> {
  constructor(
    manager: EntityManager,
    target: EntityTarget<Transaction>,
    private readonly dataSource: DataSource,
    private readonly loggerService: LoggerService,
    private readonly baseHelper: BaseHelper,
  ) {
    super(target, manager);
  }
  async createTransaction({
    amount,
    type,
    category,
    description,
  }: {
    amount: number;
    type: CategoryTypes;
    category: number;
    description: string;
  }) {
    const queryRunner = this.dataSource.createQueryRunner();

    return await this.baseHelper.createTransaction(
      queryRunner,
      async (manager) => {
        const transactionEntity = manager.create(Transaction, {
          amount,
          type,
          category,
          description,
          categoryId: { id: category },
        });
        const transaction = await manager.save(Transaction, transactionEntity);
        return transaction;
      },
    );
  }

  async getByParams(params: {
    amount?: string;
    type?: CategoryTypes;
    category?: string;
    description?: string;
    page?: string;
    limit?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const {
      amount,
      category,
      page = '1',
      limit = '50',
      startDate,
      endDate,
      ...otherParams
    } = params;

    const whereCondition: any = {
      ...otherParams,
      ...(category ? { categoryId: { id: Number(category) } } : {}),
      ...(amount ? { amount: Number(amount) } : {}),
    };

    if (startDate && endDate) {
      whereCondition.createdAt = Between(
        new Date(startDate),
        new Date(endDate),
      );
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const skip = (pageNumber - 1) * limitNumber;

    const [transactions, total] = await this.findAndCount({
      where: whereCondition,
      skip: skip,
      take: limitNumber,
      relations: ['categoryId'],
    });

    return {
      data: transactions,
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    };
  }

  async findOneById(id: number): Promise<Transaction | null> {
    return this.findOne({
      where: { id },
      relations: ['categoryId'],
    });
  }

  async saveTransaction(
    transaction: Transaction,
    manager?: EntityManager,
  ): Promise<Transaction> {
    const repo = manager ? manager.getRepository(Transaction) : this;
    return repo.save(transaction);
  }

  async deleteById(id: number): Promise<number> {
    const result = await this.delete(id);
    return result.affected;
  }
}
