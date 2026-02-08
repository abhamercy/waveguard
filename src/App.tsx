// src/App.tsx
import { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { MapView } from './components/MapView';
import { FriendsView } from './components/FriendsView';
import { AlertsView } from './components/AlertsView';
import { EventsView } from './components/EventsView';
import { SignInPage } from './components/SignInPage';
import type { ViewType } from "./types";

type Session = { email: string };

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [mapFocus, setMapFocus] = useState<'alerts' | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // ✅ NEW: login state
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('interlink_session');
    if (raw) {
      try {
        setSession(JSON.parse(raw));
      } catch {
        localStorage.removeItem('interlink_session');
      }
    }
  }, []);

  const handleSignIn = (email: string, _password: string) => {
    // For now: accept any email/password (no backend yet)
    const next = { email };
    setSession(next);
    localStorage.setItem('interlink_session', JSON.stringify(next));
    setCurrentView('dashboard');
  };

  const handleSignOut = () => {
    setSession(null);
    localStorage.removeItem('interlink_session');
    setCurrentView('dashboard');
  };

  // ✅ If not signed in, only show the login page
  if (!session) {
    return (
      <SignInPage
        onSignIn={handleSignIn}
        onCreateAccount={() => alert('Create account coming soon')}
      />
    );
  }

  return (
    <div className="flex h-screen flex-col md:flex-row overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        onSignOut={handleSignOut} // ✅ new prop
      />
      <main className="flex-1 overflow-y-auto">
        {currentView === "dashboard" && (
          <DashboardView
            onViewAlertsOnMap={() => {
              setMapFocus("alerts");
              setCurrentView("map");
            }}
            onFindMoreFriends={() => setCurrentView("friends")}
          />
        )}

        {currentView === 'map' && <MapView focus={mapFocus} />}
        {currentView === 'events' && <EventsView selectedEventId={selectedEventId} />}
        {currentView === 'friends' && <FriendsView />}
        {currentView === 'alerts' && <AlertsView />}
      </main>
    </div>
  );
}
