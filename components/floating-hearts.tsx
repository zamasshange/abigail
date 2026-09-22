import Image from 'next/image'

const SPRITES = [
  { left: '6%', delay: '0s', duration: '17s', size: 18, char: '♥' },
  { left: '18%', delay: '3.5s', duration: '21s', size: 12, char: '✿' },
  { left: '31%', delay: '7s', duration: '15s', size: 22, char: '♥' },
  { left: '44%', delay: '1.5s', duration: '24s', size: 14, char: '★' },
  { left: '57%', delay: '9s', duration: '19s', size: 20, char: '♥' },
  { left: '69%', delay: '5s', duration: '16s', size: 13, char: '✿' },
  { left: '81%', delay: '11s', duration: '22s', size: 24, char: '♥' },
  { left: '92%', delay: '2.5s', duration: '18s', size: 15, char: '★' },
]

const BOWS = [
  { left: '12%', delay: '6s', duration: '26s', width: 30 },
  { left: '52%', delay: '14s', duration: '30s', width: 22 },
  { left: '86%', delay: '2s', duration: '28s', width: 26 },
]

export function FloatingHearts() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {SPRITES.map((s, i) => (
        <span
          key={i}
          className="animate-float-up absolute bottom-0 text-primary/45"
          style={{
            left: s.left,
            fontSize: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        >
          {s.char}
        </span>
      ))}

      {BOWS.map((b, i) => (
        <Image
          key={`bow-${i}`}
          src="/pink-bow.png"
          alt=""
          width={40}
          height={27}
          className="animate-float-up absolute bottom-0 h-auto opacity-70"
          style={{
            left: b.left,
            width: b.width,
            animationDelay: b.delay,
            animationDuration: b.duration,
          }}
        />
      ))}
    </div>
  )
}
