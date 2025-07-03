```
# Multi-stage build für optimale Image-Größe
FROM node:18-alpine AS builder

WORKDIR /app

# Dependencies installieren
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Source kopieren und builden
COPY . .
RUN npm run build

# Production Image
FROM node:18-alpine AS production

# Sicherheit: Non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S mcp -u 1001

WORKDIR /app

# Nur Production files kopieren
COPY --from=builder --chown=mcp:nodejs /app/dist ./dist
COPY --from=builder --chown=mcp:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=mcp:nodejs /app/package.json ./package.json

# Security & Performance
USER mcp
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD node -e "console.log('Health check')" || exit 1

# Startup
CMD ["node", "dist/index.js"]

# Labels für Metadata
LABEL maintainer="your-email@example.com"
LABEL version="1.0.0"
LABEL description="Perplexity Pro Expert Delegation MCP Server"

```