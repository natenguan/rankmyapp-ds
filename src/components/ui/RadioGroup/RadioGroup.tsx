export interface RadioOption {
  value: string
  label: string
  hint?: string
  disabled?: boolean
}

export interface RadioGroupProps {
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  label?: string
  error?: string
  orientation?: 'vertical' | 'horizontal'
  name?: string
}

export function RadioGroup({
  options,
  value,
  onChange,
  label,
  error,
  orientation = 'vertical',
  name = 'radio-group',
}: RadioGroupProps) {
  return (
    <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
      {label && (
        <legend style={{
          fontSize: '13px', fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
          color: 'var(--text-primary)', marginBottom: '10px', float: 'left', width: '100%',
        }}>
          {label}
        </legend>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: orientation === 'vertical' ? 'column' : 'row',
          gap: orientation === 'vertical' ? '10px' : '20px',
          flexWrap: orientation === 'horizontal' ? 'wrap' : undefined,
        }}
        role="radiogroup"
      >
        {options.map(opt => {
          const isSelected = opt.value === value
          const isDisabled = opt.disabled

          return (
            <label
              key={opt.value}
              style={{
                display: 'flex',
                alignItems: opt.hint ? 'flex-start' : 'center',
                gap: '10px',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                opacity: isDisabled ? 0.4 : 1,
              }}
            >
              {/* Hidden native input */}
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={isSelected}
                disabled={isDisabled}
                onChange={() => !isDisabled && onChange?.(opt.value)}
                style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
              />

              {/* Visual radio */}
              <div
                onClick={() => !isDisabled && onChange?.(opt.value)}
                aria-hidden="true"
                style={{
                  width: '16px', height: '16px', minWidth: '16px',
                  borderRadius: '50%',
                  border: isSelected
                    ? '1.5px solid #1A88FF'
                    : error
                      ? '1.5px solid #E24B4A'
                      : '1.5px solid var(--border-emphasis)',
                  backgroundColor: 'var(--surface-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'border-color 120ms',
                  flexShrink: 0,
                  marginTop: opt.hint ? '1px' : 0,
                }}
              >
                {isSelected && (
                  <div style={{
                    width: '7px', height: '7px',
                    borderRadius: '50%',
                    backgroundColor: '#1A88FF',
                  }} />
                )}
              </div>

              {/* Label */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{
                  fontSize: '13px', fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 400, color: 'var(--text-primary)', lineHeight: '16px',
                }}>
                  {opt.label}
                </span>
                {opt.hint && (
                  <span style={{
                    fontSize: '12px', fontFamily: 'DM Sans, sans-serif',
                    color: 'var(--text-secondary)',
                  }}>
                    {opt.hint}
                  </span>
                )}
              </div>
            </label>
          )
        })}
      </div>

      {error && (
        <p style={{ margin: '8px 0 0', fontSize: '12px', fontFamily: 'DM Sans', color: '#E24B4A' }}>
          {error}
        </p>
      )}
    </fieldset>
  )
}
