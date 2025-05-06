import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EmployeeModule } from './employee/employee.module';
import { CompanyModule } from './company/company.module';
import { PrismaModule } from 'prisma/prisma.module';
import { FileManagerModule } from './file-manager/file-manager.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CustomerModule } from './customer/customer.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { StoreModule } from './store/store.module';
import { StoreTypeModule } from './store-type/store-type.module';
import { VenderModule } from './vender/vender.module';
import { StockModule } from './stock/stock.module';
import { ProductTypeModule } from './product-type/product-type.module';
import { OrderModule } from './order/order.module';

@Module({
  imports : [ 
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'web_files'),
    }),
    UserModule, ProjectModule, AuthModule, EmployeeModule, CompanyModule,PrismaModule, FileManagerModule, CustomerModule, CategoryModule, ProductModule, StoreModule, StoreTypeModule, VenderModule, StockModule, ProductTypeModule, OrderModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
