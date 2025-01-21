import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string; // หรือใช้ email แทน

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  email?: string;
}