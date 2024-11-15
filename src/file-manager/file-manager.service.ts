import { HttpStatus, Injectable, StreamableFile, UploadedFile } from '@nestjs/common';
import { CreateFileManagerDto } from './dto/create-file-manager.dto';
import { UpdateFileManagerDto } from './dto/update-file-manager.dto';
const fs = require('fs');
import { join } from 'path';
import { createReadStream } from 'fs';

const rootPath = join(__dirname, '../../../', 'web_files');

@Injectable()
export class FileManagerService {
  checkFile(file:string){
    return fs.lstatSync(file).isDirectory()
  }

  createDirectory( path: string) {
    try {
      if (!fs.existsSync(rootPath+path)) {
        fs.mkdirSync(rootPath+path);
        return  {
          status: HttpStatus.OK,
          message: 'create directory success.',
        }
      }
    } catch (err) {
      console.error(err);
      return err
    }

  }

  uploadSingleFile( file: string){
    return  {
      status: HttpStatus.OK,
      message: `Upload file: ${Buffer.from(file, 'latin1').toString('utf8')} success.`
    }
  }

  uploadMultieFile( path: string){
    return  {
      status: HttpStatus.OK,
      message: `Upload multi file to: ${path} success.`
    }
  }

  getLits(path: string) {   
    console.log('file path',rootPath+"/"+path );
    let filepath = rootPath;
    if(path){
      filepath = rootPath+path;
    }   
    
    try {
      const fileLists = fs.readdirSync(filepath);   
     let files = [];
     
     for (let index = 0; index < fileLists.length; index++) {
      const element = {
        id: index,
        filename : fileLists[index],
        path : path,
        isDir : fs.lstatSync(filepath+'/'+fileLists[index]).isDirectory()
      }

      files.push(element)
      
     }      
      return  files;
    } catch (error) {
      return error
      
    }    
  }

  readFile(filepath: string) {
    return fs.readFileSync( filepath, 'utf8');
  }

  downloadFile(path: string) {
    try {
      const filepath = rootPath+path
      console.log('downloadFile path:',filepath );
      if (fs.existsSync(filepath)) {  
        const file = createReadStream(filepath);           
        return new StreamableFile(file, {
          type: '*',
          disposition: `attachment; filename=${encodeURI(path)}`,
        });     
       
      }
      return  {
        status: HttpStatus.BAD_REQUEST,
        message: `not found directory:${filepath}`,
      }    
    } catch (err) {
      console.error(err);
      return err
    }   
  }

  update(id: number, updateFileManagerDto: UpdateFileManagerDto) {
    return `This action updates a #${id} fileManager`;
  }

  removeDirectory(directory: string) {
    try {
      if (fs.existsSync(rootPath+directory)) {
        fs.rm(rootPath+directory, { recursive: true, force: true }, err => {
          if (err) {
            throw err;
          }
          console.log(`${directory} is deleted!`);
          return  {
            status: HttpStatus.OK,
            message: `${directory} is deleted!`,
          }            
        });      
      }
      return  {
        status: HttpStatus.BAD_REQUEST,
        message: `not found directory:${rootPath+directory}`,
      }    
    } catch (err) {
      console.error(err);
      return err
    }   
  }

  removeFile(file: string) {
    try {
      if (fs.existsSync(rootPath+file)) {
        fs.unlink(rootPath+file, err => {
          if (err) {
            throw err;
          }
          console.log(`${file} is deleted!`);
               
        }); 
        return  {
          status: HttpStatus.OK,
          message: `${file} is deleted!`,
        }           
      }
      console.log(`not found file:${rootPath+file}`);
      return  {
        status: HttpStatus.BAD_REQUEST,
        message: `not found file:${rootPath+file}`,
      }    
    } catch (err) {
      console.error(err);
      return  {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `internal error:${err}`,
      }    
    }   
  }
}
