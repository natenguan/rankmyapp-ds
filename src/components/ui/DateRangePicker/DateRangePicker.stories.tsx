import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { DateRangePicker } from './DateRangePicker'
import type { DateRange } from './DateRangePicker'

const meta: Meta<typeof DateRangePicker> = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof DateRangePicker>

/* ── Trigger fechado ─────────────────────────────────────────────── */

export const Closed: Story = {
  render: () => (
    <div style={{ minHeight: 520 }}>
      <DateRangePicker placeholder="Selecionar período" onChange={() => {}} />
    </div>
  ),
}

export const ClosedWithValue: Story = {
  render: () => (
    <div style={{ minHeight: 520 }}>
      <DateRangePicker
        value={{ start: new Date(2026, 2, 1), end: new Date(2026, 2, 31) }}
        onChange={() => {}}
      />
    </div>
  ),
}

/* ── Painel aberto ───────────────────────────────────────────────── */

// Para o Chromatic ver o painel, precisamos de espaço vertical suficiente
function OpenWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: 520, padding: '8px 0' }}>
      {children}
    </div>
  )
}

export const OpenEmpty: Story = {
  render: () => {
    const [value, setValue] = useState<DateRange | undefined>(undefined)
    return (
      <OpenWrapper>
        <DateRangePicker
          value={value}
          onChange={v => setValue(v)}
          placeholder="Selecionar período"
        />
      </OpenWrapper>
    )
  },
}

export const OpenWithRange: Story = {
  render: () => {
    const [value, setValue] = useState<DateRange>({
      start: new Date(2026, 2, 13),
      end: new Date(2026, 3, 13),
    })
    return (
      <OpenWrapper>
        <DateRangePicker value={value} onChange={v => setValue(v)} />
      </OpenWrapper>
    )
  },
}

/* ── Interativo completo ─────────────────────────────────────────── */

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState<DateRange>({
      start: new Date(2026, 2, 13),
      end: new Date(2026, 3, 13),
    })

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, minHeight: 520 }}>
        <DateRangePicker value={value} onChange={v => setValue(v)} />

        {value && (
          <div style={{
            display: 'inline-flex', gap: 24,
            padding: '14px 20px',
            background: 'var(--surface-secondary)',
            borderRadius: 10,
            border: '0.5px solid var(--border-default)',
          }}>
            <div>
              <p style={{ margin: '0 0 2px', fontFamily: 'DM Sans', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                Início
              </p>
              <p style={{ margin: 0, fontFamily: 'Nunito', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                {value.start.toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div style={{ width: '0.5px', background: 'var(--border-default)' }} />
            <div>
              <p style={{ margin: '0 0 2px', fontFamily: 'DM Sans', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                Fim
              </p>
              <p style={{ margin: 0, fontFamily: 'Nunito', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                {value.end.toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div style={{ width: '0.5px', background: 'var(--border-default)' }} />
            <div>
              <p style={{ margin: '0 0 2px', fontFamily: 'DM Sans', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                Dias
              </p>
              <p style={{ margin: 0, fontFamily: 'Nunito', fontSize: 16, fontWeight: 700, color: '#1A88FF' }}>
                {Math.round((value.end.getTime() - value.start.getTime()) / 86400000) + 1}
              </p>
            </div>
          </div>
        )}
      </div>
    )
  },
}

/* ── Align left ──────────────────────────────────────────────────── */

export const AlignLeft: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'flex-start', minHeight: 480 }}>
      <DateRangePicker
        value={{ start: new Date(2026, 2, 1), end: new Date(2026, 2, 31) }}
        onChange={() => {}}
        align="left"
      />
    </div>
  ),
}

/* ── Align right ─────────────────────────────────────────────────── */

export const AlignRight: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', minHeight: 480 }}>
      <DateRangePicker
        value={{ start: new Date(2026, 2, 1), end: new Date(2026, 2, 31) }}
        onChange={() => {}}
        align="right"
      />
    </div>
  ),
}

/* ── Align center ─────────────────────────────────────────────────── */

export const AlignCenter: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', minHeight: 480 }}>
      <DateRangePicker
        value={{ start: new Date(2026, 2, 1), end: new Date(2026, 2, 31) }}
        onChange={() => {}}
        align="center"
      />
    </div>
  ),
}
