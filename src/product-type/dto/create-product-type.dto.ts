import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateProductTypeDto {
    id: number

    @IsNotEmpty()
    @ApiProperty({
        example: 'string',
        required: false
    })
    typeName: string

    @ApiProperty({
        example: 'string',
        required: false
    })
    remark: string

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    file: Express.Multer.File

}
