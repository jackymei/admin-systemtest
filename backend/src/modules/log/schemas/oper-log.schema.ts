import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

export type OperLogDocument = OperLog & Document

@Schema({ timestamps: true })
export class OperLog {
  @Prop({ required: true })
  userId: string

  @Prop({ required: true })
  username: string

  @Prop({ required: true })
  module: string

  @Prop({ required: true })
  action: string

  @Prop({ required: true })
  method: string

  @Prop({ required: true })
  path: string

  @Prop()
  params: any

  @Prop()
  result: any

  @Prop({ required: true })
  ip: string

  @Prop({ required: true })
  duration: number

  @Prop({ default: 'success' })
  status: string
}

export const OperLogSchema = SchemaFactory.createForClass(OperLog)
