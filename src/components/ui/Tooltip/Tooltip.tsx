import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'

export interface TooltipProps {
  content: React.ReactNode
  children: React.ReactElement
  side?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

const sideStyles: Record<NonNullable<TooltipProps['side']>, { tooltip: string; arrow: string; arrowStyle: React.CSSProperties }> = {
  top: {
    tooltip: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    arrow: 'top-full left-1/2 -translate-x-1/2',
    arrowStyle: { borderTop: '5px solid var(--surface-secondary)', borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderBottom: 0 },
  },
  bottom: {
    tooltip: 'top-full left-1/2 -translate-x-1/2 mt-2',
    arrow: 'bottom-full left-1/2 -translate-x-1/2',
    arrowStyle: { borderBottom: '5px solid var(--surface-secondary)', borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: 0 },
  },
  left: {
    tooltip: 'right-full top-1/2 -translate-y-1/2 mr-2',
    arrow: 'left-full top-1/2 -translate-y-1/2',
    arrowStyle: { borderLeft: '5px solid var(--surface-secondary)', borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderRight: 0 },
  },
  right: {
    tooltip: 'left-full top-1/2 -translate-y-1/2 ml-2',
    arrow: 'right-full top-1/2 -translate-y-1/2',
    arrowStyle: { borderRight: '5px solid var(--surface-secondary)', borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: 0 },
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
          <span className={cn('absolute w-0 h-0 border-solid', styles.arrow)} style={styles.arrowStyle} />

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
