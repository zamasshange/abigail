'use client'

import { Mail } from 'lucide-react'
import { useState } from 'react'

export function LoveLetter() {
  const [open, setOpen] = useState(false)

  return (
    <section aria-labelledby="letter-title" className="relative z-10 px-5 py-10">
      <div className="mx-auto max-w-md">
        <h2
          id="letter-title"
          className="font-serif text-center text-3xl font-bold text-primary"
        >
          one letter, one ask
        </h2>

        {!open ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group mt-6 flex w-full flex-col items-center gap-4 rounded-3xl border-2 border-dashed border-border bg-card px-6 py-10 transition-transform active:scale-[0.98]"
            aria-expanded={false}
          >
            <span
              aria-hidden="true"
              className="grid h-20 w-24 place-items-center rounded-xl bg-secondary text-primary shadow-[0_6px_0_0_var(--border)] transition-transform group-hover:-translate-y-1"
            >
              <Mail className="h-9 w-9" strokeWidth={2.2} />
            </span>
            <span className="text-sm font-bold tracking-wide text-foreground uppercase">
              tap to open my letter
            </span>
            <span className="text-xs text-muted-foreground">
              {'(it took me four tries to write it)'}
            </span>
          </button>
        ) : (
          <article className="mt-6 space-y-4 rounded-3xl bg-card p-6 text-[15px] leading-relaxed text-foreground/85 shadow-[0_8px_0_0_var(--secondary)]">
            <p className="font-serif text-xl font-bold text-primary">Jasmine,</p>
            <p>
              {
                "We haven't been talking forever. I know that. But I also know this already feels different — and I think you feel it too."
              }
            </p>
            <p>
              {
                "You love Hello Kitty and you love Ken Carson and somehow both of those things make perfect sense on you. Soft and loud. Cute and a little chaotic. I like all of it."
              }
            </p>
            <p>
              {
                "I don't want this to stay as just talking. I want a real night. You, me, Ken Carson in the aux if you want, and me actually getting to sit across from you."
              }
            </p>
            <p>
              {
                "So this is me asking, clearly and a little nervous: Jasmine, will you go out with me?"
              }
            </p>
            <p className="font-serif text-lg font-bold text-primary">
              Yours — Riot ♥
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs font-semibold tracking-wide text-muted-foreground underline underline-offset-4"
            >
              fold the letter back up
            </button>
          </article>
        )}
      </div>
    </section>
  )
}
