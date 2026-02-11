import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import {loginAuthDto} from './dto/loginAuth.dto'
import { userInfo } from 'os';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  // async authenticate(email: string ,password:string) {
  //   const user = await this.userRepo.findOne({ where: { email } });

  //   if (!user) return null;

  //   if (user.isBanned) {
  //     throw new HttpException('This account is banned ,Contact admin', 403);
  //   }

  //   return user;
  // }

  // async login(user: User, req: any, res: any) {
  //   const payload = {
  //     id: user.id,
  //     email: user.email,
  //     username: user.username,
  //   };

  //   const token = this.jwtService.sign(payload);

  //   req.session.user = user;

  //   res.cookie('access_token', token, {
  //     httpOnly: true,
  //     maxAge: 10000 ,
  //   });

  //   return {
  //     message: 'Login successful',
  //     user,
  //   };
  // }

  async login(loginAuthDto: loginAuthDto){
    console.log(loginAuthDto)
    const {email ,password}= loginAuthDto
    const existing = await this.userRepo.findOne({where:{email,password}})
    console.log('dfd',existing)
    console.log(existing)
    if (!existing){
       throw new HttpException('User Not Existed',404)
    }
    return existing

  }


  // async create(createAuthDto: CreateAuthDto) {
  //   const existing = await this.userRepo.findOne({
  //     where: { email: createAuthDto.email },
  //   });
  //   if(existing){
  //     throw new HttpException('User already Existed',409)

  //   }

  //   return { message: 'aregister Successfully', user: existing };
  // }
    async create(createAuthDto: CreateAuthDto) {
    const { email } = createAuthDto;

    const existingUser = await this.userRepo.findOne({ where: { email } });
    if (existingUser) {
      throw new HttpException(
        { message: 'Email already exists', status: 409 },
        409,
      );
    }
    const userInfo:any ={
      username:createAuthDto.username,
      password:createAuthDto.password,
      email:createAuthDto.email,
      role:createAuthDto.role
    }
    console.log('retert',userInfo)

    const newUser = this.userRepo.create(userInfo);
    await this.userRepo.save(newUser);

    return { message: 'User registered successfully' };
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: any) {
    return this.userRepo.findOne({ where: { id } });
  }

  remove(id: string) {
    return this.userRepo.delete(id);
  }
}
