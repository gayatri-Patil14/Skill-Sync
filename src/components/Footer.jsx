import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-12 px-6 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-sm">S</div>
            <span className="font-bold text-lg">SkillSync</span>
          </div>
          <p className="text-sm text-gray-400">Student Skill Exchange Platform. Connect, learn, and grow together.</p>
        </div>
        {[
          { title: 'Platform', links: ['Marketplace', 'Matches', 'Sessions', 'Analytics'] },
          { title: 'Community', links: ['Leaderboard', 'Chat', 'Notifications', 'Profile'] },
          { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
        ].map(col => (
          <div key={col.title}>
            <h4 className="font-semibold mb-3 text-sm">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map(l => (
                <li key={l}><Link to={`/${l.toLowerCase()}`} className="text-sm text-gray-400 hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
        © 2024 SkillSync. All rights reserved.
      </div>
    </footer>
  )
}
