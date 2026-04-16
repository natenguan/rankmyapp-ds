import type { Meta, StoryObj } from '@storybook/react'
import { Spinner, LoadingOverlay, InlineLoader } from './Spinner'

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Spinner size="xs" />
        <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'DM Sans' }}>xs</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Spinner size="sm" />
        <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'DM Sans' }}>sm</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Spinner size="md" />
        <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'DM Sans' }}>md</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Spinner size="lg" />
        <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'DM Sans' }}>lg</span>
      </div>
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <Spinner size="md" color="#1A88FF" />
      <Spinner size="md" color="#07C6C3" />
      <Spinner size="md" color="#E24B4A" />
      <Spinner size="md" color="#FF5700" />
      <Spinner size="md" color="#8243FF" />
      <Spinner size="md" color="var(--text-secondary)" />
    </div>
  ),
}

export const InlineWithText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Spinner size="sm" />
        <span style={{ fontSize: '13px', fontFamily: 'DM Sans', color: 'var(--text-primary)' }}>
          Buscando keywords...
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Spinner size="xs" color="var(--text-secondary)" />
        <span style={{ fontSize: '12px', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>
          Atualizando dados
        </span>
      </div>
    </div>
  ),
}

export const InsideButton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <button
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          height: '36px', padding: '0 16px',
          fontSize: '13px', fontFamily: 'DM Sans', fontWeight: 500,
          backgroundColor: '#1A88FF', color: '#fff',
          border: 'none', borderRadius: '8px', cursor: 'pointer',
          opacity: 0.8,
        }}
      >
        <Spinner size="xs" color="#fff" />
        Salvando...
      </button>
      <button
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          height: '36px', padding: '0 16px',
          fontSize: '13px', fontFamily: 'DM Sans', fontWeight: 500,
          backgroundColor: 'transparent', color: 'var(--text-primary)',
          border: '1px solid var(--border-emphasis)', borderRadius: '8px', cursor: 'pointer',
        }}
      >
        <Spinner size="xs" color="var(--text-secondary)" />
        Exportando
      </button>
    </div>
  ),
}

export const OverlayPreview: Story = {
  render: () => (
    <div style={{ position: 'relative', height: '200px', border: '1px solid var(--border-default)', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ padding: '24px', fontFamily: 'DM Sans', fontSize: '13px', color: 'var(--text-secondary)' }}>
        Conteúdo da página em background...
      </div>
      <div
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px',
          backgroundColor: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(2px)',
        }}
      >
        <Spinner size="lg" />
        <span style={{ fontSize: '13px', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>
          Carregando dados...
        </span>
      </div>
    </div>
  ),
}

export const ShimmerLines: Story = {
  render: () => (
    <div style={{ maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <InlineLoader width="60%" height={14} />
      <InlineLoader width="100%" height={14} />
      <InlineLoader width="80%" height={14} />
      <div style={{ height: '8px' }} />
      <InlineLoader width="100%" height={80} />
    </div>
  ),
}
