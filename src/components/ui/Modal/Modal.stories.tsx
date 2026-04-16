import type { Meta, StoryObj } from '@storybook/react'
import { ModalDialog } from './Modal'
import { Input } from '../Input/Input'

const meta: Meta<typeof ModalDialog> = {
  title: 'Components/Modal',
  component: ModalDialog,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof ModalDialog>

function StaticModal(props: Omit<React.ComponentProps<typeof ModalDialog>, 'onClose'>) {
  return (
    <div
      style={{
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 24px',
        minHeight: '320px',
        boxSizing: 'border-box',
      }}
    >
      <ModalDialog {...props} onClose={() => {}} />
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <StaticModal
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
    <StaticModal
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
    <StaticModal
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
    </StaticModal>
  ),
}

export const InfoOnly: Story = {
  render: () => (
    <StaticModal
      size="sm"
      title="Atalho de teclado"
      description="Pressione Esc para fechar este modal a qualquer momento."
    />
  ),
}

export const Large: Story = {
  render: () => (
    <StaticModal
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
    </StaticModal>
  ),
}
