import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarGroup } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Initials: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Avatar name="Natalia Tenguan" size="xl" />
      <Avatar name="Matheus Terra" size="lg" />
      <Avatar name="Carlos Silva" size="md" />
      <Avatar name="Ana Luiza" size="sm" />
      <Avatar name="R" size="xs" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(s => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <Avatar name="Natalia Tenguan" size={s} />
          <span style={{ fontSize: '11px', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>{s}</span>
        </div>
      ))}
    </div>
  ),
}

export const WithStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      {(['online', 'offline', 'away', 'busy'] as const).map(s => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <Avatar name="Natalia T" size="md" status={s} />
          <span style={{ fontSize: '11px', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>{s}</span>
        </div>
      ))}
    </div>
  ),
}

export const RoundedShape: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Avatar name="Globoplay" size="lg" shape="rounded" />
      <Avatar name="SporTV" size="md" shape="rounded" />
      <Avatar name="GShow" size="sm" shape="rounded" />
    </div>
  ),
}

export const ColorPalette: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
      {['Ana Lima', 'Bruno Costa', 'Carlos Dias', 'Diana Faria', 'Eduardo Melo', 'Fernanda Roque'].map(n => (
        <Avatar key={n} name={n} size="md" />
      ))}
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <AvatarGroup
        size="md"
        avatars={[
          { name: 'Natalia Tenguan' },
          { name: 'Matheus Terra' },
          { name: 'Carlos Silva' },
          { name: 'Ana Luiza' },
          { name: 'Eduardo Melo' },
          { name: 'Fernanda Roque' },
        ]}
        max={4}
      />
      <AvatarGroup
        size="sm"
        avatars={[
          { name: 'Natalia Tenguan' },
          { name: 'Matheus Terra' },
          { name: 'Carlos Silva' },
        ]}
        max={5}
      />
    </div>
  ),
}
