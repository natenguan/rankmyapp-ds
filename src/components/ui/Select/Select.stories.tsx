import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Select } from './Select'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Select>

const CATEGORIES = [
  { value: 'entertainment', label: 'Entretenimento' },
  { value: 'sports', label: 'Esportes' },
  { value: 'news', label: 'Notícias' },
  { value: 'finance', label: 'Finanças' },
  { value: 'health', label: 'Saúde & Fitness' },
  { value: 'travel', label: 'Viagens' },
  { value: 'food', label: 'Comida & Bebida' },
  { value: 'education', label: 'Educação' },
]

function Controlled({ label, hint, error, searchable }: {
  label?: string; hint?: string; error?: string; searchable?: boolean
}) {
  const [value, setValue] = useState<string>('')
  return (
    <div style={{ maxWidth: '280px' }}>
      <Select
        options={CATEGORIES}
        value={value}
        onChange={setValue}
        label={label}
        hint={hint}
        error={error}
        searchable={searchable}
      />
    </div>
  )
}

export const Default: Story = {
  render: () => <Controlled label="Categoria" />,
}

export const WithHint: Story = {
  render: () => (
    <Controlled
      label="Categoria do app"
      hint="Selecione a categoria principal da loja."
    />
  ),
}

export const WithError: Story = {
  render: () => (
    <Controlled
      label="Categoria"
      error="Selecione uma categoria para continuar."
    />
  ),
}

export const Searchable: Story = {
  render: () => (
    <Controlled
      label="Categoria"
      hint="Digite para filtrar as opções."
      searchable
    />
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: '280px' }}>
      <Select
        options={CATEGORIES}
        value="sports"
        label="Categoria"
        disabled
      />
    </div>
  ),
}

export const WithDisabledOptions: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div style={{ maxWidth: '280px' }}>
        <Select
          label="Plataforma"
          options={[
            { value: 'android', label: 'Google Play' },
            { value: 'ios', label: 'App Store' },
            { value: 'huawei', label: 'Huawei AppGallery', disabled: true },
            { value: 'amazon', label: 'Amazon Appstore', disabled: true },
          ]}
          value={value}
          onChange={setValue}
          hint="Huawei e Amazon em breve."
        />
      </div>
    )
  },
}
