import {  IsString, IsEmail,IsNotEmpty } from 'class-validator';


export class loginAuthDto {

    @IsEmail()
    @IsNotEmpty({message:'this field cannot be emty'})
    email:string
    
    @IsString({message:'enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    password:string

}