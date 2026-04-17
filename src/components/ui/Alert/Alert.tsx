import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full p-[16px] rounded-r-md border-l-[3px]',
  {
    variants: {
      variant: {
        info: 'bg-[rgba(26,136,255,0.08)] border-l-[#1A88FF]',
        success: 'bg-[rgba(7,198,195,0.08)] border-l-[#07C6C3]',
        warning: 'bg-[rgba(255,87,0,0.08)] border-l-[#FF5700]',
        danger: 'bg-[rgba(226,75,74,0.08)] border-l-[#E24B4A]',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
)

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string
}

function Alert({ className, variant, title, children, ...props }: AlertProps) {
  return (
    <div className={cn(alertVariants({ variant }), className)} {...props}>
      {title && (
        <p className="font-sans text-[13px] font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{title}</p>
      )}
      {children && (
        <p className="font-sans text-[13px] font-normal" style={{ color: 'var(--text-secondary)' }}>{children}</p>
      )}
    </div>
  )
}

export { Alert, alertVariants }
