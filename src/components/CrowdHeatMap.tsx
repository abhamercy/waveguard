import { useEffect, useState, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface Zone {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  density: number;
}

export function CrowdHeatMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zones, setZones] = useState<Zone[]>([
    { id: '1', name: 'Main Stage', x: 150, y: 100, width: 200, height: 150, density: 85 },
    { id: '2', name: 'VIP Area', x: 400, y: 120, width: 120, height: 100, density: 45 },
    { id: '3', name: 'Food Court', x: 100, y: 300, width: 150, height: 120, density: 70 },
    { id: '4', name: 'Side Stage', x: 350, y: 280, width: 180, height: 130, density: 62 },
    { id: '5', name: 'Entry Gate', x: 50, y: 80, width: 80, height: 60, density: 78 },
    { id: '6', name: 'Rest Area', x: 250, y: 300, width: 90, height: 80, density: 30 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setZones(prev =>
        prev.map(zone => ({
          ...zone,
          density: Math.max(20, Math.min(95, zone.density + Math.random() * 10 - 5)),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw heat map zones
    zones.forEach(zone => {
      const getDensityColor = (density: number) => {
        if (density > 80) return { r: 239, g: 68, b: 68, a: 0.7 }; // Red
        if (density > 60) return { r: 251, g: 191, b: 36, a: 0.6 }; // Yellow
        if (density > 40) return { r: 74, g: 222, b: 128, a: 0.5 }; // Green
        return { r: 96, g: 165, b: 250, a: 0.4 }; // Blue
      };

      const color = getDensityColor(zone.density);
      
      // Draw zone with gradient
      const gradient = ctx.createRadialGradient(
        zone.x + zone.width / 2,
        zone.y + zone.height / 2,
        0,
        zone.x + zone.width / 2,
        zone.y + zone.height / 2,
        zone.width / 1.5
      );
      
      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
      gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0.1)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(zone.x, zone.y, zone.width, zone.height);

      // Draw border
      ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`;
      ctx.lineWidth = 2;
      ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);

      // Draw label
      ctx.fillStyle = 'white';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(zone.name, zone.x + zone.width / 2, zone.y + zone.height / 2 - 10);
      
      ctx.font = '11px sans-serif';
      ctx.fillText(`${zone.density.toFixed(0)}% density`, zone.x + zone.width / 2, zone.y + zone.height / 2 + 5);
    });
  }, [zones]);

  return (
    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-purple-400" />
          Live Crowd Heat Map
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-white/70 text-xs">Low</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-white/70 text-xs">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="text-white/70 text-xs">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-white/70 text-xs">Critical</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 border border-white/5">
        <canvas
          ref={canvasRef}
          width={600}
          height={450}
          className="w-full h-auto"
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {zones.slice(0, 6).map(zone => (
          <div
            key={zone.id}
            className="bg-white/5 rounded-lg p-3 border border-white/10"
          >
            <p className="text-white text-sm font-medium mb-1">{zone.name}</p>
            <div className="flex items-center justify-between">
              <span className="text-white/60 text-xs">Density</span>
              <span className={`text-sm font-bold ${
                zone.density > 80 ? 'text-red-400' :
                zone.density > 60 ? 'text-yellow-400' :
                zone.density > 40 ? 'text-green-400' :
                'text-blue-400'
              }`}>
                {zone.density.toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
