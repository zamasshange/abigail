import Image from 'next/image'
import { FloatingHearts } from '@/components/floating-hearts'
import { ForgiveMe } from '@/components/forgive-me'
import { Hero } from '@/components/hero'
import { LoveLetter } from '@/components/love-letter'
import { Promises } from '@/components/promises'
import { Reasons } from '@/components/reasons'

export default function Page() {
  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      <FloatingHearts />

      <main className="relative z-10 mx-auto w-full max-w-2xl pb-4">
        <Hero />
        <LoveLetter />
        <Reasons />
        <Promises />
        <ForgiveMe />
      </main>

      <footer className="relative z-10 flex flex-col items-center gap-3 px-5 pb-10 text-center">
        <Image
          src="/kitty-outline.png"
          alt=""
          aria-hidden="true"
          width={120}
          height={70}
          className="h-auto w-16 opacity-80"
        />
        <p className="text-xs leading-relaxed text-muted-foreground">
          made at 2am with shaky hands and a very full heart
          <br />
          <span className="font-semibold text-primary">riot → jasmine ♥</span>
        </p>
      </footer>
    </div>
  )
}
