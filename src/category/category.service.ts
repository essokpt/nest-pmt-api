import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
   constructor(private prisma: PrismaService){}

  create(createCategory: CreateCategoryDto, imageUrl:string) {
      console.log('category image :', createCategory);    
      return this.prisma.category.create({
       data: {
        productTypeId: Number(createCategory.productTypeId),
        name: createCategory.name,
        remark : createCategory.remark,
        iconUrl: imageUrl
       }
      });
    }
  
    findAll() {
      return this.prisma.category.findMany({
        include: {
          productType: true
        }
      });
    }
  
    findOne(id: number) {
      return this.prisma.category.findUnique({
        where: { id : id}
      });
    }
  
    update(id: number, UpdateCategoryDto: UpdateCategoryDto) {
      return this.prisma.category.update({
        where: { id : id },
        data : UpdateCategoryDto
      });
    }
  
    remove(id: number) {
      return this.prisma.category.delete({
        where: { id : id }
      });
    }
}
