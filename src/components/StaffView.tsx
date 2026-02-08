import { Users, Search, UserPlus, Shield, UserCheck, Clock } from 'lucide-react';

export function StaffView() {
  const staffMembers = [
    {
      name: 'Sarah Mitchell',
      role: 'Security Lead',
      status: 'On Duty',
      event: 'Summer Beats Festival',
      shift: '2:00 PM - 10:00 PM',
      avatar: 'SM',
      statusColor: 'bg-green-500',
      gradient: 'from-[#a5c6f1] to-[#e2a9d4]',
    },
    {
      name: 'Mike Johnson',
      role: 'Medical Staff',
      status: 'On Duty',
      event: 'Summer Beats Festival',
      shift: '2:00 PM - 10:00 PM',
      avatar: 'MJ',
      statusColor: 'bg-green-500',
      gradient: 'from-[#f6a6bb] to-[#f8ca7d]',
    },
    {
      name: 'Emma Davis',
      role: 'Event Coordinator',
      status: 'On Duty',
      event: 'Summer Beats Festival',
      shift: '1:00 PM - 11:00 PM',
      avatar: 'ED',
      statusColor: 'bg-green-500',
      gradient: 'from-[#f8c16c] to-[#f48a79]',
    },
    {
      name: 'James Wilson',
      role: 'Technical Support',
      status: 'Off Duty',
      event: '-',
      shift: 'Next: Tomorrow 3:00 PM',
      avatar: 'JW',
      statusColor: 'bg-gray-500',
      gradient: 'from-[#a8eac5] to-[#88ccf8]',
    },
    {
      name: 'Lisa Anderson',
      role: 'Crowd Control',
      status: 'On Duty',
      event: 'Summer Beats Festival',
      shift: '2:00 PM - 10:00 PM',
      avatar: 'LA',
      statusColor: 'bg-green-500',
      gradient: 'from-[#e2a9d4] to-[#f6a6bb]',
    },
    {
      name: 'Robert Brown',
      role: 'Security',
      status: 'On Break',
      event: 'Summer Beats Festival',
      shift: '2:00 PM - 10:00 PM',
      avatar: 'RB',
      statusColor: 'bg-yellow-500',
      gradient: 'from-[#f8ca7d] to-[#f8c16c]',
    },
    {
      name: 'Jennifer Lee',
      role: 'Medical Staff',
      status: 'On Duty',
      event: 'Summer Beats Festival',
      shift: '2:00 PM - 10:00 PM',
      avatar: 'JL',
      statusColor: 'bg-green-500',
      gradient: 'from-[#a5c6f1] to-[#e2a9d4]',
    },
    {
      name: 'David Garcia',
      role: 'Logistics',
      status: 'Off Duty',
      event: '-',
      shift: 'Next: Feb 12, 6:00 PM',
      avatar: 'DG',
      statusColor: 'bg-gray-500',
      gradient: 'from-[#f6a6bb] to-[#f8ca7d]',
    },
  ];

  const stats = [
    { label: 'Total Staff', value: '127', icon: Users, gradient: 'from-[#a5c6f1] to-[#e2a9d4]' },
    { label: 'On Duty', value: '24', icon: UserCheck, gradient: 'from-[#a8eac5] to-[#88ccf8]' },
    { label: 'On Break', value: '3', icon: Clock, gradient: 'from-[#f8ca7d] to-[#f8c16c]' },
    { label: 'Security', value: '18', icon: Shield, gradient: 'from-[#f6a6bb] to-[#f8ca7d]' },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Staff Management</h2>
          <p className="text-gray-600">Manage your festival team</p>
        </div>
        <button className="bg-gradient-to-r from-[#88ccf9] to-[#f29bc7] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Add Staff
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search staff members..."
            className="w-full pl-12 pr-4 py-3 bg-white/50 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {staffMembers.map((staff, index) => (
          <div
            key={index}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40 hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${staff.gradient} flex items-center justify-center text-white text-xl font-bold`}>
                {staff.avatar}
              </div>
              <span className={`${staff.statusColor} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                {staff.status}
              </span>
            </div>

            <h3 className="font-bold text-gray-800 text-lg mb-1">{staff.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{staff.role}</p>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{staff.event}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{staff.shift}</span>
              </div>
            </div>

            <button className="w-full mt-4 bg-white/50 hover:bg-white border border-white/40 py-2 rounded-xl text-gray-700 font-medium transition-all text-sm">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
