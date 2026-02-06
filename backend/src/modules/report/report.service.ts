import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from '../user/schemas/user.schema'
import { LoginLog, LoginLogDocument } from '../log/schemas/login-log.schema'

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(LoginLog.name) private loginLogModel: Model<LoginLogDocument>,
  ) {}

  async getDashboardStats() {
    const totalUsers = await this.userModel.countDocuments({ status: 'active' }).exec()
    const todayVisits = await this.loginLogModel.countDocuments({
      createdAt: { $gte: this.getTodayStart() },
    }).exec()
    const onlineUsers = Math.floor(totalUsers * 0.1)
    const totalMessages = 0

    return {
      totalUsers,
      todayVisits,
      onlineUsers,
      totalMessages,
    }
  }

  async getTrendData(days: number = 30) {
    const data: any[] = []
    const now = new Date()

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      const dayStart = new Date(dateStr + 'T00:00:00.000Z')
      const dayEnd = new Date(dateStr + 'T23:59:59.999Z')

      const visits = await this.loginLogModel.countDocuments({
        createdAt: { $gte: dayStart, $lte: dayEnd },
      }).exec()

      data.push({
        date: dateStr,
        visits,
      })
    }

    return data
  }

  async getUserDistribution() {
    const users = await this.userModel.aggregate([
      { $match: { status: 'active' } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]).exec()

    return users.map((item) => ({
      value: item.count,
      name: item._id === 'active' ? '活跃用户' : '其他用户',
    }))
  }

  async generateReport(type: 'daily' | 'weekly' | 'monthly', date?: Date) {
    const reportDate = date || new Date()
    let startDate: Date, endDate: Date

    if (type === 'daily') {
      startDate = this.getTodayStart()
      endDate = new Date()
    } else if (type === 'weekly') {
      startDate = new Date(reportDate)
      startDate.setDate(startDate.getDate() - 7)
      endDate = new Date()
    } else {
      startDate = new Date(reportDate.getFullYear(), reportDate.getMonth(), 1)
      endDate = new Date(reportDate.getFullYear(), reportDate.getMonth() + 1, 0)
    }

    const stats = await this.getDashboardStats()
    const trends = await this.getTrendData(type === 'daily' ? 7 : type === 'weekly' ? 7 : 30)

    return {
      type,
      date: reportDate.toISOString().split('T')[0],
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      data: [
        { label: '总用户数', value: stats.totalUsers },
        { label: '总访问次数', value: stats.todayVisits },
        { label: '在线用户数', value: stats.onlineUsers },
        { label: '系统消息数', value: stats.totalMessages },
      ],
      trends,
    }
  }

  private getTodayStart(): Date {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate())
  }
}
