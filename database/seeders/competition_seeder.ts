import Competition from '../../app/models/competition.js'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class CompetitionSeeder extends BaseSeeder {
  async run() {
    // Supprimer les compétitions existantes
    await Competition.truncate(true)

    // Créer des compétitions
    await Competition.createMany([
      {
        nom: 'Championnat Régional de Powerlifting',
        description: 'Compétition régionale ouverte à tous les niveaux',
        date: DateTime.now().plus({ days: 60 }),
        lieu: 'Gymnase Municipal, Nantes',
      },
      {
        nom: 'Open National de Force Athlétique',
        description: 'Compétition nationale pour les athlètes confirmés',
        date: DateTime.now().plus({ days: 120 }),
        lieu: 'Palais des Sports, Paris',
      },
      {
        nom: 'Rencontres Interclubs PR Muscu',
        description: 'Événement amical entre clubs',
        date: DateTime.now().plus({ days: 30 }),
        lieu: 'Salle de sport PR Muscu, Lyon',
      },
    ])

    console.log('3 compétitions créées avec succès.')
  }
}
