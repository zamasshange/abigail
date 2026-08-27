const ASK = [
  'I love you. I need you. Not as a line. As a fact I wake up with.',
  'And I have one more promise to lay at your feet: I need to see you. At least once. For the first time.',
  'After I have seen you — if you want to leave, you can. I will not chain you. I am not asking for forever in that hour. I am asking for your face in the same room as mine. One audience. One real moment that is not a screen.',
  'It would mean the world to me, Ricky. I would do anything. Ride through winter. Wait outside the gates. Whatever you ask. Just let me see you.',
]

export function ThePlea() {
  return (
    <section aria-labelledby="plea-title" className="relative z-10 px-5 py-8">
      <div className="parchment mx-auto max-w-md rounded-sm px-5 py-8 sm:px-7">
        <p className="font-serif text-[10px] font-semibold tracking-[0.32em] text-crimson uppercase">
          chapter v
        </p>
        <h2
          id="plea-title"
          className="font-serif mt-1 text-2xl font-bold text-ink"
        >
          One audience
        </h2>
        {ASK.map((paragraph) => (
          <p key={paragraph.slice(0, 28)} className="mt-4 text-[17px] leading-relaxed text-ink/85">
            {paragraph}
          </p>
        ))}
        <p
          className="font-serif mt-6 text-right text-lg font-bold text-ink"
        >
          Yours — Drake
        </p>
      </div>
    </section>
  )
}
