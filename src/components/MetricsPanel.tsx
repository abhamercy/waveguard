import { useEffect, useState } from 'react';
import { Users, TrendingUp, AlertTriangle, Activity } from 'lucide-react';

export function MetricsPanel() {
  const [metrics, setMetrics] = useState({
    totalAttendees: 45230,
    capacity: 60000,
    densityScore: 75,
    activeAlerts: 3,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalAttendees: prev.totalAttendees + Math.floor(Math.random() * 20 - 5),
        densityScore: Math.max(60, Math.min(90, prev.densityScore + Math.random() * 4 - 2)),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const capacityPercentage = (metrics.totalAttendees / metrics.capacity) * 100;

  const cards = [
    {
      title: 'Total Attendees',
      value: metrics.totalAttendees.toLocaleString(),
      icon: Users,
      color: 'blue',
      subtitle: `${capacityPercentage.toFixed(1)}% capacity`,
    },
    {
      title: 'Crowd Density',
      value: `${metrics.densityScore}%`,
      icon: Activity,
      color: metrics.densityScore > 80 ? 'red' : 'green',
      subtitle: metrics.densityScore > 80 ? 'High density detected' : 'Normal levels',
    },
    {
      title: 'Active Alerts',
      value: metrics.activeAlerts,
      icon: AlertTriangle,
      color: metrics.activeAlerts > 0 ? 'yellow' : 'green',
      subtitle: metrics.activeAlerts > 0 ? 'Requires attention' : 'All clear',
    },
    {
      title: 'AI Predictions',
      value: '+12%',
      icon: TrendingUp,
      color: 'purple',
      subtitle: 'Expected growth (next hour)',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const colorClasses = {
          blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/50',
          green: 'from-green-500/20 to-green-600/20 border-green-500/50',
          red: 'from-red-500/20 to-red-600/20 border-red-500/50',
          yellow: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/50',
          purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/50',
        };

        return (
          <div
            key={index}
            className={`bg-gradient-to-br ${colorClasses[card.color as keyof typeof colorClasses]} border backdrop-blur-sm rounded-xl p-5 shadow-xl`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-white/70 text-sm mb-1">{card.title}</p>
                <p className="text-white text-3xl font-bold">{card.value}</p>
              </div>
              <div className="p-3 bg-white/10 rounded-lg">
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-white/60 text-xs">{card.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
}
