import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsNotEmpty } from "class-validator"

export class CreateProjectDto {
    id       : number  
  
  @IsNotEmpty()
  @ApiProperty({
    example : 'string',
    required : true
  })
  projectNumber  : string   

  @IsNotEmpty()
  @ApiProperty({
    example : 'string',
    required : true
  })
  projectName  : string  

  @ApiProperty({
    example : 'string',
    required : false
  })
  description  : string

  
  @IsNotEmpty()
  @ApiProperty({
    example : 'number of customer id',
    required : true
  })
  customerId     : number   

  @ApiProperty({
    example : 'string',
  })
  contactNumber  : string

  @ApiProperty({
    example : 'string',
  })
  department : string
  
  @ApiProperty({
    example : 'string',
  })
  projectManager : string

  @IsDateString()
  @ApiProperty({
    example : 'YYYY-MM-ddT0:00:00.000Z',
  })
  startDate : Date

  @IsDateString()
  @ApiProperty({
    example : 'YYYY-MM-ddT0:00:00.000Z',
  })
  endDate  : Date

  @IsNotEmpty()
  @ApiProperty({
    example : 'day of warranty',
    required : true
  })
  warranty  : number  

  @ApiProperty({
    example : 'string',
  })
  status   : string

  createdAt : Date 
}
