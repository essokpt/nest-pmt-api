import { ApiProperty } from "@nestjs/swagger";

export class CreateStoreTypeDto {

    @ApiProperty({
        example: 'string',
        required: false
    })
    typeName: string

    @ApiProperty({
        example: 'string',
        required: false
    })
    description: string

    @ApiProperty({
        example: 'string',
        required: false
    })
    remark: string
}
