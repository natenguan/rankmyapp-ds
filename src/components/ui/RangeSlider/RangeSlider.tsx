import { useState, useRef, useCallback } from 'react'

export interface RangeSliderProps {
  min?: number
  max?: number
  step?: number
  value?: [number, number]
  onChange?: (value: [number, number]) => void
  label?: string
  hint?: string
  formatValue?: (v: number) => string
  disabled?: boolean
}

export function RangeSlider({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  label,
  hint,
  formatValue = v => String(v),
  disabled = false,
}: RangeSliderProps) {
  const [internal, setInternal] = useState<[number, number]>(value ?? [min, max])
  const [low, high] = value ?? internal

  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef<'low' | 'high' | null>(null)

  const pct = (v: number) => ((v - min) / (max - min)) * 100

  const clamp = (v: number) => Math.min(max, Math.max(min, Math.round(v / step) * step))

  const updateValue = useCallback((newLow: number, newHigh: number) => {
    const next: [number, number] = [clamp(newLow), clamp(newHigh)]
    setInternal(next)
    onChange?.(next)
  }, [min, max, step])

  const getValueFromX = (clientX: number): number => {
    const rect = trackRef.current?.getBoundingClientRect()
    if (!rect) return min
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    return min + ratio * (max - min)
  }

  const onMouseDown = (thumb: 'low' | 'high') => (e: React.MouseEvent) => {
    if (disabled) return
    e.preventDefault()
    dragging.current = thumb

    const onMove = (ev: MouseEvent) => {
      const v = getValueFromX(ev.clientX)
      if (dragging.current === 'low')  updateValue(Math.min(v, high - step), high)
      if (dragging.current === 'high') updateValue(low, Math.max(v, low + step))
    }
    const onUp = () => {
      dragging.current = null
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const thumbStyle = (active: boolean): React.CSSProperties => ({
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '18px', height: '18px',
    borderRadius: '50%',
    backgroundColor: disabled ? 'var(--text-secondary)' : '#1A88FF',
    border: '2px solid var(--surface-primary)',
    boxShadow: active ? '0 0 0 3px rgba(26,136,255,0.25)' : '0 1px 4px rgba(0,0,0,0.15)',
    cursor: disabled ? 'not-allowed' : 'grab',
    zIndex: active ? 2 : 1,
    transition: 'box-shadow 120ms',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', opacity: disabled ? 0.5 : 1 }}>
      {label && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', fontFamily: 'DM Sans', fontWeight: 500, color: 'var(--text-primary)' }}>
            {label}
          </span>
          <span style={{ fontSize: '12px', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>
            {formatValue(low)} – {formatValue(high)}
          </span>
        </div>
      )}

      <div ref={trackRef} style={{ position: 'relative', height: '20px', display: 'flex', alignItems: 'center' }}>
        {/* Track background */}
        <div style={{ position: 'absolute', left: 0, right: 0, height: '4px', borderRadius: '2px', backgroundColor: 'var(--surface-tertiary)' }} />

        {/* Active range */}
        <div style={{
          position: 'absolute',
          left: `${pct(low)}%`,
          width: `${pct(high) - pct(low)}%`,
          height: '4px',
          borderRadius: '2px',
          backgroundColor: disabled ? 'var(--text-secondary)' : '#1A88FF',
        }} />

        {/* Low thumb */}
        <div
          style={{ ...thumbStyle(false), left: `${pct(low)}%` }}
          onMouseDown={onMouseDown('low')}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={high - step}
          aria-valuenow={low}
          aria-label="Valor mínimo"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'ArrowLeft') updateValue(low - step, high)
            if (e.key === 'ArrowRight') updateValue(low + step, high)
          }}
        />

        {/* High thumb */}
        <div
          style={{ ...thumbStyle(false), left: `${pct(high)}%` }}
          onMouseDown={onMouseDown('high')}
          role="slider"
          aria-valuemin={low + step}
          aria-valuemax={max}
          aria-valuenow={high}
          aria-label="Valor máximo"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'ArrowLeft') updateValue(low, high - step)
            if (e.key === 'ArrowRight') updateValue(low, high + step)
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '11px', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>{formatValue(min)}</span>
        <span style={{ fontSize: '11px', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>{formatValue(max)}</span>
      </div>

      {hint && (
        <span style={{ fontSize: '12px', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>{hint}</span>
      )}
    </div>
  )
}
