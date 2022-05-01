import { IsEmail, IsString } from "class-validator";

export class UserLoginDto {
  @IsString({ message: "Password is not valid" })
  password: string;
  @IsEmail({}, { message: "Email is not valid" })
  email: string;
}
