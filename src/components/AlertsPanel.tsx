import { AlertTriangle, TrendingUp, Users, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  location: string;
  time: string;
  aiConfidence: number;
}

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'critical',
      title: 'High density detected',
      location: 'Main Stage',
      time: '2 min ago',
      aiConfidence: 94,
    },
    {
      id: '2',
      type: 'warning',
      title: 'Crowd surge predicted',
      location: 'Food Court',
      time: '5 min ago',
      aiConfidence: 87,
    },
    {
      id: '3',
      type: 'info',
      title: 'Normal flow restored',
      location: 'Entry Gate',
      time: '8 min ago',
      aiConfidence: 91,
    },
  ]);

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'border-red-500/50 bg-red-500/10';
      case 'warning':
        return 'border-yellow-500/50 bg-yellow-500/10';
      case 'info':
        return 'border-blue-500/50 bg-blue-500/10';
      default:
        return 'border-white/10 bg-white/5';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <TrendingUp className="w-5 h-5 text-yellow-400" />;
      case 'info':
        return <Users className="w-5 h-5 text-blue-400" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-white" />;
    }
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">AI Alerts</h2>
        <div className="px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-full">
          <span className="text-red-300 text-xs font-medium">{alerts.length} Active</span>
        </div>
      </div>

      <div className="space-y-3">
        {alerts.map(alert => (
          <div
            key={alert.id}
            className={`border rounded-lg p-4 ${getAlertColor(alert.type)}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">{getAlertIcon(alert.type)}</div>
              <div className="flex-1">
                <h3 className="text-white font-medium mb-1">{alert.title}</h3>
                <div className="flex items-center gap-3 text-xs text-white/60">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {alert.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {alert.time}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-purple-500 h-full rounded-full transition-all"
                      style={{ width: `${alert.aiConfidence}%` }}
                    />
                  </div>
                  <span className="text-xs text-white/70">
                    {alert.aiConfidence}% confidence
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-medium transition-all">
        View All Alerts
      </button>
    </div>
  );
}
