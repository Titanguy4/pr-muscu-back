import Pronostic from '../../app/models/pronostic.js'
import Participant from '../../app/models/participant.js'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class PronosticSeeder extends BaseSeeder {
  async run() {
    // Vérifier si des pronostics existent déjà
    const pronosticsCount = await Pronostic.query().count('* as total')
    if (pronosticsCount[0].$extras.total > 0) {
      console.log('Les pronostics existent déjà, aucun nouveau pronostic créé.')
      return
    }

    // On récupère les participants pour créer des pronostics liés
    const participants = await Participant.all()
    let pronosticsCreated = 0

    // Création de pronostics pour chaque participant
    for (const participant of participants) {
      // Créer 2 pronostics par participant avec des utilisateurs fictifs
      await Pronostic.createMany([
        {
          userId: 1, // Utilisateur fictif 1
          participantId: participant.id,
          squat: Math.round(participant.prSquat * (Math.random() * 0.2 + 0.9)), // Entre 90% et 110% du PR
          bench: Math.round(participant.prBench * (Math.random() * 0.2 + 0.9)),
          deadlift: Math.round(participant.prDeadlift * (Math.random() * 0.2 + 0.9)),
        },
        {
          userId: 2, // Utilisateur fictif 2
          participantId: participant.id,
          squat: Math.round(participant.prSquat * (Math.random() * 0.2 + 0.9)),
          bench: Math.round(participant.prBench * (Math.random() * 0.2 + 0.9)),
          deadlift: Math.round(participant.prDeadlift * (Math.random() * 0.2 + 0.9)),
        },
      ])
      pronosticsCreated += 2
    }

    console.log(`${pronosticsCreated} pronostics créés avec succès.`)
  }
}
