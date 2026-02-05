'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingHearts from '@/components/FloatingHearts'
import Confetti from '@/components/Confetti'

export default function Home() {
  const [accepted, setAccepted] = useState<boolean | null>(null)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [showNoModal, setShowNoModal] = useState(false)
  const [hasSeenNoModal, setHasSeenNoModal] = useState(false)
  const noButtonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleYes = useCallback(() => {
    setAccepted(true)
  }, [])

  const moveNoButton = useCallback(() => {
    if (accepted !== null) return
    const container = containerRef.current
    if (!container || !noButtonRef.current) return
    const rect = container.getBoundingClientRect()
    const btn = noButtonRef.current.getBoundingClientRect()
    const padding = 24
    const maxMove = 120
    const newX = (Math.random() - 0.5) * 2 * maxMove
    const newY = (Math.random() - 0.5) * 2 * maxMove
    setNoPosition((prev) => {
      const nextX = prev.x + newX
      const nextY = prev.y + newY
      const maxX = rect.width / 2 - btn.width / 2 - padding
      const maxY = rect.height / 2 - btn.height / 2 - padding
      return {
        x: Math.max(-maxX, Math.min(maxX, nextX)),
        y: Math.max(-maxY, Math.min(maxY, nextY)),
      }
    })
  }, [accepted])

  const handleNoClick = useCallback(() => {
    if (accepted !== null) return
    if (!hasSeenNoModal) {
      setHasSeenNoModal(true)
      setShowNoModal(true)
    } else {
      moveNoButton()
    }
  }, [accepted, hasSeenNoModal, moveNoButton])

  // After modal closed (Theek hai): only move when user clicks No, not on hover
  const handleNoHover = useCallback(() => {
    // Move only after they've seen modal and closed it - so button runs on hover too (hard to click)
    if (accepted !== null || !hasSeenNoModal || showNoModal) return
    moveNoButton()
  }, [accepted, hasSeenNoModal, showNoModal, moveNoButton])

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-16"
    >
      <FloatingHearts />

      {/* No button first-click modal */}
      <AnimatePresence>
        {showNoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowNoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="max-w-md w-full rounded-2xl bg-gradient-to-br from-[#2d1b4e] to-[#6b2d5c] border border-white/20 shadow-2xl p-6 sm:p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-romantic text-2xl sm:text-3xl text-white/95 leading-relaxed">
                Gandi bachi! 😤 Taras nahi ata apny jani pr, apny dameer pr. Ab ap no kar hi nahi sakti!
              </p>
              <button
                onClick={() => setShowNoModal(false)}
                className="mt-6 px-6 py-3 rounded-xl font-display text-lg font-medium text-white bg-pink-500/80 hover:bg-pink-500 border border-white/30 transition-colors"
              >
                Theek hai 💕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {accepted === true ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="fixed inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-br from-[#1a0a2e] via-[#4a1942] to-[#c44569] px-4"
          >
            <Confetti />
            <motion.div
              className="text-6xl sm:text-8xl mb-6 animate-success-heart"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              ❤️
            </motion.div>
            <motion.p
              className="font-romantic text-3xl sm:text-5xl md:text-6xl text-center text-white/95 drop-shadow-lg max-w-2xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Yay! You made me the happiest person ❤️
            </motion.p>
            <motion.p
              className="font-display text-lg sm:text-xl text-pink-200/90 mt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              From the bottom of my heart, thank you 💖
            </motion.p>
            <motion.p
              className="font-romantic text-base sm:text-lg text-white/80 mt-6 max-w-md px-4"
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              I promise to make every day feel special with you. Here&apos;s to us—today and always. 🌹
            </motion.p>
            <motion.p
              className="font-romantic text-lg sm:text-xl md:text-2xl text-white/95 mt-8 max-w-xl px-4 text-center leading-relaxed"
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              I love you, Savera G. Mera bacha, mera muna, mera sab kuch. Mere dil ka tukda, meri rani, Madam G. Mera sab kuch, meri little princess. ❤️
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl mx-auto"
          >
            <motion.h1
              className="font-romantic text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-lg leading-tight"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              Will You Be My Valentine, Savera G? ❤️
            </motion.h1>
            <motion.p
              className="font-display text-lg sm:text-xl text-pink-200/95 mt-4 sm:mt-6"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              From the bottom of my heart
            </motion.p>

            {/* Why You're Amazing section */}
            <motion.section
              className="mt-8 sm:mt-10 w-full max-w-2xl"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.5 }}
            >
              <h2 className="font-romantic text-2xl sm:text-3xl text-white/95 mb-4 sm:mb-5">
                A few reasons you&apos;re amazing 💫
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { icon: '✨', text: 'Your smile brightens my whole day' },
                  { icon: '🌷', text: 'You make every moment feel special' },
                  { icon: '💕', text: 'Your kindness and warmth inspire me' },
                  { icon: '🌟', text: "I love who I am when I'm with you" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 hover:bg-white/15 hover:border-white/25 transition-all duration-300"
                    initial={{ opacity: 0, x: i % 2 === 0 ? -12 : 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.08, duration: 0.4 }}
                  >
                    <span className="text-2xl sm:text-3xl shrink-0">{item.icon}</span>
                    <p className="font-display text-sm sm:text-base text-white/90 text-left">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.div
              className="mt-8 sm:mt-10 px-5 py-5 sm:px-6 sm:py-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl max-w-lg"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <p className="font-display text-base sm:text-lg text-white/95 leading-relaxed italic">
                Every moment with you feels like a little piece of forever. Your smile lights up my world, and your presence makes every day worth living. I couldn&apos;t imagine spending this Valentine&apos;s—or any day—without you. 💕
              </p>
            </motion.div>

            <motion.p
              className="font-romantic text-xl sm:text-2xl text-pink-300/90 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              So… what do you say? ✨
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.button
                onClick={handleYes}
                className="relative px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-display text-lg sm:text-xl font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 shadow-lg hover:shadow-xl glow-soft transition-all duration-300 hover:scale-105 active:scale-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                ✅ Yes 💖
              </motion.button>

              <motion.div
                className="relative"
                style={{
                  transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                }}
              >
                <button
                  ref={noButtonRef}
                  onClick={handleNoClick}
                  onMouseEnter={handleNoHover}
                  onTouchStart={handleNoHover}
                  className="px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-display text-base sm:text-lg font-medium text-white/90 bg-white/15 backdrop-blur border border-white/30 hover:bg-white/25 transition-colors duration-200"
                >
                  ❌ No 😜
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
