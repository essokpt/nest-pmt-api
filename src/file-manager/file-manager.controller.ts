import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, HttpStatus, Res, StreamableFile, Req, Request, Query } from '@nestjs/common';
import { FileManagerService } from './file-manager.service';
import { CreateDirectoryDto, CreateFileManagerDto, RenameDirectoryDto } from './dto/create-file-manager.dto';
import { UpdateFileManagerDto } from './dto/update-file-manager.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiProperty, ApiResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';


@ApiTags('file manager')
@Controller('fileManager')
export class FileManagerController {
  constructor(private readonly fileManagerService: FileManagerService) {}

  
  @Post('/create-directory')
  create(@Body() path: CreateDirectoryDto) {
    return this.fileManagerService.createDirectory(path.directoryName);
  }

  @Post('/uploadSingleFile:path')
  @UseInterceptors( FileInterceptor("file"))
  @ApiBody({
    required: true,
    type: "multipart/form-data",
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @ApiConsumes("multipart/form-data")
  async uploadSingleFile( 
    @Param('path') path:string,
    @UploadedFile() file: Express.Multer.File,
    ){
      console.log('uploadSingleFile',path);
      return await this.fileManagerService.uploadSingleFile(file.originalname);
  }

  @Post('uploadMultiFiles:path')
  @UseInterceptors(FilesInterceptor("files"))
  @ApiOperation({ summary: "Upload multiple files."})
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    required: true,
    type: "multipart/form-data",
    schema: {
      type: "object",
      properties: {
        files: {
          type: "array",
          items: {
            type: "string",
            format: "binary",
          }
        },
        string:{
          type: 'string'
        }
      },
    },
  })
  async uploadMultiFiles(
    @Param('path') path:string,
    @UploadedFiles() files: Express.Multer.File[]) {
    return await this.fileManagerService.uploadMultieFile(path);
  }

  @Get('/download-File:filepath')
  getFile(@Param('filepath') filepath: string) {
    return this.fileManagerService.downloadFile(filepath)  
  }

  @Get('/download-folder:path')
  async downloadFolder(@Param('path') path: string, @Res() res: Response) {   
    const file =  await this.fileManagerService.downloadFolder(path) 
    if(file.status == 400){
      return res.status(400).send(file.message)
    }
      res.set({
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="download.zip"`,
        
      })     
      return res.status(200).send(file) 
  }

  @ApiBody({
    isArray: true,
    type: 'array',
    })
  @Patch('/download-multiFile')
  async downloadMultiFile(@Body() filepath: [], @Res() res: Response){
    const file = await this.fileManagerService.downloadMultiFile(filepath) 
  // console.log('file lenght:', file.size);
    
    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="download.zip"`,
      
    })
   
    return res.status(200).send(file)
  }

  @Patch('/rename-folder')
  async renameFolder(@Body() renameDir: RenameDirectoryDto,){
    return this.fileManagerService.renameDir(renameDir)
  }

  @Get('/fileList:path')
  getFileLists(@Param('path') path:string) {
    return this.fileManagerService.getLits(path);
  }
 
  @Delete('/delete-directory:directory')
  removeDirectory(@Param('directory') directory: string) {
    return this.fileManagerService.removeDirectory(directory);
  }

  @Delete('/delete-file:file')
  removeFile(@Param('file') file: string) {
    return this.fileManagerService.removeFile(file);
  }

  @ApiBody({
    isArray: true,
    type: 'array',
    })
  @Delete('/delete-all')
  removeAll(@Body() file:[]) {
    return this.fileManagerService.removeAllFileOrDirectory(file);
  }

 
}
