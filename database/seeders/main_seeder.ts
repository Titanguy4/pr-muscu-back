import { BaseSeeder } from '@adonisjs/lucid/seeders'
import ParticipantSeeder from './participant_seeder.js'
import CompetitionSeeder from './competition_seeder.js'
import PronosticSeeder from './pronostic_seeder.js'

export default class MainSeeder extends BaseSeeder {
  async run() {
    // Exécuter les seeders dans l'ordre
    await new CompetitionSeeder(this.client).run()
    await new ParticipantSeeder(this.client).run()
    await new PronosticSeeder(this.client).run()
  }
}
