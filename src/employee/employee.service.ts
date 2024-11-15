import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class EmployeeService {
  constructor( private prisma: PrismaService){}

  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const result = await this.prisma.employee.create({ 
        data: createEmployeeDto
      });

      if(result.id) 
        return {
        status: HttpStatus.OK,
        message: 'create successfully.',
      }       
     
    } catch (error) {
      return { 
        status: HttpStatus.BAD_REQUEST,
        error: error,
      }
    }
  
  }

  async findAll() {
    return await this.prisma.employee.findMany();
  }

  async findOne(id: number) {
    console.log('find one employee');
    
    return await this.prisma.employee.findUnique({
      where: { id: id }
    });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return await this.prisma.employee.update({
      where: { id: id },
      data : updateEmployeeDto
    }) ;
  }

  async remove(id: number) {
    try {
      await this.prisma.employee.delete({
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
