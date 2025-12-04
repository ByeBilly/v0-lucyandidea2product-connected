import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schemas"
import dotenv from "dotenv"

dotenv.config()

let _client: ReturnType<typeof postgres> | null = null
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null

function getClient() {
  if (!_client) {
    if (!process.env.POSTGRES_URL) {
      throw new Error("POSTGRES_URL environment variable is not set")
    }
    _client = postgres(process.env.POSTGRES_URL)
  }
  return _client
}

export const client = new Proxy({} as ReturnType<typeof postgres>, {
  get(target, prop) {
    return getClient()[prop as keyof ReturnType<typeof postgres>]
  },
})

export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(target, prop) {
    if (!_db) {
      _db = drizzle(getClient(), { schema })
    }
    return _db[prop as keyof ReturnType<typeof drizzle<typeof schema>>]
  },
})
