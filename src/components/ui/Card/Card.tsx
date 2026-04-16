import { cn } from '@/lib/utils'

/* ── Standard Card ─────────────────────────────────────────── */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean
}

function Card({ className, selected, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'surface-primary rounded-lg p-5 transition-colors duration-150',
        'border border-[0.5px] border-[var(--border-default)]',
        'hover:surface-secondary',
        selected && 'border-[1.5px] border-[#1A88FF]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/* ── Metric Card ────────────────────────────────────────────── */

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string | number
  delta?: number
  deltaLabel?: string
}

function MetricCard({ className, label, value, delta, deltaLabel, ...props }: MetricCardProps) {
  const isPositive = delta !== undefined && delta > 0
  const isNegative = delta !== undefined && delta < 0
  const isNeutral = delta !== undefined && delta === 0

  return (
    <div
      className={cn(
        'surface-secondary rounded-md p-4 flex flex-col gap-2',
        className
      )}
      {...props}
    >
      <span className="font-sans text-[12px] text-secondary-ds">{label}</span>
      <span className="font-sans text-[24px] font-medium text-primary-ds leading-tight">{value}</span>
      {delta !== undefined && (
        <span
          className={cn(
            'font-sans text-[12px] font-medium',
            isPositive && 'text-[#0F6E56]',
            isNegative && 'text-[#A32D2D]',
            isNeutral && 'text-secondary-ds'
          )}
        >
          {isPositive && '▲ '}
          {isNegative && '▼ '}
          {isNeutral && '— '}
          {deltaLabel ?? (delta > 0 ? `+${delta}` : delta)}
        </span>
      )}
    </div>
  )
}

/* ── Card sub-elements ──────────────────────────────────────── */

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-[16px]', className)} {...props} />
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('font-display text-[18px] font-medium text-primary-ds leading-snug', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('', className)} {...props} />
}

export { Card, MetricCard, CardHeader, CardTitle, CardContent }
