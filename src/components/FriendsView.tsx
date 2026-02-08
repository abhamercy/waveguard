import { UserPlus, Search, MapPin, MessageCircle, Navigation } from 'lucide-react';

export function FriendsView() {
  const friends = [
    {
      name: 'Emma Wilson',
      username: '@emma_w',
      location: 'VIP Lounge',
      distance: '150m',
      status: 'online',
      avatar: 'EW',
      gradient: 'from-cyan-400 to-blue-500',
      lastSeen: 'Active now',
      recentActivity: 'Posted crowd alert 5 min ago',
    },
    {
      name: 'Jake Thompson',
      username: '@jakethompson',
      location: 'Main Stage',
      distance: '320m',
      status: 'online',
      avatar: 'JT',
      gradient: 'from-purple-400 to-pink-500',
      lastSeen: 'Active now',
      recentActivity: 'Checked into Main Stage',
    },
    {
      name: 'Lisa Chen',
      username: '@lisachen',
      location: 'Food Court',
      distance: '580m',
      status: 'online',
      avatar: 'LC',
      gradient: 'from-green-400 to-emerald-500',
      lastSeen: 'Active now',
      recentActivity: 'Shared location',
    },
    {
      name: 'Mark Davis',
      username: '@markd',
      location: 'Side Stage',
      distance: '1.2km',
      status: 'away',
      avatar: 'MD',
      gradient: 'from-orange-400 to-red-500',
      lastSeen: '15 min ago',
      recentActivity: 'Posted navigation tip',
    },
    {
      name: 'Sarah Mitchell',
      username: '@sarahm',
      location: 'Rest Area',
      distance: '890m',
      status: 'online',
      avatar: 'SM',
      gradient: 'from-pink-400 to-purple-500',
      lastSeen: 'Active now',
      recentActivity: 'Found lost item',
    },
    {
      name: 'Chris Anderson',
      username: '@chris_a',
      location: 'Entry Gate',
      distance: '2.1km',
      status: 'offline',
      avatar: 'CA',
      gradient: 'from-slate-400 to-gray-500',
      lastSeen: '1 hour ago',
      recentActivity: 'Left the festival',
    },
  ];

  const suggestions = [
    {
      name: 'Alex Rodriguez',
      username: '@alexr',
      mutualFriends: 5,
      avatar: 'AR',
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      name: 'Nina Patel',
      username: '@ninapatel',
      mutualFriends: 3,
      avatar: 'NP',
      gradient: 'from-indigo-400 to-purple-500',
    },
    {
      name: 'Tom Bradley',
      username: '@tombrad',
      mutualFriends: 7,
      avatar: 'TB',
      gradient: 'from-teal-400 to-cyan-500',
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Friends Network</h2>
          <p className="text-cyan-300/70">Stay connected with your festival crew</p>
        </div>
        <button className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Add Friends
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-1">{friends.filter(f => f.status === 'online').length}</div>
            <p className="text-cyan-300/70 text-sm">Friends Online</p>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-1">{friends.length}</div>
            <p className="text-purple-300/70 text-sm">Total Friends</p>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/20">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-1">24</div>
            <p className="text-pink-300/70 text-sm">Shared Alerts</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-cyan-500/20">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400/60" />
          <input
            type="text"
            placeholder="Search friends..."
            className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-xl text-white placeholder-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-white">Friends at Festival</h3>
          <div className="space-y-3">
            {friends.map((friend, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${friend.gradient} flex items-center justify-center text-white font-bold text-lg ring-2 ring-cyan-400/30 flex-shrink-0`}>
                    {friend.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white">{friend.name}</h4>
                          <div className={`w-2 h-2 rounded-full ${friend.status === 'online' ? 'bg-green-400' : 'bg-gray-400'}`} />
                        </div>
                        <p className="text-sm text-cyan-300/60">{friend.username}</p>
                      </div>
                      <span className="text-xs text-cyan-400/80">{friend.lastSeen}</span>
                    </div>

                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <span className="flex items-center gap-1 text-cyan-300/80">
                        <MapPin className="w-4 h-4" />
                        {friend.location}
                      </span>
                      <span className="text-cyan-400/60">•</span>
                      <span className="text-cyan-300/80">{friend.distance} away</span>
                    </div>

                    <p className="text-sm text-cyan-200/70 mb-3">{friend.recentActivity}</p>

                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-500/30 rounded-lg text-cyan-100 font-medium transition-all text-sm flex items-center justify-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Message
                      </button>
                      <button className="flex-1 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-purple-200 font-medium transition-all text-sm flex items-center justify-center gap-2">
                        <Navigation className="w-4 h-4" />
                        Navigate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
            <h3 className="text-lg font-bold text-white mb-4">Friend Suggestions</h3>
            <div className="space-y-3">
              {suggestions.map((person, index) => (
                <div
                  key={index}
                  className="bg-slate-900/30 rounded-xl p-4 border border-cyan-500/10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${person.gradient} flex items-center justify-center text-white font-semibold`}>
                      {person.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white text-sm">{person.name}</p>
                      <p className="text-xs text-cyan-300/60">{person.username}</p>
                    </div>
                  </div>
                  <p className="text-xs text-cyan-400/70 mb-3">{person.mutualFriends} mutual friends</p>
                  <button className="w-full px-3 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-lg text-cyan-200 font-medium transition-all text-sm">
                    Add Friend
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-2">Create a Group</h3>
            <p className="text-purple-200/80 text-sm mb-4">
              Coordinate with multiple friends and share alerts together
            </p>
            <button className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-all text-sm">
              Create Group
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
