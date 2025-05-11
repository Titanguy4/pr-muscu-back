import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Participant from './participant.js'

export default class Competition extends BaseModel {
  // Définir les règles de sérialisation pour le modèle
  static $schema = {
    serializerRules: {
      format: {
        date: 'iso',
        createdAt: 'iso',
        updatedAt: 'iso',
      },
    },
  }

  @column({ isPrimary: true })
  declare id: number

  @column.dateTime()
  declare date: DateTime

  @column()
  declare nom: string

  @column()
  declare description: string

  @column()
  declare lieu: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Participant)
  declare participants: HasMany<typeof Participant>
}
