import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchemaMigration1681234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create categories table
    await queryRunner.query(`
      CREATE TABLE "categories" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(200) NOT NULL,
        "type" VARCHAR(50) NOT NULL
      );
    `);

    // Create transactions table
    await queryRunner.query(`
      CREATE TABLE "transactions" (
        "id" SERIAL PRIMARY KEY,
        "amount" INT NOT NULL,
        "type" VARCHAR(50) NOT NULL,
        "description" VARCHAR NOT NULL,
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "category_id" INT,
        CONSTRAINT "FK_category" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop transactions table
    await queryRunner.query(`DROP TABLE "transactions";`);

    // Drop categories table
    await queryRunner.query(`DROP TABLE "categories";`);
  }
}
