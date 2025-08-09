# AI Intent Understanding Checklist

## 🎯 Purpose
This checklist helps AI agents quickly understand your project intent and ask the right clarifying questions when starting with the vibe-starter template.

## 📋 AI Agent Startup Checklist

### Phase 1: Instant Context Loading (< 5 seconds)
```bash
# AI should immediately check:
1. Does vibe-project.config.json exist?
   ✅ YES → Parse config for instant context
   ❌ NO → Offer to generate config: "Run `npm run generate`"

2. Is config filled out or template?
   ✅ FILLED → Proceed with project-specific context
   ❌ TEMPLATE → Need project definition phase
```

### Phase 2: Project Understanding Validation (< 30 seconds)

#### ✅ **What AI Should Know Instantly** (from config)
- [ ] **Project Identity**: Name, type, domain, description
- [ ] **Target Users**: Demographics, technical level, usage patterns
- [ ] **Core Features**: Prioritized list with complexity estimates
- [ ] **Technical Stack**: Frontend, backend, database, styling choices
- [ ] **Business Context**: Key constraints, priorities, workflows
- [ ] **Testing Strategy**: Required coverage and automation level
- [ ] **Deployment Plan**: Platform, domain, environment setup

#### ❓ **Smart Questions AI Should Ask** (if config incomplete)

**Project Clarity Questions:**
1. "I see this is a [TYPE] project in [DOMAIN]. What's the main problem it solves?"
2. "Who are your primary users and how tech-savvy are they?"
3. "What's the #1 feature that must work perfectly?"

**Technical Validation Questions:**
1. "I see you're using [STACK]. Any specific constraints or preferences?"
2. "Do you need authentication/real-time features/offline support?"
3. "What's your target deployment timeline?"

**Scope Clarification Questions:**
1. "Should I focus on [FEATURE_1] first, or is [FEATURE_2] more critical?"
2. "What's your definition of 'done' for this project?"
3. "Any existing systems this needs to integrate with?"

### Phase 3: Development Readiness Check (< 60 seconds)

#### ✅ **AI Should Verify**
- [ ] **Environment Setup**: Dependencies installed, tests passing
- [ ] **Git Flow**: Hooks configured, branch strategy understood
- [ ] **Testing Standards**: All categories enabled and working
- [ ] **Development Workflow**: Pre-commit checks functional

#### ❓ **Process Questions AI Should Ask**
1. "Should I set up git hooks now? (`./setup-git-hooks.sh`)"
2. "Want me to run the health check? (`npm run pre-commit`)"
3. "Ready to start with [HIGHEST_PRIORITY_FEATURE]?"

## 🤖 AI Intent Translation Matrix

### High-Confidence Scenarios (No Questions Needed)
```json
{
  "config_complete": true,
  "features_prioritized": true,
  "stack_defined": true,
  "constraints_clear": true
}
// → AI can start development immediately
```

### Medium-Confidence Scenarios (1-2 Questions)
```json
{
  "config_partial": true,
  "core_features_defined": true,
  "some_constraints_missing": true
}
// → AI asks targeted clarification questions
```

### Low-Confidence Scenarios (Guided Setup)
```json
{
  "config_template": true,
  "project_undefined": true
}
// → AI guides through project definition process
```

## 🎯 Optimized Question Patterns

### Instead of Generic Questions:
❌ "What kind of project are you building?"
❌ "What technologies do you want to use?"
❌ "How should I structure this?"

### Ask Specific, Context-Aware Questions:
✅ "I see this is a productivity web app for busy professionals. Should the task management feature support team collaboration, or focus on individual productivity?"

✅ "Your config shows React + Tailwind + Zustand. Do you need real-time updates between users, or is local state sufficient?"

✅ "The target users are 'intermediate' technical level. Should the UI prioritize power-user features or keep it simple?"

## 🚀 AI Workflow Optimization

### Efficient Startup Sequence:
```bash
1. Parse vibe-project.config.json (5 sec)
2. Load .vibe/ai-context.md (instant)
3. Validate environment (npm run pre-commit)
4. Ask 0-3 targeted questions based on config completeness
5. Start development with full context
```

### Context-Aware Development:
```bash
# AI uses project-specific prompts:
"Context: ${project.name} - ${project.type} for ${project.audience}
Priority: ${feature.priority} | Complexity: ${feature.complexity}
Constraints: ${project.constraints}
Stack: ${project.technical.stack}

Implement ${feature.name} following our testing standards."
```

## 📊 Success Metrics

### Excellent AI Understanding (Target):
- [ ] **0-1 clarifying questions** needed to start
- [ ] **Project-specific suggestions** from first response
- [ ] **Correct feature prioritization** without guidance
- [ ] **Appropriate technical decisions** for user level
- [ ] **Relevant testing focus** for project type

### Good AI Understanding:
- [ ] **2-3 clarifying questions** for edge cases
- [ ] **Generally appropriate suggestions**
- [ ] **Mostly correct prioritization**

### Needs Improvement:
- [ ] **4+ questions** needed for basic understanding
- [ ] **Generic suggestions** not tailored to project
- [ ] **Incorrect assumptions** about priorities

## 🔧 Troubleshooting Common Issues

### If AI Asks Too Many Questions:
1. **Check config completeness**: Is vibe-project.config.json filled out?
2. **Verify AI context**: Is .vibe/ai-context.md being read?
3. **Update prompts**: Add more specific business context to config

### If AI Makes Wrong Assumptions:
1. **Clarify constraints**: Add specific limitations to config
2. **Define priorities**: Be explicit about what matters most
3. **Specify user context**: More detailed audience description

### If AI Suggests Wrong Tech Choices:
1. **Lock in stack**: Set specific technologies in config
2. **Add constraints**: Specify what NOT to use
3. **Explain reasoning**: Add context for technical decisions

## 💡 Best Practices for Intent Communication

### In Project Config:
```json
{
  "ai": {
    "context": {
      "businessLogic": "Users need fast task creation - speed over features",
      "userWorkflows": "Create task → Set priority → Track time → Generate report",
      "constraints": "Must work offline, no external dependencies",
      "priorities": "Performance > Features > Polish"
    },
    "prompts": {
      "development": "Focus on keyboard shortcuts and minimal clicks",
      "testing": "Emphasize performance and offline functionality",
      "deployment": "Optimize for mobile-first usage"
    }
  }
}
```

### In AI Context File:
```markdown
## Critical Success Factors
1. **Speed**: Every action should be <200ms
2. **Simplicity**: Max 3 clicks for any task
3. **Reliability**: Must work without internet

## User Mental Model
Users think: "I need to capture this thought quickly before I forget"
NOT: "I want to organize my entire life"
```

## 🎯 Expected Outcome

With this optimized structure, AI agents should:

1. **Understand your project in 5 seconds** instead of 3 minutes
2. **Ask 0-3 targeted questions** instead of 10+ generic ones
3. **Make project-appropriate suggestions** from the first interaction
4. **Prioritize features correctly** based on your business context
5. **Use the right technical patterns** for your user base
6. **Focus testing efforts** on what matters for your project type

The goal is **immediate, intelligent collaboration** rather than lengthy discovery phases.
