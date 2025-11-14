import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import * as dotenv from 'dotenv';

dotenv.config();

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const mkdir = promisify(fs.mkdir);

interface ServiceDefinition {
  slug: string;
  name: string;
  layout: string;
}

interface GeneratedService {
  layoutKey: string;
  mainDescription: string;
  faqs: Array<{ question: string; answer: string }>;
  inclusions: string[];
  commonSituations: string[];
  complianceNote: string;
  exampleCapability: {
    disclaimer: string;
    serviceType: string;
    location: string;
    scope: string;
    clientSituation: string;
    ourApproach: string;
    expectedOutcome: string;
    contactCTA: string;
  };
}

interface LogEntry {
  timestamp: string;
  type: 'info' | 'api_call' | 'api_response' | 'error' | 'category_change';
  message: string;
  data?: any;
}

class ContentGenerator {
  private openai: OpenAI;
  private logEntries: LogEntry[] = [];
  private logFilePath: string;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }
    this.openai = new OpenAI({ apiKey });
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.logFilePath = path.join(
      process.cwd(),
      'logs',
      `content-generation-${timestamp}.log`
    );
  }

  private log(type: LogEntry['type'], message: string, data?: any) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      type,
      message,
      data,
    };
    this.logEntries.push(entry);
    console.log(`[${entry.timestamp}] ${type.toUpperCase()}: ${message}`);
  }

  private async saveLog() {
    try {
      await mkdir(path.dirname(this.logFilePath), { recursive: true });
      await writeFile(this.logFilePath, JSON.stringify(this.logEntries, null, 2));
      this.log('info', `Log saved to ${this.logFilePath}`);
    } catch (error) {
      console.error('Failed to save log:', error);
    }
  }

  private parsePromptFile(content: string): {
    mission: string;
    services: ServiceDefinition[];
    requirements: string;
  } {
    const lines = content.split('\n');
    const missionMatch = content.match(/## Your Mission\n([\s\S]*?)(?=\n##|$)/);
    const servicesMatch = content.match(/## Services In This Batch.*?\n([\s\S]*?)(?=\n##|$)/);
    const requirementsMatch = content.match(/## Content Requirements[\s\S]*/);

    const mission = missionMatch ? missionMatch[1].trim() : '';
    const requirements = requirementsMatch ? requirementsMatch[0] : '';

    const services: ServiceDefinition[] = [];
    if (servicesMatch) {
      const serviceLines = servicesMatch[1].split('\n').filter(line => line.trim().match(/^\d+\)/));
      for (const line of serviceLines) {
        const match = line.match(/^\d+\)\s+([\w-]+)\s+—\s+(.+?)\s+Layout:\s+(\w+)/);
        if (match) {
          services.push({
            slug: match[1],
            name: match[2],
            layout: match[3],
          });
        }
      }
    }

    return { mission, services, requirements };
  }

  private async generateServiceContent(
    service: ServiceDefinition,
    promptContent: string
  ): Promise<GeneratedService> {
    this.log('info', `Generating content for service: ${service.name}`);

    const systemPrompt = `You are a content writer specializing in SEO-optimized content for 1031 exchange services. Generate content that is informative, compliant, and optimized for search engines.`;

    const userPrompt = `${promptContent}

Generate content for the following service:
- Slug: ${service.slug}
- Name: ${service.name}
- Layout: ${service.layout}

Return the content as a JSON object matching this exact structure:
{
  "layoutKey": "${service.layout}",
  "mainDescription": "<p>...</p><p>...</p>",
  "faqs": [
    {"question": "...", "answer": "..."}
  ],
  "inclusions": ["...", "..."],
  "commonSituations": ["...", "..."],
  "complianceNote": "Educational content only. Not tax, legal, or investment advice. 1031 defers income tax on qualifying real property and does not remove transfer or documentary taxes.",
  "exampleCapability": {
    "disclaimer": "Example of the type of engagement we can handle",
    "serviceType": "${service.name}",
    "location": "Oklahoma City, OK",
    "scope": "...",
    "clientSituation": "...",
    "ourApproach": "...",
    "expectedOutcome": "...",
    "contactCTA": "Contact us to discuss your situation in Oklahoma City, OK. We can share references upon request."
  }
}

Ensure:
- Main description is 220-300 words, mentions Oklahoma City, OK once, includes 45-day and 180-day timing references
- FAQs include 4-6 items, each answer includes "Oklahoma City, OK", at least one identification rules question and one boot question
- Inclusions has 5-8 bullet points
- Common situations has 3 short examples
- All content follows the requirements in the prompt`;

    try {
      this.log('api_call', `Calling OpenAI API for ${service.name}`, { service: service.slug });
      
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      });

      const responseContent = completion.choices[0]?.message?.content;
      this.log('api_response', `Received response for ${service.name}`, {
        service: service.slug,
        tokens: completion.usage,
        responseLength: responseContent?.length,
      });

      if (!responseContent) {
        throw new Error('No content in API response');
      }

      const parsed = JSON.parse(responseContent);
      return parsed as GeneratedService;
    } catch (error: any) {
      this.log('error', `Error generating content for ${service.name}`, {
        service: service.slug,
        error: error.message,
      });
      throw error;
    }
  }

  async generate(promptFilePath: string, outputFilePath: string) {
    try {
      this.log('info', `Starting content generation from ${promptFilePath}`);

      const promptContent = await readFile(promptFilePath, 'utf-8');
      const { mission, services, requirements } = this.parsePromptFile(promptContent);

      this.log('info', `Parsed ${services.length} services from prompt file`);
      this.log('info', `Mission: ${mission}`);

      const generatedServices: Record<string, GeneratedService> = {};

      for (const service of services) {
        try {
          const content = await this.generateServiceContent(service, promptContent);
          generatedServices[service.slug] = content;
          this.log('info', `Successfully generated content for ${service.name}`);
          
          // Small delay between API calls
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error: any) {
          this.log('error', `Failed to generate content for ${service.name}`, {
            error: error.message,
          });
          throw error;
        }
      }

      // Determine export name from file path
      const fileName = path.basename(outputFilePath, '.ts');
      const exportName = fileName.replace(/-/g, '').replace(/([a-z])([A-Z])/g, '$1$2');
      const camelCaseExport = exportName.charAt(0).toLowerCase() + exportName.slice(1);

      // Generate TypeScript output
      const output = `export const ${camelCaseExport} = ${JSON.stringify(generatedServices, null, 2)};\n`;

      await writeFile(outputFilePath, output);
      this.log('info', `Content written to ${outputFilePath}`);

      await this.saveLog();
      this.log('info', 'Content generation completed successfully');

      return generatedServices;
    } catch (error: any) {
      this.log('error', 'Content generation failed', { error: error.message });
      await this.saveLog();
      throw error;
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('Usage: tsx scripts/generate-content.ts <prompt-file-path>');
    console.error('Example: tsx scripts/generate-content.ts prompts/services/batch-01.md');
    process.exit(1);
  }

  const promptFilePath = path.resolve(process.cwd(), args[0]);
  
  // Determine output path from prompt path
  const promptDir = path.dirname(promptFilePath);
  const promptFileName = path.basename(promptFilePath, '.md');
  const outputDir = promptDir.replace('/prompts/', '/data/batches/');
  const outputFilePath = path.join(outputDir, `${promptFileName}.ts`);

  const generator = new ContentGenerator();
  
  try {
    await generator.generate(promptFilePath, outputFilePath);
    console.log('\n✓ Content generation completed successfully!');
    process.exit(0);
  } catch (error: any) {
    console.error('\n✗ Content generation failed:', error.message);
    process.exit(1);
  }
}

main();

