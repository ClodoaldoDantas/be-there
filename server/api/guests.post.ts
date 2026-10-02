import { z } from 'zod'
import { db } from '~~/database/client'
import { guests } from '~~/database/schema'

const guestSchema = z.object({
  name: z.string().trim().min(3, 'Informe seu nome completo'),
  whatsapp: z.string().regex(/^\d{10,11}$/, 'WhatsApp inválido'),
  attendants: z.number().int().min(0, 'Quantidade de acompanhantes inválida').max(3, 'Quantidade de acompanhantes inválida')
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const parsed = guestSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: parsed.error.issues[0]?.message ?? 'Dados inválidos'
    })
  }

  await db.insert(guests).values(parsed.data)

  setResponseStatus(event, 201)
})
