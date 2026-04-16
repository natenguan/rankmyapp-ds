import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from './Divider'

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Divider>

export const Horizontal: Story = {
  render: () => (
    <div style={{ maxWidth: '480px', display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontFamily: 'DM Sans', fontSize: '13px', color: 'var(--text-primary)' }}>
        Seção acima
      </span>
      <Divider spacing={16} />
      <span style={{ fontFamily: 'DM Sans', fontSize: '13px', color: 'var(--text-primary)' }}>
        Seção abaixo
      </span>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div style={{ maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {(['solid', 'dashed', 'dotted'] as const).map((v) => (
        <div key={v}>
          <span style={{ fontFamily: 'DM Sans', fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
            {v}
          </span>
          <Divider variant={v} spacing={8} />
        </div>
      ))}
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div style={{ maxWidth: '480px', display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontFamily: 'DM Sans', fontSize: '13px', color: 'var(--text-primary)' }}>
        Conteúdo acima
      </span>
      <Divider label="ou" spacing={16} />
      <span style={{ fontFamily: 'DM Sans', fontSize: '13px', color: 'var(--text-primary)' }}>
        Conteúdo abaixo
      </span>
    </div>
  ),
}

export const WithLabelVariants: Story = {
  render: () => (
    <div style={{ maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <Divider label="Resultados orgânicos" spacing={16} />
      <Divider label="Resultados pagos" spacing={16} variant="dashed" />
      <Divider label="Sem dados" spacing={16} color="var(--border-emphasis)" />
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', height: '48px', gap: '0px' }}>
      <span style={{ fontFamily: 'DM Sans', fontSize: '13px', color: 'var(--text-primary)', padding: '0 12px' }}>
        Downloads
      </span>
      <Divider orientation="vertical" spacing={12} />
      <span style={{ fontFamily: 'DM Sans', fontSize: '13px', color: 'var(--text-primary)', padding: '0 12px' }}>
        Reviews
      </span>
      <Divider orientation="vertical" spacing={12} />
      <span style={{ fontFamily: 'DM Sans', fontSize: '13px', color: 'var(--text-primary)', padding: '0 12px' }}>
        Rating
      </span>
    </div>
  ),
}

export const InCard: Story = {
  render: () => (
    <div style={{
      maxWidth: '360px',
      background: 'var(--surface-primary)',
      border: '0.5px solid var(--border-default)',
      borderRadius: '12px',
      padding: '20px',
    }}>
      <p style={{ margin: '0 0 4px', fontFamily: 'Nunito', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
        Globoplay
      </p>
      <p style={{ margin: 0, fontFamily: 'DM Sans', fontSize: '12px', color: 'var(--text-secondary)' }}>
        Entretenimento · Globo Comunicação e Participações S.A.
      </p>
      <Divider spacing={16} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <p style={{ margin: '0 0 2px', fontFamily: 'DM Sans', fontSize: '11px', color: 'var(--text-secondary)' }}>Rating</p>
          <p style={{ margin: 0, fontFamily: 'Nunito', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>4.3</p>
        </div>
        <Divider orientation="vertical" spacing={0} />
        <div>
          <p style={{ margin: '0 0 2px', fontFamily: 'DM Sans', fontSize: '11px', color: 'var(--text-secondary)' }}>Reviews</p>
          <p style={{ margin: 0, fontFamily: 'Nunito', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>238k</p>
        </div>
        <Divider orientation="vertical" spacing={0} />
        <div>
          <p style={{ margin: '0 0 2px', fontFamily: 'DM Sans', fontSize: '11px', color: 'var(--text-secondary)' }}>Downloads</p>
          <p style={{ margin: 0, fontFamily: 'Nunito', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>12M</p>
        </div>
      </div>
    </div>
  ),
}
