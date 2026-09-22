import Image from 'next/image'

export function Hero() {
  return (
    <header className="relative z-10 flex flex-col items-center px-5 pt-8 pb-6 text-center">
      <div className="flex items-center gap-2 rounded-full border-2 border-foreground bg-card px-4 py-1.5">
        <Image
          src="/pink-bow.png"
          alt=""
          aria-hidden="true"
          width={28}
          height={19}
          className="h-4 w-auto"
        />
        <span className="text-[11px] font-bold tracking-[0.18em] text-foreground uppercase">
          for jasmine
        </span>
      </div>

      <div className="relative mt-6 w-full max-w-sm">
        <div className="overflow-hidden rounded-[2rem] border-[3px] border-foreground shadow-[0_8px_0_0_var(--foreground)]">
          <Image
            src="/kitty-wallpaper.png"
            alt="Cartoon kitten with a pink bow holding a big heart on a hot pink background"
            width={1200}
            height={675}
            priority
            sizes="(max-width: 640px) 90vw, 384px"
            className="h-44 w-full object-cover sm:h-52"
          />
        </div>

        <Image
          src="/kitty-hearts.png"
          alt=""
          aria-hidden="true"
          width={200}
          height={100}
          className="animate-bob absolute -right-3 -bottom-6 h-auto w-24 drop-shadow-[0_3px_4px_rgba(0,0,0,0.18)]"
        />
      </div>

      <h1 className="font-serif mt-10 text-5xl leading-[1.05] font-extrabold text-balance text-primary sm:text-6xl">
        hi, Jasmine.
      </h1>

      <p className="mt-4 max-w-[30ch] text-base leading-relaxed text-pretty text-foreground/80">
        {"It's Riot. I built you a whole little world because asking you out over text felt way too small."}
      </p>

      <div className="mt-8 flex flex-col items-center gap-1">
        <span className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
          scroll, please
        </span>
        <span aria-hidden="true" className="animate-bob text-xl text-primary">
          ↓
        </span>
      </div>
    </header>
  )
}
