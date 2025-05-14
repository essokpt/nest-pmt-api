import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    required: true,
    type: "multipart/form-data",
    schema: {
      type: "object",
      properties: {
        files: {
          type: "array",
          items: {
            type: "string",
            format: "binary",
          }
        },
        string: {
          type: 'string'
        }
      },
    },
  })
  create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createProductDto: CreateProductDto
  ) {
    console.log('product image:', files ? files : null);
    //return `create product success.`
    return this.productService.create(createProductDto, files, createProductDto.categoryId, createProductDto.productTypeId);
  }

  @Post('upload/:productId')
  @UseInterceptors(FilesInterceptor("files"))
  @ApiOperation({ summary: "Upload multiple files." })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    required: true,
    type: "multipart/form-data",
    schema: {
      type: "object",
      properties: {
        files: {
          type: "array",
          items: {
            type: "string",
            format: "binary",
          }
        },
      },
    },
  })
  async uploadMultiFiles(
    @Param('productId') productId: number,
    @UploadedFiles() files: Express.Multer.File[]) {
    return await this.productService.uploadImages(+productId, files);
    // console.log('upload product images:', productId);
    // console.log('upload product images:', files? files[0].originalname : null);


    //return 'upload file completed'
  }

  @Get()
  findAll(
    @Query() params: any
  ) {
    console.log('query:', params);
    let catArray = null
    const filter = JSON.parse(params.s)
    catArray = filter?.$and[0].categoryId.$in

    if (catArray?.length > 0) {
    
      console.log('query:', catArray);
      return this.productService.findByCategories(catArray);

    } else {
      return this.productService.findAll();
    }
  }

  @Get('/productItem')
 async findProductItem(
    @Query() params: any
  ) {
    console.log('query:', params);
    let itemArray = null
    const filter = JSON.parse(params.s)
    itemArray = filter?.$and[0].code.$contL

    if (itemArray?.length > 0) {
    
      return await this.productService.searchProductItem(itemArray);
      //console.log('result:', result);

      
    } 
  }

  @Get('/searchProductItem/:code')
  async searchProductItem(
     @Param('code') code: string
   ) {
     console.log('search :', code);
    if(code){
      return await this.productService.findProductItem(code);

    }
     
       //console.log('result:', result);
 
    
   }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if(id) return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto, updateProductDto.categoryId, updateProductDto.productTypeId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Delete('image/:id')
  removeImage(@Param('id') name: string) {
    return this.productService.removeImage(name);
  }
}
