import Image from 'next/image'
import { CrownMark, RealmDivider } from '@/components/ornament'

export function Hero() {
  return (
    <header className="relative isolate min-h-[92dvh] overflow-hidden">
      <Image
        src="/raven-hero.png"
        alt="A raven carrying a sealed scroll over a winter fortress at night"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_18%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[92dvh] max-w-md flex-col items-center justify-end px-5 pb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/50 px-3 py-1 backdrop-blur-sm">
          <CrownMark className="h-3.5 w-6 text-primary" />
          <span className="font-serif text-[10px] font-semibold tracking-[0.32em] text-primary uppercase">
            house of us
          </span>
        </span>

        <p className="mt-6 font-serif text-[11px] tracking-[0.4em] text-ice uppercase">
          from drake, to his queen
        </p>
        <h1
          className="font-display mt-2 font-bold leading-none text-primary animate-gold"
          style={{ fontSize: 'clamp(3.4rem, 18vw, 5.5rem)' }}
        >
          Ricky
        </h1>
        <RealmDivider />
        <p className="max-w-[28ch] text-xl leading-relaxed text-balance text-foreground/90 italic">
          Winter came for us. We survived it. I am still here, asking for one more page.
        </p>
        <div className="mt-8 flex flex-col items-center gap-1">
          <span className="font-serif text-[10px] tracking-[0.32em] text-muted-foreground uppercase">
            unroll the scroll
          </span>
          <span aria-hidden="true" className="text-primary">
            ↓
          </span>
        </div>
      </div>
    </header>
  )
}
