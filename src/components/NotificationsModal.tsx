import { X, Bell, AlertTriangle, Users, Heart, MessageCircle } from 'lucide-react';

interface NotificationsModalProps {
  onClose: () => void;
}

export function NotificationsModal({ onClose }: NotificationsModalProps) {
  const notifications = [
    {
      id: '1',
      type: 'alert',
      title: 'New alert nearby',
      message: 'Emma Wilson reported high crowd density at Main Stage',
      time: '2 min ago',
      unread: true,
      icon: AlertTriangle,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
    },
    {
      id: '2',
      type: 'friend',
      title: 'Friend check-in',
      message: 'Jake Thompson is now at VIP Lounge',
      time: '5 min ago',
      unread: true,
      icon: Users,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
    },
    {
      id: '3',
      type: 'like',
      title: 'Photo liked',
      message: 'Sarah Mitchell liked your photo from Main Stage',
      time: '12 min ago',
      unread: true,
      icon: Heart,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
    },
    {
      id: '4',
      type: 'comment',
      title: 'New comment',
      message: 'Mark Davis commented on your alert',
      time: '25 min ago',
      unread: false,
      icon: MessageCircle,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    {
      id: '5',
      type: 'alert',
      title: 'Safety update',
      message: 'All clear - Medical situation resolved at Food Court',
      time: '1 hour ago',
      unread: false,
      icon: AlertTriangle,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-lg bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Notifications</h2>
              <p className="text-xs text-cyan-300/60">
                {notifications.filter((n) => n.unread).length} unread
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700/50 rounded-lg transition-all">
            <X className="w-5 h-5 text-cyan-400" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-3">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    notification.unread
                      ? 'bg-cyan-500/5 border-cyan-500/20 hover:bg-cyan-500/10'
                      : 'bg-slate-900/30 border-slate-700/20 hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 ${notification.bgColor} rounded-lg flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${notification.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-white text-sm">{notification.title}</h3>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-cyan-200/70 mb-2">{notification.message}</p>
                      <p className="text-xs text-cyan-400/60">{notification.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-cyan-500/20">
          <button className="w-full py-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-all">
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
}
