import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'prisma/prisma.module';
import multer, { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';

@Module({
  imports: [PrismaModule,
     MulterModule.register({
            storage: diskStorage({     
              destination : join(__dirname, '../../../', '/web_files/product_images'),
              // destination: (req, file, cb) => {
              //   const dest = join(__dirname, '../../../', '/web_files/product_category')
              //   console.log(`upload file to -> ${dest}`);        
              //   const dir = `${dest}`;
              //   cb(null, dir);
              // },
              filename: (req, file, cb) => {        
                const filename = `${Buffer.from(file.originalname, 'latin1').toString('utf8')}`
                cb(null, filename);
              },
            }),
          }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
