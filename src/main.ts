import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('PMT Rest Api')
    .setDescription('api for pmt')
    .setVersion('1.0')
    .addTag('pmt')
    .build()
  
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe())
 
  //app.useStaticAssets(join(__dirname, '../', 'web_files'));
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
