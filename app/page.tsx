import { Chronicle } from '@/components/chronicle'
import { FallingRealm } from '@/components/falling-realm'
import { Hero } from '@/components/hero'
import { Oaths } from '@/components/oaths'
import { RealmDivider } from '@/components/ornament'
import { SealedGate } from '@/components/sealed-gate'
import { TheAsk } from '@/components/the-ask'
import { ThePlea } from '@/components/the-plea'

export default function Page() {
  return (
    <SealedGate>
      <div className="relative min-h-dvh overflow-x-hidden">
        <FallingRealm />
        <main className="relative z-10 mx-auto w-full max-w-2xl pb-4">
          <Hero />
          <Chronicle />
          <Oaths />
          <ThePlea />
          <TheAsk />
        </main>
        <footer className="relative z-10 px-5 pb-12 text-center">
          <RealmDivider label="drake" />
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground italic">
            written in the hour of the wolf
            <br />
            <span className="font-serif not-italic tracking-wide text-primary">
              Drake → Ricky
            </span>
          </p>
        </footer>
      </div>
    </SealedGate>
  )
}
