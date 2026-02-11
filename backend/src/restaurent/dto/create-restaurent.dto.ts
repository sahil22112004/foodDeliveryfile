import {  IsString, IsEmail,IsNotEmpty, IsOptional, IsUUID } from 'class-validator';


export class CreateRestaurentDto {

        @IsString({message:'enter only string'})
        @IsNotEmpty({message:'this field cannot be emty'})
        restaurantname:string
        
        @IsEmail()
        @IsNotEmpty({message:'this field cannot be emty'})
        description:string
        
        @IsString({message:'enter only string'})
        @IsNotEmpty({message:'this field cannot be emty'})
        image:string

        @IsUUID()
        userId:string
    
}
