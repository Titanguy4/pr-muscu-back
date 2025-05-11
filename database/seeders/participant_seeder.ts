import Participant from '../../app/models/participant.js'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class ParticipantSeeder extends BaseSeeder {
  async run() {
    // Vérifier si des participants existent déjà
    const participantsCount = await Participant.query().count('* as total')
    if (participantsCount[0].$extras.total > 0) {
      console.log('Les participants existent déjà, aucun nouveau participant créé.')
      return
    }

    // Créer des participants si aucun n'existe
    await Participant.createMany([
      {
        nom: 'Dupont',
        prenom: 'Jean',
        prSquat: 180,
        prBench: 120,
        prDeadlift: 220,
      },
      {
        nom: 'Martin',
        prenom: 'Sophie',
        prSquat: 140,
        prBench: 70,
        prDeadlift: 160,
      },
      {
        nom: 'Leroy',
        prenom: 'Thomas',
        prSquat: 200,
        prBench: 140,
        prDeadlift: 240,
      },
      {
        nom: 'Petit',
        prenom: 'Julie',
        prSquat: 130,
        prBench: 65,
        prDeadlift: 150,
      },
      {
        nom: 'Bernard',
        prenom: 'Nicolas',
        prSquat: 190,
        prBench: 130,
        prDeadlift: 230,
      },
    ])

    console.log('5 participants créés avec succès.')
  }
}
