import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
  IsPhoneNumber,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  firstname: string;

  @IsString()
  @ApiProperty()
  lastname: string;

  @IsEmail(
    {},
    {
      message: 'Email invalid format.',
      // 'รูปแบบ Emailไม่ถูกต้อง'
    },
  )
  @IsOptional()
  @ApiPropertyOptional()
  email?: string;

  @IsNumber(
    {},
    {
      message: 'Require only number.',
      // 'ต้องเป็นตัวเลขเท่านั้น'
    },
  )
  @IsOptional()
  @ApiPropertyOptional()
  age?: number;

  tel?: string;

  isActive?: boolean;

  createdAt?: string;
}

export class ResponseCreateUserDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'User is first name', example: 'John' })
  firstname?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'User is last name', example: 'Doe' })
  lastname?: string;

  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional()
  email?: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  age?: number;

  @IsPhoneNumber()
  @IsOptional()
  @ApiPropertyOptional()
  tel?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  isActive?: boolean;
}
