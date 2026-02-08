import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { MapView } from './components/MapView';
import { FriendsView } from './components/FriendsView';
import { AlertsView } from './components/AlertsView';

import type { ViewType } from "./types";


export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [mapFocus, setMapFocus] = useState<'alerts' | null>(null);
const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);

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


{currentView === 'map' && <MapView focus={mapFocus} />}
        {currentView === 'friends' && <FriendsView />}
        {currentView === 'alerts' && <AlertsView />}
      </main>
    </div>
  );
}
