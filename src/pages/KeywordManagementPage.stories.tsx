import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../components/ui/Button/Button'
import { Input } from '../components/ui/Input/Input'
import { Sidebar } from '../components/ui/Sidebar/Sidebar'

const meta: Meta = {
  title: 'Pages/Keyword Management',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

/* ── Types ──────────────────────────────────────────────────── */

type KeywordStatus = 'tracked' | 'untracked' | 'dropping' | 'stable' | 'new'
type SearchVolume = 'very_bad' | 'low' | 'medium' | 'high' | 'very_high'

interface Keyword {
  id: number
  label: string
  status: KeywordStatus
  volume: SearchVolume
  selected: boolean
}

/* ── Mock data ──────────────────────────────────────────────── */

const INITIAL_KEYWORDS: Keyword[] = [
  { id: 1,  label: 'experiências com esse app',        status: 'tracked',   volume: 'medium',    selected: false },
  { id: 2,  label: 'televisão integrada',              status: 'tracked',   volume: 'low',       selected: false },
  { id: 3,  label: 'programas categorias',             status: 'tracked',   volume: 'high',      selected: false },
  { id: 4,  label: 'programas ao vivo',                status: 'dropping',  volume: 'high',      selected: false },
  { id: 5,  label: 'programas categorias 2',           status: 'tracked',   volume: 'medium',    selected: false },
  { id: 6,  label: 'experiências descobertas em seguida', status: 'tracked', volume: 'low',      selected: false },
  { id: 7,  label: 'algoritmos de busca',              status: 'untracked', volume: 'very_bad',  selected: false },
  { id: 8,  label: 'experiências de conteúdo',         status: 'tracked',   volume: 'medium',    selected: false },
  { id: 9,  label: 'globo play',                       status: 'tracked',   volume: 'very_high', selected: false },
  { id: 10, label: 'globoplay',                        status: 'tracked',   volume: 'very_high', selected: false },
  { id: 11, label: 'novela',                           status: 'tracked',   volume: 'very_high', selected: false },
  { id: 12, label: 'bbb',                              status: 'tracked',   volume: 'very_high', selected: false },
  { id: 13, label: 'big brother brasil',               status: 'tracked',   volume: 'very_high', selected: false },
  { id: 14, label: 'séries brasileiras',               status: 'stable',    volume: 'high',      selected: false },
  { id: 15, label: 'filmes online',                    status: 'tracked',   volume: 'high',      selected: false },
  { id: 16, label: 'streaming gratuito',               status: 'tracked',   volume: 'high',      selected: false },
  { id: 17, label: 'assistir tv online',               status: 'dropping',  volume: 'medium',    selected: false },
  { id: 18, label: 'canal globo',                      status: 'tracked',   volume: 'very_high', selected: false },
  { id: 19, label: 'futebol ao vivo',                  status: 'stable',    volume: 'very_high', selected: false },
  { id: 20, label: 'jornal nacional',                  status: 'tracked',   volume: 'high',      selected: false },
  { id: 21, label: 'domingão',                         status: 'tracked',   volume: 'medium',    selected: false },
  { id: 22, label: 'fantástico',                       status: 'tracked',   volume: 'medium',    selected: false },
  { id: 23, label: 'realities',                        status: 'untracked', volume: 'low',       selected: false },
  { id: 24, label: 'entretenimento',                   status: 'tracked',   volume: 'high',      selected: false },
  { id: 25, label: 'shows e eventos',                  status: 'untracked', volume: 'low',       selected: false },
  { id: 26, label: 'tv fechada',                       status: 'dropping',  volume: 'medium',    selected: false },
  { id: 27, label: 'canais por assinatura',            status: 'untracked', volume: 'very_bad',  selected: false },
  { id: 28, label: 'conteúdo exclusivo',               status: 'tracked',   volume: 'medium',    selected: false },
  { id: 29, label: 'vídeos on demand',                 status: 'stable',    volume: 'medium',    selected: false },
  { id: 30, label: 'app de vídeo',                     status: 'tracked',   volume: 'high',      selected: false },
  { id: 31, label: 'baixar séries',                    status: 'untracked', volume: 'low',       selected: false },
  { id: 32, label: 'assistir offline',                 status: 'untracked', volume: 'low',       selected: false },
  { id: 33, label: 'globo esporte',                    status: 'tracked',   volume: 'high',      selected: false },
  { id: 34, label: 'notícias ao vivo',                 status: 'tracked',   volume: 'high',      selected: false },
  { id: 35, label: 'séries internacionais',            status: 'new',       volume: 'medium',    selected: false },
  { id: 36, label: 'documentários',                    status: 'new',       volume: 'medium',    selected: false },
  { id: 37, label: 'kids content',                     status: 'untracked', volume: 'low',       selected: false },
  { id: 38, label: 'cartaz de filmes',                 status: 'untracked', volume: 'very_bad',  selected: false },
  { id: 39, label: 'transmissão ao vivo',              status: 'stable',    volume: 'high',      selected: false },
  { id: 40, label: 'copa do brasil',                   status: 'tracked',   volume: 'very_high', selected: false },
  { id: 41, label: 'brasileirão',                      status: 'tracked',   volume: 'very_high', selected: false },
  { id: 42, label: 'olimpíadas',                       status: 'dropping',  volume: 'high',      selected: false },
  { id: 43, label: 'playback tv',                      status: 'untracked', volume: 'very_bad',  selected: false },
  { id: 44, label: 'netflix alternativa',              status: 'new',       volume: 'medium',    selected: false },
  { id: 45, label: 'prime video alternativa',          status: 'new',       volume: 'low',       selected: false },
  { id: 46, label: 'multishow',                        status: 'tracked',   volume: 'medium',    selected: false },
  { id: 47, label: 'sportv',                           status: 'tracked',   volume: 'medium',    selected: false },
  { id: 48, label: 'gshow',                            status: 'tracked',   volume: 'low',       selected: false },
]

const sidebarGroups = [
  {
    label: 'Principal',
    items: [
      { label: 'Apps' },
      { label: 'Action Plan' },
      { label: 'Competitors' },
      { label: 'Changes Log' },
    ],
  },
  {
    label: 'Análise',
    items: [
      { label: 'Explore Source', active: true },
      { label: 'Search Source' },
      { label: 'Ratings & Reviews' },
      { label: 'Technical Performance' },
    ],
  },
  {
    label: 'Avançado',
    items: [
      { label: 'Data Export' },
      { label: 'Custom Pages (CPP)' },
      { label: 'Advanced Search' },
      { label: 'Anomaly Detection' },
      { label: 'App Analytics' },
      { label: 'Acquisition View' },
      { label: 'Similarity Matrix' },
    ],
  },
]

/* ── Stat card ──────────────────────────────────────────────── */

function StatCard({
  label, value, sub, color,
}: {
  label: string
  value: number
  sub?: string
  color?: string
}) {
  return (
    <div className="surface-secondary rounded-md p-4 flex flex-col gap-2 min-w-[100px]">
      <span className="font-sans text-[12px] text-secondary-ds leading-tight">{label}</span>
      <span
        className="font-sans text-[24px] font-medium leading-tight"
        style={{ color: color ?? 'var(--text-primary)' }}
      >
        {value}
      </span>
      {sub && (
        <span className="font-sans text-[11px] text-secondary-ds">{sub}</span>
      )}
    </div>
  )
}

/* ── Keyword chip ───────────────────────────────────────────── */

const chipStyles: Record<KeywordStatus, { bg: string; text: string; border: string }> = {
  tracked:   { bg: 'rgba(26,136,255,0.10)',  text: '#0050E5', border: 'rgba(26,136,255,0.25)' },
  stable:    { bg: 'rgba(7,198,195,0.10)',   text: '#00857F', border: 'rgba(7,198,195,0.25)'  },
  dropping:  { bg: 'rgba(255,87,0,0.10)',    text: '#CC4500', border: 'rgba(255,87,0,0.25)'   },
  new:       { bg: 'rgba(130,67,255,0.10)',  text: '#5B2FCC', border: 'rgba(130,67,255,0.25)' },
  untracked: { bg: 'rgba(107,114,128,0.08)', text: '#6B7280', border: 'rgba(107,114,128,0.18)'},
}

function KeywordChip({
  keyword,
  selected,
  onToggle,
}: {
  keyword: Keyword
  selected: boolean
  onToggle: () => void
}) {
  const style = chipStyles[keyword.status]
  return (
    <button
      onClick={onToggle}
      className="inline-flex items-center font-sans text-[12px] font-medium rounded-md px-3 py-[6px] transition-all duration-100 border"
      style={{
        backgroundColor: selected ? style.text : style.bg,
        color: selected ? '#ffffff' : style.text,
        borderColor: selected ? style.text : style.border,
        outline: 'none',
      }}
    >
      {keyword.label}
    </button>
  )
}

/* ── Legend item ────────────────────────────────────────────── */

function LegendItem({ label, color }: { label: string; color: string }) {
  return (
    <span className="flex items-center gap-[6px] font-sans text-[12px] text-secondary-ds">
      <span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: color }} />
      {label}
    </span>
  )
}

