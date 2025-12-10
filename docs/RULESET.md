# Ruleset — Development Standards & Guidelines

This document defines the coding standards, development practices, and operational rules that all agents must follow.

## Code Quality Standards

### General Coding Principles
- **Readability First:** Code must be readable and self-documenting
- **DRY (Don't Repeat Yourself):** Eliminate code duplication
- **SOLID Principles:** Follow SOLID object-oriented design principles
- **Single Responsibility:** Each function/component has one clear purpose

### Naming Conventions
- **Variables:** camelCase for variables and functions
- **Components:** PascalCase for React components and classes
- **Files:** kebab-case for file names, PascalCase for component files
- **Constants:** SCREAMING_SNAKE_CASE for constants

### Code Structure
- **File Organization:** Related functionality grouped in feature directories
- **Import Order:** Standard library → third-party → local imports
- **Export Strategy:** Named exports preferred over default exports

## Testing Requirements

### Testing Pyramid
- **Unit Tests:** Required for all functions and components (80%+ coverage)
- **Integration Tests:** Required for API endpoints and workflows
- **E2E Tests:** Required for critical user journeys

### Test Naming
- **Unit Tests:** `describe('ComponentName', () => { it('should do something', () => {}) })`
- **Test Files:** `[filename].test.ts` or `[filename].spec.ts`

## Git Workflow

### Branch Naming
- `feature/[feature-name]` for new features
- `bugfix/[issue-number]-[brief-description]` for bug fixes
- `hotfix/[issue-number]-[brief-description]` for urgent fixes
- `refactor/[component-name]-[purpose]` for refactoring

### Commit Standards
- **Format:** `type(scope): description`
- **Types:** feat, fix, docs, style, refactor, test, chore
- **Description:** Imperative mood, < 50 characters

### Pull Request Requirements
- **Title:** Clear, descriptive title following commit format
- **Description:** What, why, and how of the changes
- **Tests:** All tests pass, new tests added if needed
- **Review:** Requires review from appropriate agent

## Documentation Standards

### Code Documentation
- **Functions:** JSDoc for all public functions
- **Components:** Prop types and usage examples
- **Complex Logic:** Inline comments explaining business logic

### Continuity Documentation
- **Session Logs:** Required for all development sessions
- **Architecture Decisions:** Documented in NOTES_CHATGPT.md
- **Risks:** Documented in REDTEAM.md

## Security Standards

### Input Validation
- **Client-side:** Validate all user inputs
- **Server-side:** Re-validate all inputs on server
- **Sanitization:** Sanitize all dynamic content

### Authentication & Authorization
- **JWT Tokens:** Proper token validation and expiration
- **Role-based Access:** Implement proper RBAC
- **Session Management:** Secure session handling

### Data Protection
- **Encryption:** Encrypt sensitive data at rest and in transit
- **API Keys:** Never commit secrets to version control
- **Environment Variables:** Use environment-specific configs

## Performance Standards

### Frontend Performance
- **Bundle Size:** < 500KB initial bundle
- **First Paint:** < 2 seconds
- **Time to Interactive:** < 3 seconds

### Backend Performance
- **Response Time:** < 200ms for API endpoints
- **Database Queries:** < 100ms average query time
- **Memory Usage:** Monitor and optimize memory consumption

## Accessibility Standards

### WCAG Compliance
- **Level AA:** Meet WCAG 2.1 AA standards
- **Keyboard Navigation:** All interactive elements keyboard accessible
- **Screen Readers:** Proper ARIA labels and semantic HTML

### Inclusive Design
- **Color Contrast:** Minimum 4.5:1 contrast ratio
- **Font Size:** Minimum 14px readable text
- **Touch Targets:** Minimum 44px touch targets

## Error Handling

### Error Types
- **User Errors:** Clear, actionable error messages
- **System Errors:** Logged with context, user-friendly messages
- **Network Errors:** Graceful degradation and retry logic

### Logging Standards
- **Log Levels:** ERROR, WARN, INFO, DEBUG
- **Structured Logging:** JSON format with consistent fields
- **PII Protection:** Never log sensitive user data

## Deployment Standards

### Environment Management
- **Development:** Latest code, full debugging
- **Staging:** Production-like environment for testing
- **Production:** Stable, monitored, backup-ready

### Release Process
- **Versioning:** Semantic versioning (MAJOR.MINOR.PATCH)
- **Changelog:** Maintain CHANGELOG.md with release notes
- **Rollback Plan:** Documented rollback procedures

## Agent-Specific Rules

### ChatGPT (Architect)
- Always document architectural decisions
- Review code for architectural consistency
- Maintain system design documents

### DeepSeek (Strategy)
- Conduct regular security assessments
- Identify and document risks
- Review for business logic vulnerabilities

### Gemini (Development)
- Follow established coding standards
- Write comprehensive tests
- Document complex business logic

### Cursor (Integration)
- Ensure code integrates properly
- Test cross-component interactions
- Validate deployment readiness

### Bolt (Automation)
- Maintain CI/CD pipeline integrity
- Monitor automated test coverage
- Validate deployment automation

---

*These rules are mandatory and should be reviewed quarterly for updates. Exceptions require explicit approval and documentation.*
