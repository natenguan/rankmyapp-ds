import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react'

/* ── Types ─────────────────────────────────────────────────────── */

export interface DateRange {
  start: Date
  end: Date
}

export interface DateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange) => void
  placeholder?: string
  align?: 'left' | 'right' | 'center'
}

/* ── Helpers ───────────────────────────────────────────────────── */

function todayDate(): Date {
  const n = new Date()
  return new Date(n.getFullYear(), n.getMonth(), n.getDate())
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  r.setDate(r.getDate() + n)
  return r
}

function addMonths(d: Date, n: number): Date {
  const r = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  r.setMonth(r.getMonth() + n)
  return r
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}


function formatShort(d: Date): string {
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
}

// Format for the editable input field (DD/MM/AAAA)
function formatInput(d: Date): string {
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
}

// Parse DD/MM/AAAA — returns null if invalid
function parseInput(s: string): Date | null {
  const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!m) return null
  const day = parseInt(m[1], 10)
  const month = parseInt(m[2], 10)
  const year = parseInt(m[3], 10)
  if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1900 || year > 2100) return null
  const d = new Date(year, month - 1, day)
  // Guard against overflow (e.g. Feb 30 → Mar 2)
  if (d.getDate() !== day || d.getMonth() !== month - 1 || d.getFullYear() !== year) return null
  return d
}

// Auto-insert slashes while typing: 01 → 01/ → 01/02 → 01/02/ → 01/02/2026
function autoSlash(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

/* ── Presets ───────────────────────────────────────────────────── */

interface Preset {
  label: string
  getDates: () => DateRange
}

const PRESETS: Preset[] = [
  { label: 'Hoje',             getDates: () => { const t = todayDate(); return { start: t, end: t } } },
  { label: 'Ontem',            getDates: () => { const y = addDays(todayDate(), -1); return { start: y, end: y } } },
  { label: 'Últimos 7 dias',   getDates: () => ({ start: addDays(todayDate(), -6), end: todayDate() }) },
  { label: 'Últimos 15 dias',  getDates: () => ({ start: addDays(todayDate(), -14), end: todayDate() }) },
  { label: 'Último mês',       getDates: () => ({ start: addMonths(todayDate(), -1), end: todayDate() }) },
  { label: 'Últimos 3 meses',  getDates: () => ({ start: addMonths(todayDate(), -3), end: todayDate() }) },
  { label: 'Últimos 6 meses',  getDates: () => ({ start: addMonths(todayDate(), -6), end: todayDate() }) },
  { label: 'Último ano',       getDates: () => ({ start: addMonths(todayDate(), -12), end: todayDate() }) },
]

/* ── Constants ─────────────────────────────────────────────────── */

const MONTHS_PT = [
  'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
  'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro',
]

const DAYS_PT = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']

/* ── Calendar grid ─────────────────────────────────────────────── */

function getCalendarGrid(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const grid: (Date | null)[] = []
  for (let i = 0; i < firstDay; i++) grid.push(null)
  for (let d = 1; d <= daysInMonth; d++) grid.push(new Date(year, month, d))
  return grid
}

type DayState = 'start' | 'end' | 'both' | 'range' | 'default'

function getDayState(date: Date, start: Date | null, end: Date | null): DayState {
  if (!start) return 'default'
  if (!end) return sameDay(date, start) ? 'start' : 'default'
  const s = start <= end ? start : end
  const e = start <= end ? end : start
  if (sameDay(date, s) && sameDay(date, e)) return 'both'
  if (sameDay(date, s)) return 'start'
  if (sameDay(date, e)) return 'end'
  if (date > s && date < e) return 'range'
  return 'default'
}

/* ── CalendarDay ───────────────────────────────────────────────── */

function CalendarDay({
  date, rangeStart, rangeEnd, isPreview,
  onClick, onHover,
}: {
  date: Date
  rangeStart: Date | null
  rangeEnd: Date | null
  isPreview: boolean
  onClick: (d: Date) => void
  onHover: (d: Date) => void
}) {
  const state = getDayState(date, rangeStart, rangeEnd)
  const isEdge = state === 'start' || state === 'end' || state === 'both'
  const inRange = state === 'range'
  const isToday = sameDay(date, todayDate())
  const rangeBg = isPreview ? 'rgba(26,136,255,0.07)' : 'rgba(26,136,255,0.12)'

  /* The pill-range effect:
     start → only right half gets background
     end   → only left half gets background
     range → both halves (= full width) get background */
  const showLeftBg = state === 'range' || state === 'end'
  const showRightBg = state === 'range' || state === 'start'

  return (
    <div
      role="button"
      tabIndex={0}
      style={{ position: 'relative', height: 32, cursor: 'pointer' }}
      onClick={() => onClick(date)}
      onMouseEnter={() => onHover(date)}
      onKeyDown={e => e.key === 'Enter' && onClick(date)}
    >
      {/* Range background strips */}
      {showLeftBg && (
        <div style={{
          position: 'absolute', top: 3, bottom: 3,
          left: 0, right: '50%',
          background: rangeBg, pointerEvents: 'none',
        }} />
      )}
      {showRightBg && (
        <div style={{
          position: 'absolute', top: 3, bottom: 3,
          left: '50%', right: 0,
          background: rangeBg, pointerEvents: 'none',
        }} />
      )}

      {/* Day number */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          width: 26, height: 26, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isEdge ? '#1A88FF' : 'transparent',
          color: isEdge ? '#fff' : inRange ? '#1A88FF' : 'var(--text-primary)',
          fontSize: 12, fontFamily: 'DM Sans, sans-serif',
          fontWeight: isEdge ? 600 : 400,
          border: isToday && !isEdge ? '1.5px solid rgba(26,136,255,0.5)' : 'none',
          boxSizing: 'border-box',
          position: 'relative', zIndex: 1,
          transition: 'background 80ms',
        }}>
          {date.getDate()}
        </span>
      </div>
    </div>
  )
}

