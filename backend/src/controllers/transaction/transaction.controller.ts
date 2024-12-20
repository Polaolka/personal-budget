import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoggerService } from '@common/logger/logger.service';
import {
  CreateTransactionDto,
  UpdateTransactionDto,
  GetTransactionByParamsDto,
} from './dto/transaction.dto';
import {
  CreateTransactionPresenter,
  DeleteTransactionPresenter,
} from './transaction.presenter';
import { TransactionService } from '@services/transaction.service';

@Controller('/transactions')
@ApiTags('transactions')
@ApiResponse({ status: 500, description: 'Internal error' })
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly loggerService: LoggerService,
  ) {}

  @ApiResponse({ status: 201, type: CreateTransactionPresenter })
  @Post('')
  async createRecord(@Body() body: CreateTransactionDto) {
    const record = await this.transactionService.createTransaction({
      ...body,
    });

    const response = new CreateTransactionPresenter();

    response.id = record.id;
    response.amount = record.amount;
    response.categoryId = record.categoryId.id;
    response.categoryName = record.categoryId.name;
    response.description = record.description;
    response.type = record.type;
    response.createdAt = record.createdAt;

    return response;
  }

  @ApiResponse({ status: 201, type: [CreateTransactionPresenter] })
  @Get('')
  async geTransactions(@Query() query: GetTransactionByParamsDto) {
    const { date, ...otherParams } = query;

    let startDate: string | undefined;
    let endDate: string | undefined;

    if (date) {
      startDate = new Date(`${date}T00:00:00Z`).toISOString();
      endDate = new Date(`${date}T23:59:59Z`).toISOString();
    }

    const records = await this.transactionService.getTransactionByParams({
      ...otherParams,
      startDate,
      endDate,
    });

    const response = records.data.map((record) => {
      return {
        id: record.id,
        amount: record.amount,
        categoryId: record.categoryId.id,
        categoryName: record.categoryId.name,
        description: record.description,
        type: record.type,
        createdAt: record.createdAt,
      };
    });

    return {
      data: response,
      total: records.total,
      page: records.page,
      limit: records.limit,
      totalPages: records.totalPages,
    };
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'Transaction id',
    example: '12345',
  })
  @ApiResponse({ status: 200, type: CreateTransactionPresenter })
  @Put(':id')
  async updateTransaction(@Param() { id }, @Body() body: UpdateTransactionDto) {
    const updatedTransaction = await this.transactionService.updateTransaction(
      id,
      body,
    );
    const response = new CreateTransactionPresenter();

    response.id = updatedTransaction.id;
    response.amount = updatedTransaction.amount;
    response.categoryId = updatedTransaction.categoryId.id;
    response.categoryName = updatedTransaction.categoryId.name;
    response.description = updatedTransaction.description;
    response.type = updatedTransaction.type;
    response.createdAt = updatedTransaction.createdAt;

    return response;
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'transaction id',
    example: '12345',
  })
  @ApiResponse({ status: 200, type: DeleteTransactionPresenter })
  @Delete(':id')
  async deleteRecord(@Param() { id }) {
    const result = await this.transactionService.deleteTransaction(id);
    return result;
  }
}
