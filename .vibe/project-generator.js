#!/usr/bin/env node

/**
 * Vibe Project Generator
 * Converts questionnaire answers to structured config and generates AI context
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class VibeProjectGenerator {
  constructor() {
    this.configPath = path.join(process.cwd(), 'vibe-project.config.json');
    this.aiContextPath = path.join(process.cwd(), '.vibe', 'ai-context.md');
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  /**
   * Interactive questionnaire that generates structured config
   */
  async generateFromQuestionnaire() {
    console.log('🚀 Vibe Project Generator');
    console.log('Answer these questions to generate your project config:\n');

    const answers = await this.askQuestions();
    const config = this.generateConfig(answers);
    
    this.saveConfig(config);
    this.generateAIContext(config);
    
    console.log('\n✅ Project configuration generated!');
    console.log(`📄 Config: ${this.configPath}`);
    console.log(`🤖 AI Context: ${this.aiContextPath}`);
  }

  async askQuestions() {
    console.log('\n📋 Let\'s define your project! Answer these questions to generate AI-optimized config:\n');

    const answers = {};

    // Project basics
    answers.name = await this.ask('🎯 Project name: ');
    answers.type = await this.askChoice('📱 Project type:', [
      'web-app', 'tool', 'dashboard', 'game', 'api', 'mobile-app'
    ]);
    answers.domain = await this.askChoice('🏷️  Domain/theme:', [
      'productivity', 'entertainment', 'education', 'ecommerce', 'healthcare', 'finance', 'other'
    ]);
    answers.description = await this.ask('📝 One sentence description: ');

    // Audience
    console.log('\n👥 Target Audience:');
    answers.primaryUsers = await this.ask('Who will use this? (demographics, roles): ');
    answers.technicalLevel = await this.askChoice('Their technical level:', [
      'beginner', 'intermediate', 'expert'
    ]);
    answers.usageFrequency = await this.askChoice('How often will they use it:', [
      'daily', 'weekly', 'monthly', 'occasional'
    ]);
    answers.devices = await this.askMultiple('Primary devices:', [
      'desktop', 'mobile', 'tablet'
    ]);

    // Core features
    console.log('\n🚀 Core Features:');
    answers.coreFeatures = await this.askFeatures();

    // Technical requirements
    console.log('\n⚙️  Technical Requirements:');
    answers.needsAuth = await this.askYesNo('Need user accounts/login?');
    answers.needsRealtime = await this.askYesNo('Need real-time features? (live updates, chat, etc.)');
    answers.needsOffline = await this.askYesNo('Need to work offline?');
    answers.integrations = await this.ask('Any specific integrations? (APIs, services - or press Enter to skip): ');

    // Business context
    console.log('\n💡 Business Context:');
    answers.businessLogic = await this.ask('Key business rules or constraints: ');
    answers.userWorkflows = await this.ask('Typical user workflow (what do users do step by step): ');
    answers.priorities = await this.ask('What matters most? (performance, features, simplicity, etc.): ');

    this.rl.close();
    return answers;
  }

  async ask(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  async askChoice(question, choices) {
    console.log(`${question}`);
    choices.forEach((choice, index) => {
      console.log(`  ${index + 1}. ${choice}`);
    });

    const answer = await this.ask('Choose (1-' + choices.length + '): ');
    const index = parseInt(answer) - 1;

    if (index >= 0 && index < choices.length) {
      return choices[index];
    } else {
      console.log('Invalid choice, using first option.');
      return choices[0];
    }
  }

  async askYesNo(question) {
    const answer = await this.ask(`${question} (y/n): `);
    return answer.toLowerCase().startsWith('y');
  }

  async askMultiple(question, choices) {
    console.log(`${question} (select multiple by number, separated by commas)`);
    choices.forEach((choice, index) => {
      console.log(`  ${index + 1}. ${choice}`);
    });

    const answer = await this.ask('Choose (e.g., 1,2): ');
    const indices = answer.split(',').map(s => parseInt(s.trim()) - 1);

    return indices
      .filter(i => i >= 0 && i < choices.length)
      .map(i => choices[i]);
  }

  async askFeatures() {
    const features = [];
    console.log('Enter your core features (press Enter with empty input to finish):');

    while (true) {
      const name = await this.ask(`Feature ${features.length + 1} name (or Enter to finish): `);
      if (!name) break;

      const priority = await this.askChoice('Priority:', ['critical', 'high', 'medium', 'low']);
      const complexity = await this.askChoice('Complexity:', ['simple', 'moderate', 'complex']);

      features.push({ name, priority, complexity });

      if (features.length >= 5) {
        console.log('Maximum 5 core features recommended.');
        break;
      }
    }

    return features.length > 0 ? features : [
      { name: 'Main Feature', priority: 'critical', complexity: 'moderate' }
    ];
  }

  generateConfig(answers) {
    return {
      "$schema": "./schemas/vibe-project.schema.json",
      "version": "1.0.0",
      "metadata": {
        "name": answers.name,
        "type": answers.type,
        "domain": answers.domain,
        "description": answers.description,
        "status": "planning",
        "created": new Date().toISOString().split('T')[0],
        "lastUpdated": new Date().toISOString().split('T')[0]
      },
      "audience": {
        "primary": {
          "demographics": answers.primaryUsers,
          "technicalLevel": answers.technicalLevel,
          "devices": answers.devices.length > 0 ? answers.devices : ["desktop", "mobile"],
          "usageFrequency": answers.usageFrequency
        }
      },
      "features": {
        "core": answers.coreFeatures.map((feature, index) => ({
          "id": `feature-${index + 1}`,
          "name": feature.name,
          "description": `${feature.name} functionality`,
          "priority": feature.priority,
          "complexity": feature.complexity,
          "estimatedHours": this.estimateHours(feature.complexity)
        }))
      },
      "technical": {
        "stack": {
          "frontend": "react",
          "backend": "none",
          "database": "none",
          "styling": "tailwind",
          "stateManagement": "zustand"
        },
        "requirements": {
          "authentication": answers.needsAuth,
          "realtime": answers.needsRealtime,
          "offline": answers.needsOffline,
          "mobile": answers.devices.includes('mobile'),
          "pwa": answers.needsOffline,
          "seo": true
        },
        "integrations": answers.integrations ? [
          {
            "service": answers.integrations,
            "purpose": "As specified by user",
            "required": true
          }
        ] : []
      },
      "testing": {
        "coverage": { "target": 80, "critical": 95 },
        "types": ["unit", "integration", "accessibility", "performance", "security"],
        "automation": { "preCommit": true, "ci": true, "deployment": true }
      },
      "ai": {
        "context": {
          "businessLogic": answers.businessLogic || "Focus on user needs and efficiency",
          "userWorkflows": answers.userWorkflows || "Standard user interaction patterns",
          "constraints": this.generateConstraints(answers),
          "priorities": answers.priorities || "User experience and performance are critical"
        },
        "prompts": {
          "development": `Focus on ${answers.priorities || 'user experience'} for ${answers.primaryUsers}`,
          "testing": `Emphasize ${answers.needsOffline ? 'offline functionality and ' : ''}${answers.needsRealtime ? 'real-time features and ' : ''}core functionality`,
          "deployment": `Optimize for ${answers.devices.join(' and ')} usage`
        }
      }
    };
  }

  estimateHours(complexity) {
    const estimates = { simple: 8, moderate: 24, complex: 48 };
    return estimates[complexity] || 16;
  }

  generateConstraints(answers) {
    const constraints = [];

    if (answers.needsOffline) constraints.push('Must work offline');
    if (answers.needsRealtime) constraints.push('Requires real-time updates');
    if (answers.devices.includes('mobile')) constraints.push('Must be mobile-friendly');
    if (answers.technicalLevel === 'beginner') constraints.push('Keep interface simple and intuitive');
    if (answers.usageFrequency === 'daily') constraints.push('Optimize for frequent use and efficiency');

    return constraints.length > 0 ? constraints.join(', ') : 'Standard web application constraints';
  }

  saveConfig(config) {
    fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2));
  }

  generateAIContext(config) {
    const template = fs.readFileSync(this.aiContextPath, 'utf8');
    
    const context = template
      .replace(/\[PROJECT_NAME\]/g, config.metadata.name)
      .replace(/\[PROJECT_TYPE\]/g, config.metadata.type)
      .replace(/\[DOMAIN\]/g, config.metadata.domain)
      .replace(/\[STATUS\]/g, config.metadata.status);
    
    fs.writeFileSync(this.aiContextPath, context);
  }
}

// CLI usage
const isMainModule = import.meta.url === `file://${process.argv[1]}` ||
                     process.argv[1].endsWith('project-generator.js');

if (isMainModule) {
  const generator = new VibeProjectGenerator();
  generator.generateFromQuestionnaire().catch(console.error);
}

export default VibeProjectGenerator;
