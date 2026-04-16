import React, { useState } from 'react'
import { ArrowUpRight, Trash2 } from 'lucide-react'
import { Badge } from '../Badge/Badge'
import { IconButton } from '../IconButton/IconButton'
import { Skeleton } from '../Skeleton/Skeleton'

export interface AppItemCardProps {
  appName: string
  developer: string
  category: string
  store: 'apple' | 'google' | 'both'
  iconUrl?: string
  isActive?: boolean
  loading?: boolean
  onSelect?: () => void
  onDelete?: () => void
  onExpand?: () => void
}

function AppIcon({ iconUrl, appName }: { iconUrl?: string; appName: string }) {
  const initials = appName
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()

  if (iconUrl) {
    return (
      <img
        src={iconUrl}
        alt={appName}
        style={{
          width: 40, height: 40,
          borderRadius: 10,
          objectFit: 'cover',
          flexShrink: 0,
        }}
      />
    )
  }

  return (
    <div style={{
      width: 40, height: 40,
      borderRadius: 10,
      background: 'rgba(26,136,255,0.12)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
      color: '#1A88FF',
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 14,
      fontWeight: 500,
    }}>
      {initials}
    </div>
  )
}

function StoreBadges({ store }: { store: AppItemCardProps['store'] }) {
  return (
    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
      {(store === 'apple' || store === 'both') && (
        <Badge variant="purple">Apple Store</Badge>
      )}
      {(store === 'google' || store === 'both') && (
        <Badge variant="gray">Play Store</Badge>
      )}
    </div>
  )
}

export function AppItemCard({
  appName,
  developer,
  category,
  store,
  iconUrl,
  isActive = false,
  loading = false,
  onSelect,
  onDelete,
  onExpand,
}: AppItemCardProps) {
  const [hovered, setHovered] = useState(false)

  if (loading) {
    return (
      <div style={{
        background: 'var(--surface-primary)',
        border: '0.5px solid var(--border-default)',
        borderRadius: 12,
        padding: 16,
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
      }}>
        <Skeleton width={40} height={40} borderRadius={10} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Skeleton width={192} height={16} />
          <Skeleton width={128} height={12} />
          <Skeleton width={80} height={20} borderRadius={99} />
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: isActive
          ? 'rgba(26,136,255,0.03)'
          : hovered ? 'var(--surface-secondary)' : 'var(--surface-primary)',
        border: isActive
          ? '1.5px solid #1A88FF'
          : hovered
          ? '0.5px solid var(--border-emphasis)'
          : '0.5px solid var(--border-default)',
        borderRadius: 12,
        padding: 16,
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
        cursor: onSelect ? 'pointer' : 'default',
        transition: 'background 120ms, border-color 120ms',
        position: 'relative',
      }}
    >
      <AppIcon iconUrl={iconUrl} appName={appName} />

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 15,
          fontWeight: 500,
          color: 'var(--text-primary)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {appName}
        </span>
        <span style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 13,
          color: 'var(--text-secondary)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {developer}
        </span>
        <span style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 12,
          color: 'var(--text-secondary)',
        }}>
          {category}
        </span>
        <StoreBadges store={store} />
      </div>

      {/* Actions — always visible on mobile, visible on hover on desktop */}
      <div style={{
        display: 'flex',
        gap: 4,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 120ms',
        flexShrink: 0,
      }}>
        {onExpand && (
          <IconButton
            icon={<ArrowUpRight size={14} />}
            label="Expandir"
            size="sm"
            onClick={e => { e.stopPropagation(); onExpand() }}
          />
        )}
        {onDelete && (
          <IconButton
            icon={<Trash2 size={14} />}
            label="Deletar"
            size="sm"
            danger
            onClick={e => { e.stopPropagation(); onDelete() }}
          />
        )}
      </div>
    </div>
  )
}
