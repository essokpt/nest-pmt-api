import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateVenderDto {
    id       : number  
      
    @ApiProperty({
    example : 'string',
    required : true
    })
    engName  : string   

    @IsNotEmpty()
    @ApiProperty({
    example : 'string',
    required : true
    })
    thaiName  : string  

    @ApiProperty({
    example : 'string',
    required : false
    })
    shrotName  : string  

    @ApiProperty({
    example : 'string',
    required : false
    })
    address  : string  

    @ApiProperty({
    example : 'string',
    required : false
    })
    subdistrict  : string  

    @ApiProperty({
    example : 'string',
    required : false
    })
    district  : string  

    @ApiProperty({
    example : 'string',
    required : false
    })
    province  : string  

    @ApiProperty({
    example : 'string',
    required : false
    })
    zipcode  : string  

    @ApiProperty({
    example : 'string',
    required : false
    })
    taxId  : string  

    @ApiProperty({
    example : 'string',
    required : false
    })
    phone  : string  

    @ApiProperty({
    example : 'string',
    required : false
    })
    description  : string    
    
    
    @ApiProperty({
    example : 'string',
    })
    contactName  : string

    @ApiProperty({
    example : 'string',
    })
    remark   : string

}
