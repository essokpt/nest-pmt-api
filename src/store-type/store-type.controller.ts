import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoreTypeService } from './store-type.service';
import { CreateStoreTypeDto } from './dto/create-store-type.dto';
import { UpdateStoreTypeDto } from './dto/update-store-type.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Store-Type')
@Controller('store-type')
export class StoreTypeController {
  constructor(private readonly storeTypeService: StoreTypeService) {}

  @Post()
  create(@Body() createStoreTypeDto: CreateStoreTypeDto) {
    return this.storeTypeService.create(createStoreTypeDto);
  }

  @Get()
  findAll() {
    return this.storeTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreTypeDto: UpdateStoreTypeDto) {
    return this.storeTypeService.update(+id, updateStoreTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeTypeService.remove(+id);
  }
}
