import { forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, error, rows = 4, id: idProp, ...props }, ref) => {
    const generatedId = useId()
    const id = idProp ?? generatedId

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {label && (
          <label
            htmlFor={id}
            style={{
              fontSize: '13px',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 500,
              color: 'var(--text-primary)',
            }}
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={id}
          rows={rows}
          className={cn(
            'w-full rounded-md border font-sans text-[14px] bg-[var(--surface-primary)]',
            'transition-all duration-150 resize-y',
            'placeholder:text-[var(--text-secondary)]',
            'border-[var(--border-emphasis)]',
            'focus:outline-none focus:border-[#1A88FF] focus:shadow-[0_0_0_3px_rgba(26,136,255,0.15)]',
            'disabled:opacity-40 disabled:pointer-events-none disabled:resize-none',
            error && 'border-[#E24B4A] focus:border-[#E24B4A] focus:shadow-[0_0_0_3px_rgba(226,75,74,0.12)]',
            className
          )}
          style={{ color: 'var(--text-primary)', padding: '8px 12px' }}
          {...props}
        />

        {error && (
          <span
            style={{
              fontSize: '12px',
              fontFamily: 'DM Sans, sans-serif',
              color: '#E24B4A',
            }}
          >
            {error}
          </span>
        )}
        {hint && !error && (
          <span
            style={{
              fontSize: '12px',
              fontFamily: 'DM Sans, sans-serif',
              color: 'var(--text-secondary)',
            }}
          >
            {hint}
          </span>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
