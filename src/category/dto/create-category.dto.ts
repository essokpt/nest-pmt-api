import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateCategoryDto {
    id: number

    @IsNotEmpty()
    @ApiProperty({
        example: 'string',
        required: false
    })
    productTypeId: number

    @IsNotEmpty()
    @ApiProperty({
        example: 'string',
        required: false
    })
    name: string

    @ApiProperty({
        example: 'string',
        required: false
    })
    remark: string

    // @ApiProperty({
    //     example: 'string',
    //     required: false
    // })
    // iconUrl: string

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    file: Express.Multer.File

}
