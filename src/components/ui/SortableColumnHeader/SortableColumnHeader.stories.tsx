import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { SortableColumnHeader } from './SortableColumnHeader'
import type { SortDirection } from './SortableColumnHeader'

const meta: Meta<typeof SortableColumnHeader> = {
  title: 'Components/SortableColumnHeader',
  component: SortableColumnHeader,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof SortableColumnHeader>

/* ── Static states ───────────────────────────────────────────────── */

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '200px' }}>
      {(['none', 'asc', 'desc'] as SortDirection[]).map((dir) => (
        <div
          key={dir}
          style={{
            padding: '8px 12px',
            background: 'var(--surface-secondary)',
            borderRadius: '6px',
            border: '0.5px solid var(--border-default)',
          }}
        >
          <SortableColumnHeader label="Keyword" sortDirection={dir} onSort={() => {}} />
        </div>
      ))}
    </div>
  ),
}

/* ── Interactive table ───────────────────────────────────────────── */

type Row = {
  keyword: string
  volume: number
  rank: number
  delta: number
}

const DATA: Row[] = [
  { keyword: 'futebol ao vivo', volume: 180000, rank: 3,  delta: 2  },
  { keyword: 'globoplay',        volume: 246000, rank: 1,  delta: -1 },
  { keyword: 'série online',     volume: 90000,  rank: 12, delta: 5  },
  { keyword: 'filmes hd',        volume: 74000,  rank: 8,  delta: 0  },
  { keyword: 'tv ao vivo grátis',volume: 135000, rank: 5,  delta: -3 },
]

type SortKey = keyof Row

function InteractiveTable() {
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortDir, setSortDir] = useState<SortDirection>('none')

  function handleSort(key: SortKey) {
    if (sortKey !== key) {
      setSortKey(key)
      setSortDir('asc')
    } else if (sortDir === 'asc') {
      setSortDir('desc')
    } else {
      setSortKey(null)
      setSortDir('none')
    }
  }

  function getDir(key: SortKey): SortDirection {
    return sortKey === key ? sortDir : 'none'
  }

  const sorted = [...DATA].sort((a, b) => {
    if (!sortKey || sortDir === 'none') return 0
    const av = a[sortKey]
    const bv = b[sortKey]
    const mult = sortDir === 'asc' ? 1 : -1
    if (typeof av === 'string') return mult * av.localeCompare(bv as string)
    return mult * ((av as number) - (bv as number))
  })

  const thStyle: React.CSSProperties = {
    padding: '8px 12px',
    background: 'var(--surface-secondary)',
    borderBottom: '0.5px solid var(--border-default)',
    textAlign: 'left',
  }
  const tdStyle: React.CSSProperties = {
    padding: '10px 12px',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '13px',
    color: 'var(--text-primary)',
    borderBottom: '0.5px solid var(--border-default)',
  }

  return (
    <div style={{
      border: '0.5px solid var(--border-default)', borderRadius: '10px',
      overflow: 'hidden', background: 'var(--surface-primary)',
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>
              <SortableColumnHeader label="Keyword" sortDirection={getDir('keyword')} onSort={() => handleSort('keyword')} />
            </th>
            <th style={{ ...thStyle, textAlign: 'right' }}>
              <SortableColumnHeader label="Volume" sortDirection={getDir('volume')} onSort={() => handleSort('volume')} align="right" />
            </th>
            <th style={{ ...thStyle, textAlign: 'right' }}>
              <SortableColumnHeader label="Rank" sortDirection={getDir('rank')} onSort={() => handleSort('rank')} align="right" />
            </th>
            <th style={{ ...thStyle, textAlign: 'right' }}>
              <SortableColumnHeader label="Delta" sortDirection={getDir('delta')} onSort={() => handleSort('delta')} align="right" />
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.keyword} style={{ transition: 'background 0.1s' }}>
              <td style={tdStyle}>{row.keyword}</td>
              <td style={{ ...tdStyle, textAlign: 'right', color: 'var(--text-secondary)' }}>
                {row.volume.toLocaleString('pt-BR')}
              </td>
              <td style={{ ...tdStyle, textAlign: 'right' }}>{row.rank}</td>
              <td style={{ ...tdStyle, textAlign: 'right' }}>
                <span style={{
                  fontWeight: 500,
                  color: row.delta > 0 ? '#0F6E56' : row.delta < 0 ? '#A32D2D' : 'var(--text-secondary)',
                }}>
                  {row.delta > 0 ? `▲ +${row.delta}` : row.delta < 0 ? `▼ ${row.delta}` : '—'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveTable />,
}
