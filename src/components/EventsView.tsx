import { Calendar, MapPin, Users, Clock, Plus, Search } from 'lucide-react';

export function EventsView() {
  const events = [
    {
      name: 'Summer Beats Festival',
      date: 'Feb 10, 2026',
      time: '2:00 PM - 11:00 PM',
      location: 'Central Park',
      capacity: 5000,
      registered: 4850,
      status: 'Live',
      gradient: 'from-[#a5c6f1] to-[#e2a9d4]',
      statusColor: 'bg-green-500',
    },
    {
      name: 'Jazz Under Stars',
      date: 'Feb 12, 2026',
      time: '7:00 PM - 12:00 AM',
      location: 'Riverside Arena',
      capacity: 3200,
      registered: 2980,
      status: 'Scheduled',
      gradient: 'from-[#f6a6bb] to-[#f8ca7d]',
      statusColor: 'bg-blue-500',
    },
    {
      name: 'Rock Revival',
      date: 'Feb 15, 2026',
      time: '4:00 PM - 11:30 PM',
      location: 'Stadium Plaza',
      capacity: 12000,
      registered: 8500,
      status: 'Preparing',
      gradient: 'from-[#f8c16c] to-[#f48a79]',
      statusColor: 'bg-yellow-500',
    },
    {
      name: 'Electronic Dreams',
      date: 'Feb 20, 2026',
      time: '9:00 PM - 4:00 AM',
      location: 'Warehouse District',
      capacity: 8000,
      registered: 6200,
      status: 'Scheduled',
      gradient: 'from-[#a8eac5] to-[#88ccf8]',
      statusColor: 'bg-blue-500',
    },
    {
      name: 'Indie Vibes',
      date: 'Feb 25, 2026',
      time: '6:00 PM - 11:00 PM',
      location: 'The Garden',
      capacity: 2500,
      registered: 2100,
      status: 'Scheduled',
      gradient: 'from-[#e2a9d4] to-[#f6a6bb]',
      statusColor: 'bg-blue-500',
    },
    {
      name: 'Classical Evening',
      date: 'Mar 1, 2026',
      time: '7:30 PM - 10:00 PM',
      location: 'Concert Hall',
      capacity: 1500,
      registered: 1200,
      status: 'Scheduled',
      gradient: 'from-[#f8ca7d] to-[#f8c16c]',
      statusColor: 'bg-blue-500',
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Events</h2>
          <p className="text-gray-600">Manage all your festival events</p>
        </div>
        <button className="bg-gradient-to-r from-[#88ccf9] to-[#f29bc7] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create Event
        </button>
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-12 pr-4 py-3 bg-white/50 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => {
          const percentFilled = (event.registered / event.capacity) * 100;
          return (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/40 hover:shadow-xl transition-all"
            >
              <div className={`h-32 bg-gradient-to-br ${event.gradient} p-6 flex items-center justify-between`}>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{event.name}</h3>
                  <span className={`${event.statusColor} text-white text-xs px-3 py-1 rounded-full font-medium inline-block`}>
                    {event.status}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="flex items-center gap-1 text-gray-600">
                      <Users className="w-4 h-4" />
                      Registration
                    </span>
                    <span className="font-semibold text-gray-800">
                      {event.registered.toLocaleString()} / {event.capacity.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${event.gradient} transition-all`}
                      style={{ width: `${percentFilled}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{percentFilled.toFixed(0)}% capacity</p>
                </div>

                <button className="w-full bg-white/50 hover:bg-white border border-white/40 py-2 rounded-xl text-gray-700 font-medium transition-all">
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
