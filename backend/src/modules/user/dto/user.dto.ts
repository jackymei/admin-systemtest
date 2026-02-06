import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone: string

  @ApiProperty({ required: false, isArray: true })
  @IsOptional()
  roles: string[]
}

export class UpdateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  password: string

  @ApiProperty({ required: false, isArray: true })
  @IsOptional()
  roles: string[]
}
