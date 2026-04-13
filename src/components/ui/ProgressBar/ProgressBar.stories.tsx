import type { Meta, StoryObj } from '@storybook/react'
import { ProgressBar } from './ProgressBar'

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    tier: { control: 'select', options: ['top10', 'top20', 'top30', 'top40', 'top50'] },
    value: { control: { type: 'range', min: 0, max: 100 } },
    showValue: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  args: { value: 65, tier: 'top10', label: 'Keyword' },
}

export const RankingTiers: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4 max-w-xs">
      <ProgressBar value={92} tier="top10" label="Top 10" />
      <ProgressBar value={75} tier="top20" label="Top 20" />
      <ProgressBar value={58} tier="top30" label="Top 30" />
      <ProgressBar value={40} tier="top40" label="Top 40" />
      <ProgressBar value={22} tier="top50" label="Top 50" />
    </div>
  ),
}
