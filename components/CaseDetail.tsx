
import React, { useState } from 'react';
import { Case, Entity, Evidence, CaseEvent, EntityLink, Alert } from '../types';
import EntityGraph from './EntityGraph';
import Redactable from './Redactable';
import { Icons } from '../constants';

interface CaseDetailProps {
  caseData: Case;
  entities: Entity[];
  links: EntityLink[];
  evidence: Evidence[];
  events: CaseEvent[];
  alerts: Alert[];
  redactionEnabled: boolean;
  onBack: () => void;
}

const CaseDetail: React.FC<CaseDetailProps> = ({ 
  caseData, entities, links, evidence, events, alerts, redactionEnabled, onBack 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'entities' | 'evidence' | 'timeline' | 'osint'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'entities', label: 'Entities & Graph' },
    { id: 'evidence', label: 'Evidence Vault' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'osint', label: 'OSINT Hub' },
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{caseData.title}</h2>
          <p className="text-sm font-medium text-slate-500">{caseData.id} • {caseData.category}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            caseData.priority === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
          }`}>
            {caseData.priority} Priority
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
            {caseData.status}
          </span>
        </div>
      </div>

      <div className="flex border-b border-slate-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 text-sm font-bold transition-colors border-b-2 -mb-px ${
              activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="py-2">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-4">Case Summary</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {caseData.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {caseData.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">#{tag}</span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-800">Linked Entities Summary</div>
                <div className="divide-y divide-slate-100">
                  {entities.slice(0, 3).map(entity => (
                    <div key={entity.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                          <Icons.Entities />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-900">{entity.name}</p>
                          <p className="text-xs text-slate-500 font-medium tracking-tight">
                            <Redactable enabled={redactionEnabled && entity.pii}>{entity.value}</Redactable>
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{entity.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-4">Case Alerts</h3>
                <div className="space-y-4">
                  {alerts.map(alert => (
                    <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                      alert.severity === 'high' ? 'bg-red-50 border-red-500' : 'bg-amber-50 border-amber-500'
                    }`}>
                      <p className="text-xs font-bold text-slate-900 mb-1">{alert.ruleName}</p>
                      <p className="text-[11px] text-slate-600">{alert.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-4">Case Team</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img src="https://picsum.photos/seed/1/40/40" className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">Lead Investigator</p>
                      <p className="text-xs text-slate-500">Alex Rivera</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src="https://picsum.photos/seed/2/40/40" className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">Analyst</p>
                      <p className="text-xs text-slate-500">Sarah Chen</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'entities' && (
          <div className="space-y-6">
            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md">+ Add Entity</button>
              <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold text-slate-600">Import Batch</button>
            </div>
            <EntityGraph entities={entities} links={links} />
          </div>
        )}

        {activeTab === 'evidence' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-8 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer text-slate-400">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                <Icons.Plus />
              </div>
              <p className="font-bold text-sm">Upload New Evidence</p>
              <p className="text-xs mt-1">PDF, Images, Excel, or Zip</p>
            </div>
            {evidence.map(ev => (
              <div key={ev.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded">
                    <Icons.Evidence />
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase">{ev.fileType}</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{ev.title}</h4>
                <p className="text-xs text-slate-500 flex-1 leading-relaxed">{ev.description}</p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{new Date(ev.timestamp).toLocaleDateString()}</span>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Icons.External />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="relative pl-8 border-l-2 border-slate-200 space-y-12">
              {events.map((event, idx) => (
                <div key={event.id} className="relative">
                  <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-white border-4 border-blue-600 shadow-sm" />
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{new Date(event.timestamp).toLocaleString()}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter ${
                      event.type === 'discovery' ? 'bg-purple-100 text-purple-700' :
                      event.type === 'milestone' ? 'bg-green-100 text-green-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm font-semibold text-slate-800">{event.summary}</p>
                    <p className="text-xs text-slate-500 mt-2 flex items-center gap-1 font-medium">
                      <Icons.User /> Source: {event.source}
                    </p>
                    {event.linkedEntities.length > 0 && (
                      <div className="mt-3 flex gap-2">
                        {event.linkedEntities.map(entId => (
                          <span key={entId} className="text-[9px] font-bold px-1.5 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded uppercase">Entity Ref: {entId}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'osint' && (
          <div className="bg-slate-900 rounded-xl overflow-hidden min-h-[600px] flex flex-col shadow-2xl">
            <div className="bg-slate-800 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded text-white animate-pulse">
                  <Icons.Search />
                </div>
                <div>
                  <h3 className="text-white font-bold">Safe OSINT Workspace</h3>
                  <p className="text-slate-400 text-xs">Public authorized registries only</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="bg-slate-700 text-slate-300 px-3 py-1 rounded text-xs font-bold hover:bg-slate-600">Company Registry</button>
                <button className="bg-slate-700 text-slate-300 px-3 py-1 rounded text-xs font-bold hover:bg-slate-600">Sanctions List</button>
              </div>
            </div>
            
            <div className="flex-1 p-6 flex flex-col gap-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center text-blue-400 border border-slate-600">
                  <Icons.Plus />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Initialize Search Query</h4>
                  <p className="text-slate-400 text-sm max-w-md">Search across authorized public business registries and domain intel sources. All results are logged for audit compliance.</p>
                </div>
                <div className="w-full max-w-xl">
                  <input 
                    type="text" 
                    placeholder="Enter EIN, Domain, or Registered Business Name..." 
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <button className="mt-4 w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">Execute Authorized Lookup</button>
                </div>
              </div>
              
              <div className="flex-1 border border-slate-700 border-dashed rounded-lg flex items-center justify-center text-slate-500 font-bold text-xs uppercase tracking-widest">
                Waiting for input...
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseDetail;
