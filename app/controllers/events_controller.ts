import type { HttpContext } from '@adonisjs/core/http'
import { createValidator } from '#validators/events'
import RepetitiveEvent from '#models/repetitive_event'

export default class EventsController {
  async getAllRepetitiveEvents({ response }: HttpContext) {
    const events = await RepetitiveEvent.all()

    return response.ok({
      events: events,
    })
  }

  async getRepetitiveEvent({ params, response }: HttpContext) {
    const id = params.id

    const event = await RepetitiveEvent.find(id)

    if (event) {
      return response.ok({
        events: event,
      })
    }

    return response.notFound({
      message: 'Event not found !',
    })
  }

  async createRepetitiveEvent({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createValidator)
    const event = await RepetitiveEvent.create(payload)

    return response.ok({
      event: event,
    })
  }
}
