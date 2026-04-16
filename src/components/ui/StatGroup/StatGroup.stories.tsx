import type { Meta, StoryObj } from '@storybook/react'
import { StatGroup } from './StatGroup'
import { MetricCard } from '../MetricCard/MetricCard'

const meta: Meta<typeof StatGroup> = {
  title: 'Components/StatGroup',
  component: StatGroup,
  parameters: { layout: 'padded' },
  argTypes: {
    columns: { control: 'select', options: [2, 3, 4] },
    title:   { control: 'text' },
    loading: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof StatGroup>

export const FourColumns: Story = {
  render: () => (
    <StatGroup columns={4}>
      <MetricCard label="Growing Keywords" value={17} delta="3 vs ontem" deltaType="positive" variant="growing" />
      <MetricCard label="Dropping Keywords" value={15} delta="2 vs ontem" deltaType="negative" variant="dropping" />
      <MetricCard label="Stable Keywords" value={28} delta="sem variação" deltaType="neutral" variant="stable" />
      <MetricCard label="Total Keywords" value={60} delta="sem variação" deltaType="neutral" />
    </StatGroup>
  ),
}

export const TwoColumns: Story = {
  render: () => (
    <StatGroup columns={2}>
      <MetricCard label="App Store Rating" value="4.7 ★" delta="sem variação" deltaType="neutral" />
      <MetricCard label="Downloads" value="8,230" delta="3% vs semana passada" deltaType="negative" variant="dropping" />
    </StatGroup>
  ),
}

export const ThreeColumns: Story = {
  render: () => (
    <StatGroup columns={3}>
      <MetricCard label="Impressions" value="124.5K" delta="12% vs semana passada" deltaType="positive" variant="growing" />
      <MetricCard label="Downloads" value="8,230" delta="3% vs semana passada" deltaType="negative" variant="dropping" />
      <MetricCard label="Rating" value="4.7 ★" delta="sem variação" deltaType="neutral" />
    </StatGroup>
  ),
}

export const WithTitle: Story = {
  render: () => (
    <StatGroup columns={4} title="Visão geral de keywords">
      <MetricCard label="Growing Keywords" value={17} delta="3 vs ontem" deltaType="positive" variant="growing" />
      <MetricCard label="Dropping Keywords" value={15} delta="2 vs ontem" deltaType="negative" variant="dropping" />
      <MetricCard label="Stable Keywords" value={28} delta="sem variação" deltaType="neutral" variant="stable" />
      <MetricCard label="Total Keywords" value={60} delta="sem variação" deltaType="neutral" />
    </StatGroup>
  ),
}

export const Loading: Story = {
  render: () => (
    <StatGroup columns={4} loading={true}>
      <MetricCard label="Growing Keywords" value={0} />
      <MetricCard label="Dropping Keywords" value={0} />
      <MetricCard label="Stable Keywords" value={0} />
      <MetricCard label="Total Keywords" value={0} />
    </StatGroup>
  ),
}

export const MixedVariants: Story = {
  render: () => (
    <StatGroup columns={4}>
      <MetricCard label="Growing Keywords" value={17} delta="3 vs ontem" deltaType="positive" variant="growing" />
      <MetricCard label="Dropping Keywords" value={15} delta="2 vs ontem" deltaType="negative" variant="dropping" />
      <MetricCard label="Stable Keywords" value={28} delta="sem variação" deltaType="neutral" variant="stable" />
      <MetricCard label="Total Keywords" value={60} delta="sem variação" deltaType="neutral" variant="default" />
    </StatGroup>
  ),
}

export const RealWorldExample: Story = {
  render: () => (
    <StatGroup columns={4} title="Visão geral">
      <MetricCard label="Impressions" value="124.5K" delta="12% vs semana passada" deltaType="positive" variant="growing" />
      <MetricCard label="Downloads" value="8,230" delta="3% vs semana passada" deltaType="negative" variant="dropping" />
      <MetricCard label="Rating" value="4.7 ★" delta="sem variação" deltaType="neutral" />
      <MetricCard label="Keywords Ranked" value={342} delta="18 vs semana passada" deltaType="positive" variant="growing" />
    </StatGroup>
  ),
}
