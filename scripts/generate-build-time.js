const fs = require("fs")
const path = require("path")

const buildTime = new Date().toISOString()
const envPath = path.join(process.cwd(), ".env.production")

// Read existing .env.production if it exists
let existingEnv = ""
if (fs.existsSync(envPath)) {
  existingEnv = fs.readFileSync(envPath, "utf8")
}

// Remove any existing BUILD_TIME entry
const lines = existingEnv.split("\n").filter((line) => !line.startsWith("NEXT_PUBLIC_BUILD_TIME="))

// Add new BUILD_TIME
lines.push(`NEXT_PUBLIC_BUILD_TIME=${buildTime}`)

// Write back to .env.production
fs.writeFileSync(envPath, lines.join("\n"))

console.log(`[Build Time] Generated: ${buildTime}`)
