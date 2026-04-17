import type { Meta, StoryObj } from '@storybook/react'
import { useState, useCallback } from 'react'
import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/* ── Filter only icon components (PascalCase, function/class) ── */
const allIcons = Object.entries(LucideIcons).filter(
  ([name, value]) =>
    typeof value === 'function' &&
    /^[A-Z]/.test(name) &&
    name !== 'createLucideIcon'
) as [string, LucideIcon][]

/* ── Meta ────────────────────────────────────────────────────── */
const meta: Meta = {
  title: 'Foundations/Icons',
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj

/* ── Catalog ─────────────────────────────────────────────────── */
function IconCatalog({ size, color }: { size: number; color: string }) {
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const filtered = query.trim()
    ? allIcons.filter(([name]) => name.toLowerCase().includes(query.toLowerCase()))
    : allIcons

  const handleCopy = useCallback((name: string) => {
    navigator.clipboard.writeText(`import { ${name} } from 'lucide-react'`)
    setCopied(name)
    setTimeout(() => setCopied(null), 1500)
  }, [])

  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', padding: '32px', backgroundColor: 'var(--surface-primary)', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Icons
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: '0' }}>
          {allIcons.length} ícones disponíveis via{' '}
          <code style={{ fontFamily: 'monospace', fontSize: '12px', backgroundColor: 'var(--surface-secondary)', padding: '2px 6px', borderRadius: '4px' }}>
            lucide-react
          </code>
          . Clique em qualquer ícone para copiar o import.
        </p>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', maxWidth: '360px', marginBottom: '24px' }}>
        <LucideIcons.Search
          size={15}
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-secondary)',
            pointerEvents: 'none',
          }}
        />
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar ícone..."
          style={{
            width: '100%',
            height: '36px',
            paddingLeft: '32px',
            paddingRight: '12px',
            fontSize: '14px',
            fontFamily: 'DM Sans, sans-serif',
            color: 'var(--text-primary)',
            backgroundColor: 'var(--surface-primary)',
            border: '1px solid var(--border-emphasis)',
            borderRadius: '8px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Count */}
      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
        {filtered.length === allIcons.length
          ? `${allIcons.length} ícones`
          : `${filtered.length} de ${allIcons.length} ícones`}
      </p>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
          Nenhum ícone encontrado para <strong>"{query}"</strong>
        </div>
      )}

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '8px',
        }}
      >
        {filtered.map(([name, Icon]) => (
          <button
            key={name}
            type="button"
            title={`Copiar: import { ${name} } from 'lucide-react'`}
            onClick={() => handleCopy(name)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 8px',
              borderRadius: '8px',
              border: '1px solid',
              borderColor: copied === name ? 'var(--color-primary)' : 'transparent',
              backgroundColor: copied === name ? 'rgba(26,136,255,0.06)' : 'var(--surface-secondary)',
              cursor: 'pointer',
              transition: 'border-color 120ms, background-color 120ms',
              textAlign: 'center',
            }}
            onMouseEnter={e => {
              if (copied !== name) {
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-emphasis)'
              }
            }}
            onMouseLeave={e => {
              if (copied !== name) {
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'transparent'
              }
            }}
          >
            {copied === name ? (
              <LucideIcons.Check size={size} color="var(--color-primary)" />
            ) : (
              <Icon size={size} color={color} />
            )}
            <span
              style={{
                fontSize: '11px',
                color: copied === name ? 'var(--color-primary)' : 'var(--text-secondary)',
                wordBreak: 'break-all',
                lineHeight: 1.3,
              }}
            >
              {copied === name ? 'Copiado!' : name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── Story ───────────────────────────────────────────────────── */
export const Catalog: Story = {
  name: 'Catalog',
  args: {
    size: 20,
    color: 'var(--text-primary)',
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 12, max: 48, step: 4 },
      description: 'Tamanho em pixels',
    },
    color: {
      control: { type: 'color' },
      description: 'Cor dos ícones',
    },
  },
  render: (args) => <IconCatalog size={args.size as number} color={args.color as string} />,
}
