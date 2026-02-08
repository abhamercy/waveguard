import { TrendingUp, Users, DollarSign, Star, BarChart3, PieChart } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts';

export function AnalyticsView() {
  const attendanceData = [
    { month: 'Jan', attendees: 4200 },
    { month: 'Feb', attendees: 8500 },
    { month: 'Mar', attendees: 6800 },
    { month: 'Apr', attendees: 9200 },
    { month: 'May', attendees: 12000 },
    { month: 'Jun', attendees: 15500 },
  ];

  const revenueData = [
    { event: 'Summer Beats', revenue: 125000 },
    { event: 'Jazz Stars', revenue: 89000 },
    { event: 'Rock Revival', revenue: 215000 },
    { event: 'Electronic', revenue: 156000 },
    { event: 'Indie Vibes', revenue: 67000 },
  ];

  const categoryData = [
    { name: 'Music', value: 45 },
    { name: 'Food & Drinks', value: 25 },
    { name: 'Merchandise', value: 15 },
    { name: 'VIP Tickets', value: 15 },
  ];

  const COLORS = ['#a5c6f1', '#f6a6bb', '#f8c16c', '#a8eac5'];

  const stats = [
    {
      label: 'Total Revenue',
      value: '$652K',
      change: '+23% from last month',
      icon: DollarSign,
      gradient: 'from-[#a5c6f1] to-[#e2a9d4]',
    },
    {
      label: 'Avg. Attendance',
      value: '9,533',
      change: '+15% from last month',
      icon: Users,
      gradient: 'from-[#f6a6bb] to-[#f8ca7d]',
    },
    {
      label: 'Customer Rating',
      value: '4.8',
      change: '+0.2 from last month',
      icon: Star,
      gradient: 'from-[#f8c16c] to-[#f48a79]',
    },
    {
      label: 'Events Hosted',
      value: '24',
      change: '+6 this quarter',
      icon: BarChart3,
      gradient: 'from-[#a8eac5] to-[#88ccf8]',
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Analytics Dashboard</h2>
        <p className="text-gray-600">Track your festival performance and insights</p>
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
              <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#a5c6f1] to-[#e2a9d4] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Attendance Trend</h3>
              <p className="text-sm text-gray-600">Monthly festival attendance</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  borderRadius: '12px'
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="attendees" 
                stroke="url(#colorAttendees)" 
                strokeWidth={3}
                dot={{ fill: '#a5c6f1', r: 5 }}
              />
              <defs>
                <linearGradient id="colorAttendees" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#a5c6f1" />
                  <stop offset="100%" stopColor="#e2a9d4" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#f6a6bb] to-[#f8ca7d] flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Revenue by Event</h3>
              <p className="text-sm text-gray-600">Total revenue breakdown</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="event" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  borderRadius: '12px'
                }} 
              />
              <Legend />
              <Bar dataKey="revenue" fill="url(#colorRevenue)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f6a6bb" />
                  <stop offset="100%" stopColor="#f8ca7d" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#f8c16c] to-[#f48a79] flex items-center justify-center">
              <PieChart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Revenue Categories</h3>
              <p className="text-sm text-gray-600">Distribution by category</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Key Insights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-white/50 rounded-xl border border-white/40">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#a8eac5] to-[#88ccf8] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800">Peak Season</h4>
              </div>
              <p className="text-sm text-gray-600">
                June shows highest attendance with 15,500 attendees. Consider scheduling more events during summer months.
              </p>
            </div>

            <div className="p-4 bg-white/50 rounded-xl border border-white/40">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f6a6bb] to-[#f8ca7d] flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800">Top Performer</h4>
              </div>
              <p className="text-sm text-gray-600">
                Rock Revival generated $215K in revenue, 65% above average. Similar events could drive growth.
              </p>
            </div>

            <div className="p-4 bg-white/50 rounded-xl border border-white/40">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#a5c6f1] to-[#e2a9d4] flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800">Customer Satisfaction</h4>
              </div>
              <p className="text-sm text-gray-600">
                Average rating improved to 4.8/5.0. Food quality and venue atmosphere were most praised.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
