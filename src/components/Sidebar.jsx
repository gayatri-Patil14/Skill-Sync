import { NavLink } from 'react-router-dom'
import { FiHome, FiGrid, FiShoppingBag, FiUsers, FiMessageSquare, FiCalendar, FiBarChart2, FiAward, FiBell, FiUser } from 'react-icons/fi'

const links = [
  { to: '/dashboard', icon: FiGrid, label: 'Dashboard' },
  { to: '/marketplace', icon: FiShoppingBag, label: 'Marketplace' },
  { to: '/matches', icon: FiUsers, label: 'Matches' },
  { to: '/chat', icon: FiMessageSquare, label: 'Chat' },
  { to: '/sessions', icon: FiCalendar, label: 'Sessions' },
  { to: '/analytics', icon: FiBarChart2, label: 'Analytics' },
  { to: '/leaderboard', icon: FiAward, label: 'Leaderboard' },
  { to: '/notifications', icon: FiBell, label: 'Notifications' },
  { to: '/profile', icon: FiUser, label: 'Profile' },
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 bottom-0 w-56 bg-white border-r border-gray-100 flex flex-col py-4 px-3 overflow-y-auto z-40">
      <NavLink to="/" className="sidebar-link mb-2">
        <FiHome size={16} /> Home
      </NavLink>
      <p className="text-xs font-semibold text-muted uppercase tracking-wider px-4 mt-2 mb-1">Main</p>
      {links.map(({ to, icon: Icon, label }) => (
        <NavLink key={to} to={to} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Icon size={16} /> {label}
        </NavLink>
      ))}
    </aside>
  )
}
