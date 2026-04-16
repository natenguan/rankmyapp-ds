import React from 'react'

export type DividerOrientation = 'horizontal' | 'vertical'
export type DividerVariant = 'solid' | 'dashed' | 'dotted'

export interface DividerProps {
  orientation?: DividerOrientation
  variant?: DividerVariant
  label?: string
  spacing?: number
  color?: string
}

export function Divider({
  orientation = 'horizontal',
  variant = 'solid',
  label,
  spacing = 16,
  color = 'var(--border-default)',
}: DividerProps) {
  const borderStyle = `0.5px ${variant} ${color}`

  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        style={{
          display: 'inline-block',
          alignSelf: 'stretch',
          width: '1px',
          borderLeft: borderStyle,
          margin: `0 ${spacing}px`,
          flexShrink: 0,
        }}
      />
    )
  }

  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          margin: `${spacing}px 0`,
        }}
      >
        <div style={{ flex: 1, borderTop: borderStyle }} />
        <span style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          {label}
        </span>
        <div style={{ flex: 1, borderTop: borderStyle }} />
      </div>
    )
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      style={{
        borderTop: borderStyle,
        margin: `${spacing}px 0`,
      }}
    />
  )
}
