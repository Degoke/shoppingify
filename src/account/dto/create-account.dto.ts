import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateAccountDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsStrongPassword()
    @IsNotEmpty()
    password: string
}