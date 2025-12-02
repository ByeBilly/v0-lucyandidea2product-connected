# Contributing to VisionaryDirector.com

## Git Workflow

### Branch Strategy
- `main` - Production branch (auto-deploys to visionarydirector.com)
- `develop` - Development branch for testing
- `feature/*` - Feature branches

### Commit Message Format
\`\`\`
feat: Add Lucy AI conversation with Vercel AI Gateway
fix: Resolve waitlist signup duplicate entries
docs: Update API keys setup guide
refactor: Migrate Lucy from Gemini to AI Gateway
style: Update homepage hero section design
\`\`\`

### Regular Push Schedule
- Push after completing each feature
- Push before switching tasks
- Daily pushes minimum

### Before Pushing
1. Test locally
2. Check for console errors
3. Verify build succeeds
4. Update documentation if needed

## Project Structure
\`\`\`
visionarydirector.com/
├── app/                    # Next.js app directory
│   ├── [locale]/          # Internationalized routes
│   │   ├── (marketing)/   # Public pages (waitlist, features, help)
│   │   ├── (dashboard)/   # Protected pages (profile, settings)
│   │   ├── (shops)/       # AI service pages (Lucy, mform)
│   │   └── admin/         # Admin dashboard
│   └── api/               # API routes
├── features/              # Feature modules
│   ├── lucy/             # Lucy AI assistant (West Wing)
│   └── mform/            # mform creation platform (North/East Wing)
├── components/           # Shared components
├── lib/                  # Utilities and services
├── sdk/                  # WaveSpeed SDK (Southern Wing)
└── i18n/                # Translations
\`\`\`

## Architecture
- **Southern Wing (WaveSpeed)**: Pre-built AI services (90+ models)
- **West Wing (Lucy Family)**: Boutique AI assistants with platform keys
- **North/East Wings (mforms)**: User-controlled creation tools with user keys
