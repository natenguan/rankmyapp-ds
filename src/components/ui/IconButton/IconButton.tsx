import { forwardRef } from 'react'

export type IconButtonVariant = 'ghost' | 'outline' | 'filled'
export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg'

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  variant?: IconButtonVariant
  size?: IconButtonSize
  label: string        // required for a11y
  active?: boolean
  danger?: boolean
}

const sizeMap: Record<IconButtonSize, { box: number; radius: number }> = {
  xs: { box: 24, radius: 5 },
  sm: { box: 28, radius: 6 },
  md: { box: 32, radius: 7 },
  lg: { box: 36, radius: 8 },
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, variant = 'ghost', size = 'md', label, active = false, danger = false, disabled, style, ...props }, ref) => {
    const { box, radius } = sizeMap[size]

    const getColors = () => {
      if (danger) {
        return {
          bg: active ? 'rgba(226,75,74,0.10)' : 'transparent',
          color: '#E24B4A',
          border: variant === 'outline' ? '0.5px solid rgba(226,75,74,0.4)' : 'none',
          hoverBg: 'rgba(226,75,74,0.10)',
        }
      }
      if (active) {
        return {
          bg: variant === 'filled' ? '#1A88FF' : 'rgba(26,136,255,0.10)',
          color: variant === 'filled' ? '#fff' : '#1A88FF',
          border: variant === 'outline' ? '0.5px solid #1A88FF' : 'none',
          hoverBg: variant === 'filled' ? '#0050E5' : 'rgba(26,136,255,0.15)',
        }
      }
      return {
        bg: variant === 'filled' ? 'var(--surface-secondary)' : 'transparent',
        color: 'var(--text-secondary)',
        border: variant === 'outline' ? '0.5px solid var(--border-emphasis)' : 'none',
        hoverBg: 'var(--surface-secondary)',
      }
    }

    const { bg, color, border, hoverBg } = getColors()

    return (
      <button
        ref={ref}
        aria-label={label}
        disabled={disabled}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: `${box}px`,
          height: `${box}px`,
          flexShrink: 0,
          borderRadius: `${radius}px`,
          border: border || 'none',
          backgroundColor: bg,
          color,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.4 : 1,
          transition: 'background-color 120ms, color 120ms',
          outline: 'none',
          padding: 0,
          ...style,
        }}
        onMouseEnter={e => { if (!disabled) (e.currentTarget as HTMLElement).style.backgroundColor = hoverBg }}
        onMouseLeave={e => { if (!disabled) (e.currentTarget as HTMLElement).style.backgroundColor = bg }}
        {...props}
      >
        {icon}
      </button>
    )
  }
)

IconButton.displayName = 'IconButton'
