export type NodeCategory = 'foundation' | 'solver' | 'mcp-server' | 'application';

export type NodeStatus = 'live' | 'beta' | 'coming-soon';

export type LinkType = 'internal' | 'external' | 'api-docs' | 'demo' | 'github';

export interface NodeLink {
  url: string;
  type: LinkType;
  label: string;
}

export interface OaaSISNode {
  id: string;
  category: NodeCategory;
  label: string;
  description: string;
  icon: string;
  link?: NodeLink;
  status: NodeStatus;
  tags?: string[];
}

export interface OaaSISEdge {
  source: string;
  target: string;
}

export interface ExplorerData {
  nodes: OaaSISNode[];
  edges: OaaSISEdge[];
}

// ReactFlow extended data
export interface ExplorerNodeData extends OaaSISNode {
  isHighlighted: boolean;
  isConnected: boolean;
  isDimmed: boolean;
}


