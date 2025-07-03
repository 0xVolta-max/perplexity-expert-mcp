## **Installation & Deployment**

### **Lokale Installation**

```bash
# 1. Repository setup
git clone <your-repo>
cd perplexity-expert-mcp

# 2. Installation
npm install

# 3. Konfiguration
cp .env.example .env
# Bearbeiten Sie .env und fügen Sie Ihren API-Schlüssel hinzu

# 4. Build & Test
npm run build
npm start

# 5. Global installieren
npm install -g .

```

### **Docker Deployment**

```bash
# Build
docker build -t perplexity-expert-mcp .

# Run
docker run -e PERPLEXITY_API_KEY=pplx-your-key perplexity-expert-mcp

```

### **Production Setup auf VPS**

```bash
# 1. Installation auf Server
npm install -g perplexity-expert-mcp

# 2. Systemd Service erstellen
sudo nano /etc/systemd/system/perplexity-mcp.service

```

```
[Unit]
Description=Perplexity Expert MCP Server
After=network.target

[Service]
Type=simple
User=mcp
WorkingDirectory=/opt/perplexity-mcp
Environment=PERPLEXITY_API_KEY=pplx-your-key
ExecStart=/usr/bin/node dist/index.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target

```

```bash
# 3. Service aktivieren
sudo systemctl enable perplexity-mcp
sudo systemctl start perplexity-mcp

```