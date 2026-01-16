
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CaseDetail from './components/CaseDetail';
import { MOCK_CASES, MOCK_ALERTS, MOCK_ENTITIES, MOCK_LINKS, MOCK_EVIDENCE, MOCK_EVENTS } from './store/mockData';
import { Case, Entity, EntityLink, Evidence, CaseEvent, Alert } from './types';
// Import Icons to fix "Cannot find name 'Icons'" errors
import { Icons } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [redactionEnabled, setRedactionEnabled] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  // Use local state to simulate data persistence
  const [cases] = useState<Case[]>(MOCK_CASES);
  const [alerts] = useState<Alert[]>(MOCK_ALERTS);

  const activeCase = selectedCaseId ? cases.find(c => c.id === selectedCaseId) : null;

  // Filter linked data for specific case
  // In a real app, these would be API calls
  const getCaseEntities = (caseId: string): Entity[] => MOCK_ENTITIES; // Simulated: all entities linked to cases
  const getCaseLinks = (caseId: string): EntityLink[] => MOCK_LINKS;
  const getCaseEvidence = (caseId: string): Evidence[] => MOCK_EVIDENCE.filter(e => e.caseId === caseId);
  const getCaseEvents = (caseId: string): CaseEvent[] => MOCK_EVENTS.filter(e => e.caseId === caseId);
  const getCaseAlerts = (caseId: string): Alert[] => alerts.filter(a => a.caseId === caseId);

  const renderContent = () => {
    if (selectedCaseId && activeCase) {
      return (
        <CaseDetail 
          caseData={activeCase}
          entities={getCaseEntities(selectedCaseId)}
          links={getCaseLinks(selectedCaseId)}
          evidence={getCaseEvidence(selectedCaseId)}
          events={getCaseEvents(selectedCaseId)}
          alerts={getCaseAlerts(selectedCaseId)}
          redactionEnabled={redactionEnabled}
          onBack={() => setSelectedCaseId(null)}
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            cases={cases} 
            alerts={alerts} 
            onCaseClick={(id) => setSelectedCaseId(id)}
          />
        );
      case 'cases':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Investigation Registry</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700">
                + Create New Case
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {cases.map(c => (
                <div key={c.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group" onClick={() => setSelectedCaseId(c.id)}>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded uppercase tracking-tighter">{c.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      c.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                      c.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {c.priority}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">{c.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-6">{c.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex -space-x-2">
                      <img src="https://picsum.photos/seed/1/24/24" className="w-6 h-6 rounded-full border-2 border-white" />
                      <img src="https://picsum.photos/seed/2/24/24" className="w-6 h-6 rounded-full border-2 border-white" />
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">{c.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'entities':
        return (
          <div className="space-y-6">
             <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Entity Intelligence Database</h2>
              <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">
                Export Data
              </button>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Type</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Identifier</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Confidence</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Tags</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_ENTITIES.map(entity => (
                    <tr key={entity.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-bold text-slate-900 text-sm">{entity.name}</td>
                      <td className="px-6 py-4"><span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase">{entity.type}</span></td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-600">{entity.value}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div className="bg-green-500 h-full" style={{ width: `${entity.confidence * 100}%` }} />
                          </div>
                          <span className="text-[10px] font-bold text-slate-400">{Math.round(entity.confidence * 100)}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          {entity.tags.map(t => <span key={t} className="text-[8px] font-bold text-blue-600 bg-blue-50 px-1.5 rounded">{t}</span>)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'alerts':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Security Alerts</h2>
            <div className="space-y-4">
              {alerts.map(alert => (
                <div key={alert.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-6 shadow-sm">
                   <div className={`p-3 rounded-lg ${
                    alert.severity === 'high' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    <Icons.Alerts />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{alert.caseId}</span>
                      <span className="text-[10px] font-bold text-slate-400">•</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                    <h4 className="font-bold text-slate-900">{alert.ruleName}</h4>
                    <p className="text-sm text-slate-500">{alert.message}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded hover:bg-slate-200">Dismiss</button>
                    <button className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700" onClick={() => setSelectedCaseId(alert.caseId)}>Investigate</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900">Case Reporting Engine</h2>
              <p className="text-slate-500 mt-2">Generate official documentation and referral packets with one click.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <Icons.Reports />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Internal Summary</h3>
                <p className="text-sm text-slate-500 mb-6">Brief executive summary including timeline milestones and key entity risk factors.</p>
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">Generate Internal Report</button>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="M2 15h10"/><path d="m9 18 3-3-3-3"/></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Legal Referral Packet</h3>
                <p className="text-sm text-slate-500 mb-6">Evidence-quality export formatted for legal council or law enforcement referral.</p>
                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">Generate Legal Packet</button>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="p-12 text-center text-slate-400 font-bold uppercase tracking-widest">Coming Soon</div>;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={(tab) => {
        setActiveTab(tab);
        setSelectedCaseId(null);
      }}
      redactionEnabled={redactionEnabled}
      setRedactionEnabled={setRedactionEnabled}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
