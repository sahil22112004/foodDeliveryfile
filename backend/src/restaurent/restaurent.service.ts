import { Injectable } from '@nestjs/common';
import { CreateRestaurentDto } from './dto/create-restaurent.dto';
import { UpdateRestaurentDto } from './dto/update-restaurent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurent } from './entities/restaurent.entity';

@Injectable()
export class RestaurentService {
  constructor(
      @InjectRepository(Restaurent)
      private restaurentRepo: Repository<Restaurent>,
    ) {}
  async create(createRestaurentDto: CreateRestaurentDto) {
    console.log('in service ',createRestaurentDto)
    const newRestaurent = this.restaurentRepo.create(createRestaurentDto);
    console.log('asa new',newRestaurent)
    await this.restaurentRepo.save(newRestaurent);

    return {message:'restaurent added successfully'};
  }

  async findAll() {
    return await this.restaurentRepo.find();
  }

  async findOne(id: string) {
    const restaurant = await this.restaurentRepo.findOne({where:{userId:id}})
    return restaurant;
  }

  update(id: number, updateRestaurentDto: UpdateRestaurentDto) {
    return `This action updates a #${id} restaurent`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurent`;
  }
}
