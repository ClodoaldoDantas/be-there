import 'dotenv/config'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { db } from './client'
import { guests } from './schema'

const generatePhoneNumber = (): string => {
  return `${faker.number.int({ min: 11, max: 99 })}9${faker.string.numeric(8)}`
}

const rows = Array.from({ length: 10 }, () => ({
  name: faker.person.fullName(),
  whatsapp: generatePhoneNumber(),
  attendants: faker.number.int({ min: 0, max: 3 })
}))

await db.delete(guests)

const inserted = await db.insert(guests).values(rows).returning()
console.log(`Seed concluído: ${inserted.length} convidados inseridos.`)
