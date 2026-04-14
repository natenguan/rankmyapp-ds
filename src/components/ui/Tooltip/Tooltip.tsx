import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'

export interface TooltipProps {
  content: React.ReactNode
  children: React.ReactElement
  side?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

const sideStyles: Record<NonNullable<TooltipProps['side']>, { tooltip: string; arrow: string }> = {
  top: {
    tooltip: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    arrow: 'top-full left-1/2 -translate-x-1/2 border-t-[var(--surface-secondary)] border-t-[5px] border-x-transparent border-x-[5px] border-b-0',
  },
  bottom: {
    tooltip: 'top-full left-1/2 -translate-x-1/2 mt-2',
    arrow: 'bottom-full left-1/2 -translate-x-1/2 border-b-[var(--surface-secondary)] border-b-[5px] border-x-transparent border-x-[5px] border-t-0',
  },
  left: {
    tooltip: 'right-full top-1/2 -translate-y-1/2 mr-2',
    arrow: 'left-full top-1/2 -translate-y-1/2 border-l-[var(--surface-secondary)] border-l-[5px] border-y-transparent border-y-[5px] border-r-0',
  },
  right: {
    tooltip: 'left-full top-1/2 -translate-y-1/2 ml-2',
    arrow: 'right-full top-1/2 -translate-y-1/2 border-r-[var(--surface-secondary)] border-r-[5px] border-y-transparent border-y-[5px] border-l-0',
  },
}

function Tooltip({ content, children, side = 'top', className }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = () => {
    timerRef.current = setTimeout(() => setVisible(true), 120)
  }

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setVisible(false)
  }

  const styles = sideStyles[side]

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}

      {visible && (
        <span
          className={cn(
            'absolute z-50 pointer-events-none',
            styles.tooltip,
            className
          )}
          role="tooltip"
        >
          {/* Arrow */}
          <span className={cn('absolute w-0 h-0 border-solid', styles.arrow)} />

          {/* Content */}
          <span
            className="block surface-secondary rounded-md px-3 py-[6px] font-sans text-[12px] font-medium whitespace-nowrap shadow-sm border border-[0.5px] border-[var(--border-default)]"
            style={{ color: 'var(--text-primary)' }}
          >
            {content}
          </span>
        </span>
      )}
    </span>
  )
}

export { Tooltip }
