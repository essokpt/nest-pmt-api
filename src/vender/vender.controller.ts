import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VenderService } from './vender.service';
import { CreateVenderDto } from './dto/create-vender.dto';
import { UpdateVenderDto } from './dto/update-vender.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('vender')
@ApiTags('Vender')

export class VenderController {
  constructor(private readonly venderService: VenderService) {}

  @Post()
  create(@Body() createVenderDto: CreateVenderDto) {
    return this.venderService.create(createVenderDto);
  }

  @Get()
  findAll() {
    return this.venderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVenderDto: UpdateVenderDto) {
    return this.venderService.update(+id, updateVenderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venderService.remove(+id);
  }
}
