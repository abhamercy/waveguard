import { useState } from "react";
import {
  AlertTriangle,
  Users,
  Heart,
  Shield,
  Navigation,
  Clock,
  MapPin,
  TrendingUp,
} from "lucide-react";

type Severity = "low" | "medium" | "high" | "critical";
type AlertType = "crowd" | "medical" | "safety" | "navigation";
type ColorKey = "red" | "orange" | "yellow" | "green" | "blue" | "purple";

type AlertItem = {
  id: string;
  type: AlertType;
  title: string;
  location: string;
  time: string;
  icon: any;
  color: ColorKey;

  // optional fields depending on where it shows up
  description?: string;
  status?: "active" | "resolved";
  upvotes?: number;
  comments?: number;

  reporter?: string;
  severity?: Severity;
  isFriend?: boolean;
};

const colorByType: Record<AlertType, ColorKey> = {
  crowd: "yellow",
  medical: "red",
  safety: "green",
  navigation: "blue",
};

const iconByType: Record<AlertType, any> = {
  crowd: Users,
  medical: Heart,
  safety: Shield,
  navigation: Navigation,
};

export function AlertsView() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [createForm, setCreateForm] = useState<{
    type: AlertType;
    title: string;
    location: string;
    severity: Severity;
  }>({
    type: "safety",
    title: "",
    location: "",
    severity: "medium",
  });

  // ✅ make these state so we can append
  const [myAlerts, setMyAlerts] = useState<AlertItem[]>([
    {
      id: "1",
      type: "crowd",
      title: "Heavy crowd at Main Stage",
      description:
        "Difficult to move through the area, recommend alternative routes",
      location: "Main Stage - Section A",
      time: "2 min ago",
      status: "active",
      upvotes: 12,
      comments: 5,
      icon: Users,
      color: "yellow",
    },
    {
      id: "2",
      type: "safety",
      title: "Lost phone found",
      description: "iPhone 14 Pro found near the merchandise booth",
      location: "Merch Area",
      time: "1 hour ago",
      status: "resolved",
      upvotes: 8,
      comments: 2,
      icon: Shield,
      color: "green",
    },
  ]);

  const [communityAlerts] = useState<AlertItem[]>([
    {
      id: "3",
      type: "medical",
      title: "Medical Assistance Needed",
      reporter: "Mike J.",
      location: "Food Court Section B",
      time: "5 min ago",
      severity: "critical",
      upvotes: 45,
      icon: Heart,
      color: "red",
      isFriend: false,
    },
    {
      id: "4",
      type: "navigation",
      title: "Exit Route Blocked",
      reporter: "David L.",
      location: "North Entrance",
      time: "12 min ago",
      severity: "high",
      upvotes: 28,
      icon: Navigation,
      color: "orange",
      isFriend: true,
    },
    {
      id: "5",
      type: "crowd",
      title: "Crowd Moving Quickly",
      reporter: "Emma W.",
      location: "Main Stage Exit",
      time: "15 min ago",
      severity: "medium",
      upvotes: 19,
      icon: Users,
      color: "yellow",
      isFriend: true,
    },
    {
      id: "6",
      type: "safety",
      title: "Lost Child Found",
      reporter: "Festival Staff",
      location: "Info Booth",
      time: "18 min ago",
      severity: "medium",
      upvotes: 34,
      icon: Shield,
      color: "green",
      isFriend: false,
    },
    {
      id: "7",
      type: "navigation",
      title: "Shorter Route Available",
      reporter: "Jake T.",
      location: "Between Stages",
      time: "25 min ago",
      severity: "low",
      upvotes: 15,
      icon: Navigation,
      color: "blue",
      isFriend: true,
    },
    {
      id: "8",
      type: "crowd",
      title: "Good Viewing Spot",
      reporter: "Sarah M.",
      location: "Side Stage Left",
      time: "30 min ago",
      severity: "low",
      upvotes: 22,
      icon: TrendingUp,
      color: "purple",
      isFriend: true,
    },
  ]);

  const getColorClasses = (color: string) => {
    const colors = {
      red: "border-red-500/50 bg-red-500/10",
      orange: "border-orange-500/50 bg-orange-500/10",
      yellow: "border-yellow-500/50 bg-yellow-500/10",
      green: "border-green-500/50 bg-green-500/10",
      blue: "border-blue-500/50 bg-blue-500/10",
      purple: "border-purple-500/50 bg-purple-500/10",
    };
    return colors[color as keyof typeof colors] || "border-cyan-500/50 bg-cyan-500/10";
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Community Alerts</h2>
          <p className="text-cyan-300/70">Stay informed with real-time updates</p>
        </div>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center gap-2"
        >
          <AlertTriangle className="w-5 h-5" />
          Create Alert
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-cyan-300/70 text-sm mb-1">Active Alerts</p>
          <p className="text-3xl font-bold text-white">24</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-purple-300/70 text-sm mb-1">From Friends</p>
          <p className="text-3xl font-bold text-white">8</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-green-300/70 text-sm mb-1">Resolved Today</p>
          <p className="text-3xl font-bold text-white">16</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-yellow-300/70 text-sm mb-1">Your Upvotes</p>
          <p className="text-3xl font-bold text-white">32</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
            <h3 className="text-xl font-bold text-white mb-4">My Alerts</h3>
            <div className="space-y-3">
              {myAlerts.map((alert) => {
                const Icon = alert.icon;
                return (
                  <div key={alert.id} className={`rounded-xl p-5 border ${getColorClasses(alert.color)}`}>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-slate-900/50 rounded-lg">
                        <Icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-white mb-1">{alert.title}</h4>
                            <p className="text-sm text-cyan-200/70 mb-2">{alert.description}</p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              alert.status === "active"
                                ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                : "bg-gray-500/20 text-gray-300 border border-gray-500/30"
                            }`}
                          >
                            {alert.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-cyan-300/60 mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {alert.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {alert.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <button className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300">
                            <TrendingUp className="w-4 h-4" />
                            {alert.upvotes} upvotes
                          </button>
                          <span className="text-cyan-500/40">•</span>
                          <button className="text-cyan-400 hover:text-cyan-300">
                            {alert.comments} comments
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
            <h3 className="text-xl font-bold text-white mb-4">Community Feed</h3>
            <div className="space-y-3">
              {communityAlerts.map((alert) => {
                const Icon = alert.icon;
                return (
                  <div
                    key={alert.id}
                    className={`rounded-xl p-5 border ${getColorClasses(alert.color)} hover:border-cyan-500/50 transition-all`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-slate-900/50 rounded-lg">
                        <Icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-white mb-1 flex items-center gap-2">
                              {alert.title}
                              {alert.isFriend && (
                                <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-300 rounded-full border border-yellow-500/30">
                                  Friend
                                </span>
                              )}
                            </h4>
                            <p className="text-xs text-cyan-300/60">by {alert.reporter}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-cyan-300/60 mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {alert.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {alert.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-lg text-cyan-200 text-xs font-medium transition-all flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Upvote ({alert.upvotes})
                          </button>
                          <button className="text-xs text-cyan-400 hover:text-cyan-300">
                            View on map
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
            <h3 className="text-lg font-bold text-white mb-4">Alert Categories</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-200 text-sm">Crowd</span>
                </div>
                <span className="text-yellow-300 font-bold">12</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span className="text-red-200 text-sm">Medical</span>
                </div>
                <span className="text-red-300 font-bold">3</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-green-200 text-sm">Safety</span>
                </div>
                <span className="text-green-300 font-bold">5</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-200 text-sm">Navigation</span>
                </div>
                <span className="text-blue-300 font-bold">4</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-2">Leaderboard</h3>
            <p className="text-purple-200/80 text-sm mb-4">Top contributors this week</p>
            <div className="space-y-2">
              {["Sarah M.", "Jake T.", "Emma W."].map((name, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-white">
                    {i + 1}. {name}
                  </span>
                  <span className="text-purple-300">{45 - i * 10} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Create Alert Modal (same styling, now it works) */}
      {isCreateOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setIsCreateOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-cyan-500/30 bg-slate-900/90 backdrop-blur p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Create Alert</h3>
                <p className="text-sm text-cyan-300/70">
                  Add a new community alert (it will appear instantly).
                </p>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-cyan-200/70 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="text-sm text-cyan-200/80">
                Type
                <select
                  className="mt-1 w-full rounded-xl border border-cyan-500/20 bg-slate-950/40 p-2 text-white"
                  value={createForm.type}
                  onChange={(e) =>
                    setCreateForm((p) => ({ ...p, type: e.target.value as AlertType }))
                  }
                >
                  <option value="crowd">Crowd</option>
                  <option value="medical">Medical</option>
                  <option value="safety">Safety</option>
                  <option value="navigation">Navigation</option>
                </select>
              </label>

              <label className="text-sm text-cyan-200/80">
                Severity
                <select
                  className="mt-1 w-full rounded-xl border border-cyan-500/20 bg-slate-950/40 p-2 text-white"
                  value={createForm.severity}
                  onChange={(e) =>
                    setCreateForm((p) => ({ ...p, severity: e.target.value as Severity }))
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </label>
            </div>

            <div className="mt-3 space-y-3">
              <label className="text-sm text-cyan-200/80 block">
                Title
                <input
                  className="mt-1 w-full rounded-xl border border-cyan-500/20 bg-slate-950/40 p-2 text-white placeholder:text-white/30"
                  placeholder="e.g., Exit route blocked"
                  value={createForm.title}
                  onChange={(e) => setCreateForm((p) => ({ ...p, title: e.target.value }))}
                />
              </label>

              <label className="text-sm text-cyan-200/80 block">
                Location
                <input
                  className="mt-1 w-full rounded-xl border border-cyan-500/20 bg-slate-950/40 p-2 text-white placeholder:text-white/30"
                  placeholder="e.g., North Entrance"
                  value={createForm.location}
                  onChange={(e) =>
                    setCreateForm((p) => ({ ...p, location: e.target.value }))
                  }
                />
              </label>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => setIsCreateOpen(false)}
                className="px-4 py-2 rounded-xl border border-cyan-500/30 text-cyan-100 hover:bg-cyan-500/10"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (!createForm.title.trim() || !createForm.location.trim()) return;

                  const t = createForm.type;
                  const newAlert: AlertItem = {
                    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now()),
                    type: t,
                    title: createForm.title.trim(),
                    description: `Severity: ${createForm.severity}`,
                    location: createForm.location.trim(),
                    time: "just now",
                    status: "active",
                    upvotes: 0,
                    comments: 0,
                    color: colorByType[t],
                    icon: iconByType[t],
                  };

                  setMyAlerts((prev) => [newAlert, ...prev]);

                  setIsCreateOpen(false);
                  setCreateForm({
                    type: "safety",
                    title: "",
                    location: "",
                    severity: "medium",
                  });
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25"
              >
                Create Alert
              </button>
            </div>

            <p className="mt-3 text-xs text-cyan-300/50">
              Tip: Title + Location are required.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
