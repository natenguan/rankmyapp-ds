import React from 'react'

export type SortDirection = 'asc' | 'desc' | 'none'

export interface SortableColumnHeaderProps {
  label: string
  sortDirection?: SortDirection
  onSort?: () => void
  align?: 'left' | 'right' | 'center'
  disabled?: boolean
}

function SortIcon({ direction }: { direction: SortDirection }) {
  const base: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    marginLeft: '6px',
    flexShrink: 0,
  }

  const upColor = direction === 'asc' ? 'var(--text-primary)' : 'var(--border-emphasis)'
  const downColor = direction === 'desc' ? 'var(--text-primary)' : 'var(--border-emphasis)'

  return (
    <span style={base} aria-hidden>
      <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
        <path d="M4 0L7.4641 4.5H0.535898L4 0Z" fill={upColor} />
      </svg>
      <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
        <path d="M4 5L0.535898 0.5H7.4641L4 5Z" fill={downColor} />
      </svg>
    </span>
  )
}

export function SortableColumnHeader({
  label,
  sortDirection = 'none',
  onSort,
  align = 'left',
  disabled = false,
}: SortableColumnHeaderProps) {
  const isActive = sortDirection !== 'none'

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start',
    gap: '0px',
    cursor: disabled ? 'default' : 'pointer',
    userSelect: 'none',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
    background: 'none',
    border: 'none',
    padding: 0,
    transition: 'color 0.15s',
    width: '100%',
  }

  return (
    <button
      style={style}
      onClick={disabled ? undefined : onSort}
      aria-sort={
        sortDirection === 'asc'
          ? 'ascending'
          : sortDirection === 'desc'
          ? 'descending'
          : 'none'
      }
      disabled={disabled}
    >
      {label}
      {!disabled && <SortIcon direction={sortDirection} />}
    </button>
  )
}
