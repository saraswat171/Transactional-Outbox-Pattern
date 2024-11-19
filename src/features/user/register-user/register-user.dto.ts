// src/users/dto/register-user.dto.ts
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

}