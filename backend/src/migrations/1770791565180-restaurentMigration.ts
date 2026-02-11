import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class RestaurentMigration1770791565180 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "resaturents",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "restaurantname",
                        type: "varchar",
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
                        name: "image",
                        type: "varchar",
                        isNullable: false,

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
            'resaturents',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("resaturents");
    }

}