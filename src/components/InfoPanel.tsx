import { X, ExternalLink, Github, FileCode, Play, LucideIcon } from 'lucide-react';
import { OaaSISNode, LinkType } from '@/types';

const linkIcons: Record<LinkType, LucideIcon> = {
  external: ExternalLink,
  'api-docs': FileCode,
  github: Github,
  demo: Play,
  internal: ExternalLink,
};

interface InfoPanelProps {
  node: OaaSISNode;
  onClose: () => void;
}

export function InfoPanel({ node, onClose }: InfoPanelProps) {
  const LinkIcon = node.link ? linkIcons[node.link.type] : null;

  return (
    <div className="absolute top-20 right-6 z-50 w-80 bg-white backdrop-blur-sm
                    rounded-xl border border-gray-200 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className={`
        p-4 border-b border-gray-200
        ${node.category === 'foundation' || node.category === 'solver'
          ? 'bg-purple-50'
          : 'bg-emerald-50'}
      `}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-gray-900 font-bold">{node.label}</h3>
            <span className={`
              text-xs px-2 py-0.5 rounded-full mt-1 inline-block
              ${node.category === 'foundation' || node.category === 'solver'
                ? 'bg-purple-100 text-purple-700'
                : 'bg-emerald-100 text-emerald-700'}
            `}>
              {node.category.replace('-', ' ')}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        <p className="text-gray-600 text-sm">{node.description}</p>

        {/* Tags */}
        {node.tags && node.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {node.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Link */}
        {node.link && LinkIcon && (
          <a
            href={node.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              flex items-center gap-2 px-4 py-3 rounded-lg
              transition-all duration-200 group
              ${node.category === 'foundation' || node.category === 'solver'
                ? 'bg-purple-600 hover:bg-purple-500 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'}
            `}
          >
            <LinkIcon className="w-4 h-4" />
            <span className="font-medium">{node.link.label}</span>
            <ExternalLink className="w-3 h-3 ml-auto opacity-60 group-hover:opacity-100" />
          </a>
        )}
      </div>
    </div>
  );
}


