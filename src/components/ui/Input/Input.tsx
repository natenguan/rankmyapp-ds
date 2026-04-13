import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, hint, error, ...props }, ref) => {
    const isSearch = type === 'search'

    return (
      <div className="flex flex-col gap-[5px]">
        {label && (
          <label className="font-sans text-[13px] font-medium text-primary-ds">
            {label}
          </label>
        )}

        <div className="relative">
          {isSearch && (
            <Search
              className="absolute left-[10px] top-1/2 -translate-y-1/2 text-secondary-ds pointer-events-none"
              size={15}
            />
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              'h-9 w-full rounded-md border font-sans text-[14px] text-primary-ds bg-[var(--surface-primary)]',
              'px-3 py-2 transition-all duration-150',
              'placeholder:text-[var(--text-secondary)]',
              'border-[var(--border-emphasis)]',
              'focus:outline-none focus:border-[#1A88FF] focus:shadow-[0_0_0_3px_rgba(26,136,255,0.15)]',
              'disabled:opacity-40 disabled:pointer-events-none',
              error && 'border-[#E24B4A] focus:border-[#E24B4A] focus:shadow-[0_0_0_3px_rgba(226,75,74,0.12)]',
              isSearch && 'pl-9',
              className
            )}
            {...props}
          />
        </div>

        {error && (
          <span className="font-sans text-[12px] text-[#E24B4A]">{error}</span>
        )}
        {hint && !error && (
          <span className="font-sans text-[12px] text-secondary-ds">{hint}</span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
