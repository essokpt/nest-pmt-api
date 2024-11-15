import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class CreateUserDto {
    id: number;

    @ApiProperty({
        example : 'string',
        required : true
    })
    userName : string;

    @ApiProperty({
        example : 'string',
        required : true
    })
    password : string;

    @ApiProperty({
        example : 'admin@email.com',
        required : true
    })
    @IsEmail()
    email : string;

    @ApiProperty({
        example : 'string',
        required : true
    })
    status : string;

    // @ApiProperty({ example: "string"})
    // token : string;

}
