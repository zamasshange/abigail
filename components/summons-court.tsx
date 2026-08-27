'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { FallingRealm } from '@/components/falling-realm'
import { RealmDivider } from '@/components/ornament'

const HOURS = [
  {
    id: 'dawn',
    name: 'Dawn',
    whisper: 'when the night finally lets go',
  },
  {
    id: 'high-sun',
    name: 'High sun',
    whisper: 'in the full light, no hiding',
  },
  {
    id: 'dusk',
    name: 'Dusk',
    whisper: 'when the sky turns to wine',
  },
  {
    id: 'wolf',
    name: 'The hour of the wolf',
    whisper: 'late, quiet, just us',
  },
] as const

type HourId = (typeof HOURS)[number]['id']

export function SummonsCourt() {
  const [day, setDay] = useState('')
  const [hour, setHour] = useState<HourId | ''>('')
  const [place, setPlace] = useState('')
  const [note, setNote] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'written'>('idle')
  const minDay = useMemo(() => new Date().toISOString().slice(0, 10), [])

  const seal = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!day || !hour || !place.trim()) return
    setState('sending')
    const chosen = HOURS.find((h) => h.id === hour)
    try {
      await fetch('/api/forgiven', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          type: 'summons',
          date: day,
          time: chosen?.name,
          place: place.trim(),
          note: note.trim(),
        }),
      })
    } catch {
      // still show the decree
    }
    setState('written')
  }

  if (state === 'written') {
    const chosen = HOURS.find((h) => h.id === hour)
    const pretty = day
      ? new Date(`${day}T12:00:00`).toLocaleDateString('en-ZA', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : day

    return (
      <div className="relative min-h-dvh overflow-x-hidden">
        <FallingRealm />
        <div className="absolute inset-0">
          <Image
            src="/feast-hall.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
        </div>
        <main className="relative z-10 mx-auto flex min-h-dvh max-w-md flex-col justify-end px-5 pb-14 pt-16">
          <div className="parchment animate-unfurl rounded-sm px-5 py-8 text-center">
            <p className="font-serif text-[10px] font-semibold tracking-[0.38em] text-crimson uppercase">
              it is written
            </p>
            <h1 className="font-display mt-2 text-3xl font-bold text-ink">
              The king will come
            </h1>
            <RealmDivider />
            <p className="text-[17px] leading-relaxed text-ink/85">
              By decree of Queen Ricky, Drake is summoned to stand before her.
            </p>
            <p className="font-serif mt-4 text-lg font-bold text-ink">
              {pretty}
            </p>
            <p className="mt-1 text-[16px] text-ink/80 italic">{chosen?.name}</p>
            <p className="mt-3 text-[16px] leading-relaxed text-ink/85">{place}</p>
            {note ? (
              <p className="mt-4 border-t border-ink/15 pt-4 text-[15px] leading-relaxed text-ink/75 italic">
                “{note}”
              </p>
            ) : null}
            <p className="mt-6 text-[15px] leading-relaxed text-ink/80">
              He will be there. He has never been more sure of anything. Seeing you for the first time will mean the world — and after that, the choice stays yours.
            </p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      <FallingRealm />
      <header className="relative isolate min-h-[54dvh] overflow-hidden">
        <Image
          src="/feast-hall.png"
          alt="A candlelit hall set for two"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-background/55 to-background" />
        <div className="relative z-10 mx-auto flex min-h-[54dvh] max-w-md flex-col items-center justify-end px-5 pb-8 text-center">
          <p className="font-serif text-[10px] font-semibold tracking-[0.42em] text-primary uppercase">
            the queen has spoken
          </p>
          <h1
            className="font-display mt-3 font-bold leading-none text-primary animate-gold"
            style={{ fontSize: 'clamp(2.4rem, 12vw, 3.6rem)' }}
          >
            The summons
          </h1>
          <p className="mt-4 max-w-[28ch] text-lg leading-relaxed text-foreground/90 italic">
            Name the night he may finally see you. A table is already waiting.
          </p>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-md px-5 pb-14">
        <form onSubmit={(event) => void seal(event)} className="space-y-6">
          <fieldset>
            <legend
              className="font-serif text-sm font-semibold tracking-[0.22em] text-primary uppercase"
            >
              The day
            </legend>
            <label htmlFor="summons-day" className="sr-only">
              Choose a date
            </label>
            <input
              id="summons-day"
              type="date"
              required
              min={minDay}
              value={day}
              onChange={(event) => setDay(event.target.value)}
              className="mt-2 w-full rounded-sm border border-primary/40 bg-card/80 px-4 py-3 text-base text-foreground [color-scheme:dark] focus:border-primary focus:outline-none"
            />
          </fieldset>

          <fieldset>
            <legend
              className="font-serif text-sm font-semibold tracking-[0.22em] text-primary uppercase"
            >
              The hour
            </legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {HOURS.map((item) => {
                const selected = hour === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setHour(item.id)}
                    aria-pressed={selected}
                    className={`rounded-sm border px-3 py-3 text-left transition-colors ${
                      selected
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-primary/30 bg-card/80 text-foreground'
                    }`}
                  >
                    <span className="font-serif block text-sm font-bold">
                      {item.name}
                    </span>
                    <span className={`mt-1 block text-[12px] leading-snug ${selected ? 'opacity-80' : 'text-muted-foreground'}`}>
                      {item.whisper}
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend
              className="font-serif text-sm font-semibold tracking-[0.22em] text-primary uppercase"
            >
              The place
            </legend>
            <label htmlFor="summons-place" className="sr-only">
              Where should he meet you
            </label>
            <input
              id="summons-place"
              type="text"
              required
              maxLength={120}
              value={place}
              onChange={(event) => setPlace(event.target.value)}
              placeholder="a cafe, a park, your street — anywhere"
              className="mt-2 w-full rounded-sm border border-primary/40 bg-card/80 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
            />
          </fieldset>

          <fieldset>
            <legend
              className="font-serif text-sm font-semibold tracking-[0.22em] text-primary uppercase"
            >
              A word for him
            </legend>
            <label htmlFor="summons-note" className="sr-only">
              Optional note
            </label>
            <textarea
              id="summons-note"
              rows={3}
              maxLength={500}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="optional. anything you want your king to hear…"
              className="mt-2 w-full resize-none rounded-sm border border-primary/40 bg-card/80 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
            />
          </fieldset>

          <button
            type="submit"
            disabled={state === 'sending' || !day || !hour || !place.trim()}
            className="font-serif w-full rounded-sm border border-primary bg-primary px-5 py-4 text-base font-bold text-primary-foreground disabled:opacity-50"
          >
            {state === 'sending' ? 'Sealing…' : 'Seal the summons'}
          </button>
          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            After he sees you, the choice stays yours. He is only asking for the first time.
          </p>
        </form>
      </main>
    </div>
  )
}
