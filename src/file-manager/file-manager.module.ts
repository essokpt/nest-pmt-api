import { Module } from '@nestjs/common';
import { FileManagerService } from './file-manager.service';
import { FileManagerController } from './file-manager.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports : [ MulterModule.register({
    storage: diskStorage({     
      
      destination: (req, file, cb) => {
        const dest = './web_files/'
        console.log(`upload file to -> ${dest+req.params.path}`);        
        const dir = `${dest+req.params.path}`;
        cb(null, dir);
      },
      filename: (req, file, cb) => {        
        const filename = `${Buffer.from(file.originalname, 'latin1').toString('utf8')}`
        cb(null, filename);
      },
    }),
  }),
],
  controllers: [FileManagerController],
  providers: [FileManagerService],
})
export class FileManagerModule {}
