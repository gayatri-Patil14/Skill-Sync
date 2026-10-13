import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi'

function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">S</div>
            <span className="font-bold text-dark text-xl">SkillSync</span>
          </Link>
          <h1 className="text-2xl font-bold text-dark">{title}</h1>
          <p className="text-muted text-sm mt-1">{subtitle}</p>
        </div>
        <div className="card shadow-lg p-8">{children}</div>
      </div>
    </div>
  )
}

export function Login() {
  const [show, setShow] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Welcome Back!" subtitle="Sign in to continue your learning journey">
      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-mid mb-1.5 block">Email</label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm" />
            <input className="input pl-9" type="email" placeholder="you@university.edu" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-mid mb-1.5 block">Password</label>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm" />
            <input className="input pl-9 pr-9" type={show ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-dark">
              {show ? <FiEyeOff size={14} /> : <FiEye size={14} />}
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-50">
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
          <div className="relative text-center"><span className="bg-white px-3 text-xs text-muted">or continue with</span></div>
        </div>
        <button type="button" className="btn-outline w-full py-3 flex items-center justify-center gap-2 text-sm">
          <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="" /> Google
        </button>
        <p className="text-center text-sm text-muted mt-4">
          Don't have an account? <Link to="/register" className="text-primary font-semibold hover:underline">Sign up</Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'learner' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await register(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Create Account" subtitle="Join thousands of students on SkillSync">
      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-mid mb-1.5 block">Full Name</label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm" />
            <input className="input pl-9" placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-mid mb-1.5 block">Email</label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm" />
            <input className="input pl-9" type="email" placeholder="you@university.edu" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-mid mb-1.5 block">Password</label>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm" />
            <input className="input pl-9" type="password" placeholder="Min. 8 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          </div>
        </div>
        <div className="flex items-start gap-2">
          <input type="checkbox" className="mt-0.5 accent-primary" required />
          <p className="text-xs text-muted">I agree to the <span className="text-primary cursor-pointer">Terms of Service</span> and <span className="text-primary cursor-pointer">Privacy Policy</span></p>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-50">
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
        <p className="text-center text-sm text-muted mt-4">
          Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export function ForgotPassword() {
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <AuthLayout title="Reset Password" subtitle="We'll send you a reset link">
      {sent ? (
        <div className="text-center py-4">
          <div className="text-5xl mb-4">📧</div>
          <h3 className="font-semibold text-dark mb-2">Check your email</h3>
          <p className="text-sm text-muted mb-6">We sent a reset link to <strong>{email}</strong></p>
          <Link to="/login" className="btn-primary w-full py-3 block text-center">Back to Login</Link>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-mid mb-1.5 block">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm" />
              <input className="input pl-9" type="email" placeholder="you@university.edu" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
          </div>
          <button type="submit" className="btn-primary w-full py-3">Send Reset Link</button>
          <Link to="/login" className="btn-outline w-full py-3 block text-center text-sm">Back to Login</Link>
        </form>
      )}
    </AuthLayout>
  )
}