/* ── Page ───────────────────────────────────────────────────── */

function KeywordManagementPage() {
  const [keywords, setKeywords] = useState<Keyword[]>(INITIAL_KEYWORDS)
  const [search, setSearch] = useState('')
  const [storeFilter, setStoreFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [hasChanges, setHasChanges] = useState(false)

  const toggleKeyword = (id: number) => {
    setKeywords(prev =>
      prev.map(k => k.id === id ? { ...k, selected: !k.selected } : k)
    )
    setHasChanges(true)
  }

  const deleteSelected = () => {
    setKeywords(prev => prev.filter(k => !k.selected))
    setHasChanges(false)
  }

  const saveChanges = () => setHasChanges(false)

  const filtered = keywords.filter(k => {
    const matchSearch = k.label.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || k.status === statusFilter
    return matchSearch && matchStatus
  })

  const selectedCount = keywords.filter(k => k.selected).length

  // Stats
  const total = keywords.length
  const available = keywords.filter(k => k.status === 'untracked').length
  const veryBad = keywords.filter(k => k.volume === 'very_bad').length
  const low = keywords.filter(k => k.volume === 'low').length
  const medium = keywords.filter(k => k.volume === 'medium').length
  const high = keywords.filter(k => k.volume === 'high').length
  const veryHigh = keywords.filter(k => k.volume === 'very_high').length

  return (
    <div className="flex h-screen overflow-hidden surface-tertiary">
      <Sidebar groups={sidebarGroups} />

      <main className="flex-1 overflow-y-auto">

        {/* ── Page header ── */}
        <div className="surface-primary border-b border-[0.5px] border-[var(--border-default)] px-6 py-5">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-display text-[22px] font-semibold text-primary-ds">
                Keyword Management
              </h1>
              <p className="font-sans text-[13px] text-secondary-ds mt-1">
                Use the keyword board to add and track your keywords below.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">⬇</Button>
              <Button size="sm">+ Add Keyword</Button>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">

          {/* ── Statistics ── */}
          <div className="surface-primary rounded-lg border border-[0.5px] border-[var(--border-default)] p-5 flex flex-col gap-4">
            <h2 className="font-sans text-[18px] font-medium text-primary-ds">Statistics</h2>

            <div className="flex gap-5">
              {/* Keyword counts */}
              <div className="flex flex-col gap-2 flex-1">
                <span className="label-upper text-secondary-ds">Keyword Tracking</span>
                <div className="flex gap-[10px]">
                  <StatCard label="Total Keywords" value={total} />
                  <StatCard label="Available" value={available} sub={`${Math.round(available/total*100)}% of total`} />
                  <StatCard label="Very Bad" value={veryBad} sub={`${Math.round(veryBad/total*100)}%`} color="#E24B4A" />
                  <StatCard label="Low" value={low} sub={`${Math.round(low/total*100)}%`} color="#FF5700" />
                </div>
              </div>

              {/* Divider */}
              <div className="w-[1px] bg-[var(--border-default)] self-stretch" />

              {/* Search volume */}
              <div className="flex flex-col gap-2 flex-1">
                <span className="label-upper text-secondary-ds">Search Volume</span>
                <div className="flex gap-[10px]">
                  <StatCard label="Medium" value={medium} color="#FF935B" />
                  <StatCard label="High" value={high} color="#1A88FF" />
                  <StatCard label="Very High" value={veryHigh} color="#07C6C3" />
                </div>
              </div>
            </div>
          </div>

          {/* ── Keywords Board ── */}
          <div className="surface-primary rounded-lg border border-[0.5px] border-[var(--border-default)] p-5 flex flex-col gap-4">
            <div>
              <h2 className="font-sans text-[18px] font-medium text-primary-ds">Keywords Board</h2>
              <p className="font-sans text-[13px] text-secondary-ds mt-1">
                Click to manage the Tracked and Not tracked keywords and save the changes.
              </p>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-3">
              <Input
                type="search"
                placeholder="Search columns..."
                className="w-52"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />

              {/* Store filter */}
              <select
                className="h-9 rounded-md border border-[var(--border-emphasis)] surface-primary font-sans text-[13px] text-primary-ds px-3 focus:outline-none focus:border-[#1A88FF]"
                value={storeFilter}
                onChange={e => setStoreFilter(e.target.value)}
              >
                <option value="all">All stores</option>
                <option value="apple">Apple Store</option>
                <option value="play">Play Store</option>
              </select>

              {/* Status filter */}
              <select
                className="h-9 rounded-md border border-[var(--border-emphasis)] surface-primary font-sans text-[13px] text-primary-ds px-3 focus:outline-none focus:border-[#1A88FF]"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                <option value="all">All selected</option>
                <option value="tracked">Tracked</option>
                <option value="untracked">Not tracked</option>
                <option value="dropping">Dropping</option>
                <option value="stable">Stable</option>
                <option value="new">New</option>
              </select>

              <div className="ml-auto flex items-center gap-2">
                {selectedCount > 0 && (
                  <span className="font-sans text-[12px] text-secondary-ds">
                    {selectedCount} selected
                  </span>
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={selectedCount === 0}
                  onClick={deleteSelected}
                >
                  Delete
                </Button>
                <Button
                  size="sm"
                  disabled={!hasChanges}
                  onClick={saveChanges}
                >
                  Save Changes
                </Button>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 py-2 px-3 surface-secondary rounded-md">
              <span className="font-sans text-[12px] font-medium text-secondary-ds mr-1">Legend:</span>
              <LegendItem label="Tracked" color="#1A88FF" />
              <LegendItem label="Stable" color="#07C6C3" />
              <LegendItem label="Dropping" color="#FF5700" />
              <LegendItem label="New" color="#8243FF" />
              <LegendItem label="Not tracked" color="#9CA3AF" />
            </div>

            {/* Keyword chips grid */}
            <div className="flex flex-wrap gap-2 min-h-[120px]">
              {filtered.length === 0 ? (
                <p className="font-sans text-[13px] text-secondary-ds self-center w-full text-center py-8">
                  No keywords found.
                </p>
              ) : (
                filtered.map(k => (
                  <KeywordChip
                    key={k.id}
                    keyword={k}
                    selected={k.selected}
                    onToggle={() => toggleKeyword(k.id)}
                  />
                ))
              )}
            </div>

            {/* Footer count */}
            <div className="flex items-center justify-between pt-2 border-t border-[0.5px] border-[var(--border-default)]">
              <span className="font-sans text-[12px] text-secondary-ds">
                Showing {filtered.length} of {keywords.length} keywords
              </span>
              {hasChanges && (
                <span className="font-sans text-[12px] text-[#FF5700]">
                  Unsaved changes
                </span>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export const Default: Story = {
  render: () => <KeywordManagementPage />,
}
