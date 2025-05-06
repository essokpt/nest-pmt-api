import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateStockDto {}

export class GenerateBarcodeDto{
  @IsString()
  @ApiProperty({
    example : 'Example1234',
    required : true
    })
  code:string

  @IsString()
  @ApiProperty({
    example : 'CODE128,CODE128A,CODE128B,EAN13,UPC,CODE39',
    required : true
    })
    format:string
  
 

}