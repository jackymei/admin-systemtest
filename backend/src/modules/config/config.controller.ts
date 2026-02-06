import { Controller, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common'
import { ConfigService } from './config.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('config')
@UseGuards(JwtAuthGuard)
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  async findAll() {
    return this.configService.findAll()
  }

  @Get('basic')
  async getBasicConfig() {
    return this.configService.findByPrefix('basic')
  }

  @Get('feature')
  async getFeatureConfig() {
    return this.configService.findByPrefix('feature')
  }

  @Put('basic')
  async updateBasicConfig(@Body() configs: Record<string, any>) {
    const updated = await this.configService.updateBatch(configs)
    return { success: true, count: updated.length }
  }

  @Put('feature')
  async updateFeatureConfig(@Body() configs: Record<string, any>) {
    const updated = await this.configService.updateBatch(configs)
    return { success: true, count: updated.length }
  }

  @Put('cache/clear')
  async clearCache() {
    return { success: true }
  }
}
