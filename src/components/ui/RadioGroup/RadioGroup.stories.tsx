import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { RadioGroup } from './RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('android')
    return (
      <RadioGroup
        label="Plataforma"
        value={value}
        onChange={setValue}
        options={[
          { value: 'android', label: 'Google Play' },
          { value: 'ios', label: 'App Store' },
        ]}
      />
    )
  },
}

export const WithHints: Story = {
  render: () => {
    const [value, setValue] = useState('monthly')
    return (
      <RadioGroup
        label="Plano de cobrança"
        value={value}
        onChange={setValue}
        options={[
          { value: 'monthly', label: 'Mensal', hint: 'R$ 199/mês — cancele quando quiser.' },
          { value: 'annual',  label: 'Anual',  hint: 'R$ 159/mês — economize 20%.' },
          { value: 'trial',   label: 'Trial',  hint: '14 dias grátis, sem cartão.' },
        ]}
      />
    )
  },
}

export const Horizontal: Story = {
  render: () => {
    const [value, setValue] = useState('google')
    return (
      <RadioGroup
        label="Loja"
        value={value}
        onChange={setValue}
        orientation="horizontal"
        options={[
          { value: 'google', label: 'Google Play' },
          { value: 'apple',  label: 'App Store' },
          { value: 'huawei', label: 'Huawei', disabled: true },
        ]}
      />
    )
  },
}

export const WithError: Story = {
  render: () => (
    <RadioGroup
      label="Período de análise"
      error="Selecione um período para continuar."
      options={[
        { value: '7d',  label: 'Últimos 7 dias' },
        { value: '30d', label: 'Últimos 30 dias' },
        { value: '90d', label: 'Últimos 90 dias' },
      ]}
    />
  ),
}

export const WithDisabled: Story = {
  render: () => {
    const [value, setValue] = useState('basic')
    return (
      <RadioGroup
        label="Tipo de conta"
        value={value}
        onChange={setValue}
        options={[
          { value: 'basic',    label: 'Básico' },
          { value: 'pro',      label: 'Pro' },
          { value: 'enterprise', label: 'Enterprise', hint: 'Entre em contato com vendas.', disabled: true },
        ]}
      />
    )
  },
}
