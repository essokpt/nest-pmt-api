import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { CreateCustomerDto } from "src/customer/dto/create-customer.dto"

export class CreateOrderDto {

       id       : number  
 

      @IsNotEmpty()
      @ApiProperty({
        example : 'string',
        required : true
      })
      code  : string  

      @ApiProperty({
        example : 'string',
        required : false
      })
      customerId : number  

      @ApiProperty({
        example : 'string',
        required : false
      })
      orderType : string  

      @ApiProperty({
        example : 'string',
        required : false
      })
      paymentType : string  

      @ApiProperty({
        example : 'string',
        required : false
      })
      discount : number  

      @ApiProperty({
        example : 'string',
        required : false
      })
      vat : number  

      @ApiProperty({
        example : 'string',
        required : false
      })
      grandTotal : number  

      @ApiProperty({
        example : 'string',
        required : false
      })
      status : string  

      @ApiProperty({
        example : 'string',
        required : false
      })
      orderItems : IOrderItem[]  

      @ApiProperty({
        example : 'string',
        required : false
      })
      createdAt : string  

      @ApiProperty({
        example : 'string',
        required : false
      })
      createBy : string  

      @ApiProperty({
        example : 'string',
        required : false
      })
      note : string  

      @ApiProperty({
        example : 'string',
        required : false
      })
      customer? : CreateCustomerDto
}

export interface IOrderItem {
    orderId : number 
    productId : number 
    productItemId : number 
    unit   :    String
    quantity : number
    price : number
    total     : number
    discount  : number
}
