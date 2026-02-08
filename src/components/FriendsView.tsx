import { useMemo, useState } from 'react';
import { UserPlus, Search, MapPin, MessageCircle, X, Send } from 'lucide-react';

type FriendStatus = 'online' | 'away' | 'offline';

type Friend = {
  id: string; // unique
  name: string;
  username: string;
  location: string;
  distance: string;
  status: FriendStatus;
  avatar: string;
  gradient: string;
  lastSeen: string;
  recentActivity: string;
};

type ChatMessage = {
  id: string;
  from: 'me' | 'them';
  text: string;
  time: string;
};

type Suggestion = {
  id: string;
  name: string;
  username: string;
  mutualFriends: number;
  avatar: string;
  gradient: string;
};

const normUser = (u: string) => u.trim().toLowerCase().replace(/^@/, '');

const MOCK_DIRECTORY: Friend[] = [
  {
    id: 'alexr',
    name: 'Alex Rodriguez',
    username: '@alexr',
    location: 'North Entrance',
    distance: '410m',
    status: 'online',
    avatar: 'AR',
    gradient: 'from-yellow-400 to-orange-500',
    lastSeen: 'Active now',
    recentActivity: 'Shared location',
  },
  {
    id: 'ninapatel',
    name: 'Nina Patel',
    username: '@ninapatel',
    location: 'Merch Booth',
    distance: '640m',
    status: 'away',
    avatar: 'NP',
    gradient: 'from-indigo-400 to-purple-500',
    lastSeen: '8 min ago',
    recentActivity: 'Checked into Merch Booth',
  },
  {
    id: 'tombrad',
    name: 'Tom Bradley',
    username: '@tombrad',
    location: 'Food Court',
    distance: '1.1km',
    status: 'online',
    avatar: 'TB',
    gradient: 'from-teal-400 to-cyan-500',
    lastSeen: 'Active now',
    recentActivity: 'Posted crowd alert 2 min ago',
  },
  {
    id: 'maya_k',
    name: 'Maya Khan',
    username: '@maya_k',
    location: 'Side Stage',
    distance: '780m',
    status: 'offline',
    avatar: 'MK',
    gradient: 'from-pink-400 to-purple-500',
    lastSeen: '1 hour ago',
    recentActivity: 'Left the festival',
  },
];

