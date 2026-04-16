import type { Meta, StoryObj } from '@storybook/react'
import { ToastContainer, useToast } from './Toast'
import type { ToastItem, ToastVariant } from './Toast'

const TC = ToastContainer

const meta: Meta = {
  title: 'Components/Toast',
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj

/* ── Static previews ────────────────────────────────────────────── */

function StaticToast({ variant, title, description }: {
  variant: ToastVariant
  title: string
  description?: string
}) {
  const variantConfig: Record<ToastVariant, { accent: string; icon: string }> = {
    success: { accent: '#07C6C3', icon: '✓' },
    error:   { accent: '#E24B4A', icon: '!' },
    warning: { accent: '#FF5700', icon: '⚠' },
    info:    { accent: '#1A88FF', icon: 'i' },
  }
  const { accent } = variantConfig[variant]

  // Render via ToastContainer with static items
  return (
    <div style={{ position: 'relative', minHeight: '70px' }}>
      <div style={{ position: 'absolute', right: 0, top: 0 }}>
        <TC
          toasts={[{ id: '1', variant, title, description, duration: 0 }]}
          onDismiss={() => {}}
        />
      </div>
    </div>
  )
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '16px' }}>
      {([
        { variant: 'success' as ToastVariant, title: 'Keyword adicionada com sucesso', description: 'Globoplay foi adicionada ao tracking.' },
        { variant: 'error'   as ToastVariant, title: 'Erro ao salvar alterações', description: 'Verifique sua conexão e tente novamente.' },
        { variant: 'warning' as ToastVariant, title: 'Limite de keywords atingido', description: 'Remova uma keyword para adicionar uma nova.' },
        { variant: 'info'    as ToastVariant, title: 'Atualização disponível', description: 'Recarregue a página para aplicar.' },
      ] as Array<{ variant: ToastVariant; title: string; description: string }>).map((t, i) => (
        <StaticToast key={i} {...t} />
      ))}
    </div>
  ),
}

export const TitleOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '16px' }}>
      <StaticToast variant="success" title="Salvo com sucesso" />
      <StaticToast variant="error" title="Falha na operação" />
    </div>
  ),
}

/* ── Interactive demo ───────────────────────────────────────────── */

export const Interactive: Story = {
  render: () => {
    const { toasts, toast, dismiss } = useToast()

    const examples: Array<Omit<ToastItem, 'id'>> = [
      { variant: 'success', title: 'Keyword adicionada!', description: 'Futebol ao vivo foi adicionada ao tracking.' },
      { variant: 'error', title: 'Erro ao exportar', description: 'Tente novamente em alguns instantes.' },
      { variant: 'warning', title: 'Plano próximo do limite', description: 'Você usou 90% das keywords disponíveis.' },
      { variant: 'info', title: 'Dados atualizados', description: 'Rankings atualizados às 06:00 de hoje.' },
    ]

    return (
      <div style={{ minHeight: '300px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => toast(ex)}
              style={{
                display: 'inline-flex', alignItems: 'center',
                height: '36px', padding: '0 14px',
                fontSize: '13px', fontFamily: 'DM Sans', fontWeight: 500,
                backgroundColor: 'var(--surface-secondary)',
                border: '0.5px solid var(--border-emphasis)',
                borderRadius: '8px', cursor: 'pointer',
                color: 'var(--text-primary)',
              }}
            >
              {ex.variant.charAt(0).toUpperCase() + ex.variant.slice(1)}
            </button>
          ))}
        </div>
        <p style={{ fontSize: '12px', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>
          Clique nos botões para disparar toasts. Eles somem automaticamente em 4s.
        </p>

        <ToastContainer toasts={toasts} onDismiss={dismiss} />
      </div>
    )
  },
}

export const Stacked: Story = {
  render: () => {
    const { toasts, toast, dismiss } = useToast()

    return (
      <div style={{ minHeight: '300px' }}>
        <button
          onClick={() => {
            toast({ variant: 'success', title: 'App sincronizado' })
            setTimeout(() => toast({ variant: 'info', title: 'Ranking atualizado', description: '3 keywords sofreram variação.' }), 300)
            setTimeout(() => toast({ variant: 'warning', title: 'Limite de apps próximo' }), 600)
          }}
          style={{
            display: 'inline-flex', alignItems: 'center',
            height: '36px', padding: '0 16px',
            fontSize: '13px', fontFamily: 'DM Sans', fontWeight: 500,
            backgroundColor: '#1A88FF', color: '#fff',
            border: 'none', borderRadius: '8px', cursor: 'pointer',
          }}
        >
          Disparar 3 toasts
        </button>
        <ToastContainer toasts={toasts} onDismiss={dismiss} />
      </div>
    )
  },
}
