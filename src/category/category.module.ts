import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

@Module({
  imports: [PrismaModule,
    MulterModule.register({
        storage: diskStorage({     
          destination : join(__dirname, '../../../', '/web_files/product_category'),
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
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
