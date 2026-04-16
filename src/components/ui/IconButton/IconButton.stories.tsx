import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  MoreHorizontal, Download, Trash2, Edit, Copy, Bell,
  Bookmark, Star, Filter, RefreshCw, Settings, Heart,
} from 'lucide-react'
import { IconButton } from './IconButton'

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof IconButton>

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {(['ghost', 'outline', 'filled'] as const).map(v => (
        <div key={v} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', fontFamily: 'DM Sans', color: 'var(--text-secondary)', width: '48px' }}>{v}</span>
          <IconButton icon={<Settings size={16} />} variant={v} size="md" label="Configurações" />
          <IconButton icon={<Download size={16} />} variant={v} size="md" label="Download" active />
          <IconButton icon={<Trash2 size={16} />} variant={v} size="md" label="Excluir" danger />
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {(['xs', 'sm', 'md', 'lg'] as const).map(s => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <IconButton icon={<Edit size={s === 'xs' ? 12 : s === 'sm' ? 13 : s === 'md' ? 15 : 17} />} size={s} label="Editar" variant="outline" />
          <span style={{ fontSize: '11px', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>{s}</span>
        </div>
      ))}
    </div>
  ),
}

export const Toggle: Story = {
  render: () => {
    const [bookmarked, setBookmarked] = useState(false)
    const [starred, setStarred] = useState(false)
    const [liked, setLiked] = useState(false)

    return (
      <div style={{ display: 'flex', gap: '12px' }}>
        <IconButton
          icon={<Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} />}
          label="Salvar"
          active={bookmarked}
          onClick={() => setBookmarked(p => !p)}
        />
        <IconButton
          icon={<Star size={16} fill={starred ? 'currentColor' : 'none'} />}
          label="Favoritar"
          active={starred}
          onClick={() => setStarred(p => !p)}
        />
        <IconButton
          icon={<Heart size={16} fill={liked ? 'currentColor' : 'none'} />}
          label="Curtir"
          active={liked}
          onClick={() => setLiked(p => !p)}
        />
      </div>
    )
  },
}

export const InToolbar: Story = {
  render: () => (
    <div
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', height: '48px',
        backgroundColor: 'var(--surface-primary)',
        border: '0.5px solid var(--border-default)', borderRadius: '10px',
      }}
    >
      <span style={{ fontSize: '14px', fontFamily: 'Nunito', fontWeight: 600, color: 'var(--text-primary)' }}>
        Keywords (128)
      </span>
      <div style={{ display: 'flex', gap: '4px' }}>
        <IconButton icon={<Filter size={15} />} label="Filtrar" variant="ghost" />
        <IconButton icon={<Download size={15} />} label="Exportar" variant="ghost" />
        <IconButton icon={<RefreshCw size={15} />} label="Atualizar" variant="ghost" />
        <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-default)', margin: '0 4px' }} />
        <IconButton icon={<MoreHorizontal size={15} />} label="Mais opções" variant="ghost" />
      </div>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <IconButton icon={<Edit size={16} />} label="Editar" disabled />
      <IconButton icon={<Trash2 size={16} />} label="Excluir" danger disabled />
      <IconButton icon={<Download size={16} />} label="Download" variant="outline" disabled />
    </div>
  ),
}
