export interface SkeletonProps {
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  className?: string
}

const shimmerStyle = `
@keyframes skeleton-shimmer {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}
`

export function Skeleton({ width = '100%', height = 16, borderRadius = 6 }: SkeletonProps) {
  return (
    <>
      <style>{shimmerStyle}</style>
      <span
        style={{
          display: 'block',
          width,
          height,
          borderRadius,
          background: 'linear-gradient(90deg, var(--surface-tertiary) 25%, var(--surface-secondary) 50%, var(--surface-tertiary) 75%)',
          backgroundSize: '200% 100%',
          animation: 'skeleton-shimmer 1.4s ease-in-out infinite',
          flexShrink: 0,
        }}
        aria-hidden="true"
      />
    </>
  )
}

/* ── Preset compostos ─────────────────────────────────────── */

export function SkeletonText({ lines = 3, lastLineWidth = '60%' }: { lines?: number; lastLineWidth?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} width={i === lines - 1 ? lastLineWidth : '100%'} height={13} />
      ))}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div
      style={{
        padding: '20px',
        borderRadius: '12px',
        border: '0.5px solid var(--border-default)',
        backgroundColor: 'var(--surface-primary)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Skeleton width={40} height={40} borderRadius="50%" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <Skeleton width="50%" height={13} />
          <Skeleton width="30%" height={11} />
        </div>
      </div>
      <SkeletonText lines={3} />
    </div>
  )
}

export function SkeletonTableRow({ cols = 4 }: { cols?: number }) {
  const widths = ['40%', '25%', '20%', '15%']
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '12px 16px',
        borderBottom: '0.5px solid var(--border-default)',
      }}
    >
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} width={widths[i] ?? '15%'} height={12} />
      ))}
    </div>
  )
}

export function SkeletonAvatar({ size = 36 }: { size?: number }) {
  return <Skeleton width={size} height={size} borderRadius="50%" />
}
