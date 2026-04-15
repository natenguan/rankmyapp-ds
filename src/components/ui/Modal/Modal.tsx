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
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}

function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = 'md',
  variant = 'default',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
}: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        className={cn(
          'relative w-full surface-primary rounded-xl shadow-xl border border-[0.5px] border-[var(--border-default)] overflow-hidden',
          'flex flex-col mx-4',
          sizeMap[size]
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-[0.5px] border-[var(--border-default)]">
          <div className="flex flex-col gap-1 pr-4">
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
            className="p-1 rounded-md hover:surface-secondary transition-colors flex-shrink-0 focus:outline-none"
          >
            <X size={18} style={{ color: 'var(--text-secondary)' }} />
          </button>
        </div>

        {/* Body */}
        {children && (
          <div className="px-6 py-5 font-sans text-[13px]" style={{ color: 'var(--text-primary)' }}>
            {children}
          </div>
        )}

        {/* Footer */}
        {onConfirm && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[0.5px] border-[var(--border-default)]">
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
    </div>
  )
}

export { Modal }
