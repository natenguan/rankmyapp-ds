import type { Meta, StoryObj } from '@storybook/react'
import { MetricCard } from './MetricCard'

const meta: Meta<typeof MetricCard> = {
  title: 'Components/MetricCard',
  component: MetricCard,
  parameters: { layout: 'padded' },
  argTypes: {
    label:     { control: 'text' },
    value:     { control: 'text' },
    delta:     { control: 'text' },
    deltaType: { control: 'select', options: ['positive', 'negative', 'neutral'] },
    variant:   { control: 'select', options: ['default', 'growing', 'dropping', 'stable'] },
    size:      { control: 'select', options: ['sm', 'md'] },
    loading:   { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof MetricCard>

export const Default: Story = {
  args: {
    label: 'Total Keywords',
    value: 60,
    delta: 'sem variação',
    deltaType: 'neutral',
  },
}

export const Growing: Story = {
  args: {
    label: 'Growing Keywords',
    value: 17,
    delta: '3 vs ontem',
    deltaType: 'positive',
    variant: 'growing',
  },
}

export const Dropping: Story = {
  args: {
    label: 'Dropping Keywords',
    value: 15,
    delta: '2 vs ontem',
    deltaType: 'negative',
    variant: 'dropping',
  },
}

export const Stable: Story = {
  args: {
    label: 'Stable Keywords',
    value: 28,
    delta: 'sem variação',
    deltaType: 'neutral',
    variant: 'stable',
  },
}

export const WithRating: Story = {
  args: {
    label: 'App Store Rating',
    value: '4.55 ★',
    delta: 'sem variação',
    deltaType: 'neutral',
  },
}

export const Loading: Story = {
  args: { loading: true, label: 'Growing Keywords', value: 0 },
}

export const SmallSize: Story = {
  args: {
    label: 'Keywords',
    value: 60,
    size: 'sm',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10 }}>
      <MetricCard label="Growing Keywords" value={17} delta="3 vs ontem" deltaType="positive" variant="growing" />
      <MetricCard label="Dropping Keywords" value={15} delta="2 vs ontem" deltaType="negative" variant="dropping" />
      <MetricCard label="Stable Keywords" value={28} delta="sem variação" deltaType="neutral" variant="stable" />
      <MetricCard label="Total Keywords" value={60} delta="sem variação" deltaType="neutral" />
    </div>
  ),
}

export const Pending: Story = {
  args: {
    label: 'Keywords top 10',
    value: '—',
    pending: true,
    pendingLabel: 'Configurar keywords',
    pendingHref: '/keywords',
  },
}

export const PendingComparison: Story = {
  name: 'Pending vs Configurado',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
      <MetricCard label="Keywords top 10" value={0} pending pendingLabel="Configurar keywords" pendingHref="/keywords" />
      <MetricCard label="Keywords top 10" value={12} delta="▲ 2 vs período anterior" deltaType="positive" variant="growing" />
    </div>
  ),
}
