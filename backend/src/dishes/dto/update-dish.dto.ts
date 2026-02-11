import { PartialType } from '@nestjs/mapped-types';
import { CreateDishDto } from './create-dish.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateDishDto extends PartialType(CreateDishDto) {


}
