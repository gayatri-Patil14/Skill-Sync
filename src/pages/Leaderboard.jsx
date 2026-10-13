import { useState } from 'react'
import { FiStar, FiAward, FiTrendingUp } from 'react-icons/fi'

const learners = [
  { rank: 1, name: 'Priya Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', xp: 3200, sessions: 42, badge: '🥇', change: '+2' },
  { rank: 2, name: 'Arjun Patel', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun', xp: 2850, sessions: 38, badge: '🥈', change: '+1' },
  { rank: 3, name: 'Emma Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', xp: 2600, sessions: 35, badge: '🥉', change: '-1' },
  { rank: 4, name: 'Kai Zhang', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kai', xp: 2400, sessions: 31, badge: '🏅', change: '+3' },
  { rank: 5, name: 'Sofia Reyes', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia', xp: 2100, sessions: 28, badge: '🏅', change: '0' },
  { rank: 6, name: 'Marcus Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', xp: 1950, sessions: 25, badge: '🏅', change: '+1' },
  { rank: 7, name: 'Alex Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', xp: 1240, sessions: 24, badge: '⭐', change: '+2', isMe: true },
  { rank: 8, name: 'Jake Torres', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jake', xp: 1100, sessions: 20, badge: '⭐', change: '-1' },
]

const mentors = [
  { rank: 1, name: 'Dr. Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', rating: 4.98, students: 52, badge: '🥇' },
  { rank: 2, name: 'Prof. James Kim', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James', rating: 4.95, students: 48, badge: '🥈' },
  { rank: 3, name: 'Priya Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', rating: 4.92, students: 41, badge: '🥉' },
  { rank: 4, name: 'Arjun Patel', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun', rating: 4.88, students: 36, badge: '🏅' },
  { rank: 5, name: 'Emma Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', rating: 4.85, students: 30, badge: '🏅' },
]

export default function Leaderboard() {
  const [tab, setTab] = useState('learners')

  const top3 = learners.slice(0, 3)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-dark">Leaderboard</h1>
        <p className="text-sm text-muted">Top performers in the SkillSync community</p>
      </div>

      {/* Podium */}
      <div className="card bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100">
        <div className="flex items-end justify-center gap-4 py-4">
          {/* 2nd */}
          <div className="text-center">
            <img src={top3[1].avatar} alt="" className="w-14 h-14 rounded-full border-4 border-gray-300 mx-auto mb-2" />
            <div className="text-2xl mb-1">🥈</div>
            <p className="text-xs font-semibold text-dark">{top3[1].name.split(' ')[0]}</p>
            <p className="text-xs text-muted">{top3[1].xp.toLocaleString()} XP</p>
            <div className="h-16 bg-gray-200 rounded-t-lg mt-2 w-16 mx-auto flex items-end justify-center pb-1">
              <span className="text-xs font-bold text-gray-600">2nd</span>
            </div>
          </div>
          {/* 1st */}
          <div className="text-center">
            <div className="text-2xl mb-1">👑</div>
            <img src={top3[0].avatar} alt="" className="w-18 h-18 rounded-full border-4 border-amber-400 mx-auto mb-2 w-16 h-16" />
            <div className="text-2xl mb-1">🥇</div>
            <p className="text-xs font-semibold text-dark">{top3[0].name.split(' ')[0]}</p>
            <p className="text-xs text-muted">{top3[0].xp.toLocaleString()} XP</p>
            <div className="h-24 bg-amber-400 rounded-t-lg mt-2 w-16 mx-auto flex items-end justify-center pb-1">
              <span className="text-xs font-bold text-white">1st</span>
            </div>
          </div>
          {/* 3rd */}
          <div className="text-center">
            <img src={top3[2].avatar} alt="" className="w-14 h-14 rounded-full border-4 border-amber-600 mx-auto mb-2" />
            <div className="text-2xl mb-1">🥉</div>
            <p className="text-xs font-semibold text-dark">{top3[2].name.split(' ')[0]}</p>
            <p className="text-xs text-muted">{top3[2].xp.toLocaleString()} XP</p>
            <div className="h-12 bg-amber-600 rounded-t-lg mt-2 w-16 mx-auto flex items-end justify-center pb-1">
              <span className="text-xs font-bold text-white">3rd</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['learners', 'mentors'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 rounded-xl text-sm font-medium transition-all capitalize ${tab === t ? 'bg-primary text-white' : 'bg-white text-muted border border-gray-100 hover:text-primary'}`}>
            {t === 'learners' ? '🎓 Top Learners' : '⭐ Top Mentors'}
          </button>
        ))}
      </div>

      {/* Rankings Table */}
      <div className="card p-0 overflow-hidden">
        <div className="grid grid-cols-12 text-xs font-semibold text-muted uppercase tracking-wider px-6 py-3 bg-surface border-b border-gray-100">
          <div className="col-span-1">Rank</div>
          <div className="col-span-5">Student</div>
          <div className="col-span-2 text-right">{tab === 'learners' ? 'XP' : 'Rating'}</div>
          <div className="col-span-2 text-right">{tab === 'learners' ? 'Sessions' : 'Students'}</div>
          <div className="col-span-2 text-right">Change</div>
        </div>
        {(tab === 'learners' ? learners : mentors).map(u => (
          <div key={u.rank} className={`grid grid-cols-12 items-center px-6 py-4 border-b border-gray-50 hover:bg-surface transition-colors ${u.isMe ? 'bg-primary/5 border-primary/20' : ''}`}>
            <div className="col-span-1">
              <span className="text-lg">{u.badge}</span>
            </div>
            <div className="col-span-5 flex items-center gap-3">
              <img src={u.avatar} alt="" className="w-9 h-9 rounded-full" />
              <div>
                <p className="text-sm font-semibold text-dark">{u.name} {u.isMe && <span className="badge bg-primary text-white ml-1">You</span>}</p>
              </div>
            </div>
            <div className="col-span-2 text-right text-sm font-bold text-dark">
              {tab === 'learners' ? `${u.xp?.toLocaleString()} XP` : `⭐ ${u.rating}`}
            </div>
            <div className="col-span-2 text-right text-sm text-muted">
              {tab === 'learners' ? u.sessions : u.students}
            </div>
            <div className="col-span-2 text-right">
              {tab === 'learners' && (
                <span className={`text-xs font-semibold ${u.change?.startsWith('+') ? 'text-emerald-500' : u.change === '0' ? 'text-muted' : 'text-red-500'}`}>
                  {u.change === '0' ? '—' : u.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
