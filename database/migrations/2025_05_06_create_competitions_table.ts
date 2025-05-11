import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateCompetitionsTable extends BaseSchema {
  protected tableName = 'competitions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table.string('nom').notNullable()
      table.text('description')
      table.dateTime('date').notNullable()
      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
