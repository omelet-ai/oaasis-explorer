'use client';

import { memo } from 'react';
import { NodeProps } from 'reactflow';

interface HeaderNodeData {
  label: string;
  color: string;
}

export const HeaderNode = memo(({ data }: NodeProps<HeaderNodeData>) => (
  <div className="pointer-events-none select-none">
    <span 
      className="text-[13px] font-bold uppercase tracking-[0.2em]"
      style={{ color: data.color, opacity: 0.8 }}
    >
      {data.label}
    </span>
  </div>
));

HeaderNode.displayName = 'HeaderNode';

