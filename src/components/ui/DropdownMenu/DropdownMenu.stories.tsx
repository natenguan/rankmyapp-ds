import type { Meta, StoryObj } from '@storybook/react'
import { DropdownMenu } from './DropdownMenu'
import { Button } from '../Button/Button'
import { MoreHorizontal, Edit, Trash2, Download, Copy, EyeOff, Star } from 'lucide-react'

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

export const Default: Story = {
  render: () => (
    <DropdownMenu
      trigger={<Button variant="ghost" size="sm">Options ▾</Button>}
      items={[
        { label: 'Edit' },
        { label: 'Duplicate' },
        { label: 'Delete', variant: 'destructive', dividerBefore: true },
      ]}
    />
  ),
}

export const WithIcons: Story = {
  render: () => (
    <DropdownMenu
      trigger={
        <Button variant="ghost" size="sm">
          <MoreHorizontal size={16} />
        </Button>
      }
      items={[
        { label: 'Editar keyword', icon: <Edit size={14} /> },
        { label: 'Duplicar', icon: <Copy size={14} /> },
        { label: 'Exportar dados', icon: <Download size={14} /> },
        { label: 'Ocultar', icon: <EyeOff size={14} />, dividerBefore: true },
        { label: 'Deletar', icon: <Trash2 size={14} />, variant: 'destructive', dividerBefore: true },
      ]}
    />
  ),
}

export const WithChecked: Story = {
  render: () => (
    <DropdownMenu
      trigger={<Button variant="ghost" size="sm">Apple Store ▾</Button>}
      items={[
        { label: 'Todas as lojas', checked: false },
        { label: 'Apple Store', checked: true },
        { label: 'Play Store', checked: false },
      ]}
    />
  ),
}

export const AlignRight: Story = {
  render: () => (
    <div className="flex justify-end w-64">
      <DropdownMenu
        align="right"
        trigger={
          <Button variant="ghost" size="sm">
            <MoreHorizontal size={16} />
          </Button>
        }
        items={[
          { label: 'Ver detalhes', icon: <Star size={14} /> },
          { label: 'Exportar', icon: <Download size={14} /> },
          { label: 'Remover app', icon: <Trash2 size={14} />, variant: 'destructive', dividerBefore: true },
        ]}
      />
    </div>
  ),
}

export const WithDisabled: Story = {
  render: () => (
    <DropdownMenu
      trigger={<Button variant="ghost" size="sm">Ações ▾</Button>}
      items={[
        { label: 'Salvar alterações', icon: <Edit size={14} /> },
        { label: 'Exportar (indisponível)', icon: <Download size={14} />, disabled: true },
        { label: 'Deletar', icon: <Trash2 size={14} />, variant: 'destructive', dividerBefore: true },
      ]}
    />
  ),
}
