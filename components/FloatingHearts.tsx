'use client'

import { useMemo } from 'react'

const HEART_SVG = (
  <svg
    viewBox="0 0 24 24"
    className="w-full h-full fill-current text-pink-400/40"
    aria-hidden
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

export default function FloatingHearts() {
  const hearts = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 12 + Math.random() * 24,
      duration: 12 + Math.random() * 12,
      delay: Math.random() * 15,
      className: i % 2 === 0 ? 'heart-float' : 'heart-float-delayed',
    }))
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map(({ id, left, size, duration, delay, className }) => (
        <div
          key={id}
          className={className}
          style={{
            left,
            width: size,
            height: size,
            animationDuration: `${duration}s`,
            animationDelay: `-${delay}s`,
          }}
        >
          {HEART_SVG}
        </div>
      ))}
    </div>
  )
}
