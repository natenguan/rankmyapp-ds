import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['blue', 'green', 'orange', 'red', 'purple', 'gray'] },
    status: { control: 'select', options: ['growing', 'stable', 'dropping', 'critical'] },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: { children: 'Badge', variant: 'blue' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 p-4">
      <Badge variant="blue">Blue</Badge>
      <Badge variant="green">Green</Badge>
      <Badge variant="orange">Orange</Badge>
      <Badge variant="red">Red</Badge>
      <Badge variant="purple">Purple</Badge>
      <Badge variant="gray">Gray</Badge>
    </div>
  ),
}

export const KeywordStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 p-4">
      <Badge status="growing">Growing</Badge>
      <Badge status="stable">Stable</Badge>
      <Badge status="dropping">Dropping</Badge>
      <Badge status="critical">Critical</Badge>
    </div>
  ),
}
