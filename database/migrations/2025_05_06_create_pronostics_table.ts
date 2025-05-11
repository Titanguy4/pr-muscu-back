import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreatePronosticsTable extends BaseSchema {
  protected tableName = 'pronostics'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.integer('participant_id').notNullable()
      table.integer('squat').notNullable()
      table.integer('bench').notNullable()
      table.integer('deadlift').notNullable()
      table.timestamps()

      table.foreign('participant_id').references('id').inTable('participants')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
