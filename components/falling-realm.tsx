const SNOW = [
  { left: '4%', delay: '0s', duration: '14s', size: 3, drift: '18px' },
  { left: '12%', delay: '2s', duration: '18s', size: 2, drift: '-22px' },
  { left: '21%', delay: '5s', duration: '16s', size: 4, drift: '10px' },
  { left: '33%', delay: '1s', duration: '20s', size: 2, drift: '-14px' },
  { left: '41%', delay: '7s', duration: '15s', size: 3, drift: '24px' },
  { left: '52%', delay: '3s', duration: '19s', size: 2, drift: '-8px' },
  { left: '63%', delay: '8s', duration: '17s', size: 4, drift: '16px' },
  { left: '74%', delay: '4s', duration: '21s', size: 2, drift: '-20px' },
  { left: '82%', delay: '6s', duration: '14s', size: 3, drift: '12px' },
  { left: '91%', delay: '9s', duration: '18s', size: 2, drift: '-16px' },
  { left: '28%', delay: '11s', duration: '22s', size: 3, drift: '8px' },
  { left: '68%', delay: '13s', duration: '16s', size: 2, drift: '-12px' },
]

const EMBERS = [
  { left: '8%', delay: '1s', duration: '11s', size: 3, drift: '14px' },
  { left: '26%', delay: '4s', duration: '13s', size: 2, drift: '-18px' },
  { left: '47%', delay: '0.5s', duration: '10s', size: 4, drift: '10px' },
  { left: '61%', delay: '6s', duration: '12s', size: 2, drift: '-8px' },
  { left: '79%', delay: '2.5s', duration: '14s', size: 3, drift: '20px' },
  { left: '93%', delay: '8s', duration: '11s', size: 2, drift: '-14px' },
]

export function FallingRealm() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {SNOW.map((s, i) => (
        <span
          key={`s-${i}`}
          className="animate-snow absolute top-0 rounded-full bg-ice/70"
          style={
            {
              left: s.left,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
              animationDuration: s.duration,
              '--drift': s.drift,
            } as React.CSSProperties
          }
        />
      ))}
      {EMBERS.map((e, i) => (
        <span
          key={`e-${i}`}
          className="animate-ember absolute bottom-0 rounded-full bg-primary/80"
          style={
            {
              left: e.left,
              width: e.size,
              height: e.size,
              boxShadow: '0 0 8px 2px oklch(0.7 0.16 55 / 0.7)',
              animationDelay: e.delay,
              animationDuration: e.duration,
              '--drift': e.drift,
            } as React.CSSProperties
          }
        />
      ))}
      <div className="grain" />
    </div>
  )
}
