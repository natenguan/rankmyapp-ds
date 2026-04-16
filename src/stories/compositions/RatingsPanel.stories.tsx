import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Star, ThumbsUp, MessageSquare } from 'lucide-react'
import { Badge } from '../../components/ui/Badge/Badge'
import { SearchBar } from '../../components/ui/SearchBar/SearchBar'
import { Select } from '../../components/ui/Select/Select'
import { Pagination } from '../../components/ui/Pagination/Pagination'
import { AreaChart } from '../../components/ui/Chart/AreaChart'

const meta: Meta = {
  title: 'Compositions/Ratings & Reviews Panel',
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj

const REVIEWS = [
  { id: 1, user: 'Maria S.',    rating: 5, date: '14/04', text: 'Melhor app de streaming do Brasil! Conteúdo incrível e interface muito intuitiva.', helpful: 23 },
  { id: 2, user: 'João P.',     rating: 2, date: '13/04', text: 'App trava muito no Chromecast. Já tentei reinstalar várias vezes mas o problema persiste.', helpful: 41 },
  { id: 3, user: 'Ana C.',      rating: 4, date: '12/04', text: 'Ótimo conteúdo mas o carregamento poderia ser mais rápido. No geral recomendo.', helpful: 8 },
  { id: 4, user: 'Pedro M.',    rating: 1, date: '11/04', text: 'Cobram a assinatura mas o serviço fica fora do ar frequentemente. Absurdo.', helpful: 67 },
  { id: 5, user: 'Carla R.',    rating: 5, date: '10/04', text: 'Assisto novelas todos os dias pelo app. Funciona perfeitamente no celular e na TV.', helpful: 14 },
]

const CHART_DATA = [
  { week: 'S1', positivas: 320, negativas: 45 },
  { week: 'S2', positivas: 298, negativas: 62 },
  { week: 'S3', positivas: 410, negativas: 38 },
  { week: 'S4', positivas: 385, negativas: 51 },
  { week: 'S5', positivas: 432, negativas: 29 },
]

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={12} fill={i <= rating ? '#FF5700' : 'none'} stroke={i <= rating ? '#FF5700' : 'var(--border-emphasis)'} />
      ))}
    </div>
  )
}

export const Default: Story = {
  render: () => {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('all')
    const [page, setPage] = useState(1)

    return (
      <div style={{ maxWidth: '760px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Summary row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {[
            { label: 'Avaliação média', value: '4.2', sub: '★', color: '#FF5700' },
            { label: 'Total reviews', value: '12.4k', sub: 'últimos 30 dias', color: undefined },
            { label: 'Positivas', value: '78%', sub: '4 e 5 estrelas', color: '#07C6C3' },
            { label: 'Negativas', value: '12%', sub: '1 e 2 estrelas', color: '#E24B4A' },
          ].map(m => (
            <div key={m.label} style={{ padding: '16px', borderRadius: '10px', border: '0.5px solid var(--border-default)', backgroundColor: 'var(--surface-primary)' }}>
              <p style={{ margin: 0, fontSize: '11px', fontFamily: 'DM Sans', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>{m.label}</p>
              <p style={{ margin: 0, fontSize: '22px', fontFamily: 'Nunito', fontWeight: 700, color: m.color ?? 'var(--text-primary)' }}>{m.value}</p>
              <p style={{ margin: '2px 0 0', fontSize: '11px', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>{m.sub}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div style={{ padding: '20px', borderRadius: '12px', border: '0.5px solid var(--border-default)', backgroundColor: 'var(--surface-primary)' }}>
          <p style={{ margin: '0 0 16px', fontSize: '13px', fontFamily: 'Nunito', fontWeight: 600, color: 'var(--text-primary)' }}>Tendência semanal</p>
          <AreaChart
            data={CHART_DATA} xKey="week" height={140} showLegend
            series={[
              { key: 'positivas', label: 'Positivas', color: '#07C6C3' },
              { key: 'negativas', label: 'Negativas', color: '#E24B4A' },
            ]}
          />
        </div>

        {/* Reviews list */}
        <div style={{ borderRadius: '12px', border: '0.5px solid var(--border-default)', backgroundColor: 'var(--surface-primary)', overflow: 'hidden' }}>
          {/* Toolbar */}
          <div style={{ padding: '14px 16px', borderBottom: '0.5px solid var(--border-default)', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Buscar nas reviews..." width={240} />
            <Select
              options={[
                { value: 'all', label: 'Todas' },
                { value: '5', label: '5 estrelas' },
                { value: '4', label: '4 estrelas' },
                { value: '1-2', label: '1-2 estrelas' },
              ]}
              value={filter}
              onChange={setFilter}
              placeholder="Filtrar"
            />
          </div>

          {/* List */}
          {REVIEWS.map((r, i) => (
            <div key={r.id} style={{ padding: '16px', borderBottom: i < REVIEWS.length - 1 ? '0.5px solid var(--border-default)' : 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '13px', fontFamily: 'DM Sans', fontWeight: 500, color: 'var(--text-primary)' }}>{r.user}</span>
                  <Stars rating={r.rating} />
                  <Badge variant={r.rating >= 4 ? 'success' : r.rating <= 2 ? 'danger' : 'warning'}>
                    {r.rating >= 4 ? 'Positiva' : r.rating <= 2 ? 'Negativa' : 'Neutra'}
                  </Badge>
                </div>
                <span style={{ fontSize: '12px', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>{r.date}</span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', fontFamily: 'DM Sans', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{r.text}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>
                  <ThumbsUp size={12} /> {r.helpful} úteis
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>
                  <MessageSquare size={12} /> Responder
                </button>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div style={{ padding: '14px 16px', borderTop: '0.5px solid var(--border-default)', display: 'flex', justifyContent: 'center' }}>
            <Pagination page={page} totalPages={24} onPageChange={setPage} />
          </div>
        </div>
      </div>
    )
  },
}
