export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const paddingMap = { sm: '32px 24px', md: '48px 32px', lg: '64px 40px' }
const iconSizeMap = { sm: 36, md: 48, lg: 56 }
const titleSizeMap = { sm: '14px', md: '16px', lg: '18px' }

export function EmptyState({ icon, title, description, action, size = 'md' }: EmptyStateProps) {
  const iconPx = iconSizeMap[size]

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: paddingMap[size],
        gap: '12px',
      }}
    >
      {icon && (
        <div
          style={{
            width: `${iconPx}px`,
            height: `${iconPx}px`,
            borderRadius: '50%',
            backgroundColor: 'var(--surface-tertiary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            marginBottom: '4px',
          }}
        >
          {icon}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '320px' }}>
        <p
          style={{
            margin: 0,
            fontSize: titleSizeMap[size],
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 600,
            color: 'var(--text-primary)',
            lineHeight: 1.4,
          }}
        >
          {title}
        </p>
        {description && (
          <p
            style={{
              margin: 0,
              fontSize: '13px',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
            }}
          >
            {description}
          </p>
        )}
      </div>

      {action && <div style={{ marginTop: '4px' }}>{action}</div>}
    </div>
  )
}
