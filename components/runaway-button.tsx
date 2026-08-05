'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const TAUNTS = [
  'I need a little time',
  'wait— not so fast',
  'nope, try again',
  'too slow, my love',
  'catch me first',
  'you really thought?',
  'hehe, missed me',
  'this button says no',
]

/**
 * A button that dodges the pointer. On touch devices it hops away on tap
 * instead, so it stays playable with a finger. Fully keyboard-accessible:
 * focusing and pressing it always works.
 */
export function RunawayButton({ onCaught }: { onCaught: () => void }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dodges, setDodges] = useState(0)
  const [rotation, setRotation] = useState(0)
  const wrapRef = useRef<HTMLDivElement>(null)

  const label = TAUNTS[dodges % TAUNTS.length]

  const flee = useCallback(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const limitX = Math.max(40, Math.min(120, wrap.offsetWidth / 2 - 40))
    const angle = Math.random() * Math.PI * 2
    setOffset({
      x: Math.round(Math.cos(angle) * limitX),
      y: Math.round(Math.sin(angle) * 46),
    })
    setRotation(Math.round((Math.random() - 0.5) * 30))
    setDodges((d) => d + 1)
  }, [])

  // Pointer proximity: dodge before the cursor ever lands on it.
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const btn = wrap.querySelector('button')
      if (!btn) return
      const r = btn.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const distance = Math.hypot(event.clientX - cx, event.clientY - cy)
      if (distance < r.width / 2 + 56) flee()
    }

    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [flee])

  return (
    <div ref={wrapRef} className="relative flex h-16 items-center justify-center">
      <button
        type="button"
        onClick={(event) => {
          // Give up after enough dodges so she is never actually trapped.
          if (dodges >= 6) {
            onCaught()
            return
          }
          // Touch/pen taps make it hop instead of registering.
          if (event.detail === 0) {
            onCaught()
            return
          }
          flee()
        }}
        onFocus={() => setOffset({ x: 0, y: 0 })}
        className="rounded-full border-2 border-foreground bg-card px-7 py-3 text-sm font-bold text-foreground/80 transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotation}deg)`,
        }}
      >
        {label}
      </button>

      {dodges > 0 && dodges < 6 && (
        <p
          aria-live="polite"
          className="pointer-events-none absolute -bottom-1 left-0 right-0 text-center text-[11px] font-semibold tracking-wide text-muted-foreground"
        >
          {dodges < 3 ? 'that one is slippery' : 'okay, it likes running'}
        </p>
      )}
    </div>
  )
}
