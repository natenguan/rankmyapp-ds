import { useState, useEffect, useCallback, createContext, useContext, useRef } from 'react'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'

/* ── Types ──────────────────────────────────────────────────────── */

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export interface ToastItem {
  id: string
  variant: ToastVariant
  title: string
  description?: string
  duration?: number  // ms, 0 = persist
}

/* ── Visual config ──────────────────────────────────────────────── */

const variantConfig: Record<ToastVariant, { icon: React.ReactNode; accent: string }> = {
  success: { icon: <CheckCircle size={16} />, accent: '#07C6C3' },
  error:   { icon: <AlertCircle size={16} />, accent: '#E24B4A' },
  warning: { icon: <AlertTriangle size={16} />, accent: '#FF5700' },
  info:    { icon: <Info size={16} />, accent: '#1A88FF' },
}

/* ── Single Toast ───────────────────────────────────────────────── */

interface ToastCardProps extends ToastItem {
  onDismiss: (id: string) => void
}

function ToastCard({ id, variant, title, description, duration = 4000, onDismiss }: ToastCardProps) {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // mount animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 16)
    return () => clearTimeout(t)
  }, [])

  // auto-dismiss
  useEffect(() => {
    if (duration === 0) return
    timerRef.current = setTimeout(() => dismiss(), duration)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [duration])

  function dismiss() {
    setVisible(false)
    setTimeout(() => onDismiss(id), 250)
  }

  const { icon, accent } = variantConfig[variant]

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        minWidth: '300px',
        maxWidth: '420px',
        padding: '12px 14px',
        backgroundColor: 'var(--surface-primary)',
        border: '0.5px solid var(--border-default)',
        borderLeft: `3px solid ${accent}`,
        borderRadius: '10px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
        transform: visible ? 'translateX(0)' : 'translateX(24px)',
        opacity: visible ? 1 : 0,
        transition: 'transform 250ms ease, opacity 250ms ease',
        pointerEvents: 'all',
      }}
    >
      {/* Icon */}
      <span style={{ color: accent, flexShrink: 0, marginTop: description ? '1px' : '0' }}>
        {icon}
      </span>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          margin: 0,
          fontSize: '13px',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 500,
          color: 'var(--text-primary)',
          lineHeight: 1.4,
        }}>
          {title}
        </p>
        {description && (
          <p style={{
            margin: '2px 0 0',
            fontSize: '12px',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 400,
            color: 'var(--text-secondary)',
            lineHeight: 1.4,
          }}>
            {description}
          </p>
        )}
      </div>

      {/* Close */}
      <button
        onClick={dismiss}
        aria-label="Fechar"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '20px', height: '20px', flexShrink: 0,
          background: 'none', border: 'none', cursor: 'pointer',
          borderRadius: '4px', color: 'var(--text-secondary)',
          marginTop: '-2px',
        }}
      >
        <X size={13} />
      </button>
    </div>
  )
}

/* ── ToastContainer — renderiza a pilha ────────────────────────── */

export function ToastContainer({ toasts, onDismiss }: {
  toasts: ToastItem[]
  onDismiss: (id: string) => void
}) {
  if (toasts.length === 0) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        pointerEvents: 'none',
      }}
      aria-label="Notificações"
    >
      {toasts.map(t => (
        <ToastCard key={t.id} {...t} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

/* ── useToast hook ──────────────────────────────────────────────── */

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const toast = useCallback((item: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { ...item, id }])
    return id
  }, [])

  return { toasts, toast, dismiss }
}

/* ── Context (optional, for app-level use) ──────────────────────── */

interface ToastContextValue {
  toast: (item: Omit<ToastItem, 'id'>) => string
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toasts, toast, dismiss } = useToast()

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}

export function useToastContext() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToastContext must be used inside <ToastProvider>')
  return ctx
}
