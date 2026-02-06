import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { LogController } from './log.controller'
import { OperLogService } from './oper-log.service'
import { LoginLogService } from './login-log.service'
import { OperLogMiddleware } from './oper-log.middleware'
import { OperLog, OperLogSchema } from './schemas/oper-log.schema'
import { LoginLog, LoginLogSchema } from './schemas/login-log.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OperLog.name, schema: OperLogSchema },
      { name: LoginLog.name, schema: LoginLogSchema },
    ]),
  ],
  controllers: [LogController],
  providers: [OperLogService, LoginLogService],
  exports: [OperLogService, LoginLogService],
})
export class LogModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OperLogMiddleware).forRoutes('*')
  }
}
