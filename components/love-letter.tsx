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
          one letter, no excuses
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
            <p className="font-serif text-xl font-bold text-primary">Abigail,</p>
            <p>
              {
                "I'm sorry. Not the quick kind of sorry you say to end an argument — the kind you say when you finally understand what you did and how it landed on the person you love most."
              }
            </p>
            <p>
              {
                "I hurt you, and there's no version of the story where that's okay. I'm not going to explain it away or make you feel dramatic for feeling it. You were right to be upset with me."
              }
            </p>
            <p>
              {
                "What I want you to know is this: I love you. Not casually, not conveniently — completely. You are the best thing that has ever happened to me, and I don't say that as a line. I say it because my life is measurably better, softer, funnier, and warmer with you in it."
              }
            </p>
            <p>
              {
                "I need you, Abi. Not because I can't function alone, but because everything good in my day is something I want to bring back to you."
              }
            </p>
            <p>
              {
                "So this is me asking, gently and without pressure: please forgive me. I'll do the work. I'll be better, and not just for a week."
              }
            </p>
            <p className="font-serif text-lg font-bold text-primary">
              Yours, always — Drake ♥
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
