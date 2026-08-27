const OATHS = [
  {
    name: 'I will never leave you',
    words:
      'This was not a pretty line for a fight. It is the shape of my life after you. I am still inside that oath. I have not packed a bag. I have not looked for another queen.',
  },
  {
    name: 'I will wait for you',
    words:
      'I know you do not want to date anyone right now. I hear that. I respect it. I am not here to rush a queen who has already told the court what she needs. Take the time. Keep the space. I will wait.',
  },
]

export function Oaths() {
  return (
    <section aria-labelledby="oaths-title" className="relative z-10 px-5 py-6">
      <div className="mx-auto max-w-md">
        <p className="text-center font-serif text-[10px] font-semibold tracking-[0.38em] text-primary uppercase">
          sworn before gods old and new
        </p>
        <h2
          id="oaths-title"
          className="font-display mt-2 text-center text-3xl font-bold text-balance text-primary"
        >
          The oaths
        </h2>
        <p className="mt-3 text-center text-base leading-relaxed text-foreground/80 italic">
          I am not asking you to date me tonight. I am reminding you of the two promises I already made — and of how much I still love you, how much I still need you.
        </p>

        <ul className="mt-6 space-y-3">
          {OATHS.map((oath) => (
            <li
              key={oath.name}
              className="rounded-sm border border-primary/30 bg-card/80 px-5 py-5 backdrop-blur-sm"
            >
              <p className="font-serif text-lg font-bold text-primary">
                {oath.name}
              </p>
              <p className="mt-2 text-[16px] leading-relaxed text-foreground/85">{oath.words}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
