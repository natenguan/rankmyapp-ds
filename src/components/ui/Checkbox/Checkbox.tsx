import { useRef, useEffect } from 'react'
import { Check, Minus } from 'lucide-react'

export interface CheckboxProps {
  checked?: boolean
  indeterminate?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  hint?: string
  error?: string
  disabled?: boolean
  id?: string
}

export function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  label,
  hint,
  error,
  disabled = false,
  id,
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  const isActive = checked || indeterminate
  const boxStyle: React.CSSProperties = {
    width: '16px',
    height: '16px',
    minWidth: '16px',
    borderRadius: '4px',
    border: error
      ? '1.5px solid #E24B4A'
      : isActive
        ? '1.5px solid #1A88FF'
        : '1.5px solid var(--border-emphasis)',
    backgroundColor: isActive ? '#1A88FF' : 'var(--surface-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'background-color 120ms, border-color 120ms',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label
        htmlFor={id}
        style={{
          display: 'flex',
          alignItems: label ? 'flex-start' : 'center',
          gap: '10px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.4 : 1,
        }}
      >
        {/* Hidden native checkbox for accessibility */}
        <input
          ref={inputRef}
          type="checkbox"
          id={id}
          checked={checked}
          disabled={disabled}
          onChange={e => onChange?.(e.target.checked)}
          style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
        />

        {/* Visual box */}
        <div
          style={boxStyle}
          onClick={() => !disabled && onChange?.(!checked)}
          aria-hidden="true"
        >
          {indeterminate && <Minus size={10} color="#fff" strokeWidth={3} />}
          {!indeterminate && checked && <Check size={10} color="#fff" strokeWidth={3} />}
        </div>

        {/* Label text */}
        {label && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span
              style={{
                fontSize: '13px',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 400,
                color: 'var(--text-primary)',
                lineHeight: '16px',
              }}
            >
              {label}
            </span>
            {hint && !error && (
              <span
                style={{
                  fontSize: '12px',
                  fontFamily: 'DM Sans, sans-serif',
                  color: 'var(--text-secondary)',
                }}
              >
                {hint}
              </span>
            )}
          </div>
        )}
      </label>

      {error && (
        <span
          style={{
            fontSize: '12px',
            fontFamily: 'DM Sans, sans-serif',
            color: '#E24B4A',
            paddingLeft: '24px',
          }}
        >
          {error}
        </span>
      )}
    </div>
  )
}
