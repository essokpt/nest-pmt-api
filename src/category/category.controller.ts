import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('category')
@ApiTags('Categories')

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
 

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCategory: CreateCategoryDto,
   
  ) {
    console.log("Create category:", createCategory.name);
    console.log("Create category image:", file);
    const imageUrl = file? file.originalname : null
    return this.categoryService.create(createCategory, imageUrl);

    //return "create success"
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor("file"))
   @ApiBody({
     required: true,
     type: "multipart/form-data",
     schema: {
       type: "object",
       properties: {
         file: {
           type: "string",
           format: "binary",
         },
       },
     },
   })
   @ApiConsumes("multipart/form-data")
   async uploadFile( 
     @UploadedFile() file: Express.Multer.File,
     ){
       console.log('Upload category image success:', file.originalname);
       return file.originalname;
   }


  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
