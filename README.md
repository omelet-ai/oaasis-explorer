# OaaSIS Explorer

Interactive exploration graph for Omelet AI's OaaSIS platform architecture.

![OaaSIS Explorer](https://via.placeholder.com/800x400?text=OaaSIS+Explorer)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 🏗️ Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│   Foundation Model  →  Solvers  →  MCP Servers  →  Applications  │
│      (AI Core)        (APIs)    (Domain Logic)    (User Apps)    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Layers

| Layer | Color | Description |
|-------|-------|-------------|
| **Foundation Model** | Purple | Core AI optimization engine |
| **Problem Solvers** | Purple | Domain-agnostic API endpoints |
| **MCP Servers** | Green | Domain-specific integration servers |
| **Applications** | Green | End-user applications |

## ✨ Features

- **Interactive Graph**: Hover over nodes to highlight connections
- **Click Navigation**: Click nodes with links to open related resources
- **Visual Feedback**: Animated edges and node highlighting
- **Responsive**: Zoom, pan, and fit view controls
- **Dark Theme**: Optimized for presentations and booth displays

## 🎯 Interactions

| Action | Result |
|--------|--------|
| **Hover** | Highlight node and all connected nodes |
| **Click** | Open linked resource (API docs, GitHub, App) |
| **Scroll** | Zoom in/out |
| **Drag** | Pan the canvas |
| **Controls** | Zoom, fit view |

## 📁 Project Structure

```
oaasis-explorer/
├── src/
│   ├── components/
│   │   ├── ExplorerCanvas.tsx   # Main ReactFlow canvas
│   │   ├── ExplorerNode.tsx     # Custom node component
│   │   ├── Legend.tsx           # Architecture legend
│   │   └── InfoPanel.tsx        # Node detail panel
│   ├── data/
│   │   └── explorer-data.ts     # Node & edge definitions
│   ├── types/
│   │   └── index.ts             # TypeScript types
│   ├── pages/
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   └── index.tsx
│   └── styles/
│       └── globals.css
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🔧 Customization

### Adding New Nodes

Edit `src/data/explorer-data.ts`:

```typescript
{
  id: 'new-node-id',
  category: 'mcp-server',  // foundation | solver | mcp-server | application
  label: 'New Node Label',
  description: 'Description of this node',
  icon: 'IconName',        // From lucide-react
  link: {
    url: 'https://example.com',
    type: 'external',      // external | api-docs | github | demo | internal
    label: 'Link Label'
  },
  status: 'live',          // live | beta | coming-soon
  tags: ['Tag1', 'Tag2']
}
```

### Adding Connections

```typescript
{ source: 'source-node-id', target: 'target-node-id' }
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
npx vercel
```

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

### Static Export

For static hosting (GitHub Pages, S3, etc.):

```bash
# Update next.config.mjs
# output: 'export'

npm run build
# Output in 'out' directory
```

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **ReactFlow** - Graph visualization
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **TypeScript** - Type safety

## 📄 License

Proprietary - Omelet AI © 2025

---

Built with ❤️ by [Omelet AI](https://omelet.ai)


