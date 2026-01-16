
import React from 'react';
import { Icons } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  redactionEnabled: boolean;
  setRedactionEnabled: (val: boolean) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, activeTab, setActiveTab, redactionEnabled, setRedactionEnabled 
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
    { id: 'cases', label: 'Cases', icon: Icons.Cases },
    { id: 'entities', label: 'Entities', icon: Icons.Entities },
    { id: 'alerts', label: 'Alerts', icon: Icons.Alerts },
    { id: 'reports', label: 'Reports', icon: Icons.Reports },
    { id: 'admin', label: 'Admin', icon: Icons.Admin },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold">C</div>
          <h1 className="text-xl font-bold tracking-tight">CaseForge</h1>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <item.icon />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">PII Redaction</span>
              <button 
                onClick={() => setRedactionEnabled(!redactionEnabled)}
                className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${redactionEnabled ? 'bg-blue-600' : 'bg-slate-600'}`}
              >
                <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${redactionEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">
              {redactionEnabled ? 'Sensitive data is currently masked in the interface.' : 'PII is visible. Use caution during presentation.'}
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Icons.Search />
              </span>
              <input 
                type="text" 
                placeholder="Global search cases, entities, or files..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold text-slate-800">Alex Rivera</span>
              <span className="text-xs text-slate-500 font-medium">Administrator</span>
            </div>
            <img 
              src="https://picsum.photos/seed/alex/100/100" 
              alt="User" 
              className="w-10 h-10 rounded-full border-2 border-slate-200"
            />
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
