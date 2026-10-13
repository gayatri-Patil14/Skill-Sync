import { useState, useRef, useEffect } from 'react'
import { FiSend, FiPaperclip, FiSmile, FiSearch, FiMoreVertical } from 'react-icons/fi'
import { ChatBubble } from '../components/UI'

const contacts = [
  { id: 1, name: 'Priya Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', online: true, lastMsg: 'Sure, let\'s schedule for tomorrow!', time: '2m', unread: 2 },
  { id: 2, name: 'Marcus Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', online: true, lastMsg: 'Can you share the Figma file?', time: '15m', unread: 0 },
  { id: 3, name: 'Arjun Patel', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun', online: false, lastMsg: 'Thanks for the session!', time: '1h', unread: 0 },
  { id: 4, name: 'Emma Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', online: false, lastMsg: 'See you next week 👋', time: '3h', unread: 0 },
  { id: 5, name: 'Kai Zhang', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kai', online: true, lastMsg: 'Docker setup is done!', time: '1d', unread: 1 },
]

const initialMessages = {
  1: [
    { id: 1, content: 'Hey! I saw you offer React lessons. I\'d love to exchange for Python tutoring!', time: '10:30 AM', mine: false },
    { id: 2, content: 'That sounds great! I\'ve been wanting to learn Python for data analysis.', time: '10:32 AM', mine: true },
    { id: 3, content: 'Perfect! I can teach you pandas and numpy. When are you free?', time: '10:33 AM', mine: false },
    { id: 4, content: 'I\'m free tomorrow afternoon. Does 3 PM work for you?', time: '10:35 AM', mine: true },
    { id: 5, content: 'Sure, let\'s schedule for tomorrow!', time: '10:36 AM', mine: false },
  ],
  2: [
    { id: 1, content: 'Hi Marcus! Your UI/UX portfolio is amazing.', time: '9:00 AM', mine: true },
    { id: 2, content: 'Thank you! I\'d love to learn React from you.', time: '9:05 AM', mine: false },
    { id: 3, content: 'Can you share the Figma file?', time: '9:10 AM', mine: false },
  ],
}

export default function Chat() {
  const [activeContact, setActiveContact] = useState(contacts[0])
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [search, setSearch] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, activeContact])

  const sendMessage = () => {
    if (!input.trim()) return
    const newMsg = { id: Date.now(), content: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), mine: true }
    setMessages(prev => ({ ...prev, [activeContact.id]: [...(prev[activeContact.id] || []), newMsg] }))
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      const reply = { id: Date.now() + 1, content: 'Got it! I\'ll get back to you shortly. 😊', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), mine: false }
      setMessages(prev => ({ ...prev, [activeContact.id]: [...(prev[activeContact.id] || []), reply] }))
    }, 2000)
  }

  const filteredContacts = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
  const currentMessages = messages[activeContact.id] || []

  return (
    <div className="h-[calc(100vh-5rem)] flex gap-0 -m-6 overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
      {/* Contacts Sidebar */}
      <div className="w-72 bg-white border-r border-gray-100 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-dark mb-3">Messages</h2>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm" />
            <input className="input pl-9 text-sm py-2" placeholder="Search conversations..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map(c => (
            <div key={c.id} onClick={() => setActiveContact(c)}
              className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-surface transition-colors ${activeContact.id === c.id ? 'bg-surface border-r-2 border-primary' : ''}`}>
              <div className="relative flex-shrink-0">
                <img src={c.avatar} alt="" className="w-10 h-10 rounded-full" />
                {c.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-dark truncate">{c.name}</p>
                  <span className="text-xs text-muted flex-shrink-0">{c.time}</span>
                </div>
                <p className="text-xs text-muted truncate">{c.lastMsg}</p>
              </div>
              {c.unread > 0 && <span className="w-5 h-5 bg-primary rounded-full text-white text-xs flex items-center justify-center flex-shrink-0">{c.unread}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3">
          <div className="relative">
            <img src={activeContact.avatar} alt="" className="w-10 h-10 rounded-full" />
            {activeContact.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></span>}
          </div>
          <div>
            <p className="font-semibold text-dark text-sm">{activeContact.name}</p>
            <p className="text-xs text-emerald-500">{activeContact.online ? 'Online' : 'Offline'}</p>
          </div>
          <button className="ml-auto p-2 rounded-xl hover:bg-surface text-muted transition-colors"><FiMoreVertical size={16} /></button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentMessages.map(msg => (
            <ChatBubble key={msg.id} message={msg} isMine={msg.mine} />
          ))}
          {typing && (
            <div className="flex justify-start mb-2">
              <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl hover:bg-surface text-muted transition-colors"><FiPaperclip size={16} /></button>
            <button className="p-2 rounded-xl hover:bg-surface text-muted transition-colors"><FiSmile size={16} /></button>
            <input
              className="input flex-1"
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage} className="btn-primary p-2.5 rounded-xl" disabled={!input.trim()}>
              <FiSend size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
