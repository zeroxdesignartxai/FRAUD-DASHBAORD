
import React from 'react';
import { Entity, EntityLink, EntityType } from '../types';

interface EntityGraphProps {
  entities: Entity[];
  links: EntityLink[];
}

const EntityTypeColors: Record<EntityType, string> = {
  [EntityType.PERSON]: '#3b82f6',
  [EntityType.ORGANIZATION]: '#10b981',
  [EntityType.EMAIL]: '#f59e0b',
  [EntityType.PHONE]: '#8b5cf6',
  [EntityType.DOMAIN]: '#06b6d4',
  [EntityType.IP]: '#6366f1',
  [EntityType.ADDRESS]: '#f43f5e',
  [EntityType.BANK_ACCOUNT]: '#14b8a6',
  [EntityType.CRYPTO_WALLET]: '#f97316'
};

const EntityGraph: React.FC<EntityGraphProps> = ({ entities, links }) => {
  // Simple force-simulation-like calculation (static grid for demo)
  const nodePositions = entities.reduce((acc: any, entity, index) => {
    const angle = (index / entities.length) * 2 * Math.PI;
    const radius = 150;
    acc[entity.id] = {
      x: 300 + Math.cos(angle) * radius,
      y: 250 + Math.sin(angle) * radius
    };
    return acc;
  }, {});

  return (
    <div className="relative bg-white rounded-xl border border-slate-200 overflow-hidden min-h-[500px] flex items-center justify-center">
      <div className="absolute top-4 left-4 p-4 bg-white/80 backdrop-blur rounded-lg border border-slate-100 shadow-sm z-10">
        <h4 className="font-bold text-slate-800 text-sm mb-2">Relationship Link Map</h4>
        <div className="space-y-1">
          {Object.entries(EntityTypeColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              {type}
            </div>
          ))}
        </div>
      </div>

      <svg width="600" height="500" className="drop-shadow-sm">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="15" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
          </marker>
        </defs>

        {/* Links */}
        {links.map(link => {
          const source = nodePositions[link.sourceId];
          const target = nodePositions[link.targetId];
          if (!source || !target) return null;
          return (
            <g key={link.id}>
              <line 
                x1={source.x} y1={source.y} x2={target.x} y2={target.y} 
                stroke="#cbd5e1" strokeWidth="2" markerEnd="url(#arrow)" 
              />
              <text 
                x={(source.x + target.x) / 2} 
                y={(source.y + target.y) / 2 - 5} 
                textAnchor="middle" 
                className="text-[10px] font-bold fill-slate-400"
              >
                {link.relationship}
              </text>
            </g>
          );
        })}

        {/* Nodes */}
        {entities.map(entity => {
          const pos = nodePositions[entity.id];
          return (
            <g key={entity.id} className="cursor-pointer group">
              <circle 
                cx={pos.x} cy={pos.y} r="20" 
                fill={EntityTypeColors[entity.type]} 
                className="transition-all duration-200 hover:r-24 shadow-lg" 
              />
              <text 
                x={pos.x} y={pos.y + 35} 
                textAnchor="middle" 
                className="text-[10px] font-bold fill-slate-800"
              >
                {entity.name}
              </text>
              <text 
                x={pos.x} y={pos.y + 45} 
                textAnchor="middle" 
                className="text-[8px] fill-slate-500 font-medium"
              >
                {entity.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default EntityGraph;
