import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { config } from "dotenv"
import { User } from './src/auth/entities/auth.entity';
import { Restaurent } from './src/restaurent/entities/restaurent.entity';
import { Dish } from './src/dishes/entities/dish.entity';


config();

const datasource :DataSourceOptions & SeederOptions={
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'foodApp',
  entities: [User,Restaurent,Dish],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, 
  seeds: [],

}

export const AppDataSource = new DataSource(datasource);