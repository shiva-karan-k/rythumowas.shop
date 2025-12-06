import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateFarmerTables1701000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create Farmer table
    await queryRunner.createTable(
      new Table({
        name: "farmer",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "business_name",
            type: "varchar",
          },
          {
            name: "contact_name",
            type: "varchar",
          },
          {
            name: "phone",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "location",
            type: "varchar",
          },
          {
            name: "district",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "state",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "farm_size",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "description",
            type: "text",
            isNullable: true,
          },
          {
            name: "verification_status",
            type: "varchar",
            default: "'pending'",
          },
          {
            name: "commission_rate",
            type: "decimal",
            precision: 5,
            scale: 2,
            default: 10,
          },
          {
            name: "total_earnings",
            type: "decimal",
            precision: 12,
            scale: 2,
            default: 0,
          },
          {
            name: "is_active",
            type: "boolean",
            default: true,
          },
          {
            name: "metadata",
            type: "jsonb",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      true
    );

    // Create FarmerProduct table
    await queryRunner.createTable(
      new Table({
        name: "farmer_product",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "farmer_id",
            type: "varchar",
          },
          {
            name: "product_id",
            type: "varchar",
          },
          {
            name: "farmer_price",
            type: "decimal",
            precision: 12,
            scale: 2,
            isNullable: true,
          },
          {
            name: "is_active",
            type: "boolean",
            default: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      true
    );

    // Add foreign keys
    await queryRunner.createForeignKey(
      "farmer_product",
      new TableForeignKey({
        columnNames: ["farmer_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "farmer",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "farmer_product",
      new TableForeignKey({
        columnNames: ["product_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "product",
        onDelete: "CASCADE",
      })
    );

    // Create indexes
    await queryRunner.query(
      `CREATE INDEX "IDX_farmer_user_id" ON "farmer" ("user_id")`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_farmer_product_farmer_id" ON "farmer_product" ("farmer_id")`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_farmer_product_product_id" ON "farmer_product" ("product_id")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("farmer_product");
    await queryRunner.dropTable("farmer");
  }
}
