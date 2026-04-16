import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../Button/Button'

export interface ModalProps {
  open: boolean
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

const sizeMap = {
  sm: '480px',
  md: '560px',
  lg: '720px',
}

/* ── ModalDialog — caixa interna reutilizável ───────────────── */

export interface ModalDialogProps extends Omit<ModalProps, 'open'> {
  onClose: () => void
}

export function ModalDialog({
  onClose,
  title,
  description,
  children,
  size = 'md',
  variant = 'default',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
}: ModalDialogProps) {
  return (
    <div
      className={cn(
        'surface-primary rounded-xl shadow-xl flex flex-col',
        'border border-[0.5px] border-[var(--border-default)]',
      )}
      style={{ width: '100%', maxWidth: sizeMap[size], boxSizing: 'border-box' }}
      role="dialog"
      aria-modal="true"
    >
      {/* Header */}
      <div
        className="flex items-start justify-between border-b border-[0.5px] border-[var(--border-default)]"
        style={{ padding: '24px 24px 16px 24px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingRight: '16px', minWidth: 0 }}>
          {title && (
            <h2 className="font-display text-[18px] font-semibold" style={{ color: 'var(--text-primary)' }}>
              {title}
            </h2>
          )}
          {description && (
            <p className="font-sans text-[13px]" style={{ color: 'var(--text-secondary)' }}>
              {description}
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="rounded-md hover:surface-secondary transition-colors focus:outline-none"
          style={{ padding: '4px', flexShrink: 0 }}
        >
          <X size={18} style={{ color: 'var(--text-secondary)', display: 'block' }} />
        </button>
      </div>

      {/* Body */}
      {children && (
        <div className="font-sans text-[13px]" style={{ padding: '20px 24px', color: 'var(--text-primary)' }}>
          {children}
        </div>
      )}

      {/* Footer */}
      {onConfirm && (
        <div
          className="border-t border-[0.5px] border-[var(--border-default)]"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px',
            padding: '16px 24px',
            boxSizing: 'border-box',
          }}
        >
          <Button variant="ghost" size="sm" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'danger' ? 'destructive' : 'primary'}
            size="sm"
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      )}
    </div>
  )
}

/* ── Modal — overlay completo ───────────────────────────────── */

function Modal({ open, onClose, ...props }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
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
      <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <ModalDialog onClose={onClose} {...props} />
      </div>
    </div>
  )
}

export { Modal }
