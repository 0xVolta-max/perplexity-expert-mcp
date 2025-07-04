{
  "name": "perplexity-expert-mcp",
  "version": "1.0.0",
  "description": "MCP Server für Expert-LLM Delegation via Perplexity Pro API",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsx src/index.ts",
    "clean": "rm -rf dist",
    "prepack": "npm run build",
    "test": "echo \"No tests specified\" && exit 0"
  },
  "bin": {
    "perplexity-expert-mcp": "dist/index.js"
  },
  "keywords": [
    "mcp",
    "perplexity",
    "ai",
    "llm",
    "claude",
    "gemini",
    "expert-delegation"
  ],
  "author": "Björn Ritzmann",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/0xVolta-max/perplexity-expert-mcp.git"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "zod": "^3.22.4",
    "axios": "^1.6.8",
    "dotenv": "^16.4.5"
  },
  "devDependencies": {
    "typescript": "^5.4.3",
    "@types/node": "^20.12.7",
    "tsx": "^4.7.2"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
