import { useEffect } from 'react'
import { X } from 'lucide-react'

export interface ModalDialogProps {
  onClose: () => void
  title?: string
  description?: string
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'danger'
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
}

export interface ModalProps extends ModalDialogProps {
  open: boolean
}

const sizeMap = {
  sm: 480,
  md: 560,
  lg: 720,
}

/* ── ModalDialog — caixa interna reutilizável ───────────────── */

export function ModalDialog({
  onClose,
  title,
  description,
  children,
  size = 'md',
  variant = 'default',
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
}: ModalDialogProps) {
  const confirmStyle: React.CSSProperties =
    variant === 'danger'
      ? {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '32px',
          padding: '0 12px',
          fontSize: '13px',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 500,
          borderRadius: '6px',
          cursor: 'pointer',
          border: '1.5px solid #E24B4A',
          background: 'transparent',
          color: '#E24B4A',
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }
      : {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '32px',
          padding: '0 12px',
          fontSize: '13px',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 500,
          borderRadius: '6px',
          cursor: 'pointer',
          border: 'none',
          background: '#1A88FF',
          color: '#ffffff',
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }

  const cancelStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '32px',
    padding: '0 12px',
    fontSize: '13px',
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: 500,
    borderRadius: '6px',
    cursor: 'pointer',
    border: '0.5px solid var(--border-emphasis)',
    background: 'transparent',
    color: 'var(--text-primary)',
    flexShrink: 0,
    whiteSpace: 'nowrap',
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: `${sizeMap[size]}px`,
        boxSizing: 'border-box',
        backgroundColor: 'var(--surface-primary, #ffffff)',
        borderRadius: '16px',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        border: '0.5px solid var(--border-default)',
        overflow: 'hidden',
      }}
      role="dialog"
      aria-modal="true"
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '24px 24px 16px 24px',
          borderBottom: '0.5px solid var(--border-default)',
          boxSizing: 'border-box',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            paddingRight: '16px',
            minWidth: 0,
            flex: 1,
          }}
        >
          {title && (
            <h2
              style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: 600,
                fontFamily: 'Nunito, sans-serif',
                color: 'var(--text-primary)',
                lineHeight: 1.4,
              }}
            >
              {title}
            </h2>
          )}
          {description && (
            <p
              style={{
                margin: 0,
                fontSize: '13px',
                fontFamily: 'DM Sans, sans-serif',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
              }}
            >
              {description}
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          aria-label="Fechar"
          style={{
            padding: '4px',
            flexShrink: 0,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={18} style={{ color: 'var(--text-secondary)', display: 'block' }} />
        </button>
      </div>

      {/* Body */}
      {children && (
        <div
          style={{
            padding: '20px 24px',
            fontSize: '13px',
            fontFamily: 'DM Sans, sans-serif',
            color: 'var(--text-primary)',
            boxSizing: 'border-box',
            width: '100%',
          }}
        >
          {children}
        </div>
      )}

      {/* Footer */}
      {onConfirm && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px',
            padding: '16px 24px',
            borderTop: '0.5px solid var(--border-default)',
            boxSizing: 'border-box',
            width: '100%',
          }}
        >
          <button style={cancelStyle} onClick={onClose}>
            {cancelLabel}
          </button>
          <button style={confirmStyle} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      )}
    </div>
  )
}

/* ── Modal — overlay completo ───────────────────────────────── */

function Modal({ open, onClose, ...props }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
      }}
    >
      <div
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }}
        onClick={onClose}
      />
      <div
        style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ModalDialog onClose={onClose} {...props} />
      </div>
    </div>
  )
}

export { Modal }
