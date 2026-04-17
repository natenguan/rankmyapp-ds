import { useEffect } from 'react'
import { X } from 'lucide-react'

export type SheetSide = 'right' | 'left' | 'bottom'

export interface SheetProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  side?: SheetSide
  width?: string   // for right/left
  height?: string  // for bottom
}

export function Sheet({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  side = 'right',
  width = '400px',
  height = '60vh',
}: SheetProps) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  const isHorizontal = side === 'right' || side === 'left'

  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: 200,
    backgroundColor: 'var(--surface-primary)',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: side === 'right'
      ? '-4px 0 24px rgba(0,0,0,0.12)'
      : side === 'left'
        ? '4px 0 24px rgba(0,0,0,0.12)'
        : '0 -4px 24px rgba(0,0,0,0.12)',
    ...(side === 'right'  ? { top: 0, right: 0, bottom: 0, width } : {}),
    ...(side === 'left'   ? { top: 0, left: 0,  bottom: 0, width } : {}),
    ...(side === 'bottom' ? { bottom: 0, left: 0, right: 0, height, borderTopLeftRadius: '16px', borderTopRightRadius: '16px' } : {}),
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 199 }}>
      {/* Backdrop */}
      <div
        style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)' }}
        onClick={onClose}
      />

      {/* Panel */}
      <div style={panelStyle} role="dialog" aria-modal="true">
        {/* Handle (bottom sheet) */}
        {side === 'bottom' && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
            <div style={{ width: '36px', height: '4px', borderRadius: '2px', backgroundColor: 'var(--border-emphasis)' }} />
          </div>
        )}

        {/* Header */}
        {(title || description) && (
          <div style={{
            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
            padding: '20px 20px 16px',
            borderBottom: '0.5px solid var(--border-default)',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingRight: '16px' }}>
              {title && <h2 style={{ margin: 0, fontSize: '18px', fontFamily: 'Nunito, sans-serif', fontWeight: 600, color: 'var(--text-primary)' }}>{title}</h2>}
              {description && <p style={{ margin: 0, fontSize: '13px', fontFamily: 'DM Sans, sans-serif', color: 'var(--text-secondary)' }}>{description}</p>}
            </div>
            <button
              onClick={onClose}
              style={{ display: 'flex', background: 'none', border: 'none', cursor: 'pointer', padding: '2px', borderRadius: '6px', color: 'var(--text-secondary)', flexShrink: 0 }}
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{
            flexShrink: 0, padding: '16px 20px',
            borderTop: '0.5px solid var(--border-default)',
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px',
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
