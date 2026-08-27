'use client'

import { useEffect, useRef, useState } from 'react'
import { RealmDivider } from '@/components/ornament'

const CHAPTERS = [
  {
    roman: 'I',
    title: 'How long I have known you',
    body: [
      'Ricky — I have known you long enough that time stopped pretending to be ordinary. Long enough that your voice still has a weather I can feel from another room. Long enough that “us” is not a season. It is the longest true thing in my life.',
      'I do not measure it in neat years on a page. I measure it in every version of me that learned your name and never unlearned it. From the first day I knew you, to this night, you have been the story I keep coming back to.',
    ],
  },
  {
    roman: 'II',
    title: 'The hours that would not end',
    body: [
      'Remember how we used to love each other like the world had been paused just for us. Not loud. Not performed. Just happy. The kind of happy that does not need an audience.',
      'We would stay on the phone for hours and never hang up, not because we had news — because being on the line with you was the whole point. Laughing at nothing. Quiet together. I used to think those hours would last forever. I still go back to them when the room is too still.',
    ],
  },
  {
    roman: 'III',
    title: 'The long night',
    body: [
      'Then the realm split. We broke. It was not a clean break — nothing about us ever was. I felt you in every hour that used to belong to us. The long night was not winter. It was a world where I could not hear you breathe on the other end of a call.',
    ],
  },
  {
    roman: 'IV',
    title: 'The road back',
    body: [
      'And still — we found the road back. Not because it was easy. Because whatever this is between us refuses to die. We came back to each other the way fire comes back to a hearth someone thought they had let go cold.',
      'That has to mean something, Ricky. To me it means everything. People do not survive a breaking like ours and wander home by accident.',
    ],
  },
]

export function Chronicle() {
  return (
    <section aria-labelledby="scroll-title" className="relative z-10 px-5 py-8">
      <div className="parchment mx-auto max-w-md rounded-sm px-5 py-8 sm:px-7">
        <p className="text-center font-serif text-[10px] font-semibold tracking-[0.38em] text-ink/55 uppercase">
          a song of us
        </p>
        <h2
          id="scroll-title"
          className="font-serif mt-2 text-center text-3xl font-bold text-ink"
        >
          The scroll
        </h2>
        <RealmDivider />

        <div className="mt-2 space-y-8">
          {CHAPTERS.map((chapter, index) => (
            <Chapter key={chapter.roman} chapter={chapter} delay={index * 80} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Chapter({
  chapter,
  delay,
}: {
  chapter: (typeof CHAPTERS)[number]
  delay: number
}) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const fallback = window.setTimeout(() => setShown(true), 1400)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          window.clearTimeout(fallback)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(node)
    return () => {
      window.clearTimeout(fallback)
      observer.disconnect()
    }
  }, [])

  return (
    <article
      ref={ref}
      className={shown ? 'animate-unfurl' : 'opacity-0'}
      style={{ animationDelay: shown ? `${delay}ms` : undefined }}
    >
      <p className="font-serif text-[10px] font-semibold tracking-[0.32em] text-crimson uppercase">
        chapter {chapter.roman}
      </p>
      <h3
          className="font-serif mt-1 text-xl font-bold text-balance text-ink"
      >
        {chapter.title}
      </h3>
      {chapter.body.map((paragraph) => (
        <p key={paragraph.slice(0, 24)} className="mt-3 text-[17px] leading-relaxed text-ink/85">
          {paragraph}
        </p>
      ))}
    </article>
  )
}
