import { useState, useRef, useEffect } from 'react'

export type PopoverSide = 'top' | 'bottom' | 'left' | 'right'
export type PopoverAlign = 'start' | 'center' | 'end'

export interface PopoverProps {
  trigger: React.ReactNode
  children: React.ReactNode
  side?: PopoverSide
  align?: PopoverAlign
  offset?: number
}

export function Popover({ trigger, children, side = 'bottom', align = 'start', offset = 8 }: PopoverProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const getPopoverStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      zIndex: 100,
      backgroundColor: 'var(--surface-primary)',
      border: '0.5px solid var(--border-default)',
      borderRadius: '10px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
      minWidth: '200px',
    }

    if (side === 'bottom') {
      base.top = `calc(100% + ${offset}px)`
      if (align === 'start')  base.left = 0
      if (align === 'center') { base.left = '50%'; base.transform = 'translateX(-50%)' }
      if (align === 'end')    base.right = 0
    }
    if (side === 'top') {
      base.bottom = `calc(100% + ${offset}px)`
      if (align === 'start')  base.left = 0
      if (align === 'center') { base.left = '50%'; base.transform = 'translateX(-50%)' }
      if (align === 'end')    base.right = 0
    }
    if (side === 'right') {
      base.left = `calc(100% + ${offset}px)`
      if (align === 'start')  base.top = 0
      if (align === 'center') { base.top = '50%'; base.transform = 'translateY(-50%)' }
      if (align === 'end')    base.bottom = 0
    }
    if (side === 'left') {
      base.right = `calc(100% + ${offset}px)`
      if (align === 'start')  base.top = 0
      if (align === 'center') { base.top = '50%'; base.transform = 'translateY(-50%)' }
      if (align === 'end')    base.bottom = 0
    }

    return base
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-flex' }}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(p => !p)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(p => !p) } }}
        style={{ display: 'inline-flex', cursor: 'pointer' }}
      >
        {trigger}
      </div>
      {open && (
        <div style={getPopoverStyle()}>
          {children}
        </div>
      )}
    </div>
  )
}
