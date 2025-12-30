'use client';

import { memo, useCallback, useMemo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import {
  Brain, Route, Calendar, Package, Warehouse, Truck, Thermometer,
  Heart, Users, Building2, Store, Globe, Smartphone, Monitor,
  CalendarCheck, BarChart3, ExternalLink, Github, FileCode, Play,
  Ship, Box, Factory, Settings, Database, TrendingUp, Plane,
  ShoppingCart, Layers, Network, Target, LineChart, Clock, MapPin,
  LucideIcon
} from 'lucide-react';
import { ExplorerNodeData, LinkType } from '@/types';

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Brain, Route, Calendar, Package, Warehouse, Truck, Thermometer,
  Heart, Users, Building2, Store, Globe, Smartphone, Monitor,
  CalendarCheck, BarChart3, Ship, Box, Factory, Settings, Database, 
  TrendingUp, Plane, ShoppingCart, Layers, Network, Target, LineChart, Clock, MapPin
};

const linkIconMap: Record<LinkType, LucideIcon> = {
  'external': ExternalLink,
  'api-docs': FileCode,
  'github': Github,
  'demo': Play,
  'internal': ExternalLink,
};

// Refined color palette
const categoryStyles: Record<string, { bg: string; border: string; glow: string; accent: string }> = {
  foundation: {
    bg: 'bg-gradient-to-br from-[#1a1625] to-[#0f0d15]',
    border: 'border-[#A78BFA]/50',
    glow: 'shadow-[0_0_60px_rgba(167,139,250,0.4)]',
    accent: '#A78BFA',
  },
  solver: {
    bg: 'bg-gradient-to-br from-[#181420] to-[#0d0b12]',
    border: 'border-[#8B5CF6]/40',
    glow: 'shadow-[0_0_40px_rgba(139,92,246,0.35)]',
    accent: '#8B5CF6',
  },
  'mcp-server': {
    bg: 'bg-gradient-to-br from-[#0f1a1a] to-[#0a1212]',
    border: 'border-[#2DD4BF]/40',
    glow: 'shadow-[0_0_40px_rgba(45,212,191,0.35)]',
    accent: '#2DD4BF',
  },
  application: {
    bg: 'bg-gradient-to-br from-[#101818] to-[#0a1010]',
    border: 'border-[#34D399]/30',
    glow: 'shadow-[0_0_25px_rgba(52,211,153,0.3)]',
    accent: '#34D399',
  },
};

const statusStyles: Record<string, string> = {
  live: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  beta: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  'coming-soon': 'bg-gray-500/15 text-gray-400 border-gray-500/30',
};

// Only these nodes should show prominent link indicators
const FEATURED_LINK_NODES = new Set([
  'foundation',        // Foundation Model
  'routing-engine',    // Routing Solver
  'tms-mcp',          // TMS MCP Server
  'tms-web',          // TMS Web Application
  'tms-mobile',       // TMS Mobile Application
  'hospital-scheduler' // Nurse Scheduler Application
]);

interface ExplorerNodeProps extends NodeProps {
  data: ExplorerNodeData & {
    onNodeHover: (nodeId: string | null) => void;
    onNodeClick: (node: ExplorerNodeData) => void;
    isFocusMode: boolean;
    focusedNodeId: string | null;
    animationIndex: number;
  };
}

