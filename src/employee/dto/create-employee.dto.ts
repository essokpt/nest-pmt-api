import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsDateString, IsEmail, isEmail, IsNotEmpty, IsNumber, MinLength } from "class-validator"

export class CreateEmployeeDto {
  id       : number  
  
  @IsNotEmpty()
  @ApiProperty({
    example : 'string',
    required : true
  })
  employeeId  : string   

  @IsNotEmpty()
  @ApiProperty({
    example : 'string',
    required : true
  })
  firstName  : string  

  @ApiProperty({
    example : 'string',
    required : true
  })
  lastName  : string

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example : 'string',
    required : true
  })
  email     : string   

  @ApiProperty({
    example : 'string',
  })
  position  : string

  @ApiProperty({
    example : 'string',
  })
  department   : string

  @MinLength(10)
  @ApiProperty({
    example : 'number',
  })
  phoneNumber : string

  @ApiProperty({
    example : 'string',
  })
  image     : string

  @IsDateString()
  @ApiProperty({
    example : 'YYYY-MM-ddT0:00:00.000Z',
  })
  startDate : Date

  @IsDateString()
  @ApiProperty({
    example : 'YYYY-MM-ddT0:00:00.000Z',
  })
  birthDate  : Date

  @IsNumber()
  @ApiProperty({
    example : 'number',
  })
  age       : number

  @ApiProperty({
    example : 'string',
  })
  address   : string

  @ApiProperty({
    example : 'string',
  })
  education : string

  @ApiProperty({
    example : 'string',
  })
  status    : string

  createdAt : Date 

}
