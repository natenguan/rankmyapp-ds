import type { Meta, StoryObj } from '@storybook/react'
import { CopyButton, CopyField } from './CopyButton'

const meta: Meta<typeof CopyButton> = {
  title: 'Components/CopyButton',
  component: CopyButton,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof CopyButton>

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <CopyButton value="com.globo.play" variant="full" />
      <CopyButton value="com.globo.play" variant="text" />
      <CopyButton value="com.globo.play" variant="icon" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <CopyButton value="com.globo.play" size="sm" />
      <CopyButton value="com.globo.play" size="md" />
    </div>
  ),
}

export const Field: Story = {
  render: () => (
    <div style={{ maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <CopyField label="Bundle ID" value="com.globo.play" />
      <CopyField label="App Store URL" value="https://apps.apple.com/br/app/globoplay/id1064913951" />
      <CopyField label="API Key" value="sk_live_3kJ8mNpQ7rT9wXzY1aB4cD6eF2gH0iL5" />
    </div>
  ),
}

export const InContext: Story = {
  render: () => (
    <div
      style={{
        maxWidth: '400px',
        padding: '20px',
        borderRadius: '12px',
        border: '0.5px solid var(--border-default)',
        backgroundColor: 'var(--surface-primary)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <p style={{ margin: 0, fontSize: '14px', fontFamily: 'Nunito', fontWeight: 600, color: 'var(--text-primary)' }}>
        Detalhes do app
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <CopyField label="Bundle ID" value="com.globo.play" />
        <CopyField label="Google Play ID" value="com.globo.play" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '12px', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>
          Link para compartilhar
        </span>
        <CopyButton value="https://app.rankmyapp.com/apps/globoplay" label="Copiar link" variant="full" size="sm" />
      </div>
    </div>
  ),
}
