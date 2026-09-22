'use client'

import { Heart } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const REASONS = [
  {
    front: "you're beautiful",
    back: "Not a line. Not a compliment I throw around. You are so beautiful it actually slows me down. I notice you and the rest of the room goes quiet.",
  },
  {
    front: 'majestic',
    back: "There is something majestic about you. The way you carry yourself. Like you already know you are the moment — because you are.",
  },
  {
    front: 'life changed',
    back: "We have not been talking that long, but the second we started, my days got brighter. I check my phone different now. Everything tilts toward you.",
  },
  {
    front: 'I see a future',
    back: "I know it is early. I still see a future with you. Nights, mornings, the boring in-between. I want all of it with you in it.",
  },
  {
    front: 'one chance',
    back: "If you give me a chance, it will be the best decision you ever make. I will make sure of that. I am not asking to play around.",
  },
  {
    front: 'we both know',
    back: "This is not one-sided. I can feel that we like each other. I am just the one saying it out loud so we can do something about it.",
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
