import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof Modal>

function ModalDemo(props: Omit<React.ComponentProps<typeof Modal>, 'open' | 'onClose'>) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal {...props} open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export const Default: Story = {
  render: () => (
    <ModalDemo
      title="Confirmar ação"
      description="Tem certeza que deseja continuar com esta operação?"
      confirmLabel="Confirmar"
      cancelLabel="Cancelar"
      onConfirm={() => {}}
    />
  ),
}

export const Danger: Story = {
  render: () => (
    <ModalDemo
      variant="danger"
      title="Deletar keyword"
      description="Esta ação não pode ser desfeita. A keyword será removida permanentemente do seu tracking."
      confirmLabel="Deletar"
      cancelLabel="Cancelar"
      onConfirm={() => {}}
    />
  ),
}

export const WithForm: Story = {
  render: () => (
    <ModalDemo
      title="Adicionar Keyword"
      description="Insira uma nova keyword para começar a monitorar."
      confirmLabel="Adicionar"
      cancelLabel="Cancelar"
      onConfirm={() => {}}
    >
      <div className="flex flex-col gap-3 mt-1">
        <Input label="Keyword" placeholder="ex: globoplay" />
        <Input label="Categoria" placeholder="ex: Entretenimento" />
      </div>
    </ModalDemo>
  ),
}

export const InfoOnly: Story = {
  render: () => (
    <ModalDemo
      size="sm"
      title="Atalho de teclado"
      description="Pressione Esc para fechar este modal a qualquer momento."
    />
  ),
}

export const Large: Story = {
  render: () => (
    <ModalDemo
      size="lg"
      title="Detalhes da keyword"
      description="Histórico completo de posicionamento e volume de busca."
      confirmLabel="Fechar"
      onConfirm={() => {}}
    >
      <div className="flex flex-col gap-2 mt-1">
        {['globoplay', 'bbb', 'novela', 'futebol ao vivo', 'jornal nacional'].map(kw => (
          <div key={kw} className="flex items-center justify-between py-2 border-b border-[0.5px] border-[var(--border-default)] last:border-0">
            <span className="font-sans text-[13px]" style={{ color: 'var(--text-primary)' }}>{kw}</span>
            <span className="font-sans text-[12px]" style={{ color: 'var(--text-secondary)' }}>Top 10 · Volume alto</span>
          </div>
        ))}
      </div>
    </ModalDemo>
  ),
}
