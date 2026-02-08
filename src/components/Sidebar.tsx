import { Zap, Map, UserCircle, Bell, Settings, LogOut, CalendarDays } from 'lucide-react';
import type { ViewType } from "../types";

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onSignOut: () => void; 
}



function AuraFlowLogo() {
  return (
    <div className="relative w-12 h-12">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="logoGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="logoGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        
        {/* Outer circle */}
        <circle cx="50" cy="50" r="45" fill="none" stroke="url(#logoGrad1)" strokeWidth="3" opacity="0.3"/>
        
        {/* Inner pulse circles */}
        <circle cx="50" cy="50" r="30" fill="none" stroke="url(#logoGrad2)" strokeWidth="2" opacity="0.6"/>
        <circle cx="50" cy="50" r="18" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.8"/>
        
        {/* Center star/burst */}
        <path d="M50 35 L52 45 L62 45 L54 52 L57 62 L50 55 L43 62 L46 52 L38 45 L48 45 Z" 
              fill="url(#logoGrad1)" />
        
        {/* Location pins */}
        <circle cx="35" cy="35" r="4" fill="#10b981" opacity="0.8"/>
        <circle cx="65" cy="35" r="4" fill="#06b6d4" opacity="0.8"/>
        <circle cx="35" cy="65" r="4" fill="#8b5cf6" opacity="0.8"/>
        <circle cx="65" cy="65" r="4" fill="#ec4899" opacity="0.8"/>
      </svg>
    </div>
  );
}

export function Sidebar({ currentView, onViewChange, onSignOut }: SidebarProps) {
  const navItems = [
    { id: 'dashboard' as ViewType, icon: Zap, label: 'Dashboard' },
    { id: 'map' as ViewType, icon: Map, label: 'Live Map' },
    { id: 'events' as ViewType, icon: CalendarDays, label: 'Live Events' },
    { id: 'friends' as ViewType, icon: UserCircle, label: 'Friends' },
    { id: 'alerts' as ViewType, icon: Bell, label: 'Alerts' },
  ];

  return (
    <aside className="w-full md:w-64 shrink-0 bg-slate-900/50 backdrop-blur-xl border-r border-cyan-500/20 flex flex-col">
      
      <div className="p-6 border-b border-cyan-500/20">
        <div className="flex items-center gap-3">
          <AuraFlowLogo />
          <div>
            <h1 className="text-2xl font-bold bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent">
              InterLink
            </h1>
            <p className="text-xs text-cyan-300/70">Bringing Safety to You</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'text-cyan-100/70 hover:bg-slate-800/50 hover:text-cyan-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-cyan-500/20 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-cyan-100/70 hover:bg-slate-800/50 transition-all">
          <Bell className="w-5 h-5" />
          <span className="font-medium">Notifications</span>
          <span className="ml-auto bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full">
            5
          </span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-cyan-100/70 hover:bg-slate-800/50 transition-all">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
      </div>

  <div className="p-4 border-t border-cyan-500/20">
  <div className="flex items-center gap-3 px-2 mb-3">
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-semibold ring-2 ring-cyan-400/50">
      AK
    </div>
    <div className="flex-1">
      <p className="font-medium text-cyan-100 text-sm">Amari Kim</p>
      <p className="text-xs text-cyan-300/60">Premium Member</p>
    </div>
  </div>

  <button
    onClick={onSignOut}
    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all text-sm"
  >
    <LogOut className="w-4 h-4" />
    <span>Sign Out</span>
  </button>
</div>

    </aside>
  );
}
