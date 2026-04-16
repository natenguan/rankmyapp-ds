import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: '360px' }}>
      <Textarea label="Descrição" placeholder="Descreva o contexto do app..." />
    </div>
  ),
}

export const WithHint: Story = {
  render: () => (
    <div style={{ maxWidth: '360px' }}>
      <Textarea
        label="Notas internas"
        hint="Visível apenas para o time. Máximo 500 caracteres."
        placeholder="Adicione observações sobre esta keyword..."
        rows={5}
      />
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div style={{ maxWidth: '360px' }}>
      <Textarea
        label="Motivo"
        error="Este campo é obrigatório."
        placeholder="Descreva o motivo..."
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: '360px' }}>
      <Textarea
        label="Observações"
        defaultValue="Conteúdo somente leitura gerado automaticamente."
        disabled
      />
    </div>
  ),
}

export const AllStates: Story = {
  render: () => (
    <div style={{ maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Textarea label="Padrão" placeholder="Placeholder..." />
      <Textarea label="Com hint" hint="Texto auxiliar." placeholder="Placeholder..." />
      <Textarea label="Com erro" error="Campo obrigatório." placeholder="Placeholder..." />
      <Textarea label="Desabilitado" defaultValue="Conteúdo fixo." disabled />
    </div>
  ),
}
