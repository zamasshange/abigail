'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * A button that can never be pressed. It flees on hover, proximity,
 * and tap so "Nahhh" stays a joke, not a real answer.
 */
export function RunawayButton() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const [dodges, setDodges] = useState(0)
  const [rotation, setRotation] = useState(0)
  const btnRef = useRef<HTMLButtonElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  const flee = useCallback(() => {
    const btn = btnRef.current
    const w = btn?.offsetWidth ?? 110
    const h = btn?.offsetHeight ?? 48
    const pad = 16
    const maxX = Math.max(pad, window.innerWidth - w - pad)
    const maxY = Math.max(pad, window.innerHeight - h - pad)
    const current = btn?.getBoundingClientRect()
    let x = pad + Math.random() * (maxX - pad)
    let y = pad + Math.random() * (maxY - pad)
    if (current) {
      let tries = 0
      while (Math.hypot(x - current.left, y - current.top) < 120 && tries < 8) {
        x = pad + Math.random() * (maxX - pad)
        y = pad + Math.random() * (maxY - pad)
        tries += 1
      }
    }
    setPos({ x, y })
    setRotation(Math.round((Math.random() - 0.5) * 28))
    setDodges((d) => d + 1)
  }, [])

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const btn = btnRef.current
      if (!btn) return
      const r = btn.getBoundingClientRect()
      const distance = Math.hypot(event.clientX - (r.left + r.width / 2), event.clientY - (r.top + r.height / 2))
      if (distance < r.width / 2 + 64) flee()
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [flee])

  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return
    const onTouch = (event: TouchEvent) => {
      event.preventDefault()
      flee()
    }
    btn.addEventListener('touchstart', onTouch, { passive: false })
    return () => btn.removeEventListener('touchstart', onTouch)
  }, [flee])

  return (
    <div ref={wrapRef} className="relative flex min-h-14 items-center justify-center">
      <button
        ref={btnRef}
        type="button"
        aria-label="Nahhh. This one runs away on purpose."
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          flee()
        }}
        onPointerDown={(event) => {
          if (event.pointerType === 'mouse') return
          event.preventDefault()
          flee()
        }}
        onFocus={flee}
        className="rounded-sm border border-foreground/35 bg-background/70 px-7 py-3 text-sm font-semibold tracking-wide text-foreground/75 backdrop-blur-sm transition-transform duration-150 ease-out will-change-transform"
        style={
          pos
            ? {
                position: 'fixed',
                left: pos.x,
                top: pos.y,
                zIndex: 60,
                transform: `rotate(${rotation}deg)`,
              }
            : { transform: `rotate(${rotation}deg)` }
        }
      >
        Nahhh
      </button>
      {dodges > 0 && (
        <p
          aria-live="polite"
          className="pointer-events-none absolute -bottom-1 left-0 right-0 text-center font-serif text-[11px] tracking-wide text-muted-foreground"
        >
          {dodges < 3 ? 'even winter could not catch that' : 'the realm has spoken: that button flees'}
        </p>
      )}
    </div>
  )
}
