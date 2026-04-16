import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb } from './Breadcrumb'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  render: () => (
    <Breadcrumb items={[
      { label: 'Apps', href: '#' },
      { label: 'Globoplay', href: '#' },
      { label: 'Keywords' },
    ]} />
  ),
}

export const Short: Story = {
  render: () => (
    <Breadcrumb items={[
      { label: 'Dashboard', href: '#' },
      { label: 'Relatórios' },
    ]} />
  ),
}

export const Deep: Story = {
  render: () => (
    <Breadcrumb items={[
      { label: 'Apps', href: '#' },
      { label: 'Globoplay', href: '#' },
      { label: 'Google Play', href: '#' },
      { label: 'Keywords', href: '#' },
      { label: 'futebol ao vivo' },
    ]} />
  ),
}

export const InPageHeader: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <Breadcrumb items={[
        { label: 'Apps', href: '#' },
        { label: 'Globoplay', href: '#' },
        { label: 'Keywords' },
      ]} />
      <h1 style={{ margin: 0, fontSize: '22px', fontFamily: 'Nunito', fontWeight: 700, color: 'var(--text-primary)' }}>
        Gerenciar Keywords
      </h1>
    </div>
  ),
}
