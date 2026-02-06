import { Injectable, NestMiddleware, Logger } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { OperLogService } from './oper-log.service'

@Injectable()
export class OperLogMiddleware implements NestMiddleware {
  private readonly logger = new Logger(OperLogMiddleware.name)
  private readonly startTime = Symbol('requestStartTime')

  constructor(private readonly operLogService: OperLogService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    req[this.startTime] = Date.now()

    res.on('finish', async () => {
      const duration = Date.now() - req[this.startTime]
      const user = req['user'] as any

      if (user && !req.path.includes('/logs/')) {
        await this.operLogService.create({
          userId: user.id || '',
          username: user.username || '',
          module: req.baseUrl || 'API',
          action: req.method,
          method: req.method,
          path: req.path,
          params: req.method === 'GET' ? req.query : req.body,
          ip: this.getClientIp(req),
          duration,
          status: res.statusCode >= 400 ? 'failed' : 'success',
        })
      }
    })

    next()
  }

  private getClientIp(req: Request): string {
    return (
      req.headers['x-forwarded-for'] as string ||
      req.headers['x-real-ip'] as string ||
      req.socket.remoteAddress ||
      'unknown'
    )
  }
}
