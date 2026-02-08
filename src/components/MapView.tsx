import { useRef, useEffect, useState } from 'react';
import { MapPin, Users, AlertTriangle, Heart, Navigation, Shield, Filter, Plus } from 'lucide-react';

interface Alert {
  id: string;
  type: 'crowd' | 'medical' | 'safety' | 'navigation';
  title: string;
  reporter: string;
  time: string;
  x: number;
  y: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  isFriend: boolean;
}

export function MapView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [showFilter, setShowFilter] = useState({
    crowd: true,
    medical: true,
    safety: true,
    navigation: true,
    friendsOnly: false,
  });

  const getCanvasXYFromClient = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) * canvas.width) / rect.width;
    const y = ((clientY - rect.top) * canvas.height) / rect.height;

    // Only accept clicks that land inside the canvas area
    if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) return null;

    return { x, y };
  };


  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(true);

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [draft, setDraft] = useState({
    type: 'crowd' as Alert['type'],
    title: '',
    severity: 'medium' as Alert['severity'],
  });
  const [pendingLocation, setPendingLocation] = useState<{ x: number; y: number } | null>(null);


  const [alerts, setAlerts] = useState<Alert[]>([
    { id: '1', type: 'crowd', title: 'High Crowd Density', reporter: 'Sarah M.', time: '2 min ago', x: 300, y: 150, severity: 'high', isFriend: true },
    { id: '2', type: 'medical', title: 'Medical Assistance', reporter: 'Mike J.', time: '5 min ago', x: 450, y: 280, severity: 'critical', isFriend: false },
    { id: '3', type: 'safety', title: 'Lost & Found', reporter: 'Staff', time: '8 min ago', x: 150, y: 320, severity: 'medium', isFriend: false },
    { id: '4', type: 'navigation', title: 'Exit Blocked', reporter: 'David L.', time: '12 min ago', x: 520, y: 180, severity: 'high', isFriend: true },
    { id: '5', type: 'crowd', title: 'Crowd Moving', reporter: 'Emma W.', time: '15 min ago', x: 200, y: 200, severity: 'medium', isFriend: true },
    { id: '6', type: 'safety', title: 'Secure Area', reporter: 'Security', time: '20 min ago', x: 400, y: 380, severity: 'low', isFriend: false },
    { id: '7', type: 'medical', title: 'First Aid Station', reporter: 'Staff', time: '25 min ago', x: 100, y: 100, severity: 'low', isFriend: false },
    { id: '8', type: 'navigation', title: 'Clear Path', reporter: 'Jake T.', time: '30 min ago', x: 350, y: 90, severity: 'low', isFriend: true },
  ]);

  const getAlertColor = (type: string, severity: string) => {
    if (severity === 'critical') return { r: 239, g: 68, b: 68 };

    switch (type) {
      case 'crowd':
        return { r: 251, g: 191, b: 36 };
      case 'medical':
        return { r: 239, g: 68, b: 68 };
      case 'safety':
        return { r: 34, g: 197, b: 94 };
      case 'navigation':
        return { r: 59, g: 130, b: 246 };
      default:
        return { r: 6, g: 182, b: 212 };
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'crowd':
        return Users;
      case 'medical':
        return Heart;
      case 'safety':
        return Shield;
      case 'navigation':
        return Navigation;
      default:
        return AlertTriangle;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw base map (festival grounds)
    ctx.fillStyle = 'rgba(30, 41, 59, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw zones
    const zones = [
      { x: 100, y: 50, width: 250, height: 150, label: 'Main Stage', color: 'rgba(6, 182, 212, 0.2)' },
      { x: 400, y: 80, width: 180, height: 120, label: 'VIP Area', color: 'rgba(139, 92, 246, 0.2)' },
      { x: 80, y: 250, width: 200, height: 130, label: 'Food Court', color: 'rgba(34, 197, 94, 0.2)' },
      { x: 350, y: 260, width: 220, height: 140, label: 'Side Stage', color: 'rgba(236, 72, 153, 0.2)' },
    ];

    zones.forEach(zone => {
      ctx.fillStyle = zone.color;
      ctx.fillRect(zone.x, zone.y, zone.width, zone.height);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.lineWidth = 2;
      ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(zone.label, zone.x + zone.width / 2, zone.y + zone.height / 2);
    });

    // Draw alert markers
    const filteredAlerts = alerts.filter(alert => {
      if (!showFilter[alert.type]) return false;
      if (showFilter.friendsOnly && !alert.isFriend) return false;
      return true;
    });

    filteredAlerts.forEach(alert => {
      // Draw pending marker when reporting

      const color = getAlertColor(alert.type, alert.severity);

      // Pulse effect for critical alerts
      if (alert.severity === 'critical') {
        const pulseRadius = 25 + Math.sin(Date.now() / 200) * 5;
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.1)`;
        ctx.beginPath();
        ctx.arc(alert.x, alert.y, pulseRadius, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Outer glow
      const gradient = ctx.createRadialGradient(alert.x, alert.y, 5, alert.x, alert.y, 15);
      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`);
      gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(alert.x, alert.y, 15, 0, 2 * Math.PI);
      ctx.fill();

      // Main pin
      ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
      ctx.beginPath();
      ctx.arc(alert.x, alert.y, 8, 0, 2 * Math.PI);
      ctx.fill();

      // Friend indicator
      if (alert.isFriend) {
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(alert.x, alert.y, 12, 0, 2 * Math.PI);
        ctx.stroke();
      }

      // Selected indicator
      if (selectedAlert?.id === alert.id) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(alert.x, alert.y, 10, 0, 2 * Math.PI);
        ctx.stroke();
      }

      // Inner dot
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(alert.x, alert.y, 3, 0, 2 * Math.PI);
      ctx.fill();
    });

    if (isReportOpen && pendingLocation) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pendingLocation.x, pendingLocation.y, 10, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.beginPath();
      ctx.arc(pendingLocation.x, pendingLocation.y, 4, 0, 2 * Math.PI);
      ctx.fill();
    }
  }, [alerts, selectedAlert, showFilter, isReportOpen, pendingLocation]);


  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) * canvas.width) / rect.width;
    const y = ((e.clientY - rect.top) * canvas.height) / rect.height;

    // If reporting, click sets the new marker location
    if (isReportOpen) {
      setPendingLocation({ x, y });
      setSelectedAlert(null);
      return;
    }

    // Otherwise, click selects an existing marker
    const clickedAlert = alerts.find((alert) => {
      const distance = Math.hypot(alert.x - x, alert.y - y);
      return distance < 15;
    });

    setSelectedAlert(clickedAlert || null);
  };

  const setDefaultLocation = () => {
    // center of your 600x450 canvas
    setPendingLocation({ x: 300, y: 225 });
  };
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Live Alert Map</h2>
          <p className="text-cyan-300/70">Real-time community reports across the festival</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setDraft({ type: 'crowd', title: '', severity: 'medium' });
              setPendingLocation(null);
              setIsReportOpen(true);
            }}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Report Issue
          </button>

          <button
            onClick={() => setIsFilterPanelOpen((v) => !v)}
            className="bg-slate-800/50 border border-cyan-500/20 text-cyan-100 px-6 py-3 rounded-xl font-semibold hover:border-cyan-500/40 transition-all flex items-center gap-2"
          >
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT: MAP */}
        <div className="lg:col-span-3 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              Festival Grounds
            </h3>

            <div className="flex gap-3 text-xs">
              <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                <div className="w-2 h-2 bg-yellow-400 rounded-full ring-2 ring-yellow-400/50" />
                <span className="text-yellow-200">Friend Reports</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-lg">
                <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                <span className="text-cyan-200">All Reports</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-xl p-4 border border-cyan-500/10">
            <canvas
              ref={canvasRef}
              width={600}
              height={450}
              className="w-full h-auto cursor-pointer"
              onClick={handleCanvasClick}
            />
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-cyan-300/70">
            <span>
              {
                alerts.filter((a) => {
                  if (!showFilter[a.type]) return false;
                  if (showFilter.friendsOnly && !a.isFriend) return false;
                  return true;
                }).length
              }{" "}
              active alerts
            </span>

            <span>Click on markers for details</span>
          </div>
        </div>

        {/* RIGHT: SIDEBAR */}
        <div className="space-y-4">
          {isFilterPanelOpen && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="text-lg font-bold text-white mb-4">Filters</h3>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFilter.crowd}
                    onChange={(e) => setShowFilter((prev) => ({ ...prev, crowd: e.target.checked }))}
                    className="w-5 h-5 rounded accent-yellow-500"
                  />
                  <Users className="w-4 h-4 text-yellow-400" />
                  <span className="text-cyan-100">Crowd Issues</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFilter.medical}
                    onChange={(e) => setShowFilter((prev) => ({ ...prev, medical: e.target.checked }))}
                    className="w-5 h-5 rounded accent-red-500"
                  />
                  <Heart className="w-4 h-4 text-red-400" />
                  <span className="text-cyan-100">Medical</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFilter.safety}
                    onChange={(e) => setShowFilter((prev) => ({ ...prev, safety: e.target.checked }))}
                    className="w-5 h-5 rounded accent-green-500"
                  />
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-cyan-100">Safety</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFilter.navigation}
                    onChange={(e) => setShowFilter((prev) => ({ ...prev, navigation: e.target.checked }))}
                    className="w-5 h-5 rounded accent-blue-500"
                  />
                  <Navigation className="w-4 h-4 text-blue-400" />
                  <span className="text-cyan-100">Navigation</span>
                </label>

                <div className="border-t border-cyan-500/20 pt-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showFilter.friendsOnly}
                      onChange={(e) => setShowFilter((prev) => ({ ...prev, friendsOnly: e.target.checked }))}
                      className="w-5 h-5 rounded accent-purple-500"
                    />
                    <span className="text-cyan-100 font-medium">Friends Only</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {selectedAlert && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="text-lg font-bold text-white mb-4">Alert Details</h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = getAlertIcon(selectedAlert.type);
                    return <Icon className="w-5 h-5 text-cyan-400" />;
                  })()}

                  <div>
                    <p className="font-semibold text-white">{selectedAlert.title}</p>
                    <p className="text-xs text-cyan-300/60">{selectedAlert.type}</p>
                  </div>
                </div>

                <div className="text-sm text-cyan-200/80 space-y-1">
                  <p>
                    <span className="text-cyan-400">Reporter:</span> {selectedAlert.reporter}
                  </p>
                  <p>
                    <span className="text-cyan-400">Time:</span> {selectedAlert.time}
                  </p>
                  <p>
                    <span className="text-cyan-400">Severity:</span>{" "}
                    <span className="capitalize">{selectedAlert.severity}</span>
                  </p>

                  {selectedAlert.isFriend && (
                    <p className="flex items-center gap-1 text-yellow-400">⭐ Reported by friend</p>
                  )}
                </div>

                <button className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-500/30 rounded-lg text-cyan-100 font-medium transition-all text-sm">
                  Navigate Here
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* MODAL OUTSIDE GRID */}
      {isReportOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={(e) => {
            // click anywhere: if the click corresponds to a point over the canvas, set it
            const pt = getCanvasXYFromClient(e.clientX, e.clientY);
            if (pt) setPendingLocation(pt);
          }}
        >

          <div
            className="w-full max-w-lg bg-slate-900/90 border border-cyan-500/20 rounded-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white text-lg font-bold">Report Issue</h3>
                <p className="text-cyan-300/60 text-sm">
                  Fill this out, then set a location (you can adjust later).
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsReportOpen(false);
                  setPendingLocation(null);
                }}
                className="text-white/70 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm text-cyan-200/70 mb-1">Type</label>
                <select
                  value={draft.type}
                  onChange={(e) => setDraft((d) => ({ ...d, type: e.target.value as Alert['type'] }))}
                  className="w-full rounded-xl bg-slate-800/60 border border-cyan-500/20 text-white p-2"
                >
                  <option value="crowd">Crowd</option>
                  <option value="medical">Medical</option>
                  <option value="safety">Safety</option>
                  <option value="navigation">Navigation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-cyan-200/70 mb-1">Title</label>
                <input
                  value={draft.title}
                  onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                  className="w-full rounded-xl bg-slate-800/60 border border-cyan-500/20 text-white p-2 placeholder:text-white/30"
                  placeholder="Quick summary"
                />
              </div>

              <div>
                <label className="block text-sm text-cyan-200/70 mb-1">Severity</label>
                <select
                  value={draft.severity}
                  onChange={(e) => setDraft((d) => ({ ...d, severity: e.target.value as Alert['severity'] }))}
                  className="w-full rounded-xl bg-slate-800/60 border border-cyan-500/20 text-white p-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <div className="text-xs text-cyan-300/60">
                  Location:{' '}
                  {pendingLocation
                    ? `(${Math.round(pendingLocation.x)}, ${Math.round(pendingLocation.y)})`
                    : 'not set'}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={setDefaultLocation}
                    className="px-3 py-2 rounded-xl text-sm font-semibold bg-slate-800/60 text-cyan-100 border border-cyan-500/20 hover:border-cyan-500/40"
                  >
                    Set Location
                  </button>

                  <button
                    type="button"
                    disabled={!draft.title.trim() || !pendingLocation}
                    onClick={() => {
                      if (!pendingLocation) return;

                      const newAlert: Alert = {
                        id: crypto.randomUUID(),
                        type: draft.type,
                        title: draft.title.trim(),
                        reporter: 'You',
                        time: 'just now',
                        x: pendingLocation.x,
                        y: pendingLocation.y,
                        severity: draft.severity,
                        isFriend: true,
                      };

                      setAlerts((prev) => [newAlert, ...prev]);
                      setSelectedAlert(newAlert);

                      setIsReportOpen(false);
                      setPendingLocation(null);
                      setDraft({ type: 'crowd', title: '', severity: 'medium' });
                    }}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm ${draft.title.trim() && pendingLocation
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'bg-slate-800/50 text-white/40 cursor-not-allowed'
                      }`}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 