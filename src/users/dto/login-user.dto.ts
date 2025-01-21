import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  username: string; // หรือใช้ email แทน

  @IsString()
  @IsNotEmpty()
  password: string;
}
