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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'foodApp',
      entities: [User,Restaurent,Dish],
      synchronize: false,

    }),
    AuthModule,
    RestaurentModule,
    DishesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
