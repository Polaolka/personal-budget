import { Injectable } from '@nestjs/common';
import { EntityManager, QueryRunner } from 'typeorm';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class BaseHelper {
  constructor(private readonly loggerService: LoggerService) {}

  usePagination({
    total,
    page = 1,
    limit = 25,
  }: {
    total: number;
    page: number;
    limit: number;
  }) {
    const MAX_LIMIT = 150;

    const options = { page, limit };
    if (options.page < 1) {
      page = 1;
    }
    if (limit > MAX_LIMIT) {
      options.limit = MAX_LIMIT;
    }

    const skip = page * limit;

    return {
      total,
      itemsPerPage: limit,
      currentPage: page,
      lastPage: Math.ceil(total / limit),
      skip,
    };
  }

  async createTransaction(
    queryRunner: QueryRunner,
    callback: (manager: EntityManager) => Promise<unknown>,
  ) {
    const manager = queryRunner.manager;
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const data = await callback(manager);
      await queryRunner.commitTransaction();
      return data;
    } catch (e) {
      console.log(e);
      await queryRunner.rollbackTransaction();
      this.loggerService.error('TRANSACTION', `${e.message} ${e.detail}`);
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
