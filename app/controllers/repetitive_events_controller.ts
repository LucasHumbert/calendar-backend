import type { HttpContext } from '@adonisjs/core/http'
import { createValidator } from '#validators/repetitive_event'
import RepetitiveEvent from '#models/repetitive_event'

export default class RepetitiveEventsController {
  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createValidator)
    const event = await RepetitiveEvent.create(payload)

    return response.ok({
      event: event,
    })
  }
}
