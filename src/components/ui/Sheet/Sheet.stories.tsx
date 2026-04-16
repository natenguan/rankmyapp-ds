import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Sheet } from './Sheet'

const meta: Meta<typeof Sheet> = {
  title: 'Components/Sheet',
  component: Sheet,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof Sheet>

const Btn = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button onClick={onClick} style={{
    display: 'inline-flex', alignItems: 'center', height: '36px', padding: '0 16px',
    fontSize: '13px', fontFamily: 'DM Sans', fontWeight: 500,
    backgroundColor: '#1A88FF', color: '#fff',
    border: 'none', borderRadius: '8px', cursor: 'pointer',
  }}>
    {label}
  </button>
)

const GhostBtn = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button onClick={onClick} style={{
    display: 'inline-flex', alignItems: 'center', height: '36px', padding: '0 16px',
    fontSize: '13px', fontFamily: 'DM Sans', fontWeight: 500,
    backgroundColor: 'transparent', color: 'var(--text-primary)',
    border: '0.5px solid var(--border-emphasis)', borderRadius: '8px', cursor: 'pointer',
  }}>
    {label}
  </button>
)

export const RightDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div style={{ padding: '24px' }}>
        <Btn label="Abrir painel" onClick={() => setOpen(true)} />
        <Sheet
          open={open}
          onClose={() => setOpen(false)}
          title="Detalhes da keyword"
          description="futebol ao vivo — Google Play Brasil"
          footer={
            <>
              <GhostBtn label="Cancelar" onClick={() => setOpen(false)} />
              <Btn label="Salvar" onClick={() => setOpen(false)} />
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[['Posição atual', '#3'], ['Volume de busca', 'Alto'], ['Dificuldade', 'Média'], ['Última atualização', 'Hoje, 06:00']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>{k}</span>
                <span style={{ fontSize: '13px', fontFamily: 'DM Sans', fontWeight: 500, color: 'var(--text-primary)' }}>{v}</span>
              </div>
            ))}
          </div>
        </Sheet>
      </div>
    )
  },
}

export const LeftDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div style={{ padding: '24px' }}>
        <Btn label="Abrir menu" onClick={() => setOpen(true)} />
        <Sheet open={open} onClose={() => setOpen(false)} title="Menu" side="left" width="280px">
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {['Dashboard', 'Apps', 'Keywords', 'Rankings', 'Reviews', 'Relatórios', 'Configurações'].map(item => (
              <button key={item} style={{
                display: 'flex', alignItems: 'center', height: '38px', padding: '0 12px',
                fontSize: '14px', fontFamily: 'DM Sans', fontWeight: 400, color: 'var(--text-primary)',
                backgroundColor: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--surface-secondary)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {item}
              </button>
            ))}
          </nav>
        </Sheet>
      </div>
    )
  },
}

export const BottomSheet: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div style={{ padding: '24px' }}>
        <Btn label="Abrir bottom sheet" onClick={() => setOpen(true)} />
        <Sheet
          open={open}
          onClose={() => setOpen(false)}
          title="Filtros"
          side="bottom"
          height="50vh"
          footer={
            <>
              <GhostBtn label="Limpar" onClick={() => setOpen(false)} />
              <Btn label="Aplicar filtros" onClick={() => setOpen(false)} />
            </>
          }
        >
          <p style={{ margin: 0, fontSize: '13px', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>
            Conteúdo do bottom sheet — use para filtros e ações em mobile.
          </p>
        </Sheet>
      </div>
    )
  },
}