export const ExplorerNode = memo(({ data, id }: ExplorerNodeProps) => {
  const Icon = iconMap[data.icon] || Brain;
  const LinkIcon = data.link ? linkIconMap[data.link.type] : null;
  const styles = categoryStyles[data.category];
  
  const isFocused = data.focusedNodeId === id;
  const isConnectedInFocus = data.isFocusMode && data.isConnected && data.focusedNodeId !== id;
  const isUnfocused = data.isFocusMode && data.focusedNodeId !== id && !data.isConnected;
  
  const floatClass = useMemo(() => {
    const animations = ['float-animation-1', 'float-animation-2', 'float-animation-3', 'float-animation-4', 'float-animation-5'];
    return animations[data.animationIndex % 5];
  }, [data.animationIndex]);
  
  const animationDelay = useMemo(() => {
    return `${(data.animationIndex * 0.5) % 4}s`;
  }, [data.animationIndex]);
  
  const handleMouseEnter = useCallback(() => {
    if (!data.isFocusMode) data.onNodeHover(data.id);
  }, [data]);
  
  const handleMouseLeave = useCallback(() => {
    if (!data.isFocusMode) data.onNodeHover(null);
  }, [data]);

  // Check if this is a featured node with link (defined early for use in handleClick)
  const isFeaturedLink = FEATURED_LINK_NODES.has(data.id) && !!data.link;
  
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    // For featured nodes with links, open the link directly
    if (isFeaturedLink && data.link) {
      // Use window.open with fallback
      const newWindow = window.open(data.link.url, '_blank');
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        // Popup blocked - try direct navigation
        window.location.href = data.link.url;
      }
      return;
    }
    data.onNodeClick(data);
  }, [data, isFeaturedLink]);
  
  const getStateClasses = () => {
    if (isFocused) return 'focused';
    if (isUnfocused) return 'unfocused';
    if (isConnectedInFocus) return 'connected-focus';
    if (!data.isFocusMode && data.isHighlighted) return 'scale-105 z-50';
    if (!data.isFocusMode && data.isDimmed) return 'opacity-15 scale-95';
    if (!data.isFocusMode && data.isConnected && !data.isHighlighted) return 'ring-1 ring-offset-1 ring-offset-[#0A0A0F]';
    return '';
  };
  
  const ringColor = data.category === 'foundation' || data.category === 'solver' 
    ? 'ring-[#A78BFA]/50' 
    : 'ring-[#2DD4BF]/50';

  const getSizeClass = () => {
    switch (data.category) {
      case 'foundation': return 'min-w-[250px] max-w-[280px]';
      case 'solver': return 'min-w-[200px] max-w-[230px]';
      case 'mcp-server': return 'min-w-[220px] max-w-[250px]';
      case 'application': return 'w-[52px] h-[52px]';
      default: return 'min-w-[140px]';
    }
  };

  const isCompact = data.category === 'application';
  const shouldAnimate = !data.isFocusMode && !data.isDimmed && !data.isHighlighted;

  const hasLink = !!data.link;
  const showLinkIndicator = isFeaturedLink;
  const isComingSoon = !isFeaturedLink; // Not a featured link = Coming Soon
  
  const clickableClass = showLinkIndicator && !isFocused && !data.isDimmed
    ? (data.category === 'foundation' || data.category === 'solver' 
       ? 'clickable-violet' 
       : 'clickable-teal')
    : '';

  return (
    <div
      className={`
        explorer-node group relative rounded-2xl border
        cursor-pointer backdrop-blur-sm
        ${styles.bg} ${styles.border}
        ${isFocused ? styles.glow : ''}
        ${shouldAnimate && !hasLink ? floatClass : ''}
        ${clickableClass}
        ${getStateClasses()}
        ${!isUnfocused && data.isConnected ? ringColor : ''}
        ${getSizeClass()}
        ${showLinkIndicator ? 'hover:scale-[1.05] hover:shadow-xl featured-link-node' : ''}
        transition-all duration-200
      `}
      style={{ 
        animationDelay: shouldAnimate ? animationDelay : '0s',
        ...(showLinkIndicator && !isFocused ? { boxShadow: `0 0 0 2px ${styles.accent}60, 0 0 20px ${styles.accent}30` } : {})
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {data.category !== 'foundation' && (
        <Handle
          type="target"
          position={Position.Left}
          className="!w-1.5 !h-1.5 !bg-white/20 !border-0"
        />
      )}
      
      <div className={isCompact ? 'p-2.5' : 'p-3.5'}>
        {isCompact ? (
          <div className="flex items-center justify-center relative">
            <div 
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{ background: `${styles.accent}15` }}
            >
              <Icon className="w-4 h-4" style={{ color: styles.accent }} />
            </div>
            {/* Hover tooltip for application nodes */}
            {!isFocused && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg bg-gray-900/95 border border-white/10 text-white text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
                {data.label}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-gray-900/95" />
              </div>
            )}
          </div>
        ) : (
          <>
            <div className={`flex gap-3 ${data.category === 'foundation' ? 'items-center' : 'items-start'}`}>
              <div 
                className={`
                  rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300
                  ${data.category === 'foundation' ? 'w-12 h-12' : 'w-9 h-9'}
                `}
                style={{ background: `${styles.accent}15` }}
              >
                <Icon 
                  className={data.category === 'foundation' ? 'w-6 h-6' : 'w-4.5 h-4.5'}
                  style={{ color: styles.accent }}
                />
              </div>
              
              <div className={`flex-1 min-w-0 ${data.category === 'foundation' ? 'flex items-center' : ''}`}>
                <div className={`
                  text-white font-semibold leading-tight whitespace-nowrap
                  ${data.category === 'foundation' ? 'text-[17px]' : 'text-[15px]'}
                `}>
                  {data.label}
                </div>
                
                {(data.category === 'solver' || data.category === 'mcp-server') && (
                  <div 
                    className="text-[11px] mt-0.5 font-medium opacity-70"
                    style={{ color: styles.accent }}
                  >
                    {data.category === 'solver' ? 'Solver' : 'MCP Server'}
                  </div>
                )}
                
                {data.status !== 'live' && (
                  <span className={`
                    inline-block text-[9px] px-1.5 py-0.5 rounded-full mt-1
                    border ${statusStyles[data.status]}
                  `}>
                    {data.status === 'coming-soon' ? 'Soon' : 'Beta'}
                  </span>
                )}
              </div>
            </div>
            
            {isFocused && (
              <div className="mt-4 pt-3 border-t border-white/5 fade-in">
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  {data.description}
                </p>
                
                {/* Show link button only for featured (Live) nodes */}
                {isFeaturedLink && data.link && LinkIcon ? (
                  <button 
                    className="mt-3 w-full flex items-center justify-center gap-2 text-[11px] rounded-xl px-3 py-2.5 transition-all duration-200 font-medium text-white"
                    style={{ background: styles.accent }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (data.link) window.open(data.link.url, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>{data.link.label}</span>
                  </button>
                ) : (
                  /* Coming Soon message for non-featured nodes */
                  <div className="mt-3 w-full flex items-center justify-center gap-2 text-[11px] rounded-xl px-3 py-2.5 bg-gray-700/30 border border-gray-600/30 text-gray-400 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Coming Soon</span>
                  </div>
                )}
                
                {data.tags && data.tags.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {data.tags.map((tag) => (
                      <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/5 text-white/40">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
        
        {isCompact && isFocused && (
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 w-56 glass rounded-2xl p-4 z-50 shadow-2xl info-panel-enter">
            <div className="text-white font-medium text-sm mb-2">{data.label}</div>
            <p className="text-gray-500 text-[11px] leading-relaxed mb-3">{data.description}</p>
            {isFeaturedLink && data.link && LinkIcon ? (
              <button 
                className="w-full flex items-center justify-center gap-2 text-[11px] text-white rounded-xl px-3 py-2 transition-all font-medium"
                style={{ background: styles.accent }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (data.link) window.open(data.link.url, '_blank', 'noopener,noreferrer');
                }}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>{data.link.label}</span>
              </button>
            ) : (
              <div className="w-full flex items-center justify-center gap-2 text-[11px] rounded-xl px-3 py-2 bg-gray-700/30 border border-gray-600/30 text-gray-400 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>Coming Soon</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Clickable indicator - External link icon (only for featured nodes) */}
      {showLinkIndicator && !isFocused && !isCompact && (
        <div 
          className="absolute -top-2 -right-2 z-10 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (data.link) {
              const newWindow = window.open(data.link.url, '_blank');
              if (!newWindow) window.location.href = data.link.url;
            }
          }}
        >
          {/* External link arrow - bright and eye-catching with pulse animation */}
          <div 
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-125 link-pulse"
            style={{ 
              background: styles.accent,
              boxShadow: `0 0 12px ${styles.accent}80`,
            }}
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#0A0A0F]" />
          </div>
        </div>
      )}
      
      {/* Clickable indicator for compact (application) nodes - only for featured */}
      {showLinkIndicator && !isFocused && isCompact && (
        <div 
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center transition-all hover:scale-125 cursor-pointer link-pulse"
          style={{ 
            background: styles.accent,
            boxShadow: `0 0 10px ${styles.accent}80`,
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (data.link) {
              const newWindow = window.open(data.link.url, '_blank');
              if (!newWindow) window.location.href = data.link.url;
            }
          }}
        >
          <ExternalLink className="w-3 h-3 text-[#0A0A0F]" />
        </div>
      )}
      
      {data.category !== 'application' && (
        <Handle
          type="source"
          position={Position.Right}
          className="!w-1.5 !h-1.5 !bg-white/20 !border-0"
        />
      )}
    </div>
  );
});

ExplorerNode.displayName = 'ExplorerNode';
