import { Link } from 'react-router-dom'
import { FiArrowRight, FiStar, FiUsers, FiMessageSquare, FiCalendar, FiBarChart2, FiAward } from 'react-icons/fi'
import Footer from '../components/Footer'

const features = [
  { icon: '🛒', title: 'Skill Exchange Marketplace', desc: 'Browse and offer skills in a vibrant marketplace tailored for students.' },
  { icon: '🤝', title: 'Smart Match Recommendations', desc: 'AI-powered matching connects you with the perfect learning partner.' },
  { icon: '💬', title: 'Real-time Chat', desc: 'Communicate instantly with mentors and learners via live messaging.' },
  { icon: '📅', title: 'Session Booking', desc: 'Schedule and manage learning sessions with ease.' },
  { icon: '📊', title: 'Analytics Dashboard', desc: 'Track your learning progress and skill growth over time.' },
  { icon: '🏆', title: 'Leaderboard & XP System', desc: 'Earn XP, badges, and climb the leaderboard as you grow.' },
]

const steps = [
  { step: '01', title: 'Register & Complete Profile', desc: 'Sign up and list the skills you offer and want to learn.' },
  { step: '02', title: 'Explore & Find Matches', desc: 'Browse the marketplace and get smart match recommendations.' },
  { step: '03', title: 'Connect & Chat', desc: 'Message your matches and plan your learning sessions.' },
  { step: '04', title: 'Book Sessions & Earn XP', desc: 'Schedule sessions, learn, teach, and earn experience points.' },
]

const testimonials = [
  { name: 'Priya Sharma', role: 'CS Student', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', text: 'SkillSync helped me learn Python in exchange for my React skills. Amazing platform!', rating: 5 },
  { name: 'Marcus Lee', role: 'Design Student', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', text: 'Found a mentor for UI/UX within hours. The matching algorithm is spot on.', rating: 5 },
  { name: 'Sofia Reyes', role: 'Data Science', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia', text: 'Earned 2000 XP in my first month. The gamification keeps me motivated!', rating: 5 },
]

const universities = ['MIT', 'Stanford', 'Harvard', 'UC Berkeley', 'Carnegie Mellon', 'Georgia Tech']

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 h-16 flex items-center px-8 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">S</div>
          <span className="font-bold text-dark text-lg">SkillSync</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#how" className="hover:text-primary transition-colors">How It Works</a>
          <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
          <a href="#universities" className="hover:text-primary transition-colors">Universities</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="btn-outline text-sm py-2 px-4">Login</Link>
          <Link to="/register" className="btn-primary text-sm py-2 px-4">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-surface via-white to-cyan-50 relative overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent/10 rounded-full blur-2xl"></div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="badge bg-surface text-primary mb-4">🎓 Student Skill Exchange Platform</span>
            <h1 className="text-5xl font-extrabold text-dark leading-tight mb-4">
              Exchange Skills.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Grow Together.</span>
            </h1>
            <p className="text-muted text-lg mb-8 leading-relaxed">Connect with students, share knowledge, and grow through collaborative learning. Teach what you know, learn what you need.</p>
            <div className="flex items-center gap-4">
              <Link to="/register" className="btn-primary flex items-center gap-2 text-base py-3 px-6">
                Start Learning <FiArrowRight />
              </Link>
              <Link to="/marketplace" className="btn-secondary text-base py-3 px-6">Browse Skills</Link>
            </div>
            <div className="flex items-center gap-6 mt-8 text-sm text-muted">
              <span className="flex items-center gap-1"><FiUsers size={14} className="text-primary" /> 10,000+ Students</span>
              <span className="flex items-center gap-1"><FiStar size={14} className="text-amber-500" /> 4.9 Rating</span>
              <span className="flex items-center gap-1"><FiAward size={14} className="text-accent" /> 500+ Skills</span>
            </div>
          </div>
          <div className="relative">
            <div className="card shadow-xl p-6 max-w-sm mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" className="w-12 h-12 rounded-full border-2 border-primary/20" alt="" />
                <div>
                  <p className="font-semibold text-dark text-sm">Alex Johnson</p>
                  <p className="text-xs text-muted">1,240 XP · Top Mentor</p>
                </div>
                <span className="ml-auto badge bg-emerald-50 text-emerald-600">Online</span>
              </div>
              <p className="text-xs text-muted mb-3">Offering</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['React', 'JavaScript', 'UI Design'].map(s => <span key={s} className="badge bg-surface text-primary">{s}</span>)}
              </div>
              <p className="text-xs text-muted mb-2">Wants to learn</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Python', 'Machine Learning'].map(s => <span key={s} className="badge bg-amber-50 text-amber-600">{s}</span>)}
              </div>
              <button className="btn-primary w-full text-sm">Connect & Exchange</button>
            </div>
            <div className="absolute -top-4 -right-4 card shadow-lg p-3 text-sm font-semibold text-dark">
              🏆 +50 XP Earned!
            </div>
            <div className="absolute -bottom-4 -left-4 card shadow-lg p-3 text-sm">
              💬 New match found!
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-3">Everything You Need to Learn & Teach</h2>
            <p className="text-muted">Powerful features designed for student skill exchange</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="card hover:shadow-md transition-shadow group">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-dark mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="text-sm text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-3">How It Works</h2>
            <p className="text-muted">Get started in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.step} className="text-center relative">
                {i < steps.length - 1 && <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-primary/20"></div>}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 relative z-10">{s.step}</div>
                <h3 className="font-semibold text-dark mb-2 text-sm">{s.title}</h3>
                <p className="text-xs text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-3">What Students Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="card hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => <FiStar key={i} size={14} className="text-amber-400" fill="currentColor" />)}
                </div>
                <p className="text-sm text-muted mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt="" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-semibold text-dark text-sm">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Universities */}
      <section id="universities" className="py-16 px-6 bg-surface">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-semibold text-muted uppercase tracking-wider mb-8">Trusted by students from</p>
          <div className="flex flex-wrap justify-center gap-6">
            {universities.map(u => (
              <div key={u} className="card px-6 py-3 font-semibold text-mid hover:text-primary hover:shadow-md transition-all cursor-pointer">{u}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary to-accent text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
        <p className="text-white/80 mb-8 text-lg">Join thousands of students already exchanging skills on SkillSync.</p>
        <Link to="/register" className="bg-white text-primary font-bold px-8 py-3 rounded-xl hover:shadow-lg transition-all inline-flex items-center gap-2">
          Get Started Free <FiArrowRight />
        </Link>
      </section>

      <Footer />
    </div>
  )
}
