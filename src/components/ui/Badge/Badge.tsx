import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center font-sans font-medium rounded-full px-[10px] py-[3px] text-[12px]',
  {
    variants: {
      variant: {
        blue: 'bg-[rgba(26,136,255,0.12)] text-[#0050E5]',
        green: 'bg-[rgba(7,198,195,0.12)] text-[#00A3A0]',
        orange: 'bg-[rgba(255,87,0,0.12)] text-[#CC4500]',
        red: 'bg-[rgba(226,75,74,0.12)] text-[#A32D2D]',
        purple: 'bg-[rgba(130,67,255,0.12)] text-[#6B2FCC]',
        gray: 'bg-[rgba(107,114,128,0.12)] text-[#4B5563]',
      },
    },
    defaultVariants: {
      variant: 'blue',
    },
  }
)

export type KeywordStatus = 'growing' | 'stable' | 'dropping' | 'critical'

const keywordStatusMap: Record<KeywordStatus, VariantProps<typeof badgeVariants>['variant']> = {
  growing: 'blue',
  stable: 'green',
  dropping: 'orange',
  critical: 'red',
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  status?: KeywordStatus
}

function Badge({ className, variant, status, children, ...props }: BadgeProps) {
  const resolvedVariant = status ? keywordStatusMap[status] : variant
  return (
    <span className={cn(badgeVariants({ variant: resolvedVariant }), className)} {...props}>
      {children}
    </span>
  )
}

export { Badge, badgeVariants }
