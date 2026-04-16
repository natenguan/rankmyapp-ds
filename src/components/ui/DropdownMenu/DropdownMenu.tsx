import React, { useState, useRef, useEffect } from 'react'
import { Check } from 'lucide-react'

export interface DropdownItem {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  variant?: 'default' | 'destructive'
  disabled?: boolean
  checked?: boolean
  dividerBefore?: boolean
}

export interface DropdownMenuProps {
  trigger: React.ReactNode
  items: DropdownItem[]
  align?: 'left' | 'right'
}

function DropdownMenu({ trigger, items, align = 'left' }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }} ref={ref}>
      {/* Trigger */}
      <span onClick={() => setOpen(v => !v)} style={{ cursor: 'pointer' }}>
        {trigger}
      </span>

      {/* Menu */}
      {open && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            ...(align === 'right' ? { right: 0 } : { left: 0 }),
            zIndex: 50,
            background: 'var(--surface-primary)',
            border: '0.5px solid var(--border-default)',
            borderRadius: 8,
            boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
            padding: '4px 0',
            minWidth: 180,
          }}
        >
          {items.map((item, i) => (
            <div key={i}>
              {item.dividerBefore && (
                <div style={{
                  margin: '4px 0',
                  borderTop: '0.5px solid var(--border-default)',
                }} />
              )}
              <button
                role="menuitem"
                disabled={item.disabled}
                onClick={() => {
                  if (!item.disabled) {
                    item.onClick?.()
                    setOpen(false)
                  }
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 12px',
                  border: 'none',
                  background: 'transparent',
                  cursor: item.disabled ? 'default' : 'pointer',
                  opacity: item.disabled ? 0.4 : 1,
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 13,
                  textAlign: 'left',
                  color: item.variant === 'destructive' ? '#E24B4A' : 'var(--text-primary)',
                  transition: 'background 100ms',
                  pointerEvents: item.disabled ? 'none' : 'auto',
                  boxSizing: 'border-box',
                }}
                onMouseEnter={e => {
                  if (!item.disabled) {
                    e.currentTarget.style.background = item.variant === 'destructive'
                      ? 'rgba(226,75,74,0.07)'
                      : 'var(--surface-secondary)'
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {item.icon && (
                  <span style={{
                    width: 16, height: 16,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    color: 'var(--text-secondary)',
                  }}>
                    {item.icon}
                  </span>
                )}
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.checked && (
                  <Check size={14} style={{ color: '#1A88FF', flexShrink: 0 }} />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export { DropdownMenu }
