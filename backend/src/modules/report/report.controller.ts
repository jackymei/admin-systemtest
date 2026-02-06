import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ReportService } from './report.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('stats')
  async getStats() {
    return this.reportService.getDashboardStats()
  }

  @Get('trend')
  async getTrend(@Query('days') days: string) {
    return this.reportService.getTrendData(parseInt(days) || 30)
  }

  @Get('distribution')
  async getDistribution() {
    return this.reportService.getUserDistribution()
  }

  @Get('generate')
  async generateReport(@Query('type') type: 'daily' | 'weekly' | 'monthly') {
    return this.reportService.generateReport(type || 'daily')
  }
}
