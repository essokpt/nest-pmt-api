import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma, Product } from '@prisma/client'


@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  async create(createProduct: Prisma.ProductCreateInput, files: Array<Express.Multer.File>, categoryId: number, productTypeId: number) {
    console.log("create product:", createProduct);
    // const CategoryWhereUniqueInput:Prisma.ProductUncheckedCreateInput;
    let product_image = []
    if (files.length > 0) {
      product_image = files.map((item) => {
        return {
          name: item.originalname,
          url: '/product_images',
          type: item.mimetype
        }
      })
    }

    return this.prisma.product.create({
      data: {
        model: createProduct.model,
        brand: createProduct.brand,
        productName: createProduct.productName,
        description: createProduct.description,
        price: Number(createProduct.price),
        sellingPrice: Number(createProduct.sellingPrice),
        size: createProduct.size,
        weight: Number(createProduct.weight),
        stockQuantity: 0,
        status: createProduct.status,
        remark: createProduct.remark,
      
        images: {
          create: product_image

        },
        category: { connect: { id: Number(categoryId) } },
        productType: { connect: { id: Number(productTypeId) } },
       
      }

    });
  }

  uploadImages(productId: number, files: Array<Express.Multer.File>) {
    let product_image = []
    if ((files.length > 0) && (productId != null)) {
      product_image = files.map((item) => {
        return {
          productId: productId,
          name: item.originalname,
          url: '/product_images',
          type: item.mimetype
        }
      })
    }
    return this.prisma.productImage.createMany({
      data: product_image
    })
  }

  findAll() {
    return this.prisma.product.findMany({
      include: {
        category: true,
        images: true,
        productItems: {
          include: {
            stockIn: true
          }
        }
      }
    });
  }

  findByCategories(catArray: any) {
    return this.prisma.product.findMany({
      where: {
        AND: [
          {
            categoryId: {
              in: catArray
            }
          }
        ]
      },
      include: {
        category: true,
        images: true
      }
    });
  }

  async searchProductItem(data: string) {
    return await this.prisma.productItem.findMany({
      where: {
        AND: [
          {
            code: {
              contains: data
            }
          }
        ]
      },
    });

  }

  async findProductItem(data: string) {
    const item = await this.prisma.productItem.findFirst({
      where: {
        code: data
      }

    },     
  );


  if(item) {
    return await this.prisma.product.findFirst({
      where: { id: Number(item.productId) },
      include: {
        productItems: {
          where: { code: data }
        },
        images: true
      }
    })

  }else{
  console.log('not found product item:', data);
  return {
    status: HttpStatus.BAD_REQUEST,
    message: 'not found product item.',
    data: []
  }


}
}


findOne(id: number) {
  if(id){
  return this.prisma.product.findUnique({
    where: { id: id },
    include: {
      category: true,
      images: true,
      productItems: {
        include: {
          stockIn: true
        }
      }
    }
  });
}else{
  return {
    status: HttpStatus.BAD_REQUEST,
    message: 'not found product id.',
    
  }
}
}

update(id: number, updateProductDto: Prisma.ProductUpdateInput, categoryId: number, productTypeId: number) {
  return this.prisma.product.update({
    where: { id: id },
    data: {
      model: updateProductDto.model,
      brand: updateProductDto.brand,
      productName: updateProductDto.productName,
      description: updateProductDto.description,
      price: Number(updateProductDto.price),
      sellingPrice: Number(updateProductDto.sellingPrice),
      size: updateProductDto.size,
      weight: Number(updateProductDto.weight),
      status: updateProductDto.status,
      remark: updateProductDto.remark,
      category: { connect: { id: Number(categoryId) } },
      productType: { connect: { id: Number(productTypeId) } }
    },

  });
}

remove(id: number) {
  return this.prisma.product.delete({
    where: { id: id }
  });
}
}
