import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTransactionModel1681234567891 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_category_transactions"`,
    );

    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_category_transactions" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_category_transactions"`,
    );

    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_category_transactions" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
