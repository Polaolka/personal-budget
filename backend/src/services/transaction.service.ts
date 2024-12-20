import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { ExceptionsService } from '@common/exceptions/exceptions.service';
import { BaseHelper } from '@common/helpers/base.helper';

import { CreatedTransaction } from '@interfaces/services/transaction.interfaces';
import { TransactionRepository } from '@repositories/transaction.repository';
import { CategoryTypes } from '@enums/category-type.enum';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly exceptionService: ExceptionsService,
    private readonly dataSource: DataSource,
    private readonly baseHelper: BaseHelper,
  ) {}
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
  }): Promise<CreatedTransaction> {
    const result = await this.transactionRepository.createTransaction({
      amount,
      type,
      category,
      description,
    });
    return result as CreatedTransaction;
  }

  async getTransactionByParams(params: {
    amount?: string;
    type?: CategoryTypes;
    category?: string;
    description?: string;
    page?: string;
    limit?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const records = await this.transactionRepository.getByParams(params);
    return records;
  }

  async updateTransaction(
    id: string,
    updateData: Partial<{
      amount?: number;
      type?: CategoryTypes;
      category?: number;
      description?: string;
    }>,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    const result = await this.baseHelper.createTransaction(
      queryRunner,
      async (manager) => {
        const existedTransaction = await this.transactionRepository.findOneById(
          Number(id),
        );

        if (!existedTransaction) {
          this.exceptionService.BAD_REQUEST_EXCEPTION({
            message: 'Record not found',
          });
        }

        Object.assign(existedTransaction, updateData);

        const transaction = await this.transactionRepository.saveTransaction(
          existedTransaction,
          manager,
        );
        return transaction;
      },
    );
    return result as CreatedTransaction;
  }

  async deleteTransaction(id: string) {
    const affectedRows = await this.transactionRepository.deleteById(
      Number(id),
    );
    if (affectedRows === 0) {
      this.exceptionService.BAD_REQUEST_EXCEPTION({
        message: `Transaction with ID ${id} not found`,
      });
    }
    return { message: `Transaction with ID ${id} deleted successfully` };
  }
}
