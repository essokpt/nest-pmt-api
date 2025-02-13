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

@Module({
  imports : [ 
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', 'web_files'),
    }),
    UserModule, ProjectModule, AuthModule, EmployeeModule, CompanyModule,PrismaModule, FileManagerModule, CustomerModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
