import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsOptional()
  @IsString()
  phone: string

  @IsOptional()
  roles: string[]
}

export class UpdateDto {
  @IsOptional()
  @IsEmail()
  email: string

  @IsOptional()
  @IsString()
  phone: string

  @IsOptional()
  @IsString()
  password: string

  @IsOptional()
  roles: string[]
}
