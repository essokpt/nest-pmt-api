import { Injectable } from '@nestjs/common';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProductTypeService {
   constructor(private prisma: PrismaService){}

  create(createDto: CreateProductTypeDto, imageUrl:string) {
      console.log('category image :', createDto);    
      return this.prisma.productType.create({
       data: {
        typeName: createDto.typeName,
        remark : createDto.remark,
        image: imageUrl
       }
      });
    }
  
    findAll() {
      return this.prisma.productType.findMany();
    }
  
    findOne(id: number) {
      return this.prisma.productType.findUnique({
        where: { id : id}
      });
    }
  
    update(id: number, UpdateCategoryDto: UpdateProductTypeDto) {
      return this.prisma.productType.update({
        where: { id : id },
        data : UpdateCategoryDto
      });
    }
  
    remove(id: number) {
      return this.prisma.productType.delete({
        where: { id : id }
      });
    }
}
