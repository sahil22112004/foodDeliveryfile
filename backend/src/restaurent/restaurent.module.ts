import { Module } from '@nestjs/common';
import { RestaurentService } from './restaurent.service';
import { RestaurentController } from './restaurent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurent } from './entities/restaurent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurent])],
  controllers: [RestaurentController],
  providers: [RestaurentService],
})
export class RestaurentModule {}
