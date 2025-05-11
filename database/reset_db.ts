import db from '@adonisjs/lucid/services/db'
import Pronostic from '../app/models/pronostic.js'
import Participant from '../app/models/participant.js'
import Competition from '../app/models/competition.js'

/**
 * Script pour réinitialiser la base de données
 * Exécuter avec: node ace run:js database/reset_db.ts
 */
async function main() {
  await db.connection().truncate('pronostics', true)
  await db.connection().truncate('participants', true)
  await db.connection().truncate('competitions', true)

  console.log('Base de données réinitialisée avec succès.')
}

// Exécuter le script
main()
  .catch(console.error)
  .finally(() => db.manager.closeAll())
