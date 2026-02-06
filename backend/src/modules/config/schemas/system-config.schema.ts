import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

export type SystemConfigDocument = SystemConfig & Document

@Schema({ timestamps: true })
export class SystemConfig {
  @Prop({ required: true, unique: true })
  key: string

  @Prop({ required: true })
  value: any

  @Prop()
  description: string
}

export const SystemConfigSchema = SchemaFactory.createForClass(SystemConfig)
