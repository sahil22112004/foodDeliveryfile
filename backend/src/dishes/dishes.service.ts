import { HttpException, Injectable } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dish } from './entities/dish.entity';
import { dishQuery } from './interface/dishQuery.interface';
import { dishAvailableQuery } from './interface/dishAvailable.interface';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(Dish)
    private dishRepo: Repository<Dish>,
  ) { }


  async create(createDishDto: CreateDishDto) {
    console.log('JGUYIHH', createDishDto)
    console.log('in service ', createDishDto)
    const newRestaurent = this.dishRepo.create(createDishDto);
    console.log('asa new', newRestaurent)
    await this.dishRepo.save(newRestaurent);

    return { message: 'dish added successfully' };
  }

  async findforspecificUser(id: string) {
    const dishes = this.dishRepo.find({ where: { userId: id } })
    return dishes
  }

  async findforSpecificrestaurent(query: dishQuery) {
    const { dishname, restaurantId, limit = 10, offset = 0 } = query

    const qb = this.dishRepo.createQueryBuilder("dish")

    qb.where("dish.restaurantId = :restaurantId", { restaurantId })

    if (dishname && dishname.trim() !== "") {
      qb.andWhere("LOWER(dish.dishname ) LIKE LOWER(:dishname)", { dishname: `%${dishname}%` })
    }

    qb.orderBy("dish.id", "ASC")
      .skip(offset)
      .take(limit)

    const dishes = await qb.getMany()

    return dishes
  }


  async update(id: string, query: dishAvailableQuery) {
  const isAvailable = String(query.isAvailable) === 'true';

  const dish = await this.dishRepo.findOne({ where: { id } });
  
  if (!dish) {
    throw new HttpException('product not found', 404);
  }

  dish.isAvailable = isAvailable;
  
  await this.dishRepo.save(dish); 
  
  return { message: 'isAvailable changed successfully' };
}


  async remove(id: string) {
    const dish = await this.dishRepo.find({ where: { id } });
    if (!dish) {
      throw new HttpException('product not found', 404);
    }
    await this.dishRepo.delete({id });
    return { message: 'product delete successfully', dish };
  }
}   




