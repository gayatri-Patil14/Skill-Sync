import { useState, useEffect } from 'react'
import { FiCheck, FiTrash2, FiBell } from 'react-icons/fi'
import { NotificationCard } from '../components/Cards'
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead } from '../api/notificationApi'

const initialNotifs = [
  { id: 1, type: 'session', content: 'Your session "React Hooks Deep Dive" with Priya Sharma starts in 1 hour.', time: '1 hour ago', read: false },
  { id: 2, type: 'connection', content: 'Arjun Patel accepted your connection request. You can now chat!', time: '2 hours ago', read: false },
  { id: 3, type: 'booking', content: 'New session booking request from Emma Wilson for "JavaScript Basics".', time: '3 hours ago', read: false },
  { id: 4, type: 'system', content: 'You earned the "Top Mentor" badge! Keep up the great work 🏆', time: '5 hours ago', read: false },
  { id: 5, type: 'session', content: 'Reminder: Your Python session with Marcus Lee is tomorrow at 10:00 AM.', time: '1 day ago', read: true },
  { id: 6, type: 'connection', content: 'Sofia Reyes wants to connect with you. You share 3 common interests.', time: '1 day ago', read: true },
  { id: 7, type: 'booking', content: 'Your session "UI/UX Principles" has been confirmed by Sofia Reyes.', time: '2 days ago', read: true },
  { id: 8, type: 'system', content: 'Weekly digest: You earned 240 XP this week. You\'re in the top 10%!', time: '3 days ago', read: true },
  { id: 9, type: 'session', content: 'Priya Sharma left a 5-star review for your React session. 🌟', time: '4 days ago', read: true },
  { id: 10, type: 'system', content: 'New feature: Session recording is now available. Try it in your next session!', time: '5 days ago', read: true },
]

const typeFilters = ['all', 'session', 'connection', 'booking', 'system']

export default function Notifications() {
  const [notifs, setNotifs] = useState(initialNotifs)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const data = await getNotifications();
        if (data && data.length > 0) setNotifs(data);
      } catch (err) {
        console.error('Failed to fetch notifications', err);
      }
    };
    fetchNotifs();
  }, []);

  const markAllRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifs(notifs.map(n => ({ ...n, read: true, isRead: true })));
    } catch (err) { console.error(err); }
  }
  
  const markRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifs(notifs.map(n => n.id === id ? { ...n, read: true, isRead: true } : n));
    } catch (err) { console.error(err); }
  }
  
  const deleteNotif = (id) => setNotifs(notifs.filter(n => n.id !== id))

  const filtered = notifs.filter(n => filter === 'all' || n.type === filter)
  const unreadCount = notifs.filter(n => !n.read && !n.isRead).length

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-dark">Notifications</h1>
          <p className="text-sm text-muted">{unreadCount} unread notifications</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="btn-outline flex items-center gap-2 text-sm">
            <FiCheck size={13} /> Mark all read
          </button>
        )}
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {typeFilters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${filter === f ? 'bg-primary text-white' : 'bg-white text-muted border border-gray-100 hover:text-primary'}`}>
            {f === 'all' ? `All (${notifs.length})` : f}
          </button>
        ))}
      </div>

      {/* Unread */}
      {filtered.some(n => !n.read) && (
        <div>
          <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Unread</p>
          <div className="space-y-2">
            {filtered.filter(n => !n.read).map(n => (
              <div key={n.id} className="flex items-start gap-2 group">
                <div className="flex-1" onClick={() => markRead(n.id)}>
                  <NotificationCard notif={n} />
                </div>
                <button onClick={() => deleteNotif(n.id)} className="p-2 rounded-xl hover:bg-red-50 text-muted hover:text-red-500 transition-all opacity-0 group-hover:opacity-100 mt-1">
                  <FiTrash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Read */}
      {filtered.some(n => n.read) && (
        <div>
          <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Earlier</p>
          <div className="space-y-2">
            {filtered.filter(n => n.read).map(n => (
              <div key={n.id} className="flex items-start gap-2 group">
                <div className="flex-1">
                  <NotificationCard notif={n} />
                </div>
                <button onClick={() => deleteNotif(n.id)} className="p-2 rounded-xl hover:bg-red-50 text-muted hover:text-red-500 transition-all opacity-0 group-hover:opacity-100 mt-1">
                  <FiTrash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <FiBell size={40} className="text-gray-200 mx-auto mb-4" />
          <h3 className="font-semibold text-dark mb-2">No notifications</h3>
          <p className="text-sm text-muted">You're all caught up!</p>
        </div>
      )}
    </div>
  )
}
