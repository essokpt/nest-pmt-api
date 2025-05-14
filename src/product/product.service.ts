import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma, Product } from '@prisma/client'
import { join } from 'path';

const fs = require('fs-extra');
const rootPath = join(__dirname, '../../../', 'web_files/product_images/');

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
        status: "New",
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
      include:{
        product:true
      }
    });

  }

  async findProductItem(data: string) {
    const item = await this.prisma.productItem.findFirst({
      where: {
        code: data
      }

    },
    );


    if (item) {
      return await this.prisma.product.findFirst({
        where: { id: Number(item.productId) },
        include: {
          productItems: {
            where: { code: data }
          },
          images: true
        }
      })

    } else {
      console.log('not found product item:', data);
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'not found product item.',
        data: []
      }


    }
  }


  findOne(id: number) {
    if (id) {
      return this.prisma.product.findUnique({
        where: { id: id },
        include: {
          category: true,
          images: true,
          productItems: {
            include: {
              stockIn: true,
              product: {
                include: {
                  images: true
                }
              }
            }
          }
        }
      });
    } else {
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

  async removeImage(name: string) {
    const image = await this.prisma.productImage.findFirst({
      where: { name: name },
    });
    if (!image) {
      throw new Error(`No product image found with that ID and name: ${image.name}`);
    }

    // 2. Delete by the primary key
    try {
      const imageData = await this.prisma.productImage.delete({
        where: { id: image.id },
      });
      if (fs.existsSync(rootPath + image.name)) {
        fs.unlink(rootPath + image.name, err => {
          if (err) {
            console.log(`cannot delete ${image.name} !`);

          }
          console.log(`${image.name} is deleted!`);

        });
         return {
        status: HttpStatus.OK,
        message: `delete product image success.`,
        data : imageData
      }

      }
      console.log(`not found file:${rootPath + image.name}`);
      return {
        status: HttpStatus.BAD_REQUEST,
        message: `not found file:${rootPath + image.name}`,
      }
    } catch (err) {
      console.error(err);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `internal error:${err}`,
      }
    }

  }
}
