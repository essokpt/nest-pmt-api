import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma : PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const result =  await this.prisma.user.create({
      data : createUserDto
    });

    if(result.id) {
        return {
        status: HttpStatus.OK,
        message: 'create successfully.',
      }    
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findUser(email: string) {
    return this.prisma.user.findUnique({
     where: {
      email : email
     }
    });
  }

  findOne(id: number) {
    console.log('find one user');

    return this.prisma.user.findUnique({
     where: {
      id : id
     }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where : { id : id},
      data : updateUserDto
    })   
  }

  async remove(id: number) {
    try {
      await this.prisma.user.delete({
        where: { id: id },        
      })
  
      return HttpStatus.OK
    } catch (error) {
       return  {
        status: HttpStatus.NOT_FOUND,
        error: error.meta.cause,
      }
    }
   
  }
}
