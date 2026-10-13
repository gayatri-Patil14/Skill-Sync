import { useState } from 'react'
import { FiEdit2, FiPlus, FiX, FiStar, FiAward, FiCalendar, FiUsers } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { updateUserProfile } from '../api/authApi'
import { createSkill, deleteSkill } from '../api/skillApi'

const achievements = [
  { icon: '🏆', title: 'Top Mentor', desc: 'Mentored 20+ students', date: 'Nov 2024' },
  { icon: '⭐', title: '5-Star Teacher', desc: 'Maintained 5-star rating', date: 'Oct 2024' },
  { icon: '🎯', title: 'Skill Master', desc: 'Completed 10 skill exchanges', date: 'Sep 2024' },
  { icon: '🔥', title: '30-Day Streak', desc: 'Active for 30 consecutive days', date: 'Aug 2024' },
  { icon: '🌟', title: 'Early Adopter', desc: 'Joined in the first month', date: 'Jul 2024' },
  { icon: '💬', title: 'Communicator', desc: 'Sent 500+ messages', date: 'Oct 2024' },
]

export default function Profile() {
  const { user, refreshUser } = useAuth()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: user?.name, bio: user?.bio, email: user?.email })
  const [newSkillOffer, setNewSkillOffer] = useState('')
  const [newSkillWant, setNewSkillWant] = useState('')
  
  const skillsOffered = user?.Skills?.filter(s => s.type === 'offer') || []
  const skillsWanted = user?.Skills?.filter(s => s.type === 'request') || []

  const saveProfile = async () => {
    try {
      await updateUserProfile(form)
      await refreshUser()
      setEditing(false)
    } catch (error) {
      console.error(error)
    }
  }

  const addSkill = async (type) => {
    try {
      if (type === 'offer' && newSkillOffer.trim()) {
        await createSkill({ skillName: newSkillOffer.trim(), type: 'offer' })
        setNewSkillOffer('')
      } else if (type === 'want' && newSkillWant.trim()) {
        await createSkill({ skillName: newSkillWant.trim(), type: 'request' })
        setNewSkillWant('')
      }
      await refreshUser()
    } catch (error) {
      console.error(error)
    }
  }

  const removeSkill = async (id) => {
    try {
      await deleteSkill(id)
      await refreshUser()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Profile Header */}
      <div className="card">
        <div className="flex items-start gap-6">
          <div className="relative">
            <img src={user?.avatar} alt="" className="w-20 h-20 rounded-2xl border-4 border-primary/20" />
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white shadow-md">
              <FiEdit2 size={12} />
            </button>
          </div>
          <div className="flex-1">
            {editing ? (
              <div className="space-y-3">
                <input className="input font-bold text-lg" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <input className="input text-sm" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                <textarea className="input resize-none text-sm" rows={2} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
                <div className="flex gap-2">
                  <button onClick={saveProfile} className="btn-primary text-sm py-2 px-4">Save Changes</button>
                  <button onClick={() => setEditing(false)} className="btn-outline text-sm py-2 px-4">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-xl font-bold text-dark">{user?.name}</h1>
                  <span className="badge bg-emerald-50 text-emerald-600">Online</span>
                </div>
                <p className="text-sm text-muted mb-1">{user?.email}</p>
                <p className="text-sm text-mid mb-3">{user?.bio}</p>
                <div className="flex items-center gap-4 text-sm text-muted">
                  <span className="flex items-center gap-1"><FiAward size={13} className="text-amber-500" /> {user?.xp} XP</span>
                  <span className="flex items-center gap-1"><FiStar size={13} className="text-amber-500" /> 4.9 Rating</span>
                  <span className="flex items-center gap-1"><FiCalendar size={13} className="text-primary" /> 24 Sessions</span>
                  <span className="flex items-center gap-1"><FiUsers size={13} className="text-accent" /> 47 Connections</span>
                </div>
              </>
            )}
          </div>
          {!editing && (
            <button onClick={() => setEditing(true)} className="btn-outline flex items-center gap-2 text-sm">
              <FiEdit2 size={13} /> Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Skills Offered */}
        <div className="card">
          <h2 className="font-semibold text-dark mb-4">Skills I Offer</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {skillsOffered.map(s => (
              <div key={s.id} className="flex items-center gap-1 badge bg-surface text-primary pr-1">
                {s.skillName}
                <button onClick={() => removeSkill(s.id)} className="hover:text-red-500 transition-colors ml-1">
                  <FiX size={11} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input className="input flex-1 text-sm" placeholder="Add a skill..." value={newSkillOffer} onChange={e => setNewSkillOffer(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSkill('offer')} />
            <button onClick={() => addSkill('offer')} className="btn-primary px-3 py-2"><FiPlus size={14} /></button>
          </div>
        </div>

        {/* Skills Wanted */}
        <div className="card">
          <h2 className="font-semibold text-dark mb-4">Skills I Want to Learn</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {skillsWanted.map(s => (
              <div key={s.id} className="flex items-center gap-1 badge bg-amber-50 text-amber-600 pr-1">
                {s.skillName}
                <button onClick={() => removeSkill(s.id)} className="hover:text-red-500 transition-colors ml-1">
                  <FiX size={11} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input className="input flex-1 text-sm" placeholder="Add a skill..." value={newSkillWant} onChange={e => setNewSkillWant(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSkill('want')} />
            <button onClick={() => addSkill('want')} className="btn-primary px-3 py-2"><FiPlus size={14} /></button>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="card">
        <h2 className="font-semibold text-dark mb-4">Badges & Certificates</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {user?.badges?.map(b => (
            <div key={b} className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100 rounded-xl">
              <span className="text-2xl">🏅</span>
              <div>
                <p className="text-sm font-semibold text-amber-700">{b}</p>
                <p className="text-xs text-amber-500">Earned</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="card">
        <h2 className="font-semibold text-dark mb-4">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {achievements.map(a => (
            <div key={a.title} className="flex items-center gap-3 p-3 rounded-xl bg-surface hover:bg-sky-50 transition-colors">
              <span className="text-2xl">{a.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-dark">{a.title}</p>
                <p className="text-xs text-muted">{a.desc}</p>
              </div>
              <span className="text-xs text-muted">{a.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
