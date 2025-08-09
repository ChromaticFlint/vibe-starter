#!/usr/bin/env node

/**
 * Quick Setup for Vibe Projects
 * Minimal questions for fast AI-optimized project setup
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class QuickSetup {
  constructor() {
    this.configPath = path.join(process.cwd(), 'vibe-project.config.json');
    this.aiContextPath = path.join(process.cwd(), '.vibe', 'ai-context.md');
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async ask(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  async quickSetup() {
    console.log('🚀 Quick Vibe Project Setup');
    console.log('Just 5 questions to get AI-optimized configuration!\n');

    const answers = {};
    
    // Essential questions only
    answers.name = await this.ask('1. Project name: ');
    if (!answers.name) answers.name = 'My Project';

    console.log('\n2. Project type:');
    console.log('  1. Web App (React/Vue/etc)');
    console.log('  2. Tool/Utility');
    console.log('  3. Dashboard/Admin');
    console.log('  4. Game');
    console.log('  5. API/Backend');
    const typeChoice = await this.ask('Choose (1-5): ');
    const types = ['web-app', 'tool', 'dashboard', 'game', 'api'];
    answers.type = types[parseInt(typeChoice) - 1] || 'web-app';

    answers.description = await this.ask('\n3. What does it do? (one sentence): ');
    if (!answers.description) answers.description = `A ${answers.type} that helps users accomplish their goals`;

    answers.users = await this.ask('\n4. Who will use it? (target audience): ');
    if (!answers.users) answers.users = 'General users';

    answers.priority = await this.ask('\n5. What matters most? (performance/features/simplicity): ');
    if (!answers.priority) answers.priority = 'user experience';

    this.rl.close();

    const config = this.generateQuickConfig(answers);
    this.saveConfig(config);
    this.updateAIContext(config);

    console.log('\n✅ Quick setup complete!');
    console.log(`📄 Config saved: ${this.configPath}`);
    console.log(`🤖 AI context updated: ${this.aiContextPath}`);
    console.log('\n🎯 AI agents can now understand your project instantly!');
    console.log('\nNext steps:');
    console.log('- Run: npm run ai:context (to see your config)');
    console.log('- Run: npm run dev (to start development)');
    console.log('- For full setup: npm run generate');
  }

  generateQuickConfig(answers) {
    const domains = {
      'web-app': 'productivity',
      'tool': 'productivity', 
      'dashboard': 'business',
      'game': 'entertainment',
      'api': 'business'
    };

    return {
      "$schema": "./schemas/vibe-project.schema.json",
      "version": "1.0.0",
      "metadata": {
        "name": answers.name,
        "type": answers.type,
        "domain": domains[answers.type] || 'other',
        "description": answers.description,
        "status": "planning",
        "created": new Date().toISOString().split('T')[0],
        "lastUpdated": new Date().toISOString().split('T')[0]
      },
      "audience": {
        "primary": {
          "demographics": answers.users,
          "technicalLevel": "intermediate",
          "devices": ["desktop", "mobile"],
          "usageFrequency": "daily"
        }
      },
      "features": {
        "core": [
          {
            "id": "feature-1",
            "name": "Main Feature",
            "description": "Primary functionality of the application",
            "priority": "critical",
            "complexity": "moderate",
            "estimatedHours": 24
          }
        ]
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
          "authentication": false,
          "realtime": false,
          "offline": false,
          "mobile": true,
          "pwa": false,
          "seo": true
        }
      },
      "testing": {
        "coverage": { "target": 80, "critical": 95 },
        "types": ["unit", "integration", "accessibility", "performance", "security"],
        "automation": { "preCommit": true, "ci": true, "deployment": true }
      },
      "deployment": {
        "platform": "vercel",
        "domain": "",
        "environment": {
          "staging": "",
          "production": ""
        }
      },
      "ai": {
        "context": {
          "businessLogic": `Focus on ${answers.priority} for ${answers.users}`,
          "userWorkflows": "Standard user interaction patterns",
          "constraints": "Must be fast, accessible, and user-friendly",
          "priorities": answers.priority
        },
        "prompts": {
          "development": `Build a ${answers.type} focused on ${answers.priority} for ${answers.users}`,
          "testing": "Emphasize core functionality and user experience",
          "deployment": "Optimize for web deployment and performance"
        }
      }
    };
  }

  saveConfig(config) {
    fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2));
  }

  updateAIContext(config) {
    if (!fs.existsSync(this.aiContextPath)) return;
    
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
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1].endsWith('quick-setup.js')) {
  const setup = new QuickSetup();
  setup.quickSetup().catch(console.error);
}

export default QuickSetup;
