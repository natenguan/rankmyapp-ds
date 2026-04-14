import { useState, useRef, useEffect } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

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
    <div className="relative inline-flex" ref={ref}>
      {/* Trigger */}
      <span onClick={() => setOpen(v => !v)} className="cursor-pointer">
        {trigger}
      </span>

      {/* Menu */}
      {open && (
        <div
          className={cn(
            'absolute top-full mt-1 z-50 surface-primary border border-[0.5px] border-[var(--border-default)] rounded-lg shadow-lg py-1 min-w-[180px]',
            align === 'right' ? 'right-0' : 'left-0'
          )}
          role="menu"
        >
          {items.map((item, i) => (
            <div key={i}>
              {item.dividerBefore && (
                <div className="my-1 border-t border-[0.5px] border-[var(--border-default)]" />
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
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2 font-sans text-[13px] transition-colors text-left',
                  'disabled:opacity-40 disabled:pointer-events-none',
                  item.variant === 'destructive'
                    ? 'text-[#E24B4A] hover:bg-[rgba(226,75,74,0.07)]'
                    : 'hover:surface-secondary',
                )}
                style={item.variant !== 'destructive' ? { color: 'var(--text-primary)' } : undefined}
              >
                {item.icon && (
                  <span className="w-4 h-4 flex items-center justify-center flex-shrink-0" style={{ color: 'var(--text-secondary)' }}>
                    {item.icon}
                  </span>
                )}
                <span className="flex-1">{item.label}</span>
                {item.checked && (
                  <Check size={14} className="text-[#1A88FF] flex-shrink-0" />
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
