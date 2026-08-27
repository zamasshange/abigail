'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'
import { RunawayButton } from '@/components/runaway-button'

type Spark = { id: number; dx: number; dy: number; left: number }

export function TheAsk() {
  const router = useRouter()
  const [sparks, setSparks] = useState<Spark[]>([])
  const idRef = useRef(0)

  const burst = useCallback(() => {
    const next: Spark[] = Array.from({ length: 18 }, () => {
      idRef.current += 1
      return {
        id: idRef.current,
        dx: Math.round((Math.random() - 0.5) * 240),
        dy: -Math.round(80 + Math.random() * 200),
        left: Math.round(Math.random() * 100),
      }
    })
    setSparks((prev) => [...prev, ...next])
    window.setTimeout(() => {
      setSparks((prev) => prev.filter((b) => !next.some((n) => n.id === b.id)))
    }, 1000)
  }, [])

  const hearHim = async () => {
    burst()
    try {
      await fetch('/api/forgiven', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'heard' }),
        keepalive: true,
      })
    } catch {
      // still take her to the summons
    }
    router.push('/the-summons')
  }

  return (
    <section aria-labelledby="ask-title" className="relative z-10 overflow-hidden px-5 py-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {sparks.map((s) => (
          <span
            key={s.id}
            className="animate-pop-heart absolute bottom-24 text-lg text-primary"
            style={
              {
                left: `${s.left}%`,
                '--dx': `${s.dx}px`,
                '--dy': `${s.dy}px`,
              } as React.CSSProperties
            }
          >
            ✦
          </span>
        ))}
      </div>

      <div className="mx-auto max-w-md text-center">
        <p className="font-serif text-[10px] font-semibold tracking-[0.38em] text-primary uppercase">
          the queen decides
        </p>
        <h2
          id="ask-title"
          className="font-display mt-3 text-3xl leading-tight font-bold text-balance text-primary"
        >
          So, my queen?
        </h2>
        <p className="mt-3 text-base leading-relaxed text-foreground/80">
          You have read the scroll. The oaths still stand. One button is honest. The other one runs because it was never a real answer.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <button
            type="button"
            onClick={() => void hearHim()}
            className="font-serif rounded-sm border border-primary bg-primary px-5 py-4 text-[15px] leading-snug font-bold text-balance text-primary-foreground shadow-[0_0_24px_oklch(0.78_0.12_85/0.35)] transition-transform active:translate-y-px"
          >
            I hear you my handsome tall darkskin king
          </button>
          <RunawayButton />
        </div>
      </div>
    </section>
  )
}
