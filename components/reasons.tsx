'use client'

import { Heart } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const REASONS = [
  {
    front: 'your laugh',
    back: 'It resets my whole mood. I would embarrass myself in public a hundred times to hear it.',
  },
  {
    front: 'your kindness',
    back: 'You are gentle with people who have no way of paying you back. That says everything.',
  },
  {
    front: 'how you listen',
    back: "You actually hear me. Not waiting-to-talk listening — the real kind. Nobody has ever done that for me like you do.",
  },
  {
    front: 'your stubborn heart',
    back: "You care so hard it's almost a personality trait. I love that about you, even when it means calling me out.",
  },
  {
    front: 'the little things',
    back: "The way you say my name, the songs you send at 1am, your handwriting. I notice all of it.",
  },
  {
    front: 'you make me better',
    back: "I'm a calmer, kinder, more patient version of myself because of you. That's not something I'm willing to lose.",
  },
]

export function Reasons() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section aria-labelledby="reasons-title" className="relative z-10 px-5 py-10">
      <div className="mx-auto max-w-md">
        <h2 id="reasons-title" className="font-serif text-center text-3xl font-bold text-primary">
          six things I know for sure
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">tap a card to flip it</p>

        <ul className="mt-6 grid grid-cols-2 gap-3">
          {REASONS.map((r, i) => {
            const isOpen = openIndex === i
            return (
              <li key={r.front}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className={`flex h-40 w-full flex-col justify-between rounded-3xl border-2 p-4 text-left transition-all active:scale-[0.97] ${
                    isOpen
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-foreground'
                  }`}
                >
                  {isOpen ? (
                    <Heart
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 fill-current"
                    />
                  ) : (
                    <Image
                      src="/pink-bow.png"
                      alt=""
                      aria-hidden="true"
                      width={80}
                      height={53}
                      className="h-auto w-7 shrink-0"
                    />
                  )}
                  {isOpen ? (
                    <span className="text-[13px] leading-snug">{r.back}</span>
                  ) : (
                    <span className="font-serif text-lg leading-tight font-bold text-balance">
                      {r.front}
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
