'use client';

import { useCallback, useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { ExplorerNode } from './ExplorerNode';
import { HeaderNode } from './HeaderNode';
import { Legend } from './Legend';
import { explorerData } from '@/data/explorer-data';
import { ExplorerNodeData, NodeCategory } from '@/types';

const nodeTypes = {
  explorer: ExplorerNode,
  header: HeaderNode,
};

// Seeded random for consistent organic positioning
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Layout - radial fan expansion from foundation
const COLUMN_X: Record<NodeCategory, number> = {
  foundation: 60,
  solver: 420,
  'mcp-server': 880,
  application: 1450,
};

// Canvas center Y for radial calculations
const CANVAS_CENTER_Y = 350;

// Featured nodes that should open links directly on click
const FEATURED_LINK_NODES = new Set([
  'foundation',
  'routing-engine',
  'tms-mcp',
  'tms-web',
  'tms-mobile',
  'hospital-scheduler',
]);

interface ExplorerCanvasProps {
  embedded?: boolean;
}

function ExplorerCanvasInner({ embedded = false }: ExplorerCanvasProps) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);
  
  const isFocusMode = focusedNodeId !== null;

  // Get upstream path (ancestors) - only traverse from target to source
  const getUpstreamPath = useCallback((nodeId: string) => {
    const pathNodes = new Set<string>([nodeId]);
    const pathEdges = new Set<string>();
    
    const queue = [nodeId];
    const visited = new Set<string>([nodeId]);

    while (queue.length > 0) {
      const current = queue.shift()!;
      
      // Only traverse upstream (target → source direction)
      explorerData.edges.forEach((edge) => {
        if (edge.target === current) {
          // Always add the edge to path (even if source node was visited)
          pathEdges.add(`${edge.source}->${edge.target}`);
          
          // Only continue traversal if node not yet visited
          if (!visited.has(edge.source)) {
            pathNodes.add(edge.source);
            visited.add(edge.source);
            queue.push(edge.source);
          }
        }
      });
    }

    return { nodes: pathNodes, edges: pathEdges };
  }, []);

  // Calculate upstream path for active node
  const upstreamPath = useMemo(() => {
    const activeNodeId = focusedNodeId || hoveredNodeId;
    if (!activeNodeId) return { nodes: new Set<string>(), edges: new Set<string>() };
    return getUpstreamPath(activeNodeId);
  }, [focusedNodeId, hoveredNodeId, getUpstreamPath]);

  const connectedNodeIds = upstreamPath.nodes;
  const connectedEdgeIds = upstreamPath.edges;

  const handleNodeHover = useCallback((nodeId: string | null) => {
    if (!isFocusMode) {
      setHoveredNodeId(nodeId);
    }
  }, [isFocusMode]);

  const handleNodeClick = useCallback((node: ExplorerNodeData) => {
    // If it's a featured node with a link, open the link directly
    if (FEATURED_LINK_NODES.has(node.id) && node.link) {
      window.open(node.link.url, '_blank', 'noopener,noreferrer');
      return;
    }
    
    // Otherwise, toggle focus mode
    if (focusedNodeId === node.id) {
      setFocusedNodeId(null);
    } else {
      setFocusedNodeId(node.id);
      setHoveredNodeId(null);
    }
  }, [focusedNodeId]);

  const handlePaneClick = useCallback(() => {
    if (isFocusMode) {
      setFocusedNodeId(null);
    }
    setHoveredNodeId(null);
  }, [isFocusMode]);

  // Build nodes with radial fan expansion
  const nodes: Node[] = useMemo(() => {
    const solvers = explorerData.nodes.filter(n => n.category === 'solver');
    const mcpServers = explorerData.nodes.filter(n => n.category === 'mcp-server');

    // Calculate spread values for positioning
    const solverSpread = 170;
    const solverTotalHeight = (solvers.length - 1) * solverSpread;
    const mcpSpread = 85;
    const mcpTotalHeight = (mcpServers.length - 1) * mcpSpread;
    const appsPerColumn = 8;
    const appSpread = 75;
    const appTotalHeight = (appsPerColumn - 1) * appSpread;

    // Calculate unified header Y position (aligned to the topmost column)
    const solverTopY = CANVAS_CENTER_Y - solverTotalHeight / 2;
    const mcpTopY = CANVAS_CENTER_Y - mcpTotalHeight / 2;
    const appTopY = CANVAS_CENTER_Y - appTotalHeight / 2;
    const headerY = Math.min(solverTopY, mcpTopY, appTopY) - 60;

    // Header nodes - all aligned at the same Y position
    const headerNodes: Node[] = [
      {
        id: 'header-foundation',
        type: 'header',
        position: { x: COLUMN_X.foundation + 75, y: headerY },
        data: { label: 'Foundation', color: 'rgba(167, 139, 250, 0.8)' },
        draggable: false,
        selectable: false,
      },
      {
        id: 'header-solvers',
        type: 'header',
        position: { x: COLUMN_X.solver + 55, y: headerY },
        data: { label: 'Solvers', color: 'rgba(167, 139, 250, 0.8)' },
        draggable: false,
        selectable: false,
      },
      {
        id: 'header-mcp-servers',
        type: 'header',
        position: { x: COLUMN_X['mcp-server'] + 55, y: headerY },
        data: { label: 'MCP Servers', color: 'rgba(45, 212, 191, 0.8)' },
        draggable: false,
        selectable: false,
      },
      {
        id: 'header-applications',
        type: 'header',
        position: { x: COLUMN_X.application + 30, y: headerY },
        data: { label: 'Applications', color: 'rgba(45, 212, 191, 0.8)' },
        draggable: false,
        selectable: false,
      },
    ];

    const categoryCount: Record<NodeCategory, number> = {
      foundation: 0,
      solver: 0,
      'mcp-server': 0,
      application: 0,
    };

    let globalIndex = 0;

    const explorerNodes: Node[] = explorerData.nodes.map((node) => {
      const rowIndex = categoryCount[node.category]++;
      globalIndex++;
      
      let xPos = COLUMN_X[node.category];
      let yPos = CANVAS_CENTER_Y;
      
      // Organic randomness
      const seed = node.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const randomOffsetX = (seededRandom(seed) - 0.5) * 40;
      const randomOffsetY = (seededRandom(seed + 1) - 0.5) * 25;
      
      switch (node.category) {
        case 'foundation':
          // Center foundation model
          yPos = CANVAS_CENTER_Y;
          xPos += randomOffsetX * 0.2;
          break;
          
        case 'solver':
          // Solvers fan out from center
          yPos = CANVAS_CENTER_Y - solverTotalHeight / 2 + rowIndex * solverSpread;
          xPos += randomOffsetX * 0.5;
          yPos += randomOffsetY * 0.6;
          break;
          
        case 'mcp-server':
          // MCP servers - wider radial fan
          yPos = CANVAS_CENTER_Y - mcpTotalHeight / 2 + rowIndex * mcpSpread;
          
          // Create wave pattern for visual interest
          const waveOffset = Math.sin(rowIndex * 0.8) * 35;
          xPos += waveOffset + randomOffsetX * 0.4;
          yPos += randomOffsetY * 0.4;
          break;
          
        case 'application':
          // Applications - multi-column radial spread (16 apps: 8 per column x 2 columns)
          const col = Math.floor(rowIndex / appsPerColumn);
          const row = rowIndex % appsPerColumn;
          
          xPos = COLUMN_X.application + col * 85;
          yPos = CANVAS_CENTER_Y - appTotalHeight / 2 + row * appSpread;
          
          // Slight stagger offset based on column
          yPos += col * 20;
          xPos += randomOffsetX * 0.5;
          yPos += randomOffsetY * 0.4;
          break;
      }

      return {
        id: node.id,
        type: 'explorer',
        position: { x: xPos, y: yPos },
        data: {
          ...node,
          isHighlighted: hoveredNodeId === node.id,
          isConnected: connectedNodeIds.has(node.id),
          isDimmed: (hoveredNodeId !== null || isFocusMode) && !connectedNodeIds.has(node.id),
          onNodeHover: handleNodeHover,
          onNodeClick: handleNodeClick,
          isFocusMode,
          focusedNodeId,
          animationIndex: globalIndex,
        },
      };
    });

    return [...headerNodes, ...explorerNodes];
  }, [hoveredNodeId, connectedNodeIds, handleNodeHover, handleNodeClick, isFocusMode, focusedNodeId]);

  // Build edges - curved for radial look
  // Highlight only upstream path edges when hovering/focusing a node
  const edges: Edge[] = useMemo(() => {
    const hasActiveNode = hoveredNodeId !== null || isFocusMode;
    
    return explorerData.edges.map((edge, index) => {
      const edgeKey = `${edge.source}->${edge.target}`;
      const isOnPath = connectedEdgeIds.has(edgeKey);
      const sourceNode = explorerData.nodes.find(n => n.id === edge.source);
      
      // Get color based on source category
      const getEdgeColor = () => {
        if (sourceNode?.category === 'foundation') return '#A78BFA'; // violet
        if (sourceNode?.category === 'solver') return '#A78BFA'; // violet
        return '#2DD4BF'; // teal for MCP connections
      };

      return {
        id: `edge-${index}`,
        source: edge.source,
        target: edge.target,
        type: 'smoothstep',
        animated: isOnPath && hasActiveNode,
        style: {
          stroke: isOnPath && hasActiveNode
            ? getEdgeColor()
            : hasActiveNode
              ? 'rgba(0,0,0,0.05)' // dim non-path edges when hovering
              : 'rgba(167, 139, 250, 0.25)', // default subtle color
          strokeWidth: isOnPath && hasActiveNode ? 2.5 : 1,
          filter: isOnPath && hasActiveNode ? `drop-shadow(0 0 8px ${getEdgeColor()}80)` : 'none',
          transition: 'all 0.3s ease',
        },
      };
    });
  }, [connectedEdgeIds, hoveredNodeId, isFocusMode]);

  const [flowNodes, setFlowNodes, onNodesChange] = useNodesState(nodes);
  const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState(edges);

  useEffect(() => {
    setFlowNodes(nodes);
    setFlowEdges(edges);
  }, [nodes, edges, setFlowNodes, setFlowEdges]);

  const containerHeight = embedded ? 'h-[750px]' : 'h-screen';

  return (
    <div className={`w-full ${containerHeight} relative overflow-hidden`} style={{ background: '#FFFFFF' }}>
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[5%] left-[5%] w-[600px] h-[600px] ambient-violet rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] ambient-teal rounded-full blur-[120px] opacity-40" />
      </div>

      {/* Header - only show if not embedded */}
      {!embedded && (
        <header className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-white via-white/95 to-transparent">
          <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Image src="/omelet-full-purple.svg" alt="Omelet" width={120} height={32} className="h-8 w-auto" />
              </div>
              <div className="border-l border-gray-200 pl-4">
                <h1 className="text-gray-900 font-bold text-xl tracking-tight">
                  Decision <span className="gradient-text-mixed">OS</span>
                </h1>
                <p className="text-gray-500 text-xs"><span className="gradient-text-mixed font-medium">OaaSIS</span> Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              {isFocusMode && (
                <button
                  onClick={() => setFocusedNodeId(null)}
                  className="text-sm glass text-gray-600 px-4 py-2 rounded-xl transition-all hover:bg-gray-100"
                >
                  ✕ Exit Focus
                </button>
              )}
              <a
                href="https://omelet.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
              >
                omelet.ai →
              </a>
            </div>
          </div>
        </header>
      )}

      {/* ReactFlow Canvas */}
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onPaneClick={handlePaneClick}
        onNodeClick={(_, node) => {
          const nodeData = node.data as ExplorerNodeData;
          // Featured nodes open links directly
          if (FEATURED_LINK_NODES.has(node.id) && nodeData.link) {
            window.open(nodeData.link.url, '_blank');
            return;
          }
          // Other nodes toggle focus
          handleNodeClick(nodeData);
        }}
        fitView
        fitViewOptions={{ padding: 0.08, minZoom: 0.35, maxZoom: 1.2 }}
        minZoom={0.25}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={true}
      >
        <Background color="transparent" />
        <Controls
          className="!bg-white/95 !border-gray-200 !rounded-xl !shadow-lg"
          showInteractive={false}
        />
        {!embedded && (
          <MiniMap
            nodeColor={(node) => {
              const data = node.data as ExplorerNodeData;
              if (data.category === 'foundation' || data.category === 'solver') return '#A78BFA';
              return '#2DD4BF';
            }}
            maskColor="rgba(255, 255, 255, 0.9)"
            className="!bg-white/95 !border-gray-200 !rounded-xl"
            pannable
            zoomable
          />
        )}
      </ReactFlow>

      {/* Legend */}
      {!embedded && <Legend />}

      {/* Hints */}
      {!embedded && (
        <div className={`
          absolute bottom-6 right-6 text-xs glass px-4 py-2.5 rounded-xl
          transition-all duration-300
          ${isFocusMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}>
          <span className="text-gray-500">Click to focus</span>
          <span className="text-gray-400 mx-2">•</span>
          <span className="text-gray-500">Hover to explore</span>
        </div>
      )}

      {/* Infinity symbol */}
      <div className="absolute bottom-1/4 right-16 text-[#2DD4BF]/20 text-9xl font-extralight pointer-events-none select-none">
        ∞
      </div>
    </div>
  );
}

export default function ExplorerCanvas({ embedded = false }: ExplorerCanvasProps) {
  return (
    <ReactFlowProvider>
      <ExplorerCanvasInner embedded={embedded} />
    </ReactFlowProvider>
  );
}
