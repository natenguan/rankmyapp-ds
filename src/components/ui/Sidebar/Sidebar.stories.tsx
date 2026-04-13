import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from './Sidebar'

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof Sidebar>

const groups = [
  {
    label: 'Principal',
    items: [
      { label: 'My Apps', active: true },
      { label: 'Action Plan' },
      { label: 'Competitors' },
      { label: 'Changes Log' },
    ],
  },
  {
    label: 'Análise',
    items: [
      { label: 'Explore Source' },
      { label: 'Search Source' },
      { label: 'Ratings & Reviews' },
      { label: 'Technical Performance' },
    ],
  },
  {
    label: 'Avançado',
    items: [
      { label: 'Data Export' },
      { label: 'Custom Pages' },
      { label: 'Advanced Search' },
      { label: 'Anomaly Detection' },
    ],
  },
]

export const Default: Story = {
  render: () => (
    <div className="h-screen">
      <Sidebar groups={groups} />
    </div>
  ),
}
