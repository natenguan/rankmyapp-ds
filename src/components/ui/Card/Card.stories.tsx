import type { Meta, StoryObj } from '@storybook/react'
import { Card, MetricCard, CardHeader, CardTitle, CardContent } from './Card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    selected: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-sans text-[14px] text-secondary-ds">Card content goes here.</p>
      </CardContent>
    </Card>
  ),
}

export const Selected: Story = {
  render: () => (
    <Card selected className="max-w-sm">
      <CardHeader><CardTitle>Selected Card</CardTitle></CardHeader>
      <CardContent>
        <p className="font-sans text-[14px] text-secondary-ds">This card is selected.</p>
      </CardContent>
    </Card>
  ),
}

export const MetricCards: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-[10px] p-4">
      <MetricCard label="Impressions" value="124.5K" delta={12} deltaLabel="+12%" />
      <MetricCard label="Downloads" value="8,230" delta={-3} deltaLabel="-3%" />
      <MetricCard label="Rating" value="4.7" delta={0} />
      <MetricCard label="Keywords Ranked" value="342" delta={18} deltaLabel="+18" />
    </div>
  ),
}
