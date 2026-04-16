import { useRef, useState } from 'react'
import { Search, X } from 'lucide-react'

export interface SearchBarProps {
  value?: string
  onChange?: (value: string) => void
  onClear?: () => void
  placeholder?: string
  width?: string | number
  disabled?: boolean
  autoFocus?: boolean
}

export function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Buscar...',
  width = '100%',
  disabled = false,
  autoFocus = false,
}: SearchBarProps) {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const hasValue = (value ?? '') !== ''

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width,
    height: '36px',
    padding: '0 10px',
    backgroundColor: 'var(--surface-primary)',
    border: focused
      ? '1px solid #1A88FF'
      : '1px solid var(--border-emphasis)',
    borderRadius: '8px',
    boxShadow: focused ? '0 0 0 3px rgba(26,136,255,0.15)' : 'none',
    transition: 'border-color 150ms, box-shadow 150ms',
    cursor: disabled ? 'not-allowed' : 'text',
    opacity: disabled ? 0.4 : 1,
    boxSizing: 'border-box',
  }

  return (
    <div style={containerStyle} onClick={() => inputRef.current?.focus()}>
      <Search size={15} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => onChange?.(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontSize: '13px',
          fontFamily: 'DM Sans, sans-serif',
          color: 'var(--text-primary)',
          minWidth: 0,
          cursor: disabled ? 'not-allowed' : 'text',
        }}
      />

      {hasValue && !disabled && (
        <button
          type="button"
          onClick={e => {
            e.stopPropagation()
            onChange?.('')
            onClear?.()
            inputRef.current?.focus()
          }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '16px', height: '16px', flexShrink: 0,
            background: 'var(--text-secondary)', border: 'none',
            borderRadius: '50%', cursor: 'pointer', padding: 0,
          }}
          aria-label="Limpar busca"
        >
          <X size={10} color="var(--surface-primary)" strokeWidth={2.5} />
        </button>
      )}
    </div>
  )
}
