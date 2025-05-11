import Participant from '#models/participant'
import type { HttpContext } from '@adonisjs/core/http'

export default class ParticipantController {
  public async index({ response }: HttpContext) {
    const participants = await Participant.all()
    return response.json(participants)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['nom', 'prenom', 'prSquat', 'prBench', 'prDeadlift'])
    console.log(data)
    const participant = await Participant.create(data)
    return response.json(participant)
  }

  public async show({ params, response }: HttpContext) {
    const participant = await Participant.findOrFail(params.id)
    return response.json(participant)
  }

  public async update({ params, request, response }: HttpContext) {
    const participant = await Participant.findOrFail(params.id)
    const data = request.only(['nom', 'prenom', 'prSquat', 'prBench', 'prDeadlift'])
    await participant.merge(data).save()
    return response.json(participant)
  }

  public async destroy({ params, response }: HttpContext) {
    const participant = await Participant.findOrFail(params.id)
    await participant.delete()
    return response.json({ message: 'Participant supprimé' })
  }
}
