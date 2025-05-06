import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Product-Type')
@Controller('productType')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductTypeDto: CreateProductTypeDto) {
      const imageUrl = file? file.originalname : null

      return this.productTypeService.create(createProductTypeDto, imageUrl);
  }

  @Get()
  findAll() {
    return this.productTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductTypeDto: UpdateProductTypeDto) {
    return this.productTypeService.update(+id, updateProductTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productTypeService.remove(+id);
  }
}
