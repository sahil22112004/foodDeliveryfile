import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import type { dishQuery } from './interface/dishQuery.interface';
import type { dishAvailableQuery } from './interface/dishAvailable.interface';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Post()
  create(@Body() createDishDto: CreateDishDto) {
    return this.dishesService.create(createDishDto);
  }

  @Get('user/:id')
  findforspecificUser(@Param('id') id: string) {
    return this.dishesService.findforspecificUser(id);
  }

  @Get('restaurent')
  findforSpecificrestaurent(@Query() query: dishQuery) {
    return this.dishesService.findforSpecificrestaurent(query);
  }

  @Patch('/isAvailable/:id')
  update(@Param('id') id: string, @Query() query: dishAvailableQuery) {
    return this.dishesService.update(id, query);
  }
  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dishesService.remove(id);
  }
}
