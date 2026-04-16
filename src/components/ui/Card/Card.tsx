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

export { Card, CardHeader, CardTitle, CardContent }
