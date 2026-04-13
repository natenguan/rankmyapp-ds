import { cn } from '@/lib/utils'

type RankingTier = 'top10' | 'top20' | 'top30' | 'top40' | 'top50'

const tierColorMap: Record<RankingTier, string> = {
  top10: '#1A88FF',
  top20: '#00A3FF',
  top30: '#8243FF',
  top40: '#FF5700',
  top50: '#FF0167',
}

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  tier?: RankingTier
  label?: string
  showValue?: boolean
  color?: string
}

function ProgressBar({
  className,
  value,
  max = 100,
  tier,
  label,
  showValue = true,
  color,
  ...props
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const fillColor = color ?? (tier ? tierColorMap[tier] : tierColorMap.top10)

  return (
    <div className={cn('flex items-center gap-3', className)} {...props}>
      {label && (
        <span className="font-sans text-[12px] text-primary-ds min-w-[60px] truncate">
          {label}
        </span>
      )}

      <div className="flex-1 h-[6px] rounded-full bg-[var(--surface-secondary)] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${pct}%`, backgroundColor: fillColor }}
        />
      </div>

      {showValue && (
        <span className="font-sans text-[12px] text-secondary-ds min-w-[32px] text-right">
          {value}
        </span>
      )}
    </div>
  )
}

export { ProgressBar }
