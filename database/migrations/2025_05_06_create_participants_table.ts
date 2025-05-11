import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateParticipantsTable extends BaseSchema {
  protected tableName = 'participants'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table.string('nom').notNullable()
      table.string('prenom').notNullable()
      table.integer('pr_squat').notNullable()
      table.integer('pr_bench').notNullable()
      table.integer('pr_deadlift').notNullable()
      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
