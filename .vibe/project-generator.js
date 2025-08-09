#!/usr/bin/env node

/**
 * Vibe Project Generator
 * Converts questionnaire answers to structured config and generates AI context
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class VibeProjectGenerator {
  constructor() {
    this.configPath = path.join(process.cwd(), 'vibe-project.config.json');
    this.aiContextPath = path.join(process.cwd(), '.vibe', 'ai-context.md');
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
    // This would use a CLI library like inquirer in a real implementation
    return {
      name: 'My Awesome Project',
      type: 'web-app',
      domain: 'productivity',
      description: 'A tool that helps users be more productive',
      primaryUsers: 'Busy professionals and students',
      technicalLevel: 'intermediate',
      coreFeatures: [
        { name: 'Task Management', priority: 'critical', complexity: 'moderate' },
        { name: 'Time Tracking', priority: 'high', complexity: 'simple' },
        { name: 'Reporting', priority: 'medium', complexity: 'complex' }
      ]
    };
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
          "devices": ["desktop", "mobile"],
          "usageFrequency": "daily"
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
      "ai": {
        "context": {
          "businessLogic": "Focus on user productivity and efficiency",
          "userWorkflows": "Users create tasks, track time, generate reports",
          "constraints": "Must be fast, accessible, and mobile-friendly",
          "priorities": "User experience and performance are critical"
        }
      }
    };
  }

  estimateHours(complexity) {
    const estimates = { simple: 8, moderate: 24, complex: 48 };
    return estimates[complexity] || 16;
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
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new VibeProjectGenerator();
  generator.generateFromQuestionnaire().catch(console.error);
}

export default VibeProjectGenerator;
