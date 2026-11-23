import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { announcementMessages } from '../../data/company'

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true)
  const [currentIdx, setCurrentIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((i) => (i + 1) % announcementMessages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="bg-[#46394A] text-white text-xs py-2 px-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <span className="text-center font-medium tracking-wide">
          {announcementMessages[currentIdx]}
        </span>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
        aria-label="Close announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
