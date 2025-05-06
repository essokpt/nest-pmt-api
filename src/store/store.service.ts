import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from 'prisma/prisma.service';
import  {Prisma}  from '@prisma/client'
import { Product } from 'src/product/entities/product.entity';


@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService){}

     async create(createDto: Prisma.StoreUncheckedCreateInput){      
      console.log("create product:", createDto);
     // const CategoryWhereUniqueInput:Prisma.ProductUncheckedCreateInput;
        return this.prisma.store.create({
          data :  createDto
        });
      }
    
      findAll() {
        return this.prisma.store.findMany({
          include: {
            type: true,
            productItems : {
              include : {
                product: true
              }
            }
          }
        });
      }
    
      findOne(id: number) {
        return this.prisma.store.findUnique({
          where: { id : id},
          include: {
            type: true,
            productItems : {
              include : {
                product: true
              }
            }
          }
        });
      }
    
      update(id: number, updateDto: Prisma.StoreUpdateInput) {
        return this.prisma.store.update({
          where: { id : id },
          data : updateDto
        });
      }
    
      remove(id: number) {
        return this.prisma.store.delete({
          where: { id : id }
        });
      }
}

