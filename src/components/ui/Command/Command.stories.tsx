import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Search, BarChart2, Star, Bell, Settings, HelpCircle, FileText, Download, Users, TrendingUp, Zap, Globe } from 'lucide-react'
import { Command } from './Command'
import type { CommandItem } from './Command'

const meta: Meta<typeof Command> = {
  title: 'Components/Command',
  component: Command,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof Command>

const ITEMS: CommandItem[] = [
  // Navegação
  { id: 'overview',    label: 'Overview',            description: 'Visão geral do seu app',          icon: <BarChart2 size={14} />,  group: 'Navegação',    shortcut: ['G', 'O'] },
  { id: 'keywords',    label: 'Keywords',             description: 'Monitoramento de keywords',        icon: <Search size={14} />,     group: 'Navegação',    shortcut: ['G', 'K'] },
  { id: 'reviews',     label: 'Reviews',              description: 'Avaliações e feedbacks',           icon: <Star size={14} />,       group: 'Navegação',    shortcut: ['G', 'R'] },
  { id: 'competitor',  label: 'Análise competitiva',  description: 'Compare com concorrentes',         icon: <TrendingUp size={14} />, group: 'Navegação' },
  { id: 'categories',  label: 'Categorias',           description: 'Ranking por categoria',            icon: <Globe size={14} />,      group: 'Navegação' },

  // Ações
  { id: 'add-keyword', label: 'Adicionar keyword',    description: 'Adicione uma nova keyword ao monitoramento', icon: <Zap size={14} />,  group: 'Ações',   shortcut: ['⌘', 'K'] },
  { id: 'export',      label: 'Exportar dados',       description: 'Exportar relatório em CSV ou PDF', icon: <Download size={14} />,   group: 'Ações' },
  { id: 'alerts',      label: 'Configurar alertas',   description: 'Notificações de variação de rank', icon: <Bell size={14} />,       group: 'Ações' },
  { id: 'team',        label: 'Gerenciar equipe',     description: 'Convidar membros e permissões',    icon: <Users size={14} />,      group: 'Ações' },

  // Suporte
  { id: 'docs',        label: 'Documentação',         description: 'Guias e tutoriais',                icon: <FileText size={14} />,   group: 'Suporte' },
  { id: 'help',        label: 'Central de ajuda',     description: 'FAQ e suporte',                    icon: <HelpCircle size={14} />, group: 'Suporte' },
  { id: 'settings',    label: 'Configurações',        description: 'Conta, plano e integrações',       icon: <Settings size={14} />,   group: 'Suporte',  shortcut: ['⌘', ','] },
]

function CommandDemo({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const [lastAction, setLastAction] = useState<string | null>(null)

  const items = ITEMS.map(item => ({
    ...item,
    onSelect: () => setLastAction(item.label),
  }))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
      <button
        onClick={() => setOpen(true)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          height: '36px', padding: '0 14px',
          background: 'var(--surface-primary)',
          border: '0.5px solid var(--border-emphasis)',
          borderRadius: '8px', cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
          color: 'var(--text-secondary)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <Search size={13} />
        <span>Buscar...</span>
        <span style={{ marginLeft: '8px', display: 'flex', gap: '3px' }}>
          {['⌘', 'K'].map((k, i) => (
            <kbd key={i} style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              minWidth: '18px', height: '18px', padding: '0 3px',
              fontFamily: 'DM Mono, monospace', fontSize: '10px',
              color: 'var(--text-secondary)', background: 'var(--surface-secondary)',
              border: '0.5px solid var(--border-emphasis)', borderRadius: '4px',
            }}>
              {k}
            </kbd>
          ))}
        </span>
      </button>

      {lastAction && (
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text-secondary)' }}>
          Selecionado: <strong style={{ color: 'var(--text-primary)' }}>{lastAction}</strong>
        </p>
      )}

      <Command
        items={items}
        open={open}
        onOpenChange={setOpen}
        placeholder="Buscar ação ou página..."
      />
    </div>
  )
}

export const Default: Story = {
  render: () => <CommandDemo />,
}

export const OpenByDefault: Story = {
  render: () => <CommandDemo defaultOpen />,
}
