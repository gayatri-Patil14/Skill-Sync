import { createContext, useContext, useState, useEffect } from 'react'
import { loginUser, registerUser, getUserProfile } from '../api/authApi'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await getUserProfile();
          setUser(userData);
          setIsAuth(true);
        } catch (error) {
          console.error("Failed to fetch user profile", error);
          localStorage.removeItem('token');
          setUser(null);
          setIsAuth(false);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    localStorage.setItem('token', data.token);
    setUser(data.user);
    setIsAuth(true);
  }

  const register = async (userData) => {
    const data = await registerUser(userData);
    localStorage.setItem('token', data.token);
    setUser(data.user);
    setIsAuth(true);
  }

  const refreshUser = async () => {
    try {
      const userData = await getUserProfile();
      setUser(userData);
    } catch (error) {
      console.error("Failed to refresh user profile", error);
    }
  }

  const logout = () => { 
    localStorage.removeItem('token');
    setUser(null); 
    setIsAuth(false);
  }

  return (
    <AuthContext.Provider value={{ user, isAuth, loading, login, register, logout, refreshUser }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
