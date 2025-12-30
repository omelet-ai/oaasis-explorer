# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server on port 3000
npm run build    # Production build
npm run start    # Start production server on port 3000
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 15 application that visualizes Omelet AI's OaaSIS platform architecture as an interactive graph using ReactFlow.

### Data Flow

The visualization is driven by `src/data/explorer-data.ts` which defines:
- **Nodes**: Platform components with category, label, description, icon, status, and optional links
- **Edges**: Connections between nodes (source → target relationships)

Node categories form a 4-layer hierarchy:
1. **foundation** - Core AI engine (single node)
2. **solver** - Domain-agnostic optimization APIs (Routing, Scheduling, Packaging, Inventory)
3. **mcp-server** - Domain-specific MCP servers
4. **application** - End-user applications

### Key Components

- `ExplorerCanvas.tsx` - Main ReactFlow wrapper with layout logic, hover/focus state management, and upstream path highlighting
- `ExplorerNode.tsx` - Custom node renderer with category-based styling, icons from lucide-react, and interaction handlers
- `LandingPage.tsx` - Landing page that embeds ExplorerCanvas
- `HeaderNode.tsx` - Column header labels for each layer

### Layout System

Nodes are positioned in columns by category (`COLUMN_X` in ExplorerCanvas). The layout uses:
- Radial fan expansion from the foundation node
- Seeded random offsets for organic positioning
- Multi-column arrangement for application nodes

### Interaction Model

- **Hover**: Highlights upstream path (node → foundation direction)
- **Click on featured nodes**: Opens external link directly
- **Click on other nodes**: Enters focus mode showing details
- Featured nodes are defined in `FEATURED_LINK_NODES` set

### Styling

- Tailwind CSS with custom color palette (lavender, violet, teal, emerald)
- Category-based gradients and accent colors defined in `categoryStyles`
- Custom animations (float, glow, pulse) in `tailwind.config.js`

### Path Alias

`@/*` maps to `src/*` (configured in tsconfig.json)
