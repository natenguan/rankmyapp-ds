import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const meta: Meta = {
  title: 'Foundations/Shadows & Elevation',
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj

const SHADOWS = [
  {
    name: 'shadow-xs',
    value: '0px 1px 2px rgba(0, 0, 0, 0.06)',
    usage: 'Badges, chips, tooltips',
    level: 1,
  },
  {
    name: 'shadow-sm',
    value: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    usage: 'Dropdowns, popovers, select menus',
    level: 2,
  },
  {
    name: 'shadow-md',
    value: '0px 4px 16px rgba(0, 0, 0, 0.10)',
    usage: 'Cards, painéis, sidebars',
    level: 3,
  },
  {
    name: 'shadow-lg',
    value: '0px 8px 32px rgba(0, 0, 0, 0.12)',
    usage: 'Modais, sheets, dialogs',
    level: 4,
  },
  {
    name: 'shadow-xl',
    value: '0px 16px 48px rgba(0, 0, 0, 0.16)',
    usage: 'Command palette, fullscreen overlays',
    level: 5,
  },
]

export const Tokens: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <p style={{ margin: '0 0 8px', fontFamily: 'DM Sans', fontSize: '13px', color: 'var(--text-secondary)' }}>
        Tokens de elevação — quanto maior o nível, mais distante da superfície base.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
        {SHADOWS.map((s) => (
          <div key={s.name} style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <div style={{
              width: '120px', height: '88px',
              background: 'var(--surface-primary)',
              borderRadius: '10px',
              boxShadow: s.value,
              border: '0.5px solid var(--border-default)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: 'Nunito', fontSize: '20px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                {s.level}
              </span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: '0 0 2px', fontFamily: 'DM Mono, monospace', fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {s.name}
              </p>
              <p style={{ margin: 0, fontFamily: 'DM Sans', fontSize: '11px', color: 'var(--text-secondary)' }}>
                {s.usage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const Values: Story = {
  render: () => (
    <div style={{
      border: '0.5px solid var(--border-default)',
      borderRadius: '10px',
      overflow: 'hidden',
      background: 'var(--surface-primary)',
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'var(--surface-secondary)' }}>
            {['Token', 'Nível', 'Valor CSS', 'Uso'].map((h) => (
              <th key={h} style={{
                padding: '8px 14px',
                textAlign: 'left',
                fontFamily: 'DM Sans',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                borderBottom: '0.5px solid var(--border-default)',
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SHADOWS.map((s, i) => (
            <tr
              key={s.name}
              style={{ borderBottom: i < SHADOWS.length - 1 ? '0.5px solid var(--border-default)' : 'none' }}
            >
              <td style={{ padding: '10px 14px', fontFamily: 'DM Mono, monospace', fontSize: '12px', color: '#1A88FF' }}>
                {s.name}
              </td>
              <td style={{ padding: '10px 14px', fontFamily: 'DM Sans', fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                {s.level}
              </td>
              <td style={{ padding: '10px 14px', fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'var(--text-secondary)' }}>
                {s.value}
              </td>
              <td style={{ padding: '10px 14px', fontFamily: 'DM Sans', fontSize: '13px', color: 'var(--text-primary)' }}>
                {s.usage}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
}

export const ElevationStack: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '640px' }}>
      <p style={{ margin: 0, fontFamily: 'DM Sans', fontSize: '13px', color: 'var(--text-secondary)' }}>
        Contexto real de como cada nível se comporta sobre o fundo.
      </p>

      {/* Page base */}
      <div style={{
        background: 'var(--surface-secondary)',
        borderRadius: '12px', padding: '32px',
        position: 'relative',
      }}>
        <p style={{ margin: '0 0 20px', fontFamily: 'DM Sans', fontSize: '12px', color: 'var(--text-secondary)' }}>
          Superfície base (surface-secondary)
        </p>

        {/* Card */}
        <div style={{
          background: 'var(--surface-primary)',
          borderRadius: '10px', padding: '20px',
          boxShadow: SHADOWS[2].value,
          marginBottom: '20px',
        }}>
          <p style={{ margin: '0 0 12px', fontFamily: 'Nunito', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Card (shadow-md, nível 3)
          </p>

          {/* Dropdown */}
          <div style={{
            background: 'var(--surface-primary)',
            borderRadius: '8px', padding: '8px',
            boxShadow: SHADOWS[1].value,
            border: '0.5px solid var(--border-default)',
            display: 'inline-block',
            minWidth: '200px',
          }}>
            <p style={{ margin: '0 0 4px', fontFamily: 'DM Sans', fontSize: '12px', color: 'var(--text-secondary)' }}>
              Dropdown (shadow-sm, nível 2)
            </p>
            {['Opção A', 'Opção B', 'Opção C'].map((o) => (
              <div key={o} style={{ padding: '6px 8px', borderRadius: '6px', fontFamily: 'DM Sans', fontSize: '13px', color: 'var(--text-primary)' }}>
                {o}
              </div>
            ))}
          </div>
        </div>

        {/* Modal overlay hint */}
        <div style={{
          position: 'relative',
          background: 'rgba(0,0,0,0.35)',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex', justifyContent: 'center',
        }}>
          <div style={{
            background: 'var(--surface-primary)',
            borderRadius: '10px', padding: '20px',
            boxShadow: SHADOWS[3].value,
            maxWidth: '320px', width: '100%',
          }}>
            <p style={{ margin: 0, fontFamily: 'Nunito', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Modal (shadow-lg, nível 4)
            </p>
            <p style={{ margin: '4px 0 0', fontFamily: 'DM Sans', fontSize: '12px', color: 'var(--text-secondary)' }}>
              Sobre um backdrop semitransparente.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
}
