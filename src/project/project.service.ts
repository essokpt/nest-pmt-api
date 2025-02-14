import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService ) {}

  async create(createProjectDto: CreateProjectDto) {
    try {
      const result = await this.prisma.project.create({ 
        data: createProjectDto
      });

      if(result.id) 
        console.log('create successfully.');
        return {
        status: HttpStatus.OK,
        message: 'create successfully.',
      }       
     
    } catch (error) {
      console.log('create error.',error.message);
      return { 
        status: HttpStatus.BAD_REQUEST,
        error: error,
      }
    }
  }

  async findAll() {
    return await this.prisma.project.findMany({
      include:{
        customer: true
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.project.findUnique({
      where: { id: id }
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    try {
      const result = await this.prisma.project.update({ 
        where: { id: id },
        data: updateProjectDto
      });

      if(result.id) 
        console.log('update successfully.');
        
        return {
        status: HttpStatus.OK,
        message: 'update successfully.',
      }       
     
    } catch (error) {
      console.log('update error.',error.message);
      return { 
        status: HttpStatus.BAD_REQUEST,
        error: error,
      }
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.project.delete({
        where: { id: id },        
      })
      return {
        status: HttpStatus.OK,
        message: 'delete successfully.',
      }       
    } catch (error) {
       return  {
        status: HttpStatus.NOT_FOUND,
        error: error.meta.cause,
      }
    }
  }
}
