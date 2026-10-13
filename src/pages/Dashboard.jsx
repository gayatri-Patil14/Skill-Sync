import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { FiUsers, FiCalendar, FiAward, FiTrendingUp, FiArrowRight } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { AnalyticsCard } from '../components/Cards'
import { Link } from 'react-router-dom'

const chartData = [
  { day: 'Mon', xp: 40 }, { day: 'Tue', xp: 80 }, { day: 'Wed', xp: 60 },
  { day: 'Thu', xp: 120 }, { day: 'Fri', xp: 90 }, { day: 'Sat', xp: 150 }, { day: 'Sun', xp: 130 },
]

const stats = [
  { title: 'Total XP', value: '1,240', change: 12, icon: FiAward, color: 'bg-amber-50 text-amber-500' },
  { title: 'Sessions', value: '24', change: 8, icon: FiCalendar, color: 'bg-blue-50 text-blue-500' },
  { title: 'Connections', value: '47', change: 5, icon: FiUsers, color: 'bg-emerald-50 text-emerald-500' },
  { title: 'Skills Shared', value: '12', change: 20, icon: FiTrendingUp, color: 'bg-purple-50 text-purple-500' },
]

const upcoming = [
  { id: 1, title: 'React Hooks Deep Dive', mentor: 'Priya S.', time: 'Today, 3:00 PM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' },
  { id: 2, title: 'Python Basics', mentor: 'Marcus L.', time: 'Tomorrow, 10:00 AM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus' },
  { id: 3, title: 'UI/UX Principles', mentor: 'Sofia R.', time: 'Wed, 2:00 PM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia' },
]

const recommendations = [
  { name: 'Arjun Patel', skill: 'Machine Learning', match: 94, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun' },
  { name: 'Emma Wilson', skill: 'Data Science', match: 88, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' },
  { name: 'Kai Zhang', skill: 'Node.js', match: 82, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kai' },
]

const activity = [
  { icon: '🏆', text: 'Earned "Top Mentor" badge', time: '2h ago' },
  { icon: '💬', text: 'New message from Priya Sharma', time: '4h ago' },
  { icon: '📅', text: 'Session booked: Python Basics', time: '1d ago' },
  { icon: '⭐', text: 'Received 5-star review from Marcus', time: '2d ago' },
  { icon: '🤝', text: 'Connected with Emma Wilson', time: '3d ago' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const xpPercent = Math.min((user?.xp % 500) / 5, 100)

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold mb-1">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
            <p className="text-white/80 text-sm">You're on a 7-day learning streak. Keep it up!</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{user?.xp}</div>
            <div className="text-white/80 text-sm">Total XP</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-xs text-white/70 mb-1">
            <span>Level 5 Progress</span>
            <span>{user?.xp % 500}/500 XP to Level 6</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full">
            <div className="h-2 bg-white rounded-full transition-all" style={{ width: `${xpPercent}%` }}></div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => <AnalyticsCard key={s.title} {...s} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* XP Chart */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-dark">XP Progress This Week</h2>
            <span className="badge bg-emerald-50 text-emerald-600">↑ 12% vs last week</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="xp" stroke="#0EA5E9" strokeWidth={2} fill="url(#xpGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Timeline */}
        <div className="card">
          <h2 className="font-semibold text-dark mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-base">{a.icon}</span>
                <div>
                  <p className="text-xs text-dark">{a.text}</p>
                  <p className="text-xs text-muted">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-dark">Upcoming Sessions</h2>
            <Link to="/sessions" className="text-xs text-primary hover:underline flex items-center gap-1">View all <FiArrowRight size={11} /></Link>
          </div>
          <div className="space-y-3">
            {upcoming.map(s => (
              <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface hover:bg-sky-50 transition-colors cursor-pointer">
                <img src={s.avatar} alt="" className="w-9 h-9 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-dark">{s.title}</p>
                  <p className="text-xs text-muted">with {s.mentor}</p>
                </div>
                <span className="text-xs text-primary font-medium">{s.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-dark">Recommended Matches</h2>
            <Link to="/matches" className="text-xs text-primary hover:underline flex items-center gap-1">View all <FiArrowRight size={11} /></Link>
          </div>
          <div className="space-y-3">
            {recommendations.map(r => (
              <div key={r.name} className="flex items-center gap-3 p-3 rounded-xl bg-surface hover:bg-sky-50 transition-colors cursor-pointer">
                <img src={r.avatar} alt="" className="w-9 h-9 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-dark">{r.name}</p>
                  <p className="text-xs text-muted">{r.skill}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary">{r.match}%</div>
                  <div className="text-xs text-muted">match</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="card">
        <h2 className="font-semibold text-dark mb-4">Your Badges</h2>
        <div className="flex flex-wrap gap-3">
          {user?.badges?.map(b => (
            <div key={b} className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100 px-4 py-2 rounded-xl">
              <span>🏅</span>
              <span className="text-sm font-medium text-amber-700">{b}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 bg-gray-50 border border-dashed border-gray-200 px-4 py-2 rounded-xl text-muted text-sm cursor-pointer hover:border-primary hover:text-primary transition-all">
            + Earn more badges
          </div>
        </div>
      </div>
    </div>
  )
}
