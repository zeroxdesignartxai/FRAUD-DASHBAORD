
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Case, Alert, CaseStatus } from '../types';

interface DashboardProps {
  cases: Case[];
  alerts: Alert[];
  onCaseClick: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ cases, alerts, onCaseClick }) => {
  const statusCounts = cases.reduce((acc: any, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(CaseStatus).map(key => ({
    name: CaseStatus[key as keyof typeof CaseStatus],
    count: statusCounts[CaseStatus[key as keyof typeof CaseStatus]] || 0
  }));

  const pieData = [
    { name: 'Low', value: alerts.filter(a => a.severity === 'low').length, color: '#94a3b8' },
    { name: 'Medium', value: alerts.filter(a => a.severity === 'medium').length, color: '#f59e0b' },
    { name: 'High', value: alerts.filter(a => a.severity === 'high').length, color: '#ef4444' },
  ];

  const recentCases = [...cases].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Operations Overview</h2>
          <p className="text-slate-500 mt-1 font-medium">Monitoring {cases.length} active investigations across your team.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Download Statistics</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-blue-700">+ New Investigation</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Cases</p>
          <p className="text-4xl font-bold text-slate-900 mt-1">{cases.length}</p>
          <div className="mt-2 text-xs font-bold text-green-500">↑ 12% from last month</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Alerts</p>
          <p className="text-4xl font-bold text-slate-900 mt-1">{alerts.length}</p>
          <div className="mt-2 text-xs font-bold text-red-500">4 Critical urgency</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Team Efficiency</p>
          <p className="text-4xl font-bold text-slate-900 mt-1">94%</p>
          <div className="mt-2 text-xs font-bold text-green-500">Target met</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Avg. Time to Close</p>
          <p className="text-4xl font-bold text-slate-900 mt-1">18d</p>
          <div className="mt-2 text-xs font-bold text-slate-400">Same as last week</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Case Status Pipeline</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Alert Severity Distribution</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-800">Recent Activity</h3>
          <button className="text-sm font-bold text-blue-600 hover:text-blue-700">View All</button>
        </div>
        <div className="divide-y divide-slate-100">
          {recentCases.map(c => (
            <div key={c.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer" onClick={() => onCaseClick(c.id)}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center font-bold text-slate-500 text-xs">
                  {c.id.split('-').pop()}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{c.title}</p>
                  <p className="text-xs text-slate-500 font-medium">{c.id} • {c.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                  c.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                  c.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {c.priority}
                </span>
                <span className="text-xs font-medium text-slate-400">Updated {new Date(c.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
