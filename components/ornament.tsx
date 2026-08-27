export function RealmDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 py-2" aria-hidden={label ? undefined : true}>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/50 to-primary/80" />
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0 text-primary">
        <path
          d="M12 2L14.2 8.4H21L15.9 12.4L18.1 19L12 14.8L5.9 19L8.1 12.4L3 8.4H9.8L12 2Z"
          fill="currentColor"
        />
      </svg>
      {label ? (
        <span className="font-serif text-[10px] font-semibold tracking-[0.28em] text-primary uppercase">
          {label}
        </span>
      ) : null}
      {label ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0 text-primary">
          <path
            d="M12 2L14.2 8.4H21L15.9 12.4L18.1 19L12 14.8L5.9 19L8.1 12.4L3 8.4H9.8L12 2Z"
            fill="currentColor"
          />
        </svg>
      ) : null}
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-primary/50 to-primary/80" />
    </div>
  )
}

export function CrownMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} fill="none" aria-hidden="true">
      <path
        d="M6 30L12 8L24 22L32 4L40 22L52 8L58 30H6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path d="M8 34H56" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}
