import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreateStockDto, GenerateBarcodeDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client'
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import * as _ from "lodash";
import { join } from 'path';
const QRCode = require('qrcode')
const path = require("path");
const fs = require('fs-extra');
const JsBarcode = require('jsbarcode');
const { Canvas } = require("canvas");

@Injectable()
export class StockService {
  constructor(private prisma: PrismaService) { }

  async create(createDto: Prisma.StockCreateInput[]) {
    let stockProduct = []
    if (createDto.length > 0) {
      stockProduct = createDto.map((item: any) => {
       // console.log('mfg', item.mfg);
        
        return {
          code: item.code,
          serialNumber: item.serialNumber,
          size: item.size,
          lot: item.lot,
          color: item.color,
          mfg: item.mfg,
          exp: item.exp,
          stockInValue: Number(item.quantity),
          stockOutValue: 0,
          quantity: Number(item.quantity),
          unit: item.unit,
          qrCodeUrl: `qrCode/${item.code}.png`,
          barCodeUrl: `barcode/${item.code}.png`,
          stockIn: {
            connect: { id: item.storeId }
          },
          product: {
            connect: { id: item.productId }
          }
        }
      })
    }
    await this.prisma.stock.create({
      data: {
        code: `#ST-${Date.now().toString()}`,
        stockBy: 'admin',
        noted: 'test',
        productItems: {
          create: stockProduct,
        },

      }
    });

    await this.AddProductQty(createDto)

    //create qr code
    createDto.map(async (item: any) => {
      await this.generateQrcode(item.code)
      await this.generateBarCode(item.code)
    })

    return {
      status: HttpStatus.OK,
      message: 'create stock success.',
    }
  }

  async AddProductQty(items: any[]) {
    if (items.length > 0) {
      const stock = _(items)
        .groupBy("productId")
        .map((items, productId) => ({
          productId: Number(productId),
          quantity: _.sumBy(items, "quantity"),
        }))
        .value();
      try {
        for (let index = 0; index < stock.length; index++) {
          const product: any = await this.prisma.product.findFirst({
            where: { id: stock[index].productId }
          })

          if (product.id) {
            console.log('update qty:', product.stockQuantity, stock[index].quantity);

            await this.prisma.product.update({
              where: { id: product.id },
              data: {
                status: 'Instock',
                stockQuantity: product.stockQuantity + Number(stock[index].quantity)
              }
            })
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('no data');
    }
  }

  async generateBarCode(barCode: string){
    const rootPath = join(__dirname, '../../../', 'web_files/barcode/');

    try {
      const canvas = new Canvas(100, 100, "image");
      JsBarcode(canvas, barCode, {format: "CODE128"}); 
      const img = canvas.toBuffer('image/png');
      const barcodeName = `${barCode}.png`
          if (!fs.existsSync(rootPath+barcodeName)) {
            console.log('save bar code to:', rootPath+barcodeName);
            
            fs.writeFileSync(rootPath+barcodeName, img);
          }
        } catch (err) {
          console.error(err);
          return err
        }
  }

  async generateQrcode(code: string) {
    try {
      const rootPath = join(__dirname, '../../../', 'web_files/qrCode');
      QRCode.toFile(`${rootPath}/${code}.png`, 'Encode this text in QR code', {
        errorCorrectionLevel: 'H'
      }, function (err) {
        if (err) throw err;
        console.log('QR code saved!');
      });
      //await QRCode.toFile('../../web_files/qrCode/foo.png', [{ data: code, mode: 'byte' }],)
    } catch (error) {
      console.log('generate qr error:', error);

    }
  }

  findAll() {
    return this.prisma.stock.findMany({
      include: {
        productItems: {
          include: {
            stockIn: true,
            product: {
              include:{
                images:true
              }
            }
          }
        }
      }
    });
  }

  findOne(id: number) {
    return this.prisma.stock.findUnique({
      where: { id: id },
      include: {
        productItems: {
          include: {
            stockIn: true,
            product: true,
          },
        }
      }
    });
  }

  update(id: number, updateDto: UpdateStockDto) {
    return this.prisma.stock.update({
      where: { id: id },
      data: updateDto
    });
  }

  remove(id: number) {
    return this.prisma.stock.delete({
      where: { id: id }
    });
  }
}

