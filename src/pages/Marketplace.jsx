import { useState, useEffect } from 'react'
import { FiSearch, FiFilter, FiPlus, FiX } from 'react-icons/fi'
import { SkillCard } from '../components/Cards'
import { Modal } from '../components/UI'
import { getAllSkills, createSkill } from '../api/skillApi'
import { sendRequest } from '../api/requestApi'
import { useAuth } from '../context/AuthContext'

const categories = ['All', 'Programming', 'Design', 'Data Science', 'Languages', 'Music', 'Business', 'Math']

export default function Marketplace() {
  const { refreshUser } = useAuth()
  const [skills, setSkills] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [typeFilter, setTypeFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [newSkill, setNewSkill] = useState({ skillName: '', category: 'Programming', skillDescription: '', type: 'offer' })

  const fetchSkills = async () => {
    try {
      const data = await getAllSkills()
      setSkills(data)
    } catch (error) {
      console.error("Failed to fetch skills", error)
    }
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  const handlePostSkill = async () => {
    try {
      await createSkill(newSkill)
      setShowModal(false)
      setNewSkill({ skillName: '', category: 'Programming', skillDescription: '', type: 'offer' })
      fetchSkills()
      refreshUser()
    } catch (error) {
      console.error("Failed to create skill", error)
    }
  }

  const handleRequestExchange = async (skillId, receiverId) => {
    try {
      await sendRequest({ receiverId, skillId, message: 'I would like to connect about this skill!' })
      window.alert('Request sent successfully!')
    } catch (error) {
      console.error('Failed to send request', error)
      window.alert('Failed to send request. You may have already requested this, or you cannot request your own skill.')
    }
  }

  const filtered = skills.filter(s => {
    const matchSearch = s.skillName?.toLowerCase().includes(search.toLowerCase()) || s.skillDescription?.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'All' || s.category === category
    const matchType = typeFilter === 'all' || s.type === typeFilter
    return matchSearch && matchCat && matchType
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-dark">Skill Marketplace</h1>
          <p className="text-sm text-muted">Browse and exchange skills with fellow students</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
          <FiPlus size={15} /> Offer / Request Skill
        </button>
      </div>

      {/* Search & Filter */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm" />
            <input className="input pl-9" placeholder="Search skills..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2">
            {['all', 'offer', 'request'].map(t => (
              <button key={t} onClick={() => setTypeFilter(t)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${typeFilter === t ? 'bg-primary text-white' : 'bg-surface text-muted hover:text-primary'}`}>
                {t === 'all' ? 'All' : t === 'offer' ? 'Offering' : 'Wanted'}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-3 flex-wrap">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${category === c ? 'bg-primary text-white' : 'bg-surface text-muted hover:text-primary'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted">{filtered.length} skills found</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(skill => <SkillCard key={skill.id} skill={skill} onRequest={handleRequestExchange} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="font-semibold text-dark mb-2">No skills found</h3>
          <p className="text-sm text-muted">Try adjusting your search or filters</p>
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Skill">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-mid mb-1.5 block">Skill Title</label>
            <input className="input" placeholder="e.g. React Development" value={newSkill.skillName} onChange={e => setNewSkill({ ...newSkill, skillName: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-mid mb-1.5 block">Category</label>
              <select className="input" value={newSkill.category} onChange={e => setNewSkill({ ...newSkill, category: e.target.value })}>
                {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-mid mb-1.5 block">Type</label>
              <select className="input" value={newSkill.type} onChange={e => setNewSkill({ ...newSkill, type: e.target.value })}>
                <option value="offer">Offering</option>
                <option value="request">Wanted</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-mid mb-1.5 block">Description</label>
            <textarea className="input resize-none" rows={3} placeholder="Describe what you'll teach or learn..." value={newSkill.skillDescription} onChange={e => setNewSkill({ ...newSkill, skillDescription: e.target.value })} />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowModal(false)} className="btn-outline flex-1">Cancel</button>
            <button onClick={handlePostSkill} className="btn-primary flex-1">Post Skill</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
