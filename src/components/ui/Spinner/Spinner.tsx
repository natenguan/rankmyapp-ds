export interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  color?: string
  label?: string
}

const sizeMap = {
  xs: 14,
  sm: 18,
  md: 24,
  lg: 36,
}

const strokeMap = {
  xs: 2,
  sm: 2,
  md: 2.5,
  lg: 3,
}

export function Spinner({ size = 'md', color = '#1A88FF', label = 'Carregando...' }: SpinnerProps) {
  const px = sizeMap[size]
  const stroke = strokeMap[size]
  const r = (px - stroke * 2) / 2
  const circumference = 2 * Math.PI * r

  return (
    <span
      role="status"
      aria-label={label}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <svg
        width={px}
        height={px}
        viewBox={`0 0 ${px} ${px}`}
        fill="none"
        style={{ animation: 'spin 0.75s linear infinite' }}
      >
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        {/* Track */}
        <circle
          cx={px / 2}
          cy={px / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          strokeOpacity={0.18}
        />
        {/* Arc */}
        <circle
          cx={px / 2}
          cy={px / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.75}
          transform={`rotate(-90 ${px / 2} ${px / 2})`}
        />
      </svg>
    </span>
  )
}

/* ── LoadingOverlay — tela toda bloqueada ─────────────────────── */
export function LoadingOverlay({ label = 'Carregando...' }: { label?: string }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        backgroundColor: 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(2px)',
      }}
      aria-live="polite"
    >
      <Spinner size="lg" />
      <span style={{ fontSize: '13px', fontFamily: 'DM Sans, sans-serif', color: 'var(--text-secondary)' }}>
        {label}
      </span>
    </div>
  )
}

/* ── InlineLoader — skeleton de linha ─────────────────────────── */
export function InlineLoader({ width = '100%', height = 16 }: { width?: string | number; height?: number }) {
  return (
    <span
      style={{
        display: 'block',
        width,
        height,
        borderRadius: '6px',
        backgroundColor: 'var(--surface-tertiary)',
        background: 'linear-gradient(90deg, var(--surface-tertiary) 25%, var(--surface-secondary) 50%, var(--surface-tertiary) 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.4s ease-in-out infinite',
      }}
    >
      <style>{`@keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }`}</style>
    </span>
  )
}
