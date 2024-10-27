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

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  
  @IsEnum(Sex)
  sex: Sex;
  
  photo: any;

}
