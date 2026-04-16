import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <Checkbox
        checked={checked}
        onChange={setChecked}
        label="Receber notificações por e-mail"
        id="cb-default"
      />
    )
  },
}

export const Checked: Story = {
  render: () => (
    <Checkbox checked label="Opção selecionada" />
  ),
}

export const Indeterminate: Story = {
  render: () => (
    <Checkbox indeterminate label="Selecionar todos (parcial)" />
  ),
}

export const WithHint: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <Checkbox
        checked={checked}
        onChange={setChecked}
        label="Ativar rastreamento de posição"
        hint="Monitora variações diárias no ranking da keyword."
        id="cb-hint"
      />
    )
  },
}

export const WithError: Story = {
  render: () => (
    <Checkbox
      checked={false}
      label="Aceito os termos de uso"
      error="Você precisa aceitar os termos para continuar."
      id="cb-error"
    />
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Checkbox checked={false} label="Desabilitado desmarcado" disabled />
      <Checkbox checked label="Desabilitado marcado" disabled />
    </div>
  ),
}

export const Group: Story = {
  render: () => {
    const options = ['Google Play', 'App Store', 'Huawei AppGallery']
    const [selected, setSelected] = useState<string[]>(['Google Play'])

    const toggle = (opt: string) =>
      setSelected(prev =>
        prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
      )

    const allChecked = selected.length === options.length
    const someChecked = selected.length > 0 && !allChecked

    const toggleAll = () =>
      setSelected(allChecked ? [] : options)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Checkbox
          checked={allChecked}
          indeterminate={someChecked}
          onChange={toggleAll}
          label="Todas as plataformas"
          id="cb-all"
        />
        <div style={{ paddingLeft: '26px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {options.map(opt => (
            <Checkbox
              key={opt}
              checked={selected.includes(opt)}
              onChange={() => toggle(opt)}
              label={opt}
              id={`cb-${opt}`}
            />
          ))}
        </div>
      </div>
    )
  },
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox checked={false} label="Desmarcado" />
      <Checkbox checked label="Marcado" />
      <Checkbox indeterminate label="Indeterminado" />
      <Checkbox checked={false} label="Com hint" hint="Texto auxiliar." />
      <Checkbox checked={false} label="Com erro" error="Campo obrigatório." />
      <Checkbox checked={false} label="Desabilitado" disabled />
      <Checkbox checked label="Desabilitado + marcado" disabled />
    </div>
  ),
}
