import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export interface CopyButtonProps {
  value: string
  label?: string
  successLabel?: string
  size?: 'sm' | 'md'
  variant?: 'icon' | 'text' | 'full'
}

export function CopyButton({
  value,
  label = 'Copiar',
  successLabel = 'Copiado!',
  size = 'md',
  variant = 'full',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback for older browsers
      const el = document.createElement('textarea')
      el.value = value
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const iconSize = size === 'sm' ? 13 : 15
  const height = size === 'sm' ? '28px' : '32px'
  const fontSize = '13px'

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    height,
    padding: variant === 'icon' ? '0' : `0 ${size === 'sm' ? '10px' : '12px'}`,
    width: variant === 'icon' ? height : undefined,
    fontSize,
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: 500,
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 120ms, color 120ms',
    backgroundColor: copied ? 'rgba(7,198,195,0.12)' : 'var(--surface-secondary)',
    color: copied ? '#07C6C3' : 'var(--text-secondary)',
    flexShrink: 0,
  }

  return (
    <button
      onClick={handleCopy}
      style={baseStyle}
      aria-label={copied ? successLabel : label}
      title={copied ? successLabel : label}
    >
      {copied
        ? <Check size={iconSize} strokeWidth={2.5} />
        : <Copy size={iconSize} />
      }
      {variant !== 'icon' && (
        <span>{copied ? successLabel : label}</span>
      )}
    </button>
  )
}

/* ── CopyField — input com botão embutido ─────────────────── */

export function CopyField({ value, label }: { value: string; label?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      {label && (
        <span style={{ fontSize: '13px', fontFamily: 'DM Sans', fontWeight: 500, color: 'var(--text-primary)' }}>
          {label}
        </span>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '36px',
          border: '1px solid var(--border-emphasis)',
          borderRadius: '8px',
          backgroundColor: 'var(--surface-secondary)',
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            flex: 1,
            padding: '0 12px',
            fontSize: '13px',
            fontFamily: 'DM Sans, sans-serif',
            color: 'var(--text-primary)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            userSelect: 'all',
          }}
        >
          {value}
        </span>
        <div style={{ borderLeft: '0.5px solid var(--border-default)', height: '100%', display: 'flex', alignItems: 'center', padding: '0 6px' }}>
          <CopyButton value={value} variant="icon" size="sm" />
        </div>
      </div>
    </div>
  )
}
