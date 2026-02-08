import { useMemo, useState } from "react";
import {
  Users,
  MapPin,
  AlertTriangle,
  TrendingUp,
  Shield,
  Heart,
  Navigation,
} from "lucide-react";

export function DashboardView({
  onViewAlertsOnMap,
  onFindMoreFriends,
}: {
  onViewAlertsOnMap: () => void;
  onFindMoreFriends: () => void;
}) {
  
  const [isReportOpen, setIsReportOpen] = useState(false);

  type Severity = "low" | "medium" | "high" | "critical";
  type ReportType = "crowd" | "medical" | "safety" | "navigation";
type Friend = {
  name: string;
  location: string;
  distance: string;
  status: 'online' | 'away';
  avatar: string;
  gradient: string;
};

const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  const [reportForm, setReportForm] = useState({
    type: "safety" as ReportType,
    title: "",
    location: "",
    details: "",
    severity: "medium" as Severity,
    reporter: "You",
  });
  const recentAlerts = [
    {
      type: "crowd",
      title: "High Crowd Density",
      location: "Main Stage Area",
      reporter: "Sarah M.",
      time: "2 min ago",
      severity: "high",
      icon: Users,
    },
    {
      type: "medical",
      title: "Medical Assistance Needed",
      location: "Food Court Section B",
      reporter: "Mike J.",
      time: "5 min ago",
      severity: "critical",
      icon: Heart,
    },
    {
      type: "safety",
      title: "Lost Child Found",
      location: "Info Booth",
      reporter: "Festival Staff",
      time: "8 min ago",
      severity: "medium",
      icon: Shield,
    },
    {
      type: "navigation",
      title: "Exit Route Blocked",
      location: "North Entrance",
      reporter: "David L.",
      time: "12 min ago",
      severity: "high",
      icon: Navigation,
    },
  ];
  const [alerts, setAlerts] = useState(recentAlerts);
  const stats = [
    {
      label: "Nearby Friends",
      value: "12",
      change: "At festival now",
      icon: Users,
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      label: "Active Alerts",
      value: "8",
      change: "In your area",
      icon: AlertTriangle,
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      label: "Safe Zones",
      value: "4",
      change: "Medical & Rest",
      icon: Shield,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      label: "Community Reports",
      value: "156",
      change: "Last hour",
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-500",
    },
  ];



  const friendsNearby = [
    {
      name: "Emma Wilson",
      location: "VIP Lounge",
      distance: "150m away",
      status: "online",
      avatar: "EW",
      gradient: "from-cyan-400 to-blue-500",
    },
    {
      name: "Jake Thompson",
      location: "Main Stage",
      distance: "320m away",
      status: "online",
      avatar: "JT",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      name: "Lisa Chen",
      location: "Food Court",
      distance: "580m away",
      status: "online",
      avatar: "LC",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      name: "Mark Davis",
      location: "Side Stage",
      distance: "1.2km away",
      status: "away",
      avatar: "MD",
      gradient: "from-orange-400 to-red-500",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-red-500/50 bg-red-500/10";
      case "high":
        return "border-orange-500/50 bg-orange-500/10";
      case "medium":
        return "border-yellow-500/50 bg-yellow-500/10";
      default:
        return "border-cyan-500/50 bg-cyan-500/10";
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Welcome back, Amari!
        </h2>
        <p className="text-cyan-300/70">
          Stay connected and stay safe!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-cyan-300/70 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-cyan-400/60">{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            Community Alerts
          </h3>
          <div className="space-y-3">
            {alerts.map((alert, index) => {
              const Icon = alert.icon;
              return (
                <div
                  key={index}
                  className={`rounded-xl p-4 border ${getSeverityColor(alert.severity)} hover:border-cyan-500/50 transition-all`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-900/50 rounded-lg">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-white mb-1">
                            {alert.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-cyan-300/60">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {alert.location}
                            </span>
                            <span>by {alert.reporter}</span>
                          </div>
                        </div>
                        <span className="text-xs text-cyan-400/60">
                          {alert.time}
                        </span>
                      </div>
                      <button
  onClick={onViewAlertsOnMap}
  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
>
  View on map →
</button>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
         <button
  onClick={onViewAlertsOnMap}
  className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-500/30 rounded-xl text-cyan-100 font-medium transition-all"
>
  View All Alerts on Map
</button>

        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            Friends Nearby
          </h3>
          <div className="space-y-3">
 {friendsNearby.map((friend, index) => (
  <button
    key={index}
    onClick={() => setSelectedFriend(friend)}
    className="w-full text-left bg-slate-900/30 rounded-xl p-3 border border-cyan-500/10 hover:border-cyan-500/30 transition-all"
  >

                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${friend.gradient} flex items-center justify-center text-white font-semibold text-sm ring-2 ring-cyan-400/30`}
                  >
                    {friend.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-white text-sm">
                        {friend.name}
                      </p>
                      <div
                        className={`w-2 h-2 rounded-full ${friend.status === "online" ? "bg-green-400" : "bg-gray-400"}`}
                      />
                    </div>
                    <p className="text-xs text-cyan-300/60 mb-1">
                      {friend.location}
                    </p>
                    <p className="text-xs text-cyan-400/80 font-medium">
                      {friend.distance}
                    </p>
                  </div>
                </div>
              </button>
            ))}
            {selectedFriend && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
    <div className="w-full max-w-md rounded-2xl border border-cyan-500/30 bg-slate-900/90 backdrop-blur p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-full bg-gradient-to-br ${selectedFriend.gradient} flex items-center justify-center text-white font-semibold text-sm ring-2 ring-cyan-400/30`}
          >
            {selectedFriend.avatar}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{selectedFriend.name}</h3>
            <p className="text-sm text-cyan-300/70">
              {selectedFriend.status === "online" ? "Online now" : "Away"}
            </p>
          </div>
        </div>

        <button
          onClick={() => setSelectedFriend(null)}
          className="text-cyan-200/70 hover:text-white text-sm"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2 text-sm text-cyan-200/80">
        <p><span className="text-cyan-400">Location:</span> {selectedFriend.location}</p>
        <p><span className="text-cyan-400">Distance:</span> {selectedFriend.distance}</p>
      </div>

      <div className="mt-5 flex gap-2">
        <button
          className="flex-1 px-4 py-2 rounded-xl border border-cyan-500/30 text-cyan-100 hover:bg-cyan-500/10"
          onClick={() => alert(`Message sent to ${selectedFriend.name} ✅`)}
        >
          Message
        </button>
        <button
          className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25"
          onClick={() => alert(`Meet-up request sent to ${selectedFriend.name} ✅`)}
        >
          Meet Up
        </button>
      </div>
    </div>
  </div>
)}

          </div>
       <button
  onClick={onFindMoreFriends}
  className="w-full mt-4 px-4 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl text-purple-200 font-medium transition-all"
>
  Find More Friends
</button>

        </div>
      </div>

      <div className="bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-500/30 rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Report an Issue
            </h3>
            <p className="text-cyan-200/80 mb-4">
              Help keep the community safe by reporting any concerns
            </p>
            <button
              onClick={() => setIsReportOpen(true)}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              Create Report
            </button>
          </div>
          <div className="hidden lg:block">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 backdrop-blur-sm flex items-center justify-center border border-cyan-400/30">
              <AlertTriangle className="w-16 h-16 text-cyan-300" />
            </div>
          </div>
        </div>
      </div>
      {isReportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-cyan-500/30 bg-slate-900/90 backdrop-blur p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Create a Report
                </h3>
                <p className="text-sm text-cyan-300/70">
                  Submit a community safety report
                </p>
              </div>
              <button
                onClick={() => setIsReportOpen(false)}
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
                  value={reportForm.type}
                  onChange={(e) =>
                    setReportForm((p) => ({
                      ...p,
                      type: e.target.value as any,
                    }))
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
                  value={reportForm.severity}
                  onChange={(e) =>
                    setReportForm((p) => ({
                      ...p,
                      severity: e.target.value as any,
                    }))
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
                  className="mt-1 w-full rounded-xl border border-cyan-500/20 bg-slate-950/40 p-2 text-white"
                  placeholder="e.g., Exit route blocked"
                  value={reportForm.title}
                  onChange={(e) =>
                    setReportForm((p) => ({ ...p, title: e.target.value }))
                  }
                />
              </label>

              <label className="text-sm text-cyan-200/80 block">
                Location
                <input
                  className="mt-1 w-full rounded-xl border border-cyan-500/20 bg-slate-950/40 p-2 text-white"
                  placeholder="e.g., North Entrance"
                  value={reportForm.location}
                  onChange={(e) =>
                    setReportForm((p) => ({ ...p, location: e.target.value }))
                  }
                />
              </label>

              <label className="text-sm text-cyan-200/80 block">
                Details (optional)
                <textarea
                  className="mt-1 w-full rounded-xl border border-cyan-500/20 bg-slate-950/40 p-2 text-white min-h-[90px]"
                  placeholder="Add any extra context..."
                  value={reportForm.details}
                  onChange={(e) =>
                    setReportForm((p) => ({ ...p, details: e.target.value }))
                  }
                />
              </label>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => setIsReportOpen(false)}
                className="px-4 py-2 rounded-xl border border-cyan-500/30 text-cyan-100 hover:bg-cyan-500/10"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (!reportForm.title.trim() || !reportForm.location.trim())
                    return;

                  const iconByType: Record<string, any> = {
                    crowd: Users,
                    medical: Heart,
                    safety: Shield,
                    navigation: Navigation,
                  };

                  setAlerts((prev) => [
                    {
                      type: reportForm.type,
                      title: reportForm.title,
                      location: reportForm.location,
                      reporter: reportForm.reporter,
                      time: "just now",
                      severity: reportForm.severity,
                      icon: iconByType[reportForm.type] ?? AlertTriangle,
                    },
                    ...prev,
                  ]);

                  setIsReportOpen(false);
                  setReportForm((p) => ({
                    ...p,
                    title: "",
                    location: "",
                    details: "",
                  }));
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25"
              >
                Submit Report
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
