import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { MultiSelect } from './MultiSelect'

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof MultiSelect>

const CATEGORIES = [
  { value: 'entertainment', label: 'Entretenimento' },
  { value: 'sports',        label: 'Esportes' },
  { value: 'news',          label: 'Notícias' },
  { value: 'finance',       label: 'Finanças' },
  { value: 'health',        label: 'Saúde & Fitness' },
  { value: 'travel',        label: 'Viagens' },
  { value: 'food',          label: 'Comida & Bebida' },
  { value: 'education',     label: 'Educação' },
  { value: 'utilities',     label: 'Utilitários', disabled: true },
]

function Controlled(props: Partial<React.ComponentProps<typeof MultiSelect>>) {
  const [value, setValue] = useState<string[]>(props.value ?? [])
  return (
    <div style={{ maxWidth: '320px' }}>
      <MultiSelect options={CATEGORIES} value={value} onChange={setValue} {...props} />
    </div>
  )
}

export const Default: Story = {
  render: () => <Controlled label="Categorias" placeholder="Selecione categorias..." />,
}

export const WithPreselected: Story = {
  render: () => (
    <Controlled
      label="Categorias monitoradas"
      value={['entertainment', 'sports']}
      hint="Selecione todas as categorias relevantes para seu app."
    />
  ),
}

export const WithError: Story = {
  render: () => (
    <Controlled
      label="Segmentos"
      error="Selecione ao menos uma categoria."
    />
  ),
}

export const ManySelected: Story = {
  render: () => (
    <Controlled
      label="Plataformas"
      value={['entertainment', 'sports', 'news', 'finance', 'health']}
      maxDisplay={2}
    />
  ),
}