export function FriendsView() {
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: 'emma_w',
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
      id: 'jakethompson',
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
      id: 'lisachen',
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
  ]);

  // suggestions are directory IDs
  const [suggestions, setSuggestions] = useState<string[]>(['alexr', 'ninapatel', 'tombrad']);

  // Search bar for filtering friends list
  const [search, setSearch] = useState('');

  const filteredFriends = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return friends;
    return friends.filter((f) => {
      return (
        f.name.toLowerCase().includes(q) ||
        f.username.toLowerCase().includes(q) ||
        f.location.toLowerCase().includes(q)
      );
    });
  }, [friends, search]);

  const suggestionPeople = useMemo(() => {
    const friendSet = new Set(friends.map((f) => normUser(f.username)));
    return suggestions
      .map((id) => MOCK_DIRECTORY.find((p) => p.id === id))
      .filter(Boolean)
      .filter((p) => !friendSet.has(normUser((p as Friend).username))) as Friend[];
  }, [suggestions, friends]);

  // ----- Messaging state -----
  const [activeChatFriendId, setActiveChatFriendId] = useState<string | null>(null);
  const [draftMsg, setDraftMsg] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');

  const [chats, setChats] = useState<Record<string, ChatMessage[]>>({
    emma_w: [
      { id: 'm1', from: 'them', text: 'I’m near VIP. You good?', time: '9:12 PM' },
      { id: 'm2', from: 'me', text: 'Yeah! Heading your way.', time: '9:13 PM' },
    ],
    jakethompson: [{ id: 'm1', from: 'them', text: 'Main stage is packed rn', time: '9:08 PM' }],
  });

  const activeFriend = useMemo(
    () => friends.find((f) => f.id === activeChatFriendId) ?? null,
    [friends, activeChatFriendId]
  );

  const activeMessages = useMemo(() => {
    if (!activeChatFriendId) return [];
    return chats[activeChatFriendId] ?? [];
  }, [activeChatFriendId, chats]);

  const timeNow = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  const sendMessage = () => {
    if (!activeChatFriendId) return;
    const text = draftMsg.trim();
    if (!text) return;

    const msg: ChatMessage = {
      id: crypto.randomUUID(),
      from: 'me',
      text,
      time: timeNow(),
    };

    setChats((prev) => ({
      ...prev,
      [activeChatFriendId]: [...(prev[activeChatFriendId] ?? []), msg],
    }));
    setDraftMsg('');

    // Optional: auto-reply for demo
    window.setTimeout(() => {
      const reply: ChatMessage = {
        id: crypto.randomUUID(),
        from: 'them',
        text: 'Got it!',
        time: timeNow(),
      };
      setChats((prev) => ({
        ...prev,
        [activeChatFriendId]: [...(prev[activeChatFriendId] ?? []), reply],
      }));
    }, 600);
  };

  const addFriend = (person: Suggestion | Friend) => {
    // Build a Friend object (suggestions don’t have location/status fields)
    const newFriend: Friend = {
      id: person.id,
      name: person.name,
      username: person.username.startsWith('@') ? person.username : `@${person.username}`,
      location: 'Festival Grounds',
      distance: '??m',
      status: 'online',
      avatar:
        (person as any).avatar ??
        person.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase(),
      gradient: (person as any).gradient ?? 'from-cyan-400 to-blue-500',
      lastSeen: 'Active now',
      recentActivity: 'Just connected',
    };

    setFriends((prev) => {
      const exists = prev.some((f) => normUser(f.username) === normUser(newFriend.username));
      if (exists) return prev;
      return [newFriend, ...prev];
    });

    // Remove from suggestions if they were there (suggestions is string[])
    setSuggestions((prev) => prev.filter((id) => id !== newFriend.id));
  };

  const removeFriend = (friend: Friend) => {
    setFriends((prev) => prev.filter((f) => f.id !== friend.id));

    // Add them back to suggestions only if they exist in the directory (suggestions is string[])
    setSuggestions((prev) => {
      const inDirectory = MOCK_DIRECTORY.some((p) => p.id === friend.id);
      if (!inDirectory) return prev;
      return prev.includes(friend.id) ? prev : [friend.id, ...prev];
    });

    // If you removed the friend you were chatting with, close chat
    if (activeChatFriendId === friend.id) setActiveChatFriendId(null);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Friends Network</h2>
          <p className="text-cyan-300/70">Stay connected with your festival crew</p>
        </div>

        <button
          onClick={() => setAddOpen(true)}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          Add Friends
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-1">
              {friends.filter((f) => f.status === 'online').length}
            </div>
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

      {/* Search */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-cyan-500/20">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400/60" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search friends..."
            className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-cyan-500/20 rounded-xl text-white placeholder-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Friends list */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-white">Friends at Festival</h3>

          <div className="space-y-3">
            {filteredFriends.map((friend) => (
              <div
                key={friend.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${friend.gradient} flex items-center justify-center text-white font-bold text-lg ring-2 ring-cyan-400/30 flex-shrink-0`}
                  >
                    {friend.avatar}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white">{friend.name}</h4>
                          <div
                            className={`w-2 h-2 rounded-full ${
                              friend.status === 'online'
                                ? 'bg-green-400'
                                : friend.status === 'away'
                                ? 'bg-yellow-400'
                                : 'bg-gray-400'
                            }`}
                          />
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

                    <div className="space-y-2">
                      <button
                        onClick={() => setActiveChatFriendId(friend.id)}
                        className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-500/30 rounded-lg text-cyan-100 font-medium transition-all text-sm flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Message
                      </button>

                      <button
                        onClick={() => removeFriend(friend)}
                        className="w-full px-4 py-2 bg-slate-900/30 hover:bg-slate-900/50 border border-white/10 rounded-lg text-white/80 font-medium transition-all text-sm"
                      >
                        Remove Friend
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suggestions */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
            <h3 className="text-lg font-bold text-white mb-4">Friend Suggestions</h3>
            <div className="space-y-3">
              {suggestionPeople.map((person) => (
                <div
                  key={person.id}
                  className="bg-slate-900/30 rounded-xl p-4 border border-cyan-500/10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${person.gradient} flex items-center justify-center text-white font-semibold`}
                    >
                      {person.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white text-sm">{person.name}</p>
                      <p className="text-xs text-cyan-300/60">{person.username}</p>
                    </div>
                  </div>
                  <p className="text-xs text-cyan-400/70 mb-3">Suggested from directory</p>

                  <button
                    onClick={() => addFriend(person)}
                    className="w-full px-3 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-lg text-cyan-200 font-medium transition-all text-sm"
                  >
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

      {/* Add Friend Modal */}
      {addOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setAddOpen(false)}
        >
          <div
            className="w-full max-w-md bg-slate-900/90 border border-cyan-500/20 rounded-2xl p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">Add Friend by Username</h3>
              <button className="text-white/70 hover:text-white" onClick={() => setAddOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <input
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              placeholder="Type username, e.g. @alexr"
              className="w-full rounded-xl bg-slate-800/60 border border-cyan-500/20 text-white px-3 py-2 placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            />

            <button
              className="mt-3 w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-semibold"
              onClick={() => {
                const u = normUser(usernameInput);
                if (!u) return;

                const directoryMatch = MOCK_DIRECTORY.find((p) => normUser(p.username) === u);

                if (!directoryMatch) {
                  alert('User not found in directory.');
                  return;
                }

                const alreadyFriend = friends.some((f) => normUser(f.username) === u);
                if (alreadyFriend) {
                  alert('They are already in your friends list.');
                  return;
                }

                addFriend(directoryMatch);
                setUsernameInput('');
                setAddOpen(false);
              }}
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Messaging Modal */}
      {activeFriend && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setActiveChatFriendId(null)}
        >
          <div
            className="w-full max-w-lg bg-slate-900/90 border border-cyan-500/20 rounded-2xl p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${activeFriend.gradient} flex items-center justify-center text-white font-semibold`}
                >
                  {activeFriend.avatar}
                </div>
                <div>
                  <div className="text-white font-bold leading-tight">{activeFriend.name}</div>
                  <div className="text-xs text-cyan-300/60">{activeFriend.username}</div>
                </div>
              </div>

              <button
                type="button"
                className="text-white/70 hover:text-white"
                onClick={() => setActiveChatFriendId(null)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-72 overflow-y-auto rounded-xl bg-slate-950/40 border border-cyan-500/10 p-3 space-y-2">
              {activeMessages.length === 0 ? (
                <div className="text-sm text-cyan-300/60">No messages yet. Say hi.</div>
              ) : (
                activeMessages.map((m) => (
                  <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm border ${
                        m.from === 'me'
                          ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-50'
                          : 'bg-slate-800/60 border-slate-700/60 text-cyan-100'
                      }`}
                    >
                      <div>{m.text}</div>
                      <div className="mt-1 text-[11px] opacity-70">{m.time}</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-3 flex gap-2">
              <input
                value={draftMsg}
                onChange={(e) => setDraftMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') sendMessage();
                }}
                placeholder="Type a message..."
                className="flex-1 rounded-xl bg-slate-800/60 border border-cyan-500/20 text-white px-3 py-2 placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={!draftMsg.trim()}
                className={`px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 ${
                  draftMsg.trim()
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                    : 'bg-slate-800/50 text-white/40 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
