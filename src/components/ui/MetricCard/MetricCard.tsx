import React from 'react'
import { Skeleton } from '../Skeleton/Skeleton'

export interface MetricCardProps {
  label: string
  value: string | number
  delta?: string | number
  deltaLabel?: string
  deltaType?: 'positive' | 'negative' | 'neutral'
  variant?: 'default' | 'growing' | 'dropping' | 'stable'
  size?: 'sm' | 'md'
  loading?: boolean
  className?: string
}

const valueColors: Record<string, string> = {
  default:  'var(--text-primary)',
  growing:  '#1A88FF',
  dropping: '#E24B4A',
  stable:   'var(--text-primary)',
}

const deltaColors: Record<string, string> = {
  positive: '#0F6E56',
  negative: '#A32D2D',
  neutral:  'var(--text-secondary)',
}

const deltaIcons: Record<string, string> = {
  positive: '▲',
  negative: '▼',
  neutral:  '—',
}

export function MetricCard({
  label,
  value,
  delta,
  deltaLabel,
  deltaType,
  variant = 'default',
  size = 'md',
  loading = false,
  className,
}: MetricCardProps) {
  // Resolve display text: prefer deltaLabel, then stringify delta
  const deltaText = deltaLabel ?? (delta !== undefined ? String(delta) : undefined)

  // Auto-detect deltaType from numeric delta if not explicitly set
  const resolvedDeltaType: 'positive' | 'negative' | 'neutral' =
    deltaType ??
    (typeof delta === 'number'
      ? delta > 0 ? 'positive' : delta < 0 ? 'negative' : 'neutral'
      : 'neutral'
    )
  const valueFontSize = size === 'md' ? 22 : 18

  return (
    <div style={{
      background: 'var(--surface-secondary)',
      borderRadius: 8,
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {loading ? (
        <>
          <Skeleton width={80} height={12} />
          <div style={{ marginTop: 8 }}>
            <Skeleton width={48} height={size === 'md' ? 28 : 22} />
          </div>
          <div style={{ marginTop: 6 }}>
            <Skeleton width={96} height={12} />
          </div>
        </>
      ) : (
        <>
          {/* Label */}
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 12,
            fontWeight: 400,
            color: 'var(--text-secondary)',
            marginBottom: 4,
          }}>
            {label}
          </span>

          {/* Value */}
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: valueFontSize,
            fontWeight: 500,
            color: valueColors[variant],
            lineHeight: 1.2,
          }}>
            {value}
          </span>

          {/* Delta */}
          {deltaText !== undefined && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              marginTop: 4,
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 12,
              color: deltaColors[resolvedDeltaType],
            }}>
              <span style={{ fontSize: 10 }}>{deltaIcons[resolvedDeltaType]}</span>
              <span>{deltaText}</span>
            </div>
          )}
        </>
      )}
    </div>
  )
}
