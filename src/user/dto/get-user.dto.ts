import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
  IsPhoneNumber,
  IsBoolean,
} from 'class-validator';

export class GetUserDto {
  @IsString()
  @ApiProperty()
  firstname: string;

  @IsString()
  @ApiProperty()
  lastname: string;

  @IsEmail({}, { message: 'Email invalid format.' })
  @IsOptional()
  @ApiPropertyOptional()
  email?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @ApiPropertyOptional()
  age?: number;
}

export class ResponseGetUserDto {
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
