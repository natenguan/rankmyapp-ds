import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-[8px] rounded-md font-sans font-medium transition-all duration-150 disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none',
  {
    variants: {
      variant: {
        primary:
          'bg-[#1A88FF] text-white hover:bg-[#0050E5] focus-visible:shadow-[0_0_0_3px_rgba(26,136,255,0.4)]',
        secondary:
          'bg-transparent border border-[1.5px] border-[#1A88FF] text-[#1A88FF] hover:bg-[rgba(26,136,255,0.08)] focus-visible:shadow-[0_0_0_3px_rgba(26,136,255,0.4)]',
        ghost:
          'bg-transparent border border-[0.5px] border-emphasis-ds text-primary-ds hover:surface-secondary focus-visible:shadow-[0_0_0_3px_rgba(26,136,255,0.4)]',
        destructive:
          'bg-transparent border border-[1.5px] border-[#E24B4A] text-[#E24B4A] hover:bg-[rgba(226,75,74,0.07)] focus-visible:shadow-[0_0_0_3px_rgba(226,75,74,0.3)]',
      },
      size: {
        sm: 'h-[32px] px-[12px] text-[13px]',
        md: 'h-[36px] px-[16px] text-[13px]',
        lg: 'h-[44px] px-[20px] text-[14px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-[16px] w-[16px]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
