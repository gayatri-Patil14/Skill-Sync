import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Landing from './pages/Landing'
import { Login, Register, ForgotPassword } from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Marketplace from './pages/Marketplace'
import Matches from './pages/Matches'
import Chat from './pages/Chat'
import Sessions from './pages/Sessions'
import Analytics from './pages/Analytics'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'

function AppLayout() {
  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <Sidebar />
      <main className="ml-56 pt-16 p-6 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}

function ProtectedRoute() {
  const { isAuth } = useAuth()
  return isAuth ? <AppLayout /> : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const { isAuth } = useAuth()
  return isAuth ? <Navigate to="/dashboard" replace /> : children
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
