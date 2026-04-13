import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './Alert'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
    title: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: { variant: 'info', title: 'Heads up!', children: 'This is an informational message.' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4 max-w-lg">
      <Alert variant="info" title="Info">Your keywords are being updated.</Alert>
      <Alert variant="success" title="Success">Analysis completed successfully.</Alert>
      <Alert variant="warning" title="Warning">Your plan is about to expire.</Alert>
      <Alert variant="danger" title="Error">Failed to load keyword data.</Alert>
    </div>
  ),
}
