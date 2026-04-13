import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from './Toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  args: { label: 'Enable notifications' },
}

function ToggleDemo() {
  const [checked, setChecked] = useState(false)
  return (
    <div className="flex flex-col gap-4 p-4">
      <Toggle id="t1" checked={checked} onCheckedChange={setChecked} label="Dark mode" />
      <Toggle id="t2" defaultChecked label="Auto-refresh data" />
      <Toggle id="t3" disabled label="Premium feature (disabled)" />
    </div>
  )
}

export const AllStates: Story = {
  render: () => <ToggleDemo />,
}
