'use client'

import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'
import { RunawayButton } from '@/components/runaway-button'

type Burst = { id: number; dx: number; dy: number; left: number }

export function ForgiveMe() {
  const [answered, setAnswered] = useState<'yes' | 'time' | null>(null)
  const [bursts, setBursts] = useState<Burst[]>([])
  const [note, setNote] = useState('')
  const [when, setWhen] = useState('')
  const [where, setWhere] = useState('')
  const [noteState, setNoteState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const idRef = useRef(0)

  const burst = useCallback(() => {
    const next: Burst[] = Array.from({ length: 16 }, () => {
      idRef.current += 1
      return {
        id: idRef.current,
        dx: Math.round((Math.random() - 0.5) * 240),
        dy: -Math.round(80 + Math.random() * 200),
        left: Math.round(Math.random() * 100),
      }
    })
    setBursts((prev) => [...prev, ...next])
    window.setTimeout(() => {
      setBursts((prev) => prev.filter((b) => !next.some((n) => n.id === b.id)))
    }, 1000)
  }, [])

  const notify = useCallback(
    async (payload: { note?: string; when?: string; where?: string; type?: string }) => {
      try {
        await fetch('/api/forgiven', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
          body: JSON.stringify(payload),
        })
      } catch (error) {
        console.log('[v0] notify failed:', (error as Error).message)
      }
    },
    [],
  )

  return (
    <section
      aria-labelledby="forgive-title"
      className="relative z-10 overflow-hidden px-5 py-14"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {bursts.map((b) => (
          <span
            key={b.id}
            className="animate-pop-heart absolute bottom-24 text-2xl text-primary"
            style={
              {
                left: `${b.left}%`,
                '--dx': `${b.dx}px`,
                '--dy': `${b.dy}px`,
              } as React.CSSProperties
            }
          >
            ♥
          </span>
        ))}
      </div>

      <div className="mx-auto max-w-md text-center">
        <Image
          src="/kitty-phone.png"
          alt="Cartoon kitten winking while holding a phone"
          width={110}
          height={140}
          className="animate-bob mx-auto h-auto w-24"
        />

        <h2
          id="forgive-title"
          className="mt-4 font-serif text-4xl leading-tight font-bold text-balance text-primary"
        >
          so… will you go out with me?
        </h2>

        {answered === null && (
          <div className="mt-7 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setAnswered('yes')
                burst()
                void notify({ type: 'yes' })
              }}
              className="animate-wiggle rounded-full border-2 border-foreground bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-[0_6px_0_0_var(--foreground)] transition-transform active:translate-y-1 active:shadow-none"
            >
              yes, let&apos;s go ♥
            </button>
            <RunawayButton onCaught={() => setAnswered('time')} />
          </div>
        )}

        {answered === 'yes' && (
          <div className="mt-7 rounded-3xl border-2 border-foreground bg-card p-6 shadow-[0_8px_0_0_var(--foreground)]">
            <p className="font-serif text-2xl font-bold text-primary">
              you have no idea what that means to me.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">
              {
                "It's a date, Jasmine. Tell me when and I'll make it real — Ken Carson in the aux, Hello Kitty in the camera roll, you in the passenger seat."
              }
            </p>

            {noteState === 'sent' ? (
              <p className="mt-5 rounded-2xl bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground">
                sent to Riot ♥ he&apos;s reading it right now.
              </p>
            ) : (
              <form
                className="mt-5 flex flex-col gap-2"
                onSubmit={async (event) => {
                  event.preventDefault()
                  setNoteState('sending')
                  await notify({ type: 'details', note, when, where })
                  setNoteState('sent')
                  burst()
                }}
              >
                <label htmlFor="when" className="text-left text-xs font-bold tracking-wide text-muted-foreground uppercase">
                  when works?
                </label>
                <input
                  id="when"
                  value={when}
                  onChange={(event) => setWhen(event.target.value)}
                  maxLength={80}
                  placeholder="friday night, sunday, after work…"
                  className="rounded-2xl border-2 border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
                <label htmlFor="where" className="text-left text-xs font-bold tracking-wide text-muted-foreground uppercase">
                  anywhere in mind?
                </label>
                <input
                  id="where"
                  value={where}
                  onChange={(event) => setWhere(event.target.value)}
                  maxLength={120}
                  placeholder="food, a walk, a show — your pick"
                  className="rounded-2xl border-2 border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
                <label htmlFor="note" className="text-left text-xs font-bold tracking-wide text-muted-foreground uppercase">
                  say something back (optional)
                </label>
                <textarea
                  id="note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={3}
                  maxLength={500}
                  placeholder="anything you want him to hear…"
                  className="resize-none rounded-2xl border-2 border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={noteState === 'sending'}
                  className="rounded-full border-2 border-foreground bg-primary px-6 py-3 text-sm font-bold text-primary-foreground disabled:opacity-60"
                >
                  {noteState === 'sending' ? 'sending…' : 'send it to him'}
                </button>
              </form>
            )}

            <button
              type="button"
              onClick={burst}
              className="mt-4 text-xs font-bold tracking-wide text-primary underline underline-offset-4"
            >
              tap for more hearts ♥
            </button>
          </div>
        )}

        {answered === 'time' && (
          <div className="mt-7 rounded-3xl border-2 border-foreground bg-card p-6 shadow-[0_8px_0_0_var(--foreground)]">
            <p className="font-serif text-2xl font-bold text-primary">
              you caught it. that&apos;s completely okay.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">
              {
                "Take all the time you need — I'm not going to rush you. The ask still stands whenever you're ready."
              }
            </p>
            <button
              type="button"
              onClick={() => setAnswered(null)}
              className="mt-5 text-xs font-bold tracking-wide text-muted-foreground underline underline-offset-4"
            >
              go back
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
