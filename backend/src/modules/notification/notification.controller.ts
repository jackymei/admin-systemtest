import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { EmailService } from './email.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly emailService: EmailService,
  ) {}

  @Get()
  async findAll(@Query() query: any) {
    return this.notificationService.findAll(query)
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.notificationService.findById(id)
  }

  @Put(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(id)
  }

  @Put('read-all')
  async markAllAsRead(@Body('userId') userId: string) {
    return this.notificationService.markAllAsRead(userId)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.notificationService.remove(id)
  }

  @Post('test-email')
  async sendTestEmail(@Body('to') to: string) {
    const html = '<h2>测试邮件</h2><p>这是一封测试邮件。</p>'
    return this.emailService.sendEmail(to, '测试邮件', html)
  }
}
