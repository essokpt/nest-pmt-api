import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto, GenerateBarcodeDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import * as dpiTools from 'dpi-tools';
import { Response } from 'express';
const JsBarcode = require('jsbarcode');
const { Canvas } = require("canvas");


@ApiTags('Stock')
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) { }

  @Post('/generate-barcode')
  async createBarCode(@Body() barcodeDto:GenerateBarcodeDto, @Res() res: Response) {
    console.log('Generate barcode:', barcodeDto.code);

    const canvas = new Canvas(100, 100, "image");
    JsBarcode(canvas, barcodeDto.code, {format: barcodeDto.format}); 
   // const dataFile = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const img = canvas.toBuffer('image/png');
    const barcodeName = `${barcodeDto.code}.png`
    res.set({
      'Content-Type': 'application/file',
      'Content-Disposition': `attachment; filename="bardcode.png"`,
      
    })     

    
    return res.status(200).send(img) 
  }

  @Post()
  create(@Body() createStockDto: Prisma.StockCreateInput[]) {
    return this.stockService.create(createStockDto);
  }

  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(+id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(+id);
  }
}
