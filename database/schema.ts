import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { createId } from '@paralleldrive/cuid2'

export const guests = sqliteTable('guests', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  whatsapp: text('whatsapp').notNull(),
  attendants: integer('attendants').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
})
