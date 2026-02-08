import { useState } from 'react';
import { Users, AlertTriangle, CheckCircle, TrendingUp, Camera } from 'lucide-react';
import festivalImage1 from 'figma:asset/38c7085cbe2f6f79af6da9e2e5229dc722b220b4.png';
import festivalImage2 from 'figma:asset/38290212cdf0ae1bbd9fe3f801c3237c91505034.png';

interface Zone {
  id: string;
  name: string;
  capacity: number;
  current: number;
  status: 'normal' | 'warning' | 'critical';
  cameras: number;
  trend: 'up' | 'down' | 'stable';
  aiScore: number;
}

export function ZoneMonitor() {
  const [zones] = useState<Zone[]>([
    {
      id: '1',
      name: 'Main Stage',
      capacity: 15000,
      current: 12750,
      status: 'critical',
      cameras: 8,
      trend: 'up',
      aiScore: 85,
    },
    {
      id: '2',
      name: 'VIP Area',
      capacity: 2000,
      current: 900,
      status: 'normal',
      cameras: 4,
      trend: 'stable',
      aiScore: 45,
    },
    {
      id: '3',
      name: 'Food Court',
      capacity: 5000,
      current: 3500,
      status: 'warning',
      cameras: 6,
      trend: 'up',
      aiScore: 70,
    },
    {
      id: '4',
      name: 'Side Stage',
      capacity: 8000,
      current: 4960,
      status: 'normal',
      cameras: 5,
      trend: 'down',
      aiScore: 62,
    },
    {
      id: '5',
      name: 'Entry Gate',
      capacity: 3000,
      current: 2340,
      status: 'warning',
      cameras: 6,
      trend: 'up',
      aiScore: 78,
    },
    {
      id: '6',
      name: 'Rest Area',
      capacity: 4000,
      current: 1200,
      status: 'normal',
      cameras: 3,
      trend: 'stable',
      aiScore: 30,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'from-red-500/20 to-red-600/20 border-red-500/50';
      case 'warning':
        return 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/50';
      case 'normal':
        return 'from-green-500/20 to-green-600/20 border-green-500/50';
      default:
        return 'from-white/10 to-white/5 border-white/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'normal':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      default:
        return <Users className="w-5 h-5 text-white" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6">Zone-by-Zone Monitoring</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {zones.map(zone => {
            const percentage = (zone.current / zone.capacity) * 100;
            return (
              <div
                key={zone.id}
                className={`bg-gradient-to-br ${getStatusColor(zone.status)} border backdrop-blur-sm rounded-xl p-5 shadow-lg`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">{zone.name}</h3>
                    <p className="text-white/60 text-sm">
                      {zone.current.toLocaleString()} / {zone.capacity.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(zone.status)}
                    {zone.trend === 'up' && (
                      <TrendingUp className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/70 text-xs">Capacity</span>
                    <span className="text-white text-sm font-bold">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        zone.status === 'critical'
                          ? 'bg-red-500'
                          : zone.status === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-black/20 rounded-lg p-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Camera className="w-3 h-3 text-white/60" />
                      <span className="text-white/60 text-xs">Cameras</span>
                    </div>
                    <p className="text-white font-bold">{zone.cameras}</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-3 h-3 text-white/60" />
                      <span className="text-white/60 text-xs">AI Score</span>
                    </div>
                    <p className="text-white font-bold">{zone.aiScore}%</p>
                  </div>
                </div>

                <button className="w-full px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-medium transition-all">
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-4">Camera Feed - Main Stage</h3>
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={festivalImage1}
              alt="Festival attendee"
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-3 left-3 px-3 py-1 bg-red-500 rounded-full flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white text-xs font-medium">LIVE</span>
            </div>
            <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg p-3">
              <p className="text-white text-sm font-medium">AI Detection: High crowd density</p>
              <p className="text-white/70 text-xs">Confidence: 94%</p>
            </div>
          </div>
        </div>

        <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-4">AI Visual Analysis</h3>
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={festivalImage2}
              alt="Festival scene"
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-3 left-3 px-3 py-1 bg-green-500 rounded-full flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-white" />
              <span className="text-white text-xs font-medium">AI ACTIVE</span>
            </div>
            <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg p-3">
              <p className="text-white text-sm font-medium">Processing real-time imagery</p>
              <p className="text-white/70 text-xs">Neural network analyzing crowd patterns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
