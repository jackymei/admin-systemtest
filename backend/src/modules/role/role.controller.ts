import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { RoleService } from './role.service'

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() roleData: any) {
    return this.roleService.create(roleData)
  }

  @Get()
  async findAll() {
    return this.roleService.findAll()
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.roleService.findById(id)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() roleData: any) {
    return this.roleService.update(id, roleData)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.roleService.remove(id)
  }
}
