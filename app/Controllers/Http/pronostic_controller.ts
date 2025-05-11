import Pronostic from '#models/pronostic'
import type { HttpContext } from '@adonisjs/core/http'

export default class PronosticController {
  public async index({ response }: HttpContext) {
    const pronostics = await Pronostic.all()
    return response.json(pronostics)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['userId', 'participantId', 'squat', 'bench', 'deadlift'])
    const pronostic = await Pronostic.create(data)
    return response.json(pronostic)
  }

  public async show({ params, response }: HttpContext) {
    const pronostic = await Pronostic.findOrFail(params.id)
    return response.json(pronostic)
  }

  public async update({ params, request, response }: HttpContext) {
    const pronostic = await Pronostic.findOrFail(params.id)
    const data = request.only(['squat', 'bench', 'deadlift'])
    await pronostic.merge(data).save()
    return response.json(pronostic)
  }

  public async destroy({ params, response }: HttpContext) {
    const pronostic = await Pronostic.findOrFail(params.id)
    await pronostic.delete()
    return response.json({ message: 'Pronostic supprimé' })
  }
}
