import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/auth.entity';
import { RestaurentModule } from './restaurent/restaurent.module';
import { Restaurent } from './restaurent/entities/restaurent.entity';
import { DishesModule } from './dishes/dishes.module';
import { Dish } from './dishes/entities/dish.entity';
import { config } from "dotenv"


config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Restaurent, Dish],
      synchronize: false,

    }),
    AuthModule,
    RestaurentModule,
    DishesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
