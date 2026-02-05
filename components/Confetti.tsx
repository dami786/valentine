'use client'

import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function Confetti() {
  useEffect(() => {
    const duration = 4 * 1000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff6b9d', '#e84393', '#fd79a8', '#a29bfe', '#fff'],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff6b9d', '#e84393', '#fd79a8', '#a29bfe', '#fff'],
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()

    const mid = setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff6b9d', '#e84393', '#fd79a8', '#a29bfe', '#fff'],
      })
    }, 500)

    return () => clearTimeout(mid)
  }, [])

  return null
}
