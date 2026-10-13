import { Link, useNavigate } from 'react-router-dom'
import { FiBell, FiMessageSquare, FiSearch } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 h-16 flex items-center px-6 gap-4">
      <Link to="/" className="flex items-center gap-2 mr-6">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">S</div>
        <span className="font-bold text-dark text-lg">SkillSync</span>
      </Link>

      <div className="flex-1 max-w-md relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm" />
        <input className="input pl-9 py-2 text-sm" placeholder="Search skills, mentors..." />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Link to="/chat" className="p-2 rounded-xl hover:bg-surface text-muted hover:text-primary transition-all relative">
          <FiMessageSquare size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </Link>
        <Link to="/notifications" className="p-2 rounded-xl hover:bg-surface text-muted hover:text-primary transition-all relative">
          <FiBell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Link>
        <div className="flex items-center gap-2 ml-2 cursor-pointer group" onClick={() => navigate('/profile')}>
          <img src={user?.avatar} alt="avatar" className="w-8 h-8 rounded-full border-2 border-primary/20" />
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-dark leading-none">{user?.name}</p>
            <p className="text-xs text-muted">{user?.xp} XP</p>
          </div>
        </div>
        <button onClick={logout} className="text-xs text-muted hover:text-red-500 ml-2 transition-colors">Logout</button>
      </div>
    </nav>
  )
}
