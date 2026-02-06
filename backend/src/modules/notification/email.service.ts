import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as nodemailer from 'nodemailer'

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('email.host'),
      port: this.configService.get('email.port'),
      secure: false,
      auth: {
        user: this.configService.get('email.user'),
        pass: this.configService.get('email.pass'),
      },
    })
  }

  async sendEmail(to: string, subject: string, html: string): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: this.configService.get('email.user'),
        to,
        subject,
        html,
      })
      return true
    } catch (error) {
      console.error('Email sending failed:', error)
      throw new InternalServerErrorException('邮件发送失败')
    }
  }

  async sendVerificationCode(email: string, code: string): Promise<boolean> {
    const html = `
      <h2>验证码</h2>
      <p>您的验证码是：<strong>${code}</strong></p>
      <p>验证码有效期为10分钟，请勿泄露给他人。</p>
    `
    return this.sendEmail(email, '验证码', html)
  }

  async sendPasswordReset(email: string, resetLink: string): Promise<boolean> {
    const html = `
      <h2>密码重置</h2>
      <p>点击以下链接重置您的密码：</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      <p>链接有效期为30分钟。</p>
    `
    return this.sendEmail(email, '密码重置', html)
  }

  async sendLoginAlert(email: string, location: string, time: string): Promise<boolean> {
    const html = `
      <h2>登录提醒</h2>
      <p>检测到您的账户在新设备上登录：</p>
      <p>地点：${location}</p>
      <p>时间：${time}</p>
      <p>如果这不是您本人的操作，请立即修改密码。</p>
    `
    return this.sendEmail(email, '登录提醒', html)
  }

  async sendSystemAlert(email: string, alert: any): Promise<boolean> {
    const html = `
      <h2>系统告警</h2>
      <p><strong>告警类型：</strong>${alert.type}</p>
      <p><strong>告警内容：</strong>${alert.message}</p>
      <p><strong>告警时间：</strong>${alert.time}</p>
    `
    return this.sendEmail(email, '系统告警', html)
  }

  async sendReport(email: string, reportData: any): Promise<boolean> {
    const html = `
      <h2>${reportData.title}</h2>
      <p>报告时间：${reportData.date}</p>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        ${reportData.data.map((item: any) => `
          <tr>
            <td style="padding: 8px;">${item.label}</td>
            <td style="padding: 8px;">${item.value}</td>
          </tr>
        `).join('')}
      </table>
    `
    return this.sendEmail(email, reportData.title, html)
  }
}
