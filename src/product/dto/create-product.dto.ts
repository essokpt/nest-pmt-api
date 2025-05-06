import { ParseFloatPipe, ParseIntPipe } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { Prisma } from "@prisma/client"
import { IsNotEmpty } from "class-validator"
import { Interface } from "readline"

export interface IProductItem { 
    id: number
    code : string
    productId : number

}

export class CreateProductDto {
    id: number
 
    @IsNotEmpty()
    @ApiProperty({
        example: 'string',
        required: true
    })
    productName: string

    @ApiProperty({
        example: 'string',
        required: false
    })
    model: string

    @ApiProperty({
        example: 'string',
        required: false
    })
    brand: string

    @ApiProperty({
        example: 'string',
        required: false
    })
    description: string

    @ApiProperty({
        example: 'number',
        required: false
    })
    price: number

    @ApiProperty({
        example: 'number',
        required: false
    })
    sellingPrice: number

    @ApiProperty({
        example: 'string',
        required: false
    })
    size: string

    @ApiProperty({
        example: 'number',
        required: false
    })
    weight: number

    @ApiProperty({
        example: 'string',
        required: false
    })
    status: string
      
    @ApiProperty({ required: false, nullable: true })
    images?: Prisma.ProductImageCreateNestedManyWithoutProductInput

    @ApiProperty({ required: false, nullable: true })
    //productItems: [] | null;
    productItems?: Prisma.ProductItemCreateNestedManyWithoutProductInput

    @ApiProperty({ required: false, nullable: true })
    //productItems: [] | null;
    category: Prisma.CategoryCreateNestedOneWithoutProductsInput

    @ApiProperty({ required: false, nullable: true })
    categoryId: number;

    @ApiProperty({ required: false, nullable: true })
    productTypeId: number;

    @ApiProperty({
        example: 'string',
        required: false
    })
    remark: string
     

    // @ApiProperty({ type: 'array', format: 'binary', required: false })
    // files: Express.Multer.File
}

