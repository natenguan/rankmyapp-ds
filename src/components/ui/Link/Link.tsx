import { ExternalLink } from 'lucide-react'

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean
  variant?: 'default' | 'subtle' | 'danger'
  size?: 'sm' | 'md'
}

const colorMap = {
  default: { idle: '#1A88FF', hover: '#0050E5' },
  subtle:  { idle: 'var(--text-secondary)', hover: 'var(--text-primary)' },
  danger:  { idle: '#E24B4A', hover: '#b83332' },
}

export function Link({
  children,
  external = false,
  variant = 'default',
  size = 'md',
  style,
  ...props
}: LinkProps) {
  const colors = colorMap[variant]
  const fontSize = size === 'sm' ? '12px' : '13px'

  return (
    <a
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize,
        fontFamily: 'DM Sans, sans-serif',
        fontWeight: 400,
        color: colors.idle,
        textDecoration: 'underline',
        textDecorationColor: 'transparent',
        textUnderlineOffset: '3px',
        transition: 'color 120ms, text-decoration-color 120ms',
        cursor: 'pointer',
        ...style,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.color = colors.hover
        ;(e.currentTarget as HTMLElement).style.textDecorationColor = colors.hover
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.color = colors.idle
        ;(e.currentTarget as HTMLElement).style.textDecorationColor = 'transparent'
      }}
      {...props}
    >
      {children}
      {external && <ExternalLink size={size === 'sm' ? 11 : 12} style={{ flexShrink: 0 }} />}
    </a>
  )
}
