import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Pagination } from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Pagination>

function Controlled({ total, initial = 1 }: { total: number; initial?: number }) {
  const [page, setPage] = useState(initial)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Pagination page={page} totalPages={total} onPageChange={setPage} />
      <span style={{ fontSize: '12px', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>
        Página {page} de {total}
      </span>
    </div>
  )
}

export const FewPages: Story = {
  render: () => <Controlled total={5} />,
}

export const ManyPages: Story = {
  render: () => <Controlled total={24} initial={8} />,
}

export const FirstPage: Story = {
  render: () => <Controlled total={12} initial={1} />,
}

export const LastPage: Story = {
  render: () => <Controlled total={12} initial={12} />,
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ fontSize: '12px', fontFamily: 'DM Sans', color: 'var(--text-secondary)', marginBottom: '8px' }}>
          Poucas páginas (5)
        </p>
        <Controlled total={5} initial={3} />
      </div>
      <div>
        <p style={{ fontSize: '12px', fontFamily: 'DM Sans', color: 'var(--text-secondary)', marginBottom: '8px' }}>
          Muitas páginas (24) — página do meio
        </p>
        <Controlled total={24} initial={12} />
      </div>
      <div>
        <p style={{ fontSize: '12px', fontFamily: 'DM Sans', color: 'var(--text-secondary)', marginBottom: '8px' }}>
          Página 2 (ellipsis à direita)
        </p>
        <Controlled total={20} initial={2} />
      </div>
      <div>
        <p style={{ fontSize: '12px', fontFamily: 'DM Sans', color: 'var(--text-secondary)', marginBottom: '8px' }}>
          Penúltima página (ellipsis à esquerda)
        </p>
        <Controlled total={20} initial={19} />
      </div>
    </div>
  ),
}
