import { HttpStatus, Injectable, Response, StreamableFile } from '@nestjs/common';
import { join } from 'path';
import { createReadStream } from 'fs';
import { RenameDirectoryDto } from './dto/create-file-manager.dto';

const AdmZip = require('adm-zip')
const path = require("path");
const fs = require('fs-extra');
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

  async downloadMultiFile(filePath: []) {
    try {
     // const zip = new JSZip();
      const admZip = new AdmZip();
     console.log('zip file:', rootPath+filePath);
     
      filePath.forEach(element => {
        const fileName = path.basename(rootPath+element);
        if (!fs.lstatSync(rootPath+element).isDirectory()) {
          const fileContent = fs.readFileSync(rootPath+element);
          admZip.addFile(fileName, fileContent);
         
        }else{          
          admZip.addLocalFolder(rootPath+element, `/${fileName}`);
          //console.log('zip a folder:',rootPath+element);          
        }
      });
      return admZip.toBuffer();

      
    } catch (err) {
      console.error(err);
      return  {
        status: HttpStatus.BAD_REQUEST,
        message: `Request error:${err}`,
      }    
    }    
  }

  async downloadFolder(dirPath: string) {
    try {     
      console.log('download path:',rootPath+dirPath);
      const admZip = new AdmZip();    
      const dirName = path.basename(rootPath+dirPath);
      if (fs.lstatSync(rootPath+dirPath).isDirectory()) {
        admZip.addLocalFolder(rootPath+dirPath, `/${dirName}`);
        return  admZip.toBuffer();
    
      }
     
    } catch (err) {
      console.error(err);
      return  {
        status: HttpStatus.BAD_REQUEST,
        message: `no such file or directory:${err}`,
      }    
    }    
  }

  renameDir(directory: RenameDirectoryDto) {
    try {
      fs.renameSync(rootPath+directory.oldDirectoryName, rootPath+directory.newDirectoryName);
   
      console.log(`${directory} is rename!`);
      return  {
        status: HttpStatus.OK,
        message: `${directory.oldDirectoryName} is rename to ${directory.newDirectoryName} completed.`,
      }                 
    } catch (err) {
      console.error(err);
      return  {
        status: HttpStatus.BAD_REQUEST,
        message: `not found directory:${err}`,
      }    
    }   
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

  removeAllFileOrDirectory(file: []) {          
    try {
      file.forEach(element => {
        if (!fs.lstatSync(rootPath+element).isDirectory()) {
          fs.unlink(rootPath+element, err => {
            if (err) {
              throw err;
            }
            console.log(`${rootPath+element} :file is deleted!`);                
          }); 
                  
        }else{
          fs.rm(rootPath+element, { recursive: true, force: true }, err => {
            if (err) {
              throw err;
            }
            console.log(`${element} : directory is deleted!`);
                  
          });      
        }
      });

      // console.log(`not found file:${rootPath+file}`);
      return  {
        status: HttpStatus.OK,
        message: `delete all file or directory completed!`,
      }    
    } catch (err) {
      console.error(err);
      return  {
        status: HttpStatus.BAD_REQUEST,
        message: `Request error:${err}`,
      }    
    }   
   
  }
}
