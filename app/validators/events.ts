import vine from '@vinejs/vine'

export const createValidator = vine.compile(
  vine.object({
    weekDay: vine.number().min(1).max(7),
    title: vine.string().minLength(2),
    description: vine.string().nullable(),
    startHour: vine.string(),
    endHour: vine.string(),
    userId: vine.number().exists({ table: 'users', column: 'id' }),
  })
)
