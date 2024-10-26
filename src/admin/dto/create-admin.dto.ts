import { IsNotEmpty, IsString, IsEnum, IsArray, IsPhoneNumber } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('UZ')
  phone: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  photo: any;
}
