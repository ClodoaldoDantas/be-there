import { db } from '~~/database/client'
import { guests } from '~~/database/schema'

export default defineEventHandler(async () => {
  return db.select().from(guests).orderBy(guests.createdAt)
})
