import { ApiProperty } from "@nestjs/swagger"
import { Prisma } from "@prisma/client"
import { IsNotEmpty } from "class-validator"

export class CreateStoreDto {
       id       : number  
      
      @ApiProperty({
        example : 'string',
        required : true
      })
      storeName  : string   
    
      @IsNotEmpty()
      @ApiProperty({
        example : 'string',
        required : false
      })
      description  : string  
    
        
      @ApiProperty({
        example : 'string',
      })
      status  : string
        
      @ApiProperty({
        example : 'string',
      })
      remark   : string

      // @ApiProperty({ required: false, nullable: true })
      // productItems?: Prisma.ProductItemCreateNestedManyWithoutProductInput
  
      @ApiProperty({ required: false, nullable: true })
      storeTypeId: number | null;
  
    
   
}
