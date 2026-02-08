// src/components/SettingsModal.tsx
import { X, Settings, User, Bell, Shield, Moon, Globe, LogOut } from 'lucide-react';
import { useState } from 'react';

interface SettingsModalProps {
  onClose: () => void;
  onSignOut: () => void;
}

export function SettingsModal({ onClose, onSignOut }: SettingsModalProps) {
  const [notifications, setNotifications] = useState({
    alerts: true,
    friends: true,
    photos: true,
    events: true,
  });

  const [privacy, setPrivacy] = useState({
    shareLocation: true,
    profileVisible: true,
    showSchool: true,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-2xl bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Settings</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700/50 rounded-lg transition-all">
            <X className="w-5 h-5 text-cyan-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Profile Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Profile</h3>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4 border border-cyan-500/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                  AK
                </div>
                <div>
                  <p className="font-semibold text-white">Amari Kim</p>
                  <p className="text-sm text-cyan-300/60">amari.kim@gmail.com</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-300">
                    University of Texas at Austin
                  </span>
                </div>
              </div>
              <button className="w-full py-2 bg-slate-800/50 hover:bg-slate-800 border border-cyan-500/20 rounded-lg text-cyan-300 text-sm font-medium transition-all">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Notifications</h3>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4 border border-cyan-500/10 space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-cyan-100">Alert notifications</span>
                <input
                  type="checkbox"
                  checked={notifications.alerts}
                  onChange={(e) => setNotifications({ ...notifications, alerts: e.target.checked })}
                  className="w-5 h-5 rounded bg-slate-800 border-cyan-500/20 text-cyan-500 focus:ring-cyan-500/40"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-cyan-100">Friend activity</span>
                <input
                  type="checkbox"
                  checked={notifications.friends}
                  onChange={(e) => setNotifications({ ...notifications, friends: e.target.checked })}
                  className="w-5 h-5 rounded bg-slate-800 border-cyan-500/20 text-cyan-500 focus:ring-cyan-500/40"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-cyan-100">Photo likes & comments</span>
                <input
                  type="checkbox"
                  checked={notifications.photos}
                  onChange={(e) => setNotifications({ ...notifications, photos: e.target.checked })}
                  className="w-5 h-5 rounded bg-slate-800 border-cyan-500/20 text-cyan-500 focus:ring-cyan-500/40"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-cyan-100">Event updates</span>
                <input
                  type="checkbox"
                  checked={notifications.events}
                  onChange={(e) => setNotifications({ ...notifications, events: e.target.checked })}
                  className="w-5 h-5 rounded bg-slate-800 border-cyan-500/20 text-cyan-500 focus:ring-cyan-500/40"
                />
              </label>
            </div>
          </div>

          {/* Privacy */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Privacy</h3>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4 border border-cyan-500/10 space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-cyan-100">Share location with friends</span>
                <input
                  type="checkbox"
                  checked={privacy.shareLocation}
                  onChange={(e) => setPrivacy({ ...privacy, shareLocation: e.target.checked })}
                  className="w-5 h-5 rounded bg-slate-800 border-cyan-500/20 text-cyan-500 focus:ring-cyan-500/40"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-cyan-100">Visible to other attendees</span>
                <input
                  type="checkbox"
                  checked={privacy.profileVisible}
                  onChange={(e) => setPrivacy({ ...privacy, profileVisible: e.target.checked })}
                  className="w-5 h-5 rounded bg-slate-800 border-cyan-500/20 text-cyan-500 focus:ring-cyan-500/40"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-cyan-100">Show school affiliation</span>
                <input
                  type="checkbox"
                  checked={privacy.showSchool}
                  onChange={(e) => setPrivacy({ ...privacy, showSchool: e.target.checked })}
                  className="w-5 h-5 rounded bg-slate-800 border-cyan-500/20 text-cyan-500 focus:ring-cyan-500/40"
                />
              </label>
            </div>
          </div>

          {/* Appearance */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Moon className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Appearance</h3>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4 border border-cyan-500/10">
              <p className="text-cyan-100 mb-2">Theme</p>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-slate-800 border-2 border-cyan-500 rounded-lg text-cyan-300 text-sm font-medium">
                  Dark Mode
                </button>
                <button className="p-3 bg-slate-800/50 border border-slate-700/20 rounded-lg text-cyan-300/60 text-sm font-medium">
                  Light Mode
                </button>
              </div>
            </div>
          </div>

          {/* Language */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Language</h3>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4 border border-cyan-500/10">
              <select className="w-full p-3 bg-slate-800/50 border border-cyan-500/20 rounded-lg text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/40">
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-cyan-500/20 space-y-3">
          <button className="w-full py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-500/30 rounded-xl text-cyan-100 font-medium transition-all">
            Save Changes
          </button>
          <button
            onClick={onSignOut}
            className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 font-medium transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
