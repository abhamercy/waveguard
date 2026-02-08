import { Activity, TrendingUp, Users } from 'lucide-react';

interface DashboardHeaderProps {
  festivalName: string;
  activeView: 'overview' | 'zones' | 'analytics';
  onViewChange: (view: 'overview' | 'zones' | 'analytics') => void;
}

export function DashboardHeader({ festivalName, activeView, onViewChange }: DashboardHeaderProps) {
  const views = [
    { id: 'overview' as const, label: 'Overview', icon: Activity },
    { id: 'zones' as const, label: 'Zone Monitor', icon: Users },
    { id: 'analytics' as const, label: 'AI Analytics', icon: TrendingUp },
  ];

  return (
    <div className="bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Festival Crowd Control AI</h1>
            <p className="text-purple-300">{festivalName}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-300 text-sm font-medium">LIVE</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white text-sm">Current Time</p>
              <p className="text-purple-300 text-xs">{new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {views.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onViewChange(id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeView === id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
