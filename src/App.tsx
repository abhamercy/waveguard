import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { MapView } from './components/MapView';
import { FriendsView } from './components/FriendsView';
import { AlertsView } from './components/AlertsView';
import { EventsView } from './components/EventsView';
import type { ViewType } from "./types";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
const [mapFocus, setMapFocus] = useState<'alerts' | 'events' | null>(null);
const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  return (
    <div className="flex h-screen flex-col md:flex-row overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
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

        // App.tsx
{currentView === 'map' && (
  <MapView
    focus={mapFocus}                 // keep your existing focus
    selectedEventId={selectedEventId}
    onSelectEvent={(eventId) => {
      setSelectedEventId(eventId);   // store selection
      setCurrentView('events');      // go to Events tab
    }}
  />
)}


{currentView === 'events' && (
  <EventsView
    selectedEventId={selectedEventId}
    onViewEventOnMap={(id) => {
      setSelectedEventId(id);
      setMapFocus('events');
      setCurrentView('map');
    }}
  />
)}
        {currentView === 'friends' && <FriendsView />}
        {currentView === 'alerts' && <AlertsView />}
      </main>
    </div>
  );
}
