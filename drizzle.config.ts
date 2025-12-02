import type { Config } from "drizzle-kit"

export default {
  schema: "./lib/db/schemas",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL || "postgresql://placeholder:placeholder@localhost:5432/placeholder",
  },
} satisfies Config
