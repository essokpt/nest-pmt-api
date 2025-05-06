import { Module } from '@nestjs/common';
import { StoreTypeService } from './store-type.service';
import { StoreTypeController } from './store-type.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [ PrismaModule], 
  controllers: [StoreTypeController],
  providers: [StoreTypeService],
})
export class StoreTypeModule {}
