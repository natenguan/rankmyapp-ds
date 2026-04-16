export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface AvatarProps {
  src?: string
  name?: string          // used for initials fallback
  size?: AvatarSize
  status?: 'online' | 'offline' | 'away' | 'busy'
  shape?: 'circle' | 'rounded'
}

const sizeMap: Record<AvatarSize, { box: number; font: number; dot: number }> = {
  xs: { box: 24, font: 10, dot: 6  },
  sm: { box: 32, font: 12, dot: 8  },
  md: { box: 40, font: 14, dot: 10 },
  lg: { box: 48, font: 16, dot: 12 },
  xl: { box: 64, font: 20, dot: 14 },
}

const statusColor: Record<string, string> = {
  online:  '#07C6C3',
  offline: 'var(--text-secondary)',
  away:    '#FF5700',
  busy:    '#E24B4A',
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function stringToColor(str: string): string {
  const palette = ['#1A88FF', '#07C6C3', '#8243FF', '#FF5700', '#FF0167', '#0050E5']
  let hash = 0
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
  return palette[Math.abs(hash) % palette.length]
}

export function Avatar({ src, name = '', size = 'md', status, shape = 'circle' }: AvatarProps) {
  const { box, font, dot } = sizeMap[size]
  const radius = shape === 'circle' ? '50%' : `${Math.round(box * 0.22)}px`
  const bg = stringToColor(name || 'default')
  const initials = name ? getInitials(name) : '?'

  return (
    <div style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
      <div
        style={{
          width: `${box}px`,
          height: `${box}px`,
          borderRadius: radius,
          backgroundColor: src ? 'var(--surface-tertiary)' : bg,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
        aria-label={name || 'Avatar'}
      >
        {src ? (
          <img
            src={src}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span
            style={{
              fontSize: `${font}px`,
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 600,
              color: '#fff',
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            {initials}
          </span>
        )}
      </div>

      {status && (
        <span
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: `${dot}px`,
            height: `${dot}px`,
            borderRadius: '50%',
            backgroundColor: statusColor[status],
            border: `2px solid var(--surface-primary)`,
          }}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  )
}

/* ── AvatarGroup ──────────────────────────────────────────── */

export interface AvatarGroupProps {
  avatars: Array<{ src?: string; name: string }>
  max?: number
  size?: AvatarSize
}

export function AvatarGroup({ avatars, max = 4, size = 'sm' }: AvatarGroupProps) {
  const { box } = sizeMap[size]
  const visible = avatars.slice(0, max)
  const overflow = avatars.length - max
  const overlap = Math.round(box * 0.3)

  return (
    <div
      style={{ display: 'flex', alignItems: 'center' }}
      role="group"
      aria-label={`${avatars.length} membros`}
    >
      {visible.map((a, i) => (
        <div
          key={i}
          style={{
            marginLeft: i === 0 ? 0 : `-${overlap}px`,
            zIndex: visible.length - i,
            position: 'relative',
            border: '2px solid var(--surface-primary)',
            borderRadius: '50%',
          }}
        >
          <Avatar src={a.src} name={a.name} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          style={{
            marginLeft: `-${overlap}px`,
            zIndex: 0,
            position: 'relative',
            width: `${box}px`,
            height: `${box}px`,
            borderRadius: '50%',
            backgroundColor: 'var(--surface-tertiary)',
            border: '2px solid var(--surface-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: `${Math.round(box * 0.28)}px`, fontFamily: 'DM Sans', fontWeight: 600, color: 'var(--text-secondary)' }}>
            +{overflow}
          </span>
        </div>
      )}
    </div>
  )
}
