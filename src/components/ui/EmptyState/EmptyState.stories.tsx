import type { Meta, StoryObj } from '@storybook/react'
import { Search, Star, BarChart2, FileText, Inbox as InboxIcon, Smartphone } from 'lucide-react'
import { EmptyState } from './EmptyState'

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof EmptyState>

const PrimaryButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <button
    onClick={onClick}
    style={{
      display: 'inline-flex', alignItems: 'center', height: '36px', padding: '0 16px',
      fontSize: '13px', fontFamily: 'DM Sans', fontWeight: 500,
      backgroundColor: '#1A88FF', color: '#fff',
      border: 'none', borderRadius: '8px', cursor: 'pointer',
    }}
  >
    {children}
  </button>
)

const GhostButton = ({ children }: { children: React.ReactNode }) => (
  <button
    style={{
      display: 'inline-flex', alignItems: 'center', height: '36px', padding: '0 16px',
      fontSize: '13px', fontFamily: 'DM Sans', fontWeight: 500,
      backgroundColor: 'transparent', color: 'var(--text-primary)',
      border: '0.5px solid var(--border-emphasis)', borderRadius: '8px', cursor: 'pointer',
    }}
  >
    {children}
  </button>
)

export const NoResults: Story = {
  render: () => (
    <div style={{ border: '0.5px solid var(--border-default)', borderRadius: '12px', backgroundColor: 'var(--surface-primary)' }}>
      <EmptyState
        icon={<Search size={22} />}
        title="Nenhum resultado encontrado"
        description='Tente ajustar os filtros ou buscar por outro termo.'
      />
    </div>
  ),
}

export const NoKeywords: Story = {
  render: () => (
    <div style={{ border: '0.5px solid var(--border-default)', borderRadius: '12px', backgroundColor: 'var(--surface-primary)' }}>
      <EmptyState
        icon={<Star size={22} />}
        title="Nenhuma keyword rastreada"
        description="Adicione keywords para começar a monitorar sua posição nos resultados de busca."
        action={<PrimaryButton>Adicionar keyword</PrimaryButton>}
      />
    </div>
  ),
}

export const NoApps: Story = {
  render: () => (
    <div style={{ border: '0.5px solid var(--border-default)', borderRadius: '12px', backgroundColor: 'var(--surface-primary)' }}>
      <EmptyState
        icon={<Smartphone size={22} />}
        title="Nenhum app adicionado"
        description="Conecte seu app para visualizar métricas, rankings e reviews em um só lugar."
        action={
          <div style={{ display: 'flex', gap: '8px' }}>
            <PrimaryButton>Adicionar app</PrimaryButton>
            <GhostButton>Ver tutorial</GhostButton>
          </div>
        }
      />
    </div>
  ),
}

export const NoData: Story = {
  render: () => (
    <div style={{ border: '0.5px solid var(--border-default)', borderRadius: '12px', backgroundColor: 'var(--surface-primary)' }}>
      <EmptyState
        icon={<BarChart2 size={22} />}
        title="Sem dados para o período"
        description="Selecione um intervalo de datas diferente ou aguarde a próxima atualização."
      />
    </div>
  ),
}

export const Inbox: Story = {
  render: () => (
    <div style={{ border: '0.5px solid var(--border-default)', borderRadius: '12px', backgroundColor: 'var(--surface-primary)' }}>
      <EmptyState
        icon={<InboxIcon size={22} />}
        title="Tudo em dia"
        description="Não há notificações pendentes no momento."
        size="sm"
      />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {(['sm', 'md', 'lg'] as const).map(s => (
        <div key={s} style={{ border: '0.5px solid var(--border-default)', borderRadius: '12px', backgroundColor: 'var(--surface-primary)' }}>
          <EmptyState
            icon={<FileText size={s === 'sm' ? 16 : s === 'md' ? 22 : 26} />}
            title={`Empty State — ${s}`}
            description="Descrição explicando o estado vazio e como resolver."
            size={s}
            action={<GhostButton>Ação</GhostButton>}
          />
        </div>
      ))}
    </div>
  ),
}
