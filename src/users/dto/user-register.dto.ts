import { IsEmail, IsString } from "class-validator";

export class UserRegisterDto {
  @IsString({ message: "Username is not a string" })
  name: string;
  @IsString({ message: "Password is not valid" })
  password: string;
  @IsEmail({}, { message: "Email is not valid" })
  email: string;
}
