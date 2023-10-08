import { IsEmail, IsNotEmpty, Min, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @MinLength(3)
    firstname: string;

    @IsNotEmpty()
    @MinLength(3)
    lastname: string;

    @IsNotEmpty()
    mobile: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(5)
    password: string;
}