import { HttpContext } from '@adonisjs/core/http'
import Competition from '../../models/competition.js'
import { DateTime } from 'luxon'

export default class CompetitionController {
  /**
   * Récupérer toutes les compétitions
   */
  public async index({ response }: HttpContext) {
    try {
      const competitions = await Competition.query().orderBy('date', 'asc')

      // Transformer les dates au format ISO string pour le front-end
      const transformedCompetitions = competitions.map((comp) => {
        return {
          ...comp.toJSON(),
          date: comp.date ? comp.date.toISO() : null,
          createdAt: comp.createdAt ? comp.createdAt.toISO() : null,
          updatedAt: comp.updatedAt ? comp.updatedAt.toISO() : null,
        }
      })

      return response.json(transformedCompetitions)
    } catch (error) {
      console.error('Error in competitions index:', error)
      return response.status(500).json({
        message: 'Erreur lors de la récupération des compétitions',
        error: error.message,
      })
    }
  }

  /**
   * Récupérer la prochaine compétition
   */
  public async next({ response }: HttpContext) {
    try {
      const now = DateTime.now()

      // Récupérer la prochaine compétition (date supérieure à aujourd'hui)
      const nextCompetition = await Competition.query()
        .where('date', '>=', now.toSQL())
        .orderBy('date', 'asc')
        .first()

      if (!nextCompetition) {
        return response.status(404).json({
          message: 'Aucune compétition à venir',
        })
      }

      // Récupérer l'objet JSON de la compétition
      const competitionJson = nextCompetition.toJSON()

      // Transformer la date au format ISO string pour le front-end
      // Vérifier si date est un objet DateTime, sinon convertir
      const dateStr = (() => {
        if (nextCompetition.date && typeof nextCompetition.date.toISO === 'function') {
          return nextCompetition.date.toISO()
        } else if (nextCompetition.date instanceof Date) {
          return new Date(nextCompetition.date).toISOString()
        } else if (typeof nextCompetition.date === 'string') {
          return nextCompetition.date
        }
        return null
      })()

      const transformedCompetition = {
        ...competitionJson,
        date: dateStr,
        createdAt:
          nextCompetition.createdAt && typeof nextCompetition.createdAt.toISO === 'function'
            ? nextCompetition.createdAt.toISO()
            : nextCompetition.createdAt instanceof Date
              ? new Date(nextCompetition.createdAt).toISOString()
              : competitionJson.createdAt,
        updatedAt:
          nextCompetition.updatedAt && typeof nextCompetition.updatedAt.toISO === 'function'
            ? nextCompetition.updatedAt.toISO()
            : nextCompetition.updatedAt instanceof Date
              ? new Date(nextCompetition.updatedAt).toISOString()
              : competitionJson.updatedAt,
      }

      return response.json(transformedCompetition)
    } catch (error) {
      console.error('Error in next competition:', error)
      return response.status(500).json({
        message: 'Erreur lors de la récupération de la prochaine compétition',
        error: error.message,
      })
    }
  }
}
