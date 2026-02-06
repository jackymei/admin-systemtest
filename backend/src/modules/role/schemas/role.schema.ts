import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

export type RoleDocument = Role & Document

@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true })
  name: string

  @Prop({ required: true, unique: true })
  code: string

  @Prop()
  description: string

  @Prop({ type: [String], default: [] })
  permissions: string[]

  @Prop({ default: 'active' })
  status: string
}

export const RoleSchema = SchemaFactory.createForClass(Role)
