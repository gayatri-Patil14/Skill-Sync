import { FiStar, FiHeart, FiUser, FiClock, FiCalendar } from 'react-icons/fi'

export function SkillCard({ skill, onRequest }) {
  const { title, category, description, type, user, likes, skillName, skillDescription, User } = skill
  const displayTitle = skillName || title
  const displayDescription = skillDescription || description
  const displayUser = User || user
  const colors = { offer: 'bg-emerald-50 text-emerald-600', request: 'bg-amber-50 text-amber-600' }
  return (
    <div className="card hover:shadow-md transition-shadow cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <span className={`badge ${colors[type] || 'bg-surface text-primary'}`}>{type === 'offer' ? 'Offering' : 'Wanted'}</span>
        <button className="text-muted hover:text-red-400 transition-colors"><FiHeart size={15} /></button>
      </div>
      <h3 className="font-semibold text-dark text-sm mb-1 group-hover:text-primary transition-colors">{displayTitle}</h3>
      <p className="text-xs text-muted mb-3 line-clamp-2">{displayDescription}</p>
      <div className="flex items-center justify-between">
        <span className="badge bg-surface text-primary">{category}</span>
        <div className="flex items-center gap-1 text-xs text-muted">
          <FiHeart size={11} /> {likes}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
        <img src={displayUser?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=fallback'} alt="" className="w-6 h-6 rounded-full" />
        <span className="text-xs text-muted flex-1">{displayUser?.name || 'Unknown User'}</span>
        {skill.userId && <button onClick={(e) => { e.stopPropagation(); onRequest(skill.id, skill.userId); }} className="text-xs text-primary hover:underline font-medium z-10 relative">Request</button>}
      </div>
    </div>
  )
}

export function SessionCard({ session }) {
  const { title, mentor, date, time, status, type } = session
  const statusColors = {
    upcoming: 'bg-blue-50 text-blue-600',
    completed: 'bg-emerald-50 text-emerald-600',
    cancelled: 'bg-red-50 text-red-500',
  }
  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <span className={`badge ${statusColors[status]}`}>{status}</span>
        <span className="text-xs text-muted">{type}</span>
      </div>
      <h3 className="font-semibold text-dark text-sm mb-2">{title}</h3>
      <div className="flex items-center gap-2 mb-1">
        <img src={mentor.avatar} alt="" className="w-5 h-5 rounded-full" />
        <span className="text-xs text-muted">{mentor.name}</span>
      </div>
      <div className="flex items-center gap-3 mt-3 text-xs text-muted">
        <span className="flex items-center gap-1"><FiCalendar size={11} /> {date}</span>
        <span className="flex items-center gap-1"><FiClock size={11} /> {time}</span>
      </div>
    </div>
  )
}

export function MentorCard({ mentor, onConnect }) {
  const { name, avatar, skills, xp, rating, compatibility } = mentor
  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <img src={avatar} alt="" className="w-12 h-12 rounded-full border-2 border-primary/20" />
        <div>
          <h3 className="font-semibold text-dark text-sm">{name}</h3>
          <div className="flex items-center gap-1 text-xs text-amber-500">
            <FiStar size={11} fill="currentColor" /> {rating}
          </div>
        </div>
        {compatibility && (
          <div className="ml-auto text-center">
            <div className="text-lg font-bold text-primary">{compatibility}%</div>
            <div className="text-xs text-muted">match</div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {skills.slice(0, 3).map(s => (
          <span key={s} className="badge bg-surface text-primary">{s}</span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted">{xp} XP</span>
        <button onClick={onConnect} className="btn-primary text-xs py-1.5 px-3">Connect</button>
      </div>
    </div>
  )
}

export function AnalyticsCard({ title, value, change, icon: Icon, color }) {
  const isPositive = change >= 0
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted font-medium">{title}</span>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={16} />
        </div>
      </div>
      <div className="text-2xl font-bold text-dark">{value}</div>
      <div className={`text-xs mt-1 font-medium ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
        {isPositive ? '↑' : '↓'} {Math.abs(change)}% this week
      </div>
    </div>
  )
}

export function NotificationCard({ notif }) {
  const { type, content, time, read } = notif
  const icons = { session: '📅', connection: '👥', booking: '🔔', system: '⚙️' }
  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border transition-all ${read ? 'border-gray-100 bg-white' : 'border-primary/20 bg-surface'}`}>
      <span className="text-xl">{icons[type] || '🔔'}</span>
      <div className="flex-1">
        <p className="text-sm text-dark">{content}</p>
        <p className="text-xs text-muted mt-1">{time}</p>
      </div>
      {!read && <span className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></span>}
    </div>
  )
}
