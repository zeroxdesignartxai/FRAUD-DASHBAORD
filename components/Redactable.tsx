
import React from 'react';

interface RedactableProps {
  children: React.ReactNode;
  enabled: boolean;
  type?: 'mask' | 'blur';
}

const Redactable: React.FC<RedactableProps> = ({ children, enabled, type = 'mask' }) => {
  if (!enabled) return <>{children}</>;

  if (type === 'blur') {
    return <span className="blur-sm select-none pointer-events-none">{children}</span>;
  }

  return (
    <span className="bg-slate-900 text-slate-900 rounded px-1 select-none pointer-events-none font-mono">
      [REDACTED]
    </span>
  );
};

export default Redactable;
