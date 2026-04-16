import { useState, useRef, useEffect } from 'react'
import { ChevronDown, X, Check } from 'lucide-react'

export interface MultiSelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  value?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
  label?: string
  hint?: string
  error?: string
  disabled?: boolean
  maxDisplay?: number
}

export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = 'Selecione...',
  label,
  hint,
  error,
  disabled = false,
  maxDisplay = 2,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggle = (v: string) => {
    const next = value.includes(v) ? value.filter(x => x !== v) : [...value, v]
    onChange?.(next)
  }

  const filtered = search
    ? options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
    : options

  const selectedLabels = options.filter(o => value.includes(o.value)).map(o => o.label)
  const displayTags = selectedLabels.slice(0, maxDisplay)
  const overflow = selectedLabels.length - maxDisplay

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }} ref={containerRef}>
      {label && (
        <label style={{ fontSize: '13px', fontFamily: 'DM Sans', fontWeight: 500, color: 'var(--text-primary)' }}>
          {label}
        </label>
      )}

      <div style={{ position: 'relative' }}>
        {/* Trigger */}
        <div
          onClick={() => !disabled && setOpen(p => !p)}
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '4px',
            minHeight: '36px',
            padding: value.length > 0 ? '4px 36px 4px 8px' : '0 36px 0 12px',
            backgroundColor: 'var(--surface-primary)',
            border: error
              ? '1px solid #E24B4A'
              : open ? '1px solid #1A88FF' : '1px solid var(--border-emphasis)',
            borderRadius: '8px',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.4 : 1,
            boxShadow: open && !error ? '0 0 0 3px rgba(26,136,255,0.15)' : 'none',
            transition: 'border-color 150ms, box-shadow 150ms',
            boxSizing: 'border-box',
          }}
        >
          {value.length === 0 ? (
            <span style={{ fontSize: '14px', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>
              {placeholder}
            </span>
          ) : (
            <>
              {displayTags.map(tag => (
                <span
                  key={tag}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    height: '22px', padding: '0 6px 0 8px',
                    fontSize: '12px', fontFamily: 'DM Sans', fontWeight: 500,
                    backgroundColor: 'rgba(26,136,255,0.10)',
                    color: '#1A88FF',
                    borderRadius: '4px',
                  }}
                >
                  {tag}
                  <button
                    onClick={e => { e.stopPropagation(); toggle(options.find(o => o.label === tag)!.value) }}
                    style={{ display: 'flex', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#1A88FF' }}
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
              {overflow > 0 && (
                <span style={{ fontSize: '12px', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>
                  +{overflow}
                </span>
              )}
            </>
          )}
          <ChevronDown
            size={15}
            style={{
              position: 'absolute', right: '10px', top: '50%', transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`,
              color: 'var(--text-secondary)', transition: 'transform 150ms',
            }}
          />
        </div>

        {/* Dropdown */}
        {open && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 50,
            backgroundColor: 'var(--surface-primary)', border: '0.5px solid var(--border-default)',
            borderRadius: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', overflow: 'hidden',
          }}>
            <div style={{ padding: '8px 8px 4px' }}>
              <input
                autoFocus
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar..."
                onClick={e => e.stopPropagation()}
                style={{
                  width: '100%', height: '30px', padding: '0 10px',
                  fontSize: '13px', fontFamily: 'DM Sans',
                  border: '1px solid var(--border-emphasis)', borderRadius: '6px',
                  outline: 'none', backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {filtered.length === 0 ? (
                <div style={{ padding: '12px', fontSize: '13px', fontFamily: 'DM Sans', color: 'var(--text-secondary)', textAlign: 'center' }}>
                  Nenhuma opção
                </div>
              ) : (
                filtered.map(opt => {
                  const isSelected = value.includes(opt.value)
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      disabled={opt.disabled}
                      onClick={() => !opt.disabled && toggle(opt.value)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        width: '100%', padding: '8px 12px',
                        fontSize: '13px', fontFamily: 'DM Sans', fontWeight: isSelected ? 500 : 400,
                        color: opt.disabled ? 'var(--text-secondary)' : 'var(--text-primary)',
                        backgroundColor: isSelected ? 'var(--surface-secondary)' : 'transparent',
                        border: 'none', cursor: opt.disabled ? 'not-allowed' : 'pointer',
                        opacity: opt.disabled ? 0.5 : 1, textAlign: 'left',
                      }}
                      onMouseEnter={e => { if (!opt.disabled && !isSelected) (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--surface-secondary)' }}
                      onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <Check size={13} style={{ color: '#1A88FF', flexShrink: 0 }} />}
                    </button>
                  )
                })
              )}
            </div>
            {value.length > 0 && (
              <div style={{ padding: '6px 8px', borderTop: '0.5px solid var(--border-default)' }}>
                <button
                  onClick={() => onChange?.([])}
                  style={{
                    width: '100%', height: '28px',
                    fontSize: '12px', fontFamily: 'DM Sans', fontWeight: 500,
                    color: '#E24B4A', backgroundColor: 'transparent',
                    border: 'none', borderRadius: '6px', cursor: 'pointer',
                  }}
                >
                  Limpar seleção ({value.length})
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {error && <span style={{ fontSize: '12px', fontFamily: 'DM Sans', color: '#E24B4A' }}>{error}</span>}
      {hint && !error && <span style={{ fontSize: '12px', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>{hint}</span>}
    </div>
  )
}
