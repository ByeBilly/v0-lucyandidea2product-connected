import { writeFileSync } from "fs"
import { join } from "path"

const buildTime = new Date().toISOString()

// Generate a simple JS file that exports the build time
const content = `// Auto-generated at build time
export const BUILD_TIME = '${buildTime}'
`

const outputPath = join(process.cwd(), "lib", "build-time.ts")
writeFileSync(outputPath, content)

console.log(`[Build Time] Generated: ${buildTime}`)
