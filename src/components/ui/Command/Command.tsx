import { useState, useEffect, useRef, useCallback } from 'react'
import { Search, X } from 'lucide-react'

export interface CommandItem {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
  shortcut?: string[]
  group?: string
  onSelect?: () => void
}

export interface CommandProps {
  items: CommandItem[]
  placeholder?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  emptyMessage?: string
}

function Kbd({ keys }: { keys: string[] }) {
  return (
    <span style={{ display: 'flex', gap: '3px', alignItems: 'center', flexShrink: 0 }}>
      {keys.map((k, i) => (
        <kbd key={i} style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          minWidth: '20px', height: '20px', padding: '0 4px',
          fontFamily: 'DM Mono, monospace', fontSize: '12px',
          color: 'var(--text-secondary)',
          background: 'var(--surface-secondary)',
          border: '0.5px solid var(--border-emphasis)',
          borderRadius: '4px',
          boxShadow: '0 1px 0 var(--border-emphasis)',
        }}>
          {k}
        </kbd>
      ))}
    </span>
  )
}

export function Command({
  items,
  placeholder = 'Buscar ação ou página...',
  open = false,
  onOpenChange,
  emptyMessage = 'Nenhum resultado encontrado.',
}: CommandProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Filter items
  const filtered = query.trim()
    ? items.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase()) ||
        item.group?.toLowerCase().includes(query.toLowerCase())
      )
    : items

  // Group items
  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    const g = item.group ?? ''
    if (!acc[g]) acc[g] = []
    acc[g].push(item)
    return acc
  }, {})

  const groupKeys = Object.keys(grouped)
  const flatFiltered = groupKeys.flatMap(g => grouped[g])

  useEffect(() => { setActiveIndex(0) }, [query])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
      setActiveIndex(0)
    }
  }, [open])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => Math.min(i + 1, flatFiltered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      flatFiltered[activeIndex]?.onSelect?.()
      onOpenChange?.(false)
    } else if (e.key === 'Escape') {
      onOpenChange?.(false)
    }
  }, [flatFiltered, activeIndex, onOpenChange])

  // Scroll active item into view
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const active = list.querySelector('[data-active="true"]') as HTMLElement
    if (active) active.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  if (!open) return null

  let flatIndex = 0

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: '15vh',
        backgroundColor: 'rgba(0,0,0,0.40)',
        backdropFilter: 'blur(2px)',
      }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onOpenChange?.(false) }}
    >
      <div style={{
        width: '100%', maxWidth: '560px', margin: '0 16px',
        backgroundColor: 'var(--surface-primary)',
        borderRadius: '12px',
        border: '0.5px solid var(--border-default)',
        boxShadow: '0 16px 48px rgba(0,0,0,0.18)',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        maxHeight: '480px',
      }}>
        {/* Search input */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '12px 14px',
          borderBottom: '0.5px solid var(--border-default)',
          flexShrink: 0,
        }}>
          <Search size={16} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            style={{
              flex: 1, border: 'none', outline: 'none',
              background: 'transparent',
              fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
              color: 'var(--text-primary)',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0 }}
            >
              <X size={14} style={{ color: 'var(--text-secondary)' }} />
            </button>
          )}
          <Kbd keys={['Esc']} />
        </div>

        {/* Results */}
        <div ref={listRef} style={{ overflow: 'auto', padding: '6px' }}>
          {flatFiltered.length === 0 ? (
            <div style={{
              padding: '32px', textAlign: 'center',
              fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
              color: 'var(--text-secondary)',
            }}>
              {emptyMessage}
            </div>
          ) : (
            groupKeys.map(group => (
              <div key={group}>
                {group && (
                  <div style={{
                    padding: '8px 10px 4px',
                    fontFamily: 'DM Sans, sans-serif', fontSize: '12px',
                    fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: 'var(--text-secondary)',
                  }}>
                    {group}
                  </div>
                )}
                {grouped[group].map(item => {
                  const index = flatIndex++
                  const isActive = index === activeIndex
                  return (
                    <button
                      key={item.id}
                      data-active={isActive}
                      onClick={() => { item.onSelect?.(); onOpenChange?.(false) }}
                      onMouseEnter={() => setActiveIndex(index)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        width: '100%', padding: '8px 10px',
                        borderRadius: '8px', border: 'none', cursor: 'pointer', textAlign: 'left',
                        backgroundColor: isActive ? 'var(--surface-secondary)' : 'transparent',
                        transition: 'background-color 80ms',
                      }}
                    >
                      {item.icon && (
                        <span style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          width: '28px', height: '28px', borderRadius: '6px',
                          background: 'var(--surface-secondary)', flexShrink: 0,
                          color: 'var(--text-secondary)',
                          border: '0.5px solid var(--border-default)',
                        }}>
                          {item.icon}
                        </span>
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          margin: 0, fontFamily: 'DM Sans, sans-serif',
                          fontSize: '13px', fontWeight: 500,
                          color: 'var(--text-primary)',
                        }}>
                          {item.label}
                        </p>
                        {item.description && (
                          <p style={{
                            margin: 0, fontFamily: 'DM Sans, sans-serif',
                            fontSize: '12px', color: 'var(--text-secondary)',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}>
                            {item.description}
                          </p>
                        )}
                      </div>
                      {item.shortcut && <Kbd keys={item.shortcut} />}
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '8px 14px',
          borderTop: '0.5px solid var(--border-default)',
          display: 'flex', alignItems: 'center', gap: '16px',
          flexShrink: 0,
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <Kbd keys={['↑', '↓']} /> navegar
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <Kbd keys={['↵']} /> selecionar
          </span>
          {flatFiltered.length > 0 && (
            <span style={{ marginLeft: 'auto', fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-secondary)' }}>
              {flatFiltered.length} resultado{flatFiltered.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
