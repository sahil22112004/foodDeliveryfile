import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class DishMigration1770795865855 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
               new Table({
                   name: "dishes",
                   columns: [
                       {
                           name: "id",
                           type: "uuid",
                           isPrimary: true,
                           generationStrategy: "uuid",
                           default: "uuid_generate_v4()",
                       },
                       {
                           name: "dishname",
                           type: "varchar",
                           isNullable: false,
                       },
                       {
                           name: "price",
                           type: "int",
                           isNullable: false,
                       },
                       {
                           name: "description",
                           type: "varchar",
                           isNullable: false,
   
                       },
                       {
                           name: 'userId',
                           type: 'uuid',
                       },
                       {
                           name: 'restaurantId',
                           type: 'uuid',
                       },
                       {
                           name: "image",
                           type: "varchar",
                           isNullable: false,
   
                       },
                       {
                           name: "isAvailable",
                           type: "boolean",
                           default: true,
   
                       },
   
                       {
                           name: "createdAt",
                           type: "varchar",
                           default: 'NOW()',
                           isNullable: false,
                       },
                       {
                           name: "updatedAt",
                           type: "varchar",
                           default: 'NOW()',
                           isNullable: false,
                       }
                   ]
               }),
               true
           );
           await queryRunner.createForeignKey(
               'dishes',
               new TableForeignKey({
                   columnNames: ['userId'],
                   referencedTableName: 'users',
                   referencedColumnNames: ['id'],
                   onDelete: 'CASCADE',
               })
           )

           await queryRunner.createForeignKey(
               'dishes',
               new TableForeignKey({
                   columnNames: ['restaurantId'],
                   referencedTableName: 'resaturents',
                   referencedColumnNames: ['id'],
                   onDelete: 'CASCADE',
               })
           )
       }
   
       public async down(queryRunner: QueryRunner): Promise<void> {
           await queryRunner.dropTable("resaturents");
       }
   
   }