import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'
import { Button } from '../Button/Button'
import { Badge } from '../Badge/Badge'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: () => (
    <Tooltip content="Posição média nos últimos 7 dias">
      <Button variant="ghost" size="sm">Hover aqui</Button>
    </Tooltip>
  ),
}

export const AllSides: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-12">
      <div className="flex justify-center">
        <Tooltip content="Tooltip no topo" side="top">
          <Button variant="ghost" size="sm">Top</Button>
        </Tooltip>
      </div>
      <div className="flex justify-center">
        <Tooltip content="Tooltip na base" side="bottom">
          <Button variant="ghost" size="sm">Bottom</Button>
        </Tooltip>
      </div>
      <div className="flex justify-center">
        <Tooltip content="Tooltip à esquerda" side="left">
          <Button variant="ghost" size="sm">Left</Button>
        </Tooltip>
      </div>
      <div className="flex justify-center">
        <Tooltip content="Tooltip à direita" side="right">
          <Button variant="ghost" size="sm">Right</Button>
        </Tooltip>
      </div>
    </div>
  ),
}

export const OnBadge: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="Keywords crescendo de posição">
        <Badge status="growing">Growing · 17</Badge>
      </Tooltip>
      <Tooltip content="Keywords perdendo posição">
        <Badge status="dropping">Dropping · 4</Badge>
      </Tooltip>
      <Tooltip content="Keywords estáveis nos últimos 7 dias">
        <Badge status="stable">Stable · 28</Badge>
      </Tooltip>
    </div>
  ),
}

export const LongContent: Story = {
  render: () => (
    <Tooltip content="Search Volume indica quantas buscas mensais esta keyword recebe na loja">
      <span className="font-sans text-[13px] underline decoration-dashed cursor-help" style={{ color: 'var(--text-secondary)' }}>
        O que é Search Volume?
      </span>
    </Tooltip>
  ),
}
