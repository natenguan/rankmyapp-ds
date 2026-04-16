import type { Meta, StoryObj } from '@storybook/react'
import { Smartphone, ArrowRight, Play, Apple } from 'lucide-react'
import { EmptyState } from '../../components/ui/EmptyState/EmptyState'

const meta: Meta = {
  title: 'Compositions/Empty State — Sem Apps',
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--surface-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ maxWidth: '520px', width: '100%' }}>
        {/* Card */}
        <div style={{ backgroundColor: 'var(--surface-primary)', borderRadius: '16px', border: '0.5px solid var(--border-default)', overflow: 'hidden' }}>
          <EmptyState
            size="lg"
            icon={<Smartphone size={28} />}
            title="Adicione seu primeiro app"
            description="Conecte seu app ao RankMyApp para começar a monitorar rankings, reviews e downloads em tempo real."
            action={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', width: '100%' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', height: '40px', padding: '0 20px', fontSize: '14px', fontFamily: 'DM Sans', fontWeight: 500, backgroundColor: '#1A88FF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                    Adicionar app <ArrowRight size={16} />
                  </button>
                  <button style={{ display: 'inline-flex', alignItems: 'center', height: '40px', padding: '0 20px', fontSize: '14px', fontFamily: 'DM Sans', fontWeight: 500, backgroundColor: 'transparent', color: 'var(--text-primary)', border: '0.5px solid var(--border-emphasis)', borderRadius: '8px', cursor: 'pointer' }}>
                    Ver tutorial
                  </button>
                </div>
              </div>
            }
          />

          {/* Stores */}
          <div style={{ padding: '20px 40px', borderTop: '0.5px solid var(--border-default)', display: 'flex', gap: '12px' }}>
            {[
              { icon: <Play size={14} fill="currentColor" />, label: 'Google Play', color: '#1A88FF' },
              { icon: <Apple size={14} />, label: 'App Store', color: '#6B7280' },
            ].map(s => (
              <div key={s.label} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', borderRadius: '8px', border: '0.5px solid var(--border-default)', backgroundColor: 'var(--surface-secondary)' }}>
                <span style={{ color: s.color }}>{s.icon}</span>
                <span style={{ fontSize: '13px', fontFamily: 'DM Sans', fontWeight: 500, color: 'var(--text-primary)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Help text */}
        <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '12px', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>
          Precisa de ajuda?{' '}
          <a href="#" style={{ color: '#1A88FF', textDecoration: 'none' }}>
            Acesse nossa documentação
          </a>
        </p>
      </div>
    </div>
  ),
}

export const InsideDashboard: Story = {
  render: () => (
    <div style={{ padding: '24px', backgroundColor: 'var(--surface-tertiary)', minHeight: '400px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontFamily: 'Nunito', fontWeight: 700, color: 'var(--text-primary)' }}>Meus Apps</h2>
        <button style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', height: '34px', padding: '0 14px', fontSize: '13px', fontFamily: 'DM Sans', fontWeight: 500, backgroundColor: '#1A88FF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          + Adicionar app
        </button>
      </div>

      <div style={{ borderRadius: '12px', border: '0.5px solid var(--border-default)', backgroundColor: 'var(--surface-primary)' }}>
        <EmptyState
          size="md"
          icon={<Smartphone size={22} />}
          title="Nenhum app conectado"
          description="Adicione seu primeiro app para começar a visualizar métricas de ASO."
          action={
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', height: '36px', padding: '0 16px', fontSize: '13px', fontFamily: 'DM Sans', fontWeight: 500, backgroundColor: '#1A88FF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Adicionar app
            </button>
          }
        />
      </div>
    </div>
  ),
}
