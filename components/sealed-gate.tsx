'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export function SealedGate({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('ricky-seal') === 'broken') setOpen(true)
  }, [])

  const breakSeal = () => {
    sessionStorage.setItem('ricky-seal', 'broken')
    setOpen(true)
  }

  return (
    <>
      {children}
      {!open && (
        <div className="fixed inset-0 z-50 flex min-h-dvh flex-col items-center justify-end overflow-hidden bg-background">
          <Image
            src="/raven-hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/55 to-background" />

          <div className="animate-unfurl relative z-10 flex w-full max-w-md flex-col items-center px-6 pb-12 pt-8 text-center">
            <p className="font-serif text-[11px] font-semibold tracking-[0.42em] text-primary uppercase">
              a raven has arrived
            </p>
            <h1 className="font-display mt-4 text-5xl leading-none font-bold text-primary animate-gold">
              Ricky
            </h1>
            <p className="mt-3 max-w-[22ch] text-lg leading-snug text-foreground/80 italic">
              A sealed scroll, carried through winter, from Drake.
            </p>

            <button
              type="button"
              onClick={breakSeal}
              className="group mt-8 flex flex-col items-center gap-3"
            >
              <span className="animate-seal relative block h-28 w-28">
                <Image
                  src="/wax-seal.png"
                  alt="Crimson wax seal. Tap to open the scroll."
                  fill
                  sizes="112px"
                  className="rounded-full object-cover"
                />
              </span>
              <span className="font-serif text-xs font-semibold tracking-[0.28em] text-primary uppercase">
                break the seal
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
