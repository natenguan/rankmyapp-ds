export interface FormFieldProps {
  label?: string
  hint?: string
  error?: string
  required?: boolean
  htmlFor?: string
  children: React.ReactNode
}

export function FormField({ label, hint, error, required, htmlFor, children }: FormFieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      {label && (
        <label
          htmlFor={htmlFor}
          style={{
            fontSize: '13px',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 500,
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          {label}
          {required && (
            <span style={{ color: '#E24B4A', lineHeight: 1 }}>*</span>
          )}
        </label>
      )}

      {children}

      {error && (
        <span
          style={{
            fontSize: '12px',
            fontFamily: 'DM Sans, sans-serif',
            color: '#E24B4A',
          }}
        >
          {error}
        </span>
      )}
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
  )
}
