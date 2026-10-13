import { useState } from 'react'
import { FiMessageSquare, FiUserPlus, FiStar, FiZap } from 'react-icons/fi'
import { MentorCard } from '../components/Cards'

const matches = [
  {
    id: 1, name: 'Priya Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    skills: ['Python', 'ML', 'TensorFlow'], xp: 2100, rating: 4.9, compatibility: 94,
    commonInterests: ['Data Science', 'AI', 'Research'], bio: 'PhD student specializing in NLP and computer vision.',
    skillsWanted: ['React', 'JavaScript'],
  },
  {
    id: 2, name: 'Marcus Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    skills: ['UI/UX', 'Figma', 'CSS'], xp: 1850, rating: 4.8, compatibility: 88,
    commonInterests: ['Design', 'Frontend', 'Accessibility'], bio: 'Design student with a passion for user-centered design.',
    skillsWanted: ['React', 'TypeScript'],
  },
  {
    id: 3, name: 'Arjun Patel', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
    skills: ['Node.js', 'MongoDB', 'Express'], xp: 1600, rating: 4.7, compatibility: 82,
    commonInterests: ['Backend', 'APIs', 'Databases'], bio: 'Backend developer building scalable microservices.',
    skillsWanted: ['React', 'UI Design'],
  },
  {
    id: 4, name: 'Emma Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    skills: ['Data Analysis', 'R', 'Statistics'], xp: 1400, rating: 4.6, compatibility: 79,
    commonInterests: ['Data', 'Visualization', 'Research'], bio: 'Statistics major with strong analytical skills.',
    skillsWanted: ['Python', 'Machine Learning'],
  },
  {
    id: 5, name: 'Kai Zhang', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kai',
    skills: ['DevOps', 'Docker', 'AWS'], xp: 1900, rating: 4.8, compatibility: 75,
    commonInterests: ['Cloud', 'Infrastructure', 'Automation'], bio: 'Cloud engineer passionate about DevOps practices.',
    skillsWanted: ['Frontend', 'React'],
  },
  {
    id: 6, name: 'Sofia Reyes', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
    skills: ['Spanish', 'French', 'Translation'], xp: 980, rating: 4.5, compatibility: 71,
    commonInterests: ['Languages', 'Culture', 'Communication'], bio: 'Linguistics student fluent in 4 languages.',
    skillsWanted: ['Programming', 'Web Dev'],
  },
]

export default function Matches() {
  const [connected, setConnected] = useState([])
  const [selected, setSelected] = useState(null)

  const handleConnect = (id) => setConnected(prev => [...prev, id])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-dark">Smart Match Recommendations</h1>
        <p className="text-sm text-muted">AI-powered matches based on your skills and learning goals</p>
      </div>

      {/* Top Match Highlight */}
      {!selected && (
        <div className="card bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <FiZap className="text-primary" size={16} />
            <span className="font-semibold text-dark text-sm">Your Best Match</span>
            <span className="badge bg-primary text-white ml-auto">94% Compatible</span>
          </div>
          <div className="flex items-start gap-4">
            <img src={matches[0].avatar} alt="" className="w-16 h-16 rounded-2xl border-2 border-primary/20" />
            <div className="flex-1">
              <h3 className="font-bold text-dark">{matches[0].name}</h3>
              <p className="text-sm text-muted mb-2">{matches[0].bio}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {matches[0].skills.map(s => <span key={s} className="badge bg-surface text-primary">{s}</span>)}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted">Common interests:</span>
                {matches[0].commonInterests.map(i => <span key={i} className="badge bg-emerald-50 text-emerald-600">{i}</span>)}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleConnect(matches[0].id)} className={`btn-primary text-sm py-2 flex items-center gap-1 ${connected.includes(matches[0].id) ? 'bg-emerald-500' : ''}`}>
                <FiUserPlus size={13} /> {connected.includes(matches[0].id) ? 'Connected!' : 'Connect'}
              </button>
              <button className="btn-outline text-sm py-2 flex items-center gap-1">
                <FiMessageSquare size={13} /> Message
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map(m => (
          <div key={m.id} className="card hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelected(selected?.id === m.id ? null : m)}>
            <div className="flex items-center gap-3 mb-3">
              <img src={m.avatar} alt="" className="w-12 h-12 rounded-full border-2 border-primary/20" />
              <div className="flex-1">
                <h3 className="font-semibold text-dark text-sm">{m.name}</h3>
                <div className="flex items-center gap-1 text-xs text-amber-500">
                  <FiStar size={11} fill="currentColor" /> {m.rating}
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{m.compatibility}%</div>
                <div className="text-xs text-muted">match</div>
              </div>
            </div>

            {/* Compatibility bar */}
            <div className="h-1.5 bg-gray-100 rounded-full mb-3">
              <div className="h-1.5 bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: `${m.compatibility}%` }}></div>
            </div>

            <p className="text-xs text-muted mb-3 line-clamp-2">{m.bio}</p>

            <div className="flex flex-wrap gap-1 mb-3">
              {m.skills.slice(0, 3).map(s => <span key={s} className="badge bg-surface text-primary">{s}</span>)}
            </div>

            {selected?.id === m.id && (
              <div className="border-t border-gray-100 pt-3 mt-1 space-y-2">
                <div>
                  <p className="text-xs font-semibold text-muted mb-1">Wants to learn</p>
                  <div className="flex flex-wrap gap-1">
                    {m.skillsWanted.map(s => <span key={s} className="badge bg-amber-50 text-amber-600">{s}</span>)}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted mb-1">Common interests</p>
                  <div className="flex flex-wrap gap-1">
                    {m.commonInterests.map(i => <span key={i} className="badge bg-emerald-50 text-emerald-600">{i}</span>)}
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2 mt-3">
              <button onClick={(e) => { e.stopPropagation(); handleConnect(m.id) }}
                className={`flex-1 text-xs py-2 rounded-xl font-semibold transition-all flex items-center justify-center gap-1 ${connected.includes(m.id) ? 'bg-emerald-50 text-emerald-600' : 'btn-primary'}`}>
                <FiUserPlus size={12} /> {connected.includes(m.id) ? 'Connected' : 'Connect'}
              </button>
              <button onClick={e => e.stopPropagation()} className="flex-1 btn-outline text-xs py-2 flex items-center justify-center gap-1">
                <FiMessageSquare size={12} /> Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
