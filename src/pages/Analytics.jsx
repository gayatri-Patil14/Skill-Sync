import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { FiTrendingUp, FiAward, FiCalendar, FiUsers } from 'react-icons/fi'
import { AnalyticsCard } from '../components/Cards'

const xpData = [
  { month: 'Jul', xp: 200 }, { month: 'Aug', xp: 380 }, { month: 'Sep', xp: 520 },
  { month: 'Oct', xp: 750 }, { month: 'Nov', xp: 980 }, { month: 'Dec', xp: 1240 },
]

const skillsData = [
  { skill: 'React', sessions: 8 }, { skill: 'Python', sessions: 5 }, { skill: 'Design', sessions: 4 },
  { skill: 'Node.js', sessions: 3 }, { skill: 'ML', sessions: 2 }, { skill: 'SQL', sessions: 2 },
]

const engagementData = [
  { week: 'W1', sessions: 3, messages: 12 }, { week: 'W2', sessions: 5, messages: 18 },
  { week: 'W3', sessions: 4, messages: 22 }, { week: 'W4', sessions: 7, messages: 30 },
]

const pieData = [
  { name: 'Teaching', value: 45, color: '#0EA5E9' },
  { name: 'Learning', value: 35, color: '#14B8A6' },
  { name: 'Chatting', value: 20, color: '#06B6D4' },
]

const stats = [
  { title: 'Total XP', value: '1,240', change: 12, icon: FiAward, color: 'bg-amber-50 text-amber-500' },
  { title: 'Sessions Done', value: '24', change: 8, icon: FiCalendar, color: 'bg-blue-50 text-blue-500' },
  { title: 'Skills Learned', value: '7', change: 16, icon: FiTrendingUp, color: 'bg-emerald-50 text-emerald-500' },
  { title: 'Connections', value: '47', change: 5, icon: FiUsers, color: 'bg-purple-50 text-purple-500' },
]

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-dark">Analytics & Progress</h1>
        <p className="text-sm text-muted">Track your learning journey and growth</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => <AnalyticsCard key={s.title} {...s} />)}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* XP Growth */}
        <div className="card">
          <h2 className="font-semibold text-dark mb-4">XP Growth Over Time</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={xpData}>
              <defs>
                <linearGradient id="xpGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="xp" stroke="#0EA5E9" strokeWidth={2} fill="url(#xpGrad2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Skills Growth */}
        <div className="card">
          <h2 className="font-semibold text-dark mb-4">Sessions by Skill</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={skillsData} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="skill" type="category" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={50} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="sessions" fill="#0EA5E9" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement Stats */}
        <div className="card">
          <h2 className="font-semibold text-dark mb-4">Weekly Engagement</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={engagementData}>
              <XAxis dataKey="week" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="sessions" fill="#0EA5E9" radius={[4, 4, 0, 0]} name="Sessions" />
              <Bar dataKey="messages" fill="#14B8A6" radius={[4, 4, 0, 0]} name="Messages" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Breakdown */}
        <div className="card">
          <h2 className="font-semibold text-dark mb-4">Activity Breakdown</h2>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {pieData.map(d => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                  <span className="text-sm text-muted">{d.name}</span>
                  <span className="text-sm font-semibold text-dark ml-auto">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Learning Progress */}
      <div className="card">
        <h2 className="font-semibold text-dark mb-4">Skill Proficiency Progress</h2>
        <div className="space-y-4">
          {[
            { skill: 'React', progress: 85, color: 'bg-primary' },
            { skill: 'JavaScript', progress: 90, color: 'bg-accent' },
            { skill: 'Python', progress: 45, color: 'bg-secondary' },
            { skill: 'UI Design', progress: 70, color: 'bg-purple-400' },
            { skill: 'Machine Learning', progress: 30, color: 'bg-amber-400' },
          ].map(s => (
            <div key={s.skill}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-dark">{s.skill}</span>
                <span className="text-muted">{s.progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className={`h-2 ${s.color} rounded-full transition-all duration-700`} style={{ width: `${s.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
