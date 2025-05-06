import { Injectable } from '@nestjs/common';
import { CreateStoreTypeDto } from './dto/create-store-type.dto';
import { UpdateStoreTypeDto } from './dto/update-store-type.dto';
import { PrismaService } from 'prisma/prisma.service';
import  {Prisma}  from '@prisma/client'

@Injectable()
export class StoreTypeService {
constructor(private prisma: PrismaService){}

    async create(createDto: CreateStoreTypeDto){      
      return this.prisma.storeType.create({
        data :  createDto
      });
    }
  
    findAll() {
      return this.prisma.storeType.findMany();
    }
  
    findOne(id: number) {
      return this.prisma.storeType.findUnique({
        where: { id : id}
      });
    }
  
    update(id: number, updateDto: UpdateStoreTypeDto) {
      return this.prisma.storeType.update({
        where: { id : id },
        data : updateDto
      });
    }
  
    remove(id: number) {
      return this.prisma.storeType.delete({
        where: { id : id }
      });
    }
}
  
  