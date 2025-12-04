const { writeFileSync } = require("fs")
const { join } = require("path")

const buildTime = new Date().toISOString()

// Generate a simple JS file that exports the build time
const content = `// Auto-generated at build time - DO NOT EDIT MANUALLY
export const BUILD_TIME = '${buildTime}'
`

const outputPath = join(process.cwd(), "lib", "build-time.ts")
writeFileSync(outputPath, content)

console.log(`[Build Time] Generated: ${buildTime}`)