/* ── MonthCalendar ─────────────────────────────────────────────── */

const navBtnStyle: React.CSSProperties = {
  width: 28, height: 28,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'none', border: 'none', cursor: 'pointer',
  borderRadius: 6, color: 'var(--text-secondary)', flexShrink: 0,
}

function MonthCalendar({
  year, month, rangeStart, rangeEnd, isPreview,
  onDayClick, onDayHover, onMouseLeave,
  showPrev, showNext, onPrev, onNext,
}: {
  year: number
  month: number
  rangeStart: Date | null
  rangeEnd: Date | null
  isPreview: boolean
  onDayClick: (d: Date) => void
  onDayHover: (d: Date) => void
  onMouseLeave: () => void
  showPrev?: boolean
  showNext?: boolean
  onPrev?: () => void
  onNext?: () => void
}) {
  const grid = getCalendarGrid(year, month)

  return (
    <div style={{ width: 224 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        {showPrev ? (
          <button style={navBtnStyle} onClick={onPrev}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-secondary)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}
          >
            <ChevronLeft size={15} />
          </button>
        ) : <div style={{ width: 28 }} />}

        <span style={{
          flex: 1, textAlign: 'center',
          fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600,
          color: 'var(--text-primary)',
        }}>
          {MONTHS_PT[month]} {year}
        </span>

        {showNext ? (
          <button style={navBtnStyle} onClick={onNext}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-secondary)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}
          >
            <ChevronRight size={15} />
          </button>
        ) : <div style={{ width: 28 }} />}
      </div>

      {/* Day-of-week headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 32px)', marginBottom: 2 }}>
        {DAYS_PT.map((d, i) => (
          <div key={i} style={{
            textAlign: 'center',
            fontFamily: 'DM Sans, sans-serif', fontSize: 10, fontWeight: 600,
            color: 'var(--text-secondary)', paddingBottom: 4,
          }}>
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 32px)' }}
        onMouseLeave={onMouseLeave}
      >
        {grid.map((date, i) =>
          date ? (
            <CalendarDay
              key={i}
              date={date}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              isPreview={isPreview}
              onClick={onDayClick}
              onHover={onDayHover}
            />
          ) : (
            <div key={i} />
          )
        )}
      </div>
    </div>
  )
}

/* ── DateRangePicker ───────────────────────────────────────────── */

export function DateRangePicker({
  value,
  onChange,
  placeholder = 'Selecionar período',
  align = 'left',
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false)
  const [pendingStart, setPendingStart] = useState<Date | null>(value?.start ?? null)
  const [pendingEnd, setPendingEnd] = useState<Date | null>(value?.end ?? null)
  const [hoverDate, setHoverDate] = useState<Date | null>(null)
  const [selectingEnd, setSelectingEnd] = useState(false)
  const [viewMonth, setViewMonth] = useState(() => {
    const d = value?.start ?? new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })
  const [rightViewMonth, setRightViewMonth] = useState(() => {
    const s = value?.start ?? new Date()
    const e = value?.end
    // If end is a different month from start, show it on the right
    if (e && (e.getFullYear() !== s.getFullYear() || e.getMonth() !== s.getMonth())) {
      return new Date(e.getFullYear(), e.getMonth(), 1)
    }
    return new Date(s.getFullYear(), s.getMonth() + 1, 1)
  })
  const [activePreset, setActivePreset] = useState<string | null>(null)
  const [startText, setStartText] = useState(() => pendingStart ? formatInput(pendingStart) : '')
  const [endText, setEndText] = useState(() => pendingEnd ? formatInput(pendingEnd) : '')
  const [centerLeft, setCenterLeft] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  const rightMonth = rightViewMonth

  // For align="center": calculate the clamped left offset so the panel is
  // centered under the trigger without overflowing the viewport.
  useLayoutEffect(() => {
    if (!open || align !== 'center' || !ref.current) { setCenterLeft(null); return }
    const rect = ref.current.getBoundingClientRect()
    const panelWidth = 700
    const margin = 8
    // Center of trigger relative to the wrapper's own left edge
    const triggerCenter = rect.width / 2
    // Ideal panel left (relative to wrapper): center trigger under panel center
    let left = triggerCenter - panelWidth / 2
    // Convert to viewport coords to clamp, then back to wrapper-relative
    const viewportLeft = rect.left + left
    const clampedViewportLeft = Math.max(margin, Math.min(viewportLeft, window.innerWidth - panelWidth - margin))
    setCenterLeft(clampedViewportLeft - rect.left)
  }, [open, align])

  // Keep text inputs in sync when dates change via calendar clicks or presets
  useEffect(() => {
    setStartText(pendingStart ? formatInput(pendingStart) : '')
  }, [pendingStart])

  useEffect(() => {
    setEndText(pendingEnd ? formatInput(pendingEnd) : '')
  }, [pendingEnd])

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  // Effective display range (with live hover preview while selecting end)
  let displayStart: Date | null = pendingStart
  let displayEnd: Date | null = pendingEnd
  if (selectingEnd && pendingStart && hoverDate) {
    displayStart = hoverDate < pendingStart ? hoverDate : pendingStart
    displayEnd = hoverDate < pendingStart ? pendingStart : hoverDate
  }

  const handleOpen = () => {
    if (!open) {
      setPendingStart(value?.start ?? null)
      setPendingEnd(value?.end ?? null)
      setStartText(value?.start ? formatInput(value.start) : '')
      setEndText(value?.end ? formatInput(value.end) : '')
      setSelectingEnd(false)
      setHoverDate(null)
      setActivePreset(null)
      if (value?.start) {
        const s = value.start
        const e = value.end
        setViewMonth(new Date(s.getFullYear(), s.getMonth(), 1))
        if (e && (e.getFullYear() !== s.getFullYear() || e.getMonth() !== s.getMonth())) {
          setRightViewMonth(new Date(e.getFullYear(), e.getMonth(), 1))
        } else {
          setRightViewMonth(new Date(s.getFullYear(), s.getMonth() + 1, 1))
        }
      }
    }
    setOpen(v => !v)
  }

  const handleDayClick = (date: Date) => {
    setActivePreset(null)
    if (!selectingEnd) {
      // First click: set start, wait for end
      setPendingStart(date)
      setPendingEnd(null)
      setSelectingEnd(true)
    } else {
      // Second click: set end (swap if needed)
      const start = pendingStart!
      setPendingStart(date < start ? date : start)
      setPendingEnd(date < start ? start : date)
      setSelectingEnd(false)
      setHoverDate(null)
    }
  }

  const handlePreset = (preset: Preset) => {
    const range = preset.getDates()
    setPendingStart(range.start)
    setPendingEnd(range.end)
    setSelectingEnd(false)
    setHoverDate(null)
    setActivePreset(preset.label)
    const startMonth = new Date(range.start.getFullYear(), range.start.getMonth(), 1)
    const endMonth = new Date(range.end.getFullYear(), range.end.getMonth(), 1)
    setViewMonth(startMonth)
    // Right calendar shows end month, or start+1 if same month
    if (endMonth.getTime() === startMonth.getTime()) {
      setRightViewMonth(new Date(startMonth.getFullYear(), startMonth.getMonth() + 1, 1))
    } else {
      setRightViewMonth(endMonth)
    }
  }

  const navigateToDate = useCallback((d: Date, side: 'left' | 'right') => {
    const m = new Date(d.getFullYear(), d.getMonth(), 1)
    if (side === 'left') setViewMonth(m)
    else setRightViewMonth(m)
  }, [])

  const handleStartBlur = useCallback(() => {
    const parsed = parseInput(startText)
    if (parsed) {
      setPendingStart(parsed)
      setPendingEnd(null)
      setSelectingEnd(true)
      navigateToDate(parsed, 'left')
      setActivePreset(null)
    } else {
      // Revert to current pending value
      setStartText(pendingStart ? formatInput(pendingStart) : '')
    }
  }, [startText, pendingStart, navigateToDate])

  const handleEndBlur = useCallback(() => {
    const parsed = parseInput(endText)
    if (parsed && pendingStart) {
      const s = parsed < pendingStart ? parsed : pendingStart
      const e = parsed < pendingStart ? pendingStart : parsed
      setPendingStart(s)
      setPendingEnd(e)
      setSelectingEnd(false)
      navigateToDate(e, 'right')
      setActivePreset(null)
    } else {
      setEndText(pendingEnd ? formatInput(pendingEnd) : '')
    }
  }, [endText, pendingStart, pendingEnd, navigateToDate])

  const handleApply = () => {
    if (pendingStart && pendingEnd) {
      onChange?.({ start: pendingStart, end: pendingEnd })
      setOpen(false)
    }
  }

  const handleCancel = () => setOpen(false)

  const canApply = !selectingEnd && !!pendingStart && !!pendingEnd

  const triggerText = value
    ? `${formatShort(value.start)} — ${formatShort(value.end)}`
    : placeholder

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block', alignSelf: 'flex-start' }}>
      {/* Trigger */}
      <button
        onClick={handleOpen}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          height: 36, padding: '0 12px', minWidth: 210,
          background: open ? 'var(--surface-secondary)' : 'var(--surface-primary)',
          border: `0.5px solid ${open ? '#1A88FF' : 'var(--border-emphasis)'}`,
          borderRadius: 8, cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif', fontSize: 13,
          color: value ? 'var(--text-primary)' : 'var(--text-secondary)',
          whiteSpace: 'nowrap', transition: 'all 120ms',
        }}
      >
        <CalendarDays size={14} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
        {triggerText}
      </button>

      {/* Panel — position:absolute inside the trigger wrapper.
           left  → left edge of panel = left edge of trigger
           right → right edge of panel = right edge of trigger (extends leftward)
           center → panel is centered under the trigger, clamped to viewport */}
      {open && (align !== 'center' || centerLeft !== null) && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          ...(align === 'right'
            ? { right: 0 }
            : align === 'center'
            ? { left: centerLeft! }
            : { left: 0 }),
          zIndex: 9999,
          background: 'var(--surface-primary)',
          border: '0.5px solid var(--border-default)',
          borderRadius: 12,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          display: 'flex',
          overflow: 'hidden',
          userSelect: 'none',
        }}>

          {/* Presets sidebar */}
          <div style={{
            width: 156, flexShrink: 0,
            borderRight: '0.5px solid var(--border-default)',
            padding: '14px 8px',
            display: 'flex', flexDirection: 'column', gap: 2,
          }}>
            <p style={{
              margin: '0 0 8px 8px',
              fontFamily: 'DM Sans, sans-serif', fontSize: 10, fontWeight: 600,
              letterSpacing: '0.07em', textTransform: 'uppercase',
              color: 'var(--text-secondary)',
            }}>
              Período
            </p>
            {PRESETS.map(preset => {
              const isActive = activePreset === preset.label
              return (
                <button
                  key={preset.label}
                  onClick={() => handlePreset(preset)}
                  style={{
                    display: 'flex', alignItems: 'center',
                    height: 32, padding: '0 10px',
                    borderRadius: 6, border: 'none', cursor: 'pointer', textAlign: 'left',
                    background: isActive ? 'rgba(26,136,255,0.10)' : 'transparent',
                    fontFamily: 'DM Sans, sans-serif', fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#1A88FF' : 'var(--text-primary)',
                    transition: 'background 100ms',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--surface-secondary)' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                >
                  {preset.label}
                </button>
              )
            })}
          </div>

          {/* Calendar section */}
          <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Date inputs — editável em DD/MM/AAAA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                value={startText}
                placeholder="DD/MM/AAAA"
                maxLength={10}
                onChange={e => setStartText(autoSlash(e.target.value))}
                onFocus={() => setSelectingEnd(false)}
                onBlur={handleStartBlur}
                onKeyDown={e => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
                style={{
                  height: 32, padding: '0 10px', flex: 1,
                  borderRadius: 6, boxSizing: 'border-box',
                  border: selectingEnd ? '1.5px solid #1A88FF' : '0.5px solid var(--border-emphasis)',
                  background: selectingEnd ? 'rgba(26,136,255,0.04)' : 'var(--surface-secondary)',
                  fontFamily: 'DM Sans, sans-serif', fontSize: 12,
                  color: startText ? 'var(--text-primary)' : 'var(--text-secondary)',
                  outline: 'none',
                  minWidth: 0,
                }}
              />
              <span style={{ color: 'var(--text-secondary)', fontSize: 14, flexShrink: 0 }}>→</span>
              <input
                value={endText}
                placeholder="DD/MM/AAAA"
                maxLength={10}
                onChange={e => setEndText(autoSlash(e.target.value))}
                onBlur={handleEndBlur}
                onKeyDown={e => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
                style={{
                  height: 32, padding: '0 10px', flex: 1,
                  borderRadius: 6, boxSizing: 'border-box',
                  border: '0.5px solid var(--border-emphasis)',
                  background: 'var(--surface-secondary)',
                  fontFamily: 'DM Sans, sans-serif', fontSize: 12,
                  color: endText ? 'var(--text-primary)' : 'var(--text-secondary)',
                  outline: 'none',
                  minWidth: 0,
                }}
              />
            </div>

            {/* Two month calendars */}
            <div style={{ display: 'flex', gap: 0 }}>
              <MonthCalendar
                year={viewMonth.getFullYear()}
                month={viewMonth.getMonth()}
                rangeStart={displayStart}
                rangeEnd={displayEnd}
                isPreview={selectingEnd && !!hoverDate}
                onDayClick={handleDayClick}
                onDayHover={setHoverDate}
                onMouseLeave={() => setHoverDate(null)}
                showPrev
                onPrev={() => setViewMonth(m => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
              />
              <div style={{ width: '0.5px', background: 'var(--border-default)', alignSelf: 'stretch', margin: '0 16px' }} />
              <MonthCalendar
                year={rightMonth.getFullYear()}
                month={rightMonth.getMonth()}
                rangeStart={displayStart}
                rangeEnd={displayEnd}
                isPreview={selectingEnd && !!hoverDate}
                onDayClick={handleDayClick}
                onDayHover={setHoverDate}
                onMouseLeave={() => setHoverDate(null)}
                showNext
                onNext={() => setRightViewMonth(m => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
              />
            </div>

            {/* Status + footer actions */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderTop: '0.5px solid var(--border-default)', paddingTop: 12,
            }}>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: 'var(--text-secondary)' }}>
                {selectingEnd
                  ? 'Clique para definir a data de fim'
                  : canApply
                  ? 'Confirme o período selecionado'
                  : 'Selecione a data de início'}
              </span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={handleCancel}
                  style={{
                    height: 32, padding: '0 14px', borderRadius: 6,
                    border: '0.5px solid var(--border-emphasis)',
                    background: 'transparent', cursor: 'pointer',
                    fontFamily: 'DM Sans, sans-serif', fontSize: 13,
                    color: 'var(--text-primary)',
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleApply}
                  disabled={!canApply}
                  style={{
                    height: 32, padding: '0 14px', borderRadius: 6, border: 'none',
                    background: canApply ? '#1A88FF' : 'var(--surface-secondary)',
                    cursor: canApply ? 'pointer' : 'default',
                    fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 500,
                    color: canApply ? '#fff' : 'var(--text-secondary)',
                    transition: 'all 120ms',
                  }}
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
