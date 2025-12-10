# CONTINUITY.md — Mandatory Multi-Agent Continuity Standard

This document defines the **Universal Continuity Requirement** for this project.

It is a **priority document** that MUST be read and respected by **all agents**:

- ChatGPT (Architect & Orchestrator)
- DeepSeek (Creative Strategist, PM, Red-Team Analyst)
- Gemini (Feature Generator, Code Writer)
- Cursor (Local Executor, Integrator, Debugger)
- Bolt (CI, Automation, Validation)
- Human (Product Owner)

## Universal Continuity Requirement

All agents must help maintain long-term continuity across all repositories.

Agents MUST record information that future agents will need, including:

- Communications intended for future **ChatGPT**, **Gemini**, **Cursor**, **Bolt**, and **DeepSeek** sessions
- Context that would otherwise be lost between builds, merges, branches, or deployments
- Architectural decisions, reasoning, constraints, and technical assumptions
- Any knowledge required for other agents or for future development
- Notes about potential ambiguity, risk, or design intent

This requirement is global and applies across *every repo* and *every project*.

## Session Continuity Protocols

### Session Start Protocol
Before beginning work in any session, agents MUST:

1. Read all required continuity documents in the specified order
2. Record the session start with metadata in the appropriate continuity file
3. Review any pending items from previous sessions
4. Verify understanding of current project state

### Session End Protocol
Before ending any session, agents MUST:

1. Document all changes made during the session
2. Record any decisions, assumptions, or constraints discovered
3. Update relevant continuity documents with new information
4. Flag any items requiring attention from specific future agents
5. Record session summary with completion status

### Session Metadata Standards
Each session interaction MUST include:

```markdown
## Session: [AGENT_NAME] - [DATE_TIME] - [SESSION_TYPE]
**Agent:** [ChatGPT/DeepSeek/Gemini/Cursor/Bolt/Human]
**Timestamp:** [YYYY-MM-DD HH:MM UTC]
**Session Type:** [Planning/Implementation/Review/Debugging/Testing/etc.]
**Priority Level:** [Critical/High/Medium/Low]
**Related Issues/PRs:** [Links or references]

### Session Objective
[Brief description of what this session aimed to accomplish]

### Changes Made
- [Specific file/functionality changes]
- [New features implemented]
- [Bugs fixed]
- [Documentation updated]

### Decisions Made
- [Architectural decisions]
- [Technical choices and reasoning]
- [Constraints identified]

### Continuity Items for Future Agents
- [Items requiring follow-up]
- [Information for specific agents]
- [Potential risks or concerns]

### Session Status
- [Complete/Incomplete/Blocked]
- [Next steps required]
- [Dependencies identified]
```

## Priority and Urgency Levels

### Critical Priority (🔴 EMERGENCY)
- Breaking changes affecting production
- Security vulnerabilities
- Data integrity issues
- Immediate blocking dependencies

### High Priority (🟡 URGENT)
- Feature-breaking bugs
- Performance degradation
- API contract changes
- Time-sensitive requirements

### Medium Priority (🟢 IMPORTANT)
- Feature enhancements
- Code quality improvements
- Documentation updates
- Non-blocking technical debt

### Low Priority (🔵 INFORMATIONAL)
- Minor optimizations
- Code style improvements
- Future planning notes
- General observations

## Where to record continuity information

Depending on the nature of the information, agents must log it in one or more of:

- `docs/NOTES_CHATGPT.md` — architectural/system-level notes and long-term intent
- `docs/REDTEAM.md` — risks, concerns, critiques, and improvement suggestions
- `docs/USER_FEEDBACK.md` — when the information originates from the human user
- `docs/SPEC.md` — when defining or updating product behaviour and requirements
- `docs/PROJECT_OVERVIEW.md` — high-level project status summary used to start sessions
- `docs/SESSION_HISTORY.md` — chronological record of all development sessions
- `docs/PENDING_ITEMS.md` — tasks requiring future attention with priorities

## Reading order for agents

Before performing work in this repo, agents should read, in this order:

1. `docs/CONTINUITY.md` (this file)
2. `docs/PROJECT_OVERVIEW.md`
3. `docs/USER_FEEDBACK.md`
4. `docs/PENDING_ITEMS.md`
5. `docs/REDTEAM.md`
6. `docs/NOTES_CHATGPT.md`
7. `docs/RULESET.md`
8. `docs/AGENTS.md`
9. `docs/SESSION_HISTORY.md` (last 5 sessions)

This ensures all agents share the same context and continuity before making changes.

## Conflict Resolution Guidelines

When continuity information conflicts between sources:

1. **Priority-based resolution**: Higher priority information takes precedence
2. **Recency-based resolution**: More recent information supersedes older information
3. **Source authority**: Human > ChatGPT (Architect) > Domain Expert Agents > Implementation Agents
4. **Documentation requirement**: All conflicts must be documented with resolution rationale

## Time-Sensitive Continuity Items

### Immediate Action Required (< 1 hour)
- Security incidents
- Production outages
- Critical bug discoveries
- Emergency rollbacks needed

### Short-term Action (1-24 hours)
- Breaking API changes
- Deployment blockers
- High-priority user feedback

### Medium-term Action (1-7 days)
- Performance degradation
- Feature requests with deadlines
- Technical debt accumulation

### Long-term Planning (> 7 days)
- Architectural improvements
- Feature roadmap items
- Infrastructure upgrades

## Verification and Audit Requirements

### Session Verification
Before ending any session, agents MUST verify:
- All changes are documented
- Continuity documents are updated
- No unresolved conflicts remain
- Session metadata is complete

### Continuity Audit
Weekly audit requirements:
- Review all continuity documents for completeness
- Verify session history accuracy
- Check for outdated information
- Validate pending items status

## Emergency Continuity Recovery

If continuity is lost or corrupted:

1. **Immediate Assessment**: Document what continuity information is missing
2. **Source Recovery**: Check git history, PRs, issues, and commit messages
3. **Human Consultation**: Escalate to human product owner for critical decisions
4. **Documentation Reconstruction**: Rebuild continuity documents from available sources
5. **Prevention Measures**: Implement additional safeguards to prevent future loss

## Cross-Agent Communication Protocols

### Direct Agent-to-Agent Communication
Use specific prefixes in continuity documents:

- `@ChatGPT:` - Messages specifically for ChatGPT sessions
- `@DeepSeek:` - Messages for DeepSeek analysis/planning
- `@Gemini:` - Messages for Gemini implementation
- `@Cursor:` - Messages for Cursor execution/debugging
- `@Bolt:` - Messages for Bolt CI/validation
- `@Human:` - Messages requiring human attention

### Escalation Paths
- Technical decisions → ChatGPT (Architect)
- Security/risk concerns → DeepSeek (Red Team)
- Implementation questions → Gemini (Code Writer)
- Execution issues → Cursor (Local Executor)
- CI/deployment problems → Bolt (Automation)
- Business/product decisions → Human (Product Owner)
