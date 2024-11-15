import { UploadedFiles } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UploadFileDto{
  @IsString()
  @ApiProperty({
    example : 'input path to upload',
    required : true
    })
    path:string

}

export class CreateDirectoryDto{
  @IsString()
  @ApiProperty({
    example : 'input new directory',
    required : true
    })
    directoryName:string

}

export class CreateFileManagerDto {
    @ApiProperty({
        description: 'Description of the image',
        type: 'array',
        items: {
          type: 'file',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      })
      //@IsString()
    description: string;
    
    @ApiProperty({
    description: 'Image file',
    type: 'string',
    format: 'binary',
    })
    file: any;
}
