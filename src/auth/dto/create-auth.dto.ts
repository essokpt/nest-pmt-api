import { ApiProperty } from "@nestjs/swagger"

export class CreateAuthDto {
    @ApiProperty({
        example : 'string',
        required : true
    })
    email : string

    @ApiProperty({
        example : 'string',
        required : true
    })
    password : string
}

export class LogoutDto {
    @ApiProperty({
        example : 'string',
        required : true
    })
    email : string

    
}
