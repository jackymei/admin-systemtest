import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CreateDto, UpdateDto } from './dto/user.dto'

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: CreateDto) {
    return this.userService.create(dto)
  }

  @Get()
  async findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateDto) {
    return this.userService.update(id, dto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id)
  }
}
