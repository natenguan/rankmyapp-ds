import type { Meta, StoryObj } from '@storybook/react'
import { FormField } from './FormField'
import { Input } from '../Input/Input'

const meta: Meta<typeof FormField> = {
  title: 'Components/FormField',
  component: FormField,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof FormField>

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <FormField label="Nome do app" htmlFor="app-name">
        <Input id="app-name" placeholder="ex: Globoplay" />
      </FormField>
    </div>
  ),
}

export const WithHint: Story = {
  render: () => (
    <div style={{ maxWidth: '360px' }}>
      <FormField
        label="Keyword"
        hint="Insira a keyword exata como ela aparece na loja."
        htmlFor="kw"
      >
        <Input id="kw" placeholder="ex: futebol ao vivo" />
      </FormField>
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div style={{ maxWidth: '360px' }}>
      <FormField
        label="E-mail"
        error="Formato de e-mail inválido."
        htmlFor="email"
      >
        <Input id="email" type="email" defaultValue="usuario@" />
      </FormField>
    </div>
  ),
}

export const Required: Story = {
  render: () => (
    <div style={{ maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <FormField label="Nome completo" required htmlFor="name">
        <Input id="name" placeholder="Digite seu nome" />
      </FormField>
      <FormField
        label="E-mail corporativo"
        required
        hint="Use o e-mail da sua empresa."
        htmlFor="corp-email"
      >
        <Input id="corp-email" type="email" placeholder="voce@empresa.com" />
      </FormField>
    </div>
  ),
}

export const AllStates: Story = {
  render: () => (
    <div style={{ maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <FormField label="Padrão" htmlFor="s1">
        <Input id="s1" placeholder="Placeholder..." />
      </FormField>
      <FormField label="Com hint" hint="Texto auxiliar para o campo." htmlFor="s2">
        <Input id="s2" placeholder="Placeholder..." />
      </FormField>
      <FormField label="Com erro" error="Este campo é obrigatório." htmlFor="s3">
        <Input id="s3" placeholder="Placeholder..." />
      </FormField>
      <FormField label="Obrigatório" required htmlFor="s4">
        <Input id="s4" placeholder="Placeholder..." />
      </FormField>
      <FormField label="Desabilitado" htmlFor="s5">
        <Input id="s5" placeholder="Placeholder..." disabled />
      </FormField>
    </div>
  ),
}
