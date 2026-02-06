import { Controller, Get, Delete, Query, UseGuards } from '@nestjs/common'
import { OperLogService } from './oper-log.service'
import { LoginLogService } from './login-log.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('logs')
@UseGuards(JwtAuthGuard)
export class LogController {
  constructor(
    private readonly operLogService: OperLogService,
    private readonly loginLogService: LoginLogService,
  ) {}

  @Get('oper')
  async getOperLogs(@Query() query: any) {
    return this.operLogService.findAll(query)
  }

  @Get('login')
  async getLoginLogs(@Query() query: any) {
    return this.loginLogService.findAll(query)
  }

  @Delete('cleanup')
  async cleanup(@Query('days') days: string) {
    const operDeleted = await this.operLogService.cleanup(parseInt(days) || 30)
    const loginDeleted = await this.loginLogService.cleanup(parseInt(days) || 90)
    return {
      success: true,
      operDeleted,
      loginDeleted,
    }
  }
}
