import Image from 'next/image'

const PROMISES = [
  'I will actually pick a place. No hour-long “idk you choose.”',
  'I will play Ken Carson in the car if you want. Hello Kitty playlist too.',
  'I will put my phone down when I am with you.',
  'I will get you home safe, no debate.',
  'I will show up on time, looking like I meant this.',
]

export function Promises() {
  return (
    <section aria-labelledby="promises-title" className="relative z-10 px-5 py-10">
      <div className="mx-auto max-w-md rounded-4xl bg-card p-6 shadow-[0_8px_0_0_var(--secondary)]">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 shrink-0">
            <Image
              src="/stickers.png"
              alt=""
              aria-hidden="true"
              fill
              sizes="48px"
              className="rounded-2xl object-cover"
            />
          </div>
          <h2 id="promises-title" className="font-serif text-2xl font-bold text-primary">
            pinky promises
          </h2>
        </div>

        <ul className="mt-5 space-y-3">
          {PROMISES.map((p) => (
            <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-foreground/85">
              <span
                aria-hidden="true"
                className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-primary text-[11px] text-primary-foreground"
              >
                ✓
              </span>
              {p}
            </li>
          ))}
        </ul>

        <p className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
          {'Signed, sealed, and pinky-sworn by Riot.'}
        </p>
      </div>
    </section>
  )
}
