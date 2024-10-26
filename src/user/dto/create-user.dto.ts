import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsEmail,
} from 'class-validator';

enum Sex {
  male = 'male',
  female = 'female',
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  photo: any;

  @IsNotEmpty()
  @IsString()
  birth_date: string;

  @IsEnum(Sex)
  sex: Sex;


}
