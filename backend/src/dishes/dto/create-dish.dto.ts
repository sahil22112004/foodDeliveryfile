import { IsString, IsEmail, IsNotEmpty, IsOptional, IsUUID, IsNumber } from 'class-validator';


export class CreateDishDto {

    @IsString({ message: 'enter only string' })
    @IsNotEmpty({ message: 'this field cannot be emty' })
    dishname: string

    @IsNumber()
    @IsNotEmpty({ message: 'this field cannot be emty' })
    price: number

    @IsEmail()
    @IsNotEmpty({ message: 'this field cannot be emty' })
    description: string

    @IsString({ message: 'enter only string' })
    @IsNotEmpty({ message: 'this field cannot be emty' })
    image: string

    @IsUUID()
    userId: string

    @IsUUID()
    restaurantId: string
}
