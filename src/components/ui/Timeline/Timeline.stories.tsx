import type { Meta, StoryObj } from '@storybook/react'
import { Timeline } from './Timeline'

const meta: Meta<typeof Timeline> = {
  title: 'Components/Timeline',
  component: Timeline,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof Timeline>

const MOCK_EVENTS = [
  { date: '18/04', description: 'Nova versão v9.98.1 publicada', tag: 'App Version', tagVariant: 'blue' as const },
  { date: '18/04', description: 'Pico negativo de rating: 3,77 estrelas (pior dia do período)', tag: 'Rating', tagVariant: 'red' as const },
  { date: '14/04', description: 'Pico negativo de rating: 3,92 estrelas', tag: 'Rating', tagVariant: 'orange' as const },
  { date: '10/04', description: 'Subtitle atualizado: "Cartão de Crédito, Débito, Pix"', tag: 'Metadata', tagVariant: 'purple' as const },
  { date: '07/04', description: 'Subiu 2 posições na categoria Finanças (#16 → #14)', tag: 'Posição', tagVariant: 'green' as const },
]

export const Default: Story = {
  args: {
    events: MOCK_EVENTS,
    footerLabel: 'Ver todos',
    footerHref: '#',
  },
}

export const SemFooter: Story = {
  args: {
    events: MOCK_EVENTS.slice(0, 3),
  },
}

export const EventoUnico: Story = {
  args: {
    events: [MOCK_EVENTS[0]],
  },
}
