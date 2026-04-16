import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  hint?: string
  error?: string
  disabled?: boolean
  searchable?: boolean
}

export function Select({
  options,
  value,
  onChange,
  placeholder = 'Selecione...',
  label,
  hint,
  error,
  disabled = false,
  searchable = false,
}: SelectProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const selected = options.find(o => o.value === value)

  const filtered = searchable && search
    ? options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
    : options

  useEffect(() => {
    if (!open) { setSearch('') ; return }
    if (searchable) setTimeout(() => searchRef.current?.focus(), 0)
  }, [open, searchable])

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  const triggerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '36px',
    padding: '0 12px',
    fontSize: '14px',
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: 400,
    backgroundColor: 'var(--surface-primary)',
    border: error
      ? '1px solid #E24B4A'
      : open
        ? '1px solid #1A88FF'
        : '1px solid var(--border-emphasis)',
    borderRadius: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    outline: 'none',
    boxShadow: open && !error
      ? '0 0 0 3px rgba(26,136,255,0.15)'
      : open && error
        ? '0 0 0 3px rgba(226,75,74,0.12)'
        : 'none',
    transition: 'border-color 150ms, box-shadow 150ms',
    color: selected ? 'var(--text-primary)' : 'var(--text-secondary)',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }} ref={containerRef}>
      {label && (
        <label
          style={{
            fontSize: '13px',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 500,
            color: 'var(--text-primary)',
          }}
        >
          {label}
        </label>
      )}

      <div style={{ position: 'relative' }}>
        <button
          type="button"
          style={triggerStyle}
          onClick={() => !disabled && setOpen(prev => !prev)}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown
            size={16}
            style={{
              color: 'var(--text-secondary)',
              flexShrink: 0,
              marginLeft: '8px',
              transition: 'transform 150ms',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </button>

        {open && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 4px)',
              left: 0,
              right: 0,
              zIndex: 50,
              backgroundColor: 'var(--surface-primary)',
              border: '0.5px solid var(--border-default)',
              borderRadius: '8px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              overflow: 'hidden',
            }}
            role="listbox"
          >
            {searchable && (
              <div style={{ padding: '8px 8px 4px' }}>
                <input
                  ref={searchRef}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Buscar..."
                  style={{
                    width: '100%',
                    height: '32px',
                    padding: '0 10px',
                    fontSize: '13px',
                    fontFamily: 'DM Sans, sans-serif',
                    border: '1px solid var(--border-emphasis)',
                    borderRadius: '6px',
                    outline: 'none',
                    backgroundColor: 'var(--surface-secondary)',
                    color: 'var(--text-primary)',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            )}

            <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
              {filtered.length === 0 ? (
                <div
                  style={{
                    padding: '12px 12px',
                    fontSize: '13px',
                    fontFamily: 'DM Sans, sans-serif',
                    color: 'var(--text-secondary)',
                    textAlign: 'center',
                  }}
                >
                  Nenhuma opção
                </div>
              ) : (
                filtered.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    disabled={opt.disabled}
                    onClick={() => {
                      if (!opt.disabled) {
                        onChange?.(opt.value)
                        setOpen(false)
                      }
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '8px 12px',
                      fontSize: '13px',
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: opt.value === value ? 500 : 400,
                      color: opt.disabled ? 'var(--text-secondary)' : 'var(--text-primary)',
                      backgroundColor: opt.value === value ? 'var(--surface-secondary)' : 'transparent',
                      border: 'none',
                      cursor: opt.disabled ? 'not-allowed' : 'pointer',
                      opacity: opt.disabled ? 0.5 : 1,
                      textAlign: 'left',
                    }}
                    onMouseEnter={e => {
                      if (!opt.disabled) (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--surface-secondary)'
                    }}
                    onMouseLeave={e => {
                      if (opt.value !== value) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                    }}
                    role="option"
                    aria-selected={opt.value === value}
                  >
                    <span>{opt.label}</span>
                    {opt.value === value && (
                      <Check size={14} style={{ color: '#1A88FF', flexShrink: 0 }} />
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <span style={{ fontSize: '12px', fontFamily: 'DM Sans, sans-serif', color: '#E24B4A' }}>
          {error}
        </span>
      )}
      {hint && !error && (
        <span style={{ fontSize: '12px', fontFamily: 'DM Sans, sans-serif', color: 'var(--text-secondary)' }}>
          {hint}
        </span>
      )}
    </div>
  )
}
