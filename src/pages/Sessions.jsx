import { useState } from 'react'
import { FiCalendar, FiClock, FiUser, FiCheck, FiX } from 'react-icons/fi'
import { Modal } from '../components/UI'

const initialSessions = [
  { id: 1, title: 'React Hooks Deep Dive', mentor: { name: 'Priya Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' }, date: 'Dec 20, 2024', time: '3:00 PM', duration: '1 hour', status: 'upcoming', type: 'Video Call' },
  { id: 2, title: 'Python Basics', mentor: { name: 'Marcus Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus' }, date: 'Dec 21, 2024', time: '10:00 AM', duration: '1.5 hours', status: 'upcoming', type: 'Video Call' },
  { id: 3, title: 'UI/UX Principles', mentor: { name: 'Sofia Reyes', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia' }, date: 'Dec 15, 2024', time: '2:00 PM', duration: '1 hour', status: 'completed', type: 'In-person' },
  { id: 4, title: 'Machine Learning Intro', mentor: { name: 'Arjun Patel', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun' }, date: 'Dec 10, 2024', time: '4:00 PM', duration: '2 hours', status: 'completed', type: 'Video Call' },
  { id: 5, title: 'Node.js APIs', mentor: { name: 'Kai Zhang', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kai' }, date: 'Dec 8, 2024', time: '11:00 AM', duration: '1 hour', status: 'cancelled', type: 'Video Call' },
]

const mentors = [
  { id: 1, name: 'Priya Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', skill: 'Python & ML' },
  { id: 2, name: 'Marcus Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', skill: 'UI/UX Design' },
  { id: 3, name: 'Arjun Patel', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun', skill: 'Node.js' },
]

const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']

const statusColors = {
  upcoming: 'bg-blue-50 text-blue-600',
  completed: 'bg-emerald-50 text-emerald-600',
  cancelled: 'bg-red-50 text-red-500',
}

export default function Sessions() {
  const [sessionsData, setSessionsData] = useState(initialSessions)
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState('all')
  const [booking, setBooking] = useState({ mentor: '', title: '', date: '', time: '', type: 'Video Call' })
  const [booked, setBooked] = useState(false)
  const [reviewModal, setReviewModal] = useState({ isOpen: false, sessionId: null })

  const filtered = sessionsData.filter(s => filter === 'all' || s.status === filter)

  const handleBook = () => {
    setBooked(true)
    setTimeout(() => { 
      setSessionsData([...sessionsData, { id: Date.now(), title: booking.title, mentor: { name: booking.mentor, avatar: mentors.find(m=>m.name===booking.mentor)?.avatar }, date: booking.date, time: booking.time, duration: '1 hour', status: 'upcoming', type: booking.type }])
      setBooked(false); 
      setShowModal(false);
      setBooking({ mentor: '', title: '', date: '', time: '', type: 'Video Call' });
    }, 1500)
  }

  const handleCancel = (id) => {
    if(window.confirm('Are you sure you want to cancel this session?')) {
      setSessionsData(sessionsData.map(s => s.id === id ? { ...s, status: 'cancelled' } : s))
    }
  }

  const handleJoin = (s) => {
    alert(`Connecting to Video Call for: ${s.title}...\n(In a real app, this would open Zoom/Meet or an internal video component)`);
  }

  const submitReview = () => {
    alert('Thank you for your feedback! Review submitted successfully.')
    setReviewModal({ isOpen: false, sessionId: null })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-dark">Session Booking</h1>
          <p className="text-sm text-muted">Schedule and manage your learning sessions</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
          <FiCalendar size={15} /> Book Session
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Upcoming', count: sessionsData.filter(s => s.status === 'upcoming').length, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Completed', count: sessionsData.filter(s => s.status === 'completed').length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Cancelled', count: sessionsData.filter(s => s.status === 'cancelled').length, color: 'text-red-500', bg: 'bg-red-50' },
        ].map(s => (
          <div key={s.label} className={`card text-center ${s.bg} border-0`}>
            <div className={`text-2xl font-bold ${s.color}`}>{s.count}</div>
            <div className="text-xs text-muted mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {['all', 'upcoming', 'completed', 'cancelled'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${filter === f ? 'bg-primary text-white' : 'bg-white text-muted border border-gray-100 hover:text-primary'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Sessions List */}
      <div className="space-y-3">
        {filtered.map(s => (
          <div key={s.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <img src={s.mentor.avatar} alt="" className="w-12 h-12 rounded-full border-2 border-gray-100" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-dark text-sm">{s.title}</h3>
                  <span className={`badge ${statusColors[s.status]}`}>{s.status}</span>
                </div>
                <p className="text-xs text-muted mb-2">with {s.mentor.name}</p>
                <div className="flex items-center gap-4 text-xs text-muted">
                  <span className="flex items-center gap-1"><FiCalendar size={11} /> {s.date}</span>
                  <span className="flex items-center gap-1"><FiClock size={11} /> {s.time} · {s.duration}</span>
                  <span className="flex items-center gap-1"><FiUser size={11} /> {s.type}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {s.status === 'upcoming' && (
                  <>
                    <button onClick={() => handleJoin(s)} className="btn-primary text-xs py-1.5 px-3">Join</button>
                    <button onClick={() => handleCancel(s.id)} className="btn-outline text-xs py-1.5 px-3 text-red-500 border-red-200 hover:bg-red-50">Cancel</button>
                  </>
                )}
                {s.status === 'completed' && (
                  <button onClick={() => setReviewModal({ isOpen: true, sessionId: s.id })} className="btn-outline text-xs py-1.5 px-3">Leave Review</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Book Session Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Book a Session">
        {booked ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheck size={28} className="text-emerald-500" />
            </div>
            <h3 className="font-bold text-dark mb-1">Session Booked!</h3>
            <p className="text-sm text-muted">You'll receive a confirmation shortly.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-mid mb-1.5 block">Select Mentor</label>
              <div className="space-y-2">
                {mentors.map(m => (
                  <div key={m.id} onClick={() => setBooking({ ...booking, mentor: m.name })}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${booking.mentor === m.name ? 'border-primary bg-surface' : 'border-gray-100 hover:border-primary/30'}`}>
                    <img src={m.avatar} alt="" className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="text-sm font-medium text-dark">{m.name}</p>
                      <p className="text-xs text-muted">{m.skill}</p>
                    </div>
                    {booking.mentor === m.name && <FiCheck className="ml-auto text-primary" size={14} />}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-mid mb-1.5 block">Session Title</label>
              <input className="input" placeholder="e.g. React Hooks Tutorial" value={booking.title} onChange={e => setBooking({ ...booking, title: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-mid mb-1.5 block">Date</label>
                <input className="input" type="date" value={booking.date} onChange={e => setBooking({ ...booking, date: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-semibold text-mid mb-1.5 block">Session Type</label>
                <select className="input" value={booking.type} onChange={e => setBooking({ ...booking, type: e.target.value })}>
                  <option>Video Call</option>
                  <option>In-person</option>
                  <option>Chat</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-mid mb-1.5 block">Time Slot</label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map(t => (
                  <button key={t} onClick={() => setBooking({ ...booking, time: t })}
                    className={`py-2 rounded-xl text-xs font-medium transition-all ${booking.time === t ? 'bg-primary text-white' : 'bg-surface text-muted hover:text-primary'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowModal(false)} className="btn-outline flex-1">Cancel</button>
              <button onClick={handleBook} className="btn-primary flex-1" disabled={!booking.mentor || !booking.date || !booking.time}>
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Review Modal */}
      <Modal isOpen={reviewModal.isOpen} onClose={() => setReviewModal({ isOpen: false, sessionId: null })} title="Leave a Review">
        <div className="space-y-4">
          <p className="text-sm text-muted">How was your session? Let your mentor know what you thought.</p>
          <div className="flex gap-2 text-2xl text-yellow-400 my-2 cursor-pointer">
            ★ ★ ★ ★ ☆
          </div>
          <textarea className="input min-h-[100px]" placeholder="Write your review here..."></textarea>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setReviewModal({ isOpen: false, sessionId: null })} className="btn-outline flex-1">Cancel</button>
            <button onClick={submitReview} className="btn-primary flex-1">Submit Feedback</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
