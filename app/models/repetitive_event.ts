import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class RepetitiveEvent extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  // 1 is Monday and 7 is Sunday
  @column()
  declare weekDays: { days: number[] }

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column()
  declare startHour: string

  @column()
  declare endHour: string

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
