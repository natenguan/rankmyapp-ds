import type { Meta, StoryObj } from '@storybook/react'
import { Info, Filter } from 'lucide-react'
import { Popover } from './Popover'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Popover>

const TriggerBtn = ({ label }: { label: string }) => (
  <button style={{
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    height: '34px', padding: '0 12px',
    fontSize: '13px', fontFamily: 'DM Sans', fontWeight: 500,
    backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)',
    border: '0.5px solid var(--border-emphasis)', borderRadius: '8px', cursor: 'pointer',
  }}>
    {label}
  </button>
)

export const Default: Story = {
  render: () => (
    <div style={{ paddingTop: '16px' }}>
      <Popover trigger={<TriggerBtn label="Abrir popover" />}>
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ margin: 0, fontSize: '13px', fontFamily: 'Nunito', fontWeight: 600, color: 'var(--text-primary)' }}>
            Informação
          </p>
          <p style={{ margin: 0, fontSize: '13px', fontFamily: 'DM Sans', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Este popover aparece ao clicar no trigger. Clique fora para fechar.
          </p>
        </div>
      </Popover>
    </div>
  ),
}

export const FilterPopover: Story = {
  render: () => (
    <div style={{ paddingTop: '16px' }}>
      <Popover
        trigger={
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            height: '34px', padding: '0 12px',
            fontSize: '13px', fontFamily: 'DM Sans', fontWeight: 500,
            backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)',
            border: '0.5px solid var(--border-emphasis)', borderRadius: '8px', cursor: 'pointer',
          }}>
            <Filter size={14} /> Filtros
          </button>
        }
      >
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', width: '240px' }}>
          <p style={{ margin: 0, fontSize: '13px', fontFamily: 'Nunito', fontWeight: 600, color: 'var(--text-primary)' }}>
            Filtrar keywords
          </p>
          {['Top 3', 'Top 10', 'Top 50', 'Fora do top 100'].map(opt => (
            <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked={opt === 'Top 10'} style={{ accentColor: '#1A88FF' }} />
              <span style={{ fontSize: '13px', fontFamily: 'DM Sans', color: 'var(--text-primary)' }}>{opt}</span>
            </label>
          ))}
        </div>
      </Popover>
    </div>
  ),
}

export const InfoPopover: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingTop: '16px' }}>
      <span style={{ fontSize: '13px', fontFamily: 'DM Sans', color: 'var(--text-primary)' }}>
        Score de relevância
      </span>
      <Popover
        trigger={<Info size={14} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} />}
        side="top"
      >
        <div style={{ padding: '12px 14px', maxWidth: '240px' }}>
          <p style={{ margin: 0, fontSize: '12px', fontFamily: 'DM Sans', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Indica o quanto essa keyword é relevante para o seu app com base em volume de busca e dificuldade de rankeamento.
          </p>
        </div>
      </Popover>
    </div>
  ),
}

export const Sides: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: '80px 40px' }}>
      {(['bottom', 'top', 'right', 'left'] as const).map(side => (
        <div key={side} style={{ display: 'flex', justifyContent: 'center' }}>
          <Popover side={side} trigger={<TriggerBtn label={side} />}>
            <div style={{ padding: '10px 14px' }}>
              <p style={{ margin: 0, fontSize: '12px', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>
                side="{side}"
              </p>
            </div>
          </Popover>
        </div>
      ))}
    </div>
  ),
}
