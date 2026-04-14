import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, CalendarDays, MoreHorizontal, Edit, Trash2, Download, Copy, EyeOff } from 'lucide-react'
import { Button } from '../components/ui/Button/Button'
import { Badge } from '../components/ui/Badge/Badge'
import { Input } from '../components/ui/Input/Input'
import { Toggle } from '../components/ui/Toggle/Toggle'
import { MetricCard } from '../components/ui/Card/Card'
import { Alert } from '../components/ui/Alert/Alert'
import { ProgressBar } from '../components/ui/ProgressBar/ProgressBar'
import { Tabs, TabsList, TabsTrigger, TabsContent, PillGroup } from '../components/ui/Tabs/Tabs'
import { DataTable } from '../components/ui/DataTable/DataTable'
import type { Column } from '../components/ui/DataTable/DataTable'
import { Sidebar } from '../components/ui/Sidebar/Sidebar'
import { Modal } from '../components/ui/Modal/Modal'
import { Tooltip } from '../components/ui/Tooltip/Tooltip'
import { DropdownMenu } from '../components/ui/DropdownMenu/DropdownMenu'
import { colors } from '../tokens/colors'

const meta: Meta = {
  title: 'Overview',
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj

/* ── Sidebar ────────────────────────────────────────────────── */

const sidebarGroups = [
  {
    label: 'Principal',
    items: [
      { label: 'My Apps', active: true },
      { label: 'Action Plan' },
      { label: 'Competitors' },
      { label: 'Changes Log' },
    ],
  },
  {
    label: 'Análise',
    items: [
      { label: 'Explore Source' },
      { label: 'Search Source' },
      { label: 'Ratings & Reviews' },
      { label: 'Technical Performance' },
    ],
  },
]

/* ── Table data ─────────────────────────────────────────────── */

type KeywordRow = { keyword: string; volume: string; position: number; delta: number; status: string }

const tableColumns: Column<KeywordRow>[] = [
  { key: 'keyword', label: 'Keyword' },
  { key: 'volume', label: 'Volume', align: 'right' },
  { key: 'position', label: 'Position', align: 'right' },
  { key: 'delta', label: 'Change', type: 'delta', align: 'right' },
  { key: 'status', label: 'Status', type: 'status' },
]

const tableData: KeywordRow[] = [
  { keyword: 'app store optimization', volume: '12,400', position: 3, delta: 2, status: 'growing' },
  { keyword: 'aso tools', volume: '8,900', position: 7, delta: 0, status: 'stable' },
  { keyword: 'keyword research mobile', volume: '5,200', position: 14, delta: -3, status: 'dropping' },
]

/* ── DateRangePicker ────────────────────────────────────────── */

const PRESETS = ['Today', 'Yesterday', 'This Week', 'Last Week', 'This Month', 'Last Month', '32 days up to today', 'days starting today']
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAY_HEADERS = ['Su','Mo','Tu','We','Th','Fr','Sa']

function DateRangePicker({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [viewMonth, setViewMonth] = useState(new Date(2026, 2))

  const START = new Date(2026, 2, 13)
  const END   = new Date(2026, 3, 13)

  const year  = viewMonth.getFullYear()
  const month = viewMonth.getMonth()
  const firstDay    = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const isSameDay = (d: Date, ref: Date) =>
    d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth() && d.getDate() === ref.getDate()

  const getState = (day: number) => {
    const d = new Date(year, month, day)
    if (isSameDay(d, START) || isSameDay(d, END)) return 'edge'
    if (d > START && d < END) return 'range'
    return 'default'
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 px-3 rounded-md border border-[var(--border-emphasis)] surface-primary font-sans text-[13px] text-primary-ds flex items-center gap-2 hover:surface-secondary transition-colors focus:outline-none"
      >
        <CalendarDays size={14} className="text-secondary-ds" />
        03/13/2026 - 04/13/2026
      </button>

      {isOpen && (
        <div className="absolute top-11 left-0 z-50 surface-primary border border-[var(--border-default)] rounded-lg shadow-lg flex overflow-hidden">
          <div className="w-44 border-r border-[var(--border-default)] p-2 flex flex-col gap-[2px]">
            {PRESETS.map((preset) => (
              <button key={preset} className="text-left font-sans text-[13px] text-primary-ds px-3 py-[7px] rounded-md hover:surface-secondary transition-colors">
                {preset}
              </button>
            ))}
          </div>
          <div className="p-4 flex flex-col gap-3 w-[272px]">
            <div className="flex items-center gap-2">
              <Input defaultValue="Mar 13, 2026" className="h-8 text-[12px] flex-1" />
              <span className="font-sans text-[12px] text-secondary-ds">—</span>
              <Input defaultValue="Apr 13, 2026" className="h-8 text-[12px] flex-1" />
            </div>
            <div className="flex items-center justify-between">
              <button onClick={() => setViewMonth(new Date(year, month - 1))} className="p-1 rounded hover:surface-secondary transition-colors">
                <ChevronLeft size={16} className="text-secondary-ds" />
              </button>
              <span className="font-sans text-[14px] font-medium text-primary-ds">{MONTH_NAMES[month]} {year}</span>
              <button onClick={() => setViewMonth(new Date(year, month + 1))} className="p-1 rounded hover:surface-secondary transition-colors">
                <ChevronRight size={16} className="text-secondary-ds" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-y-[2px]">
              {DAY_HEADERS.map(d => (
                <div key={d} className="text-center font-sans text-[11px] text-secondary-ds py-1">{d}</div>
              ))}
              {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                const state = getState(day)
                return (
                  <button key={day} className={
                    state === 'edge'
                      ? 'text-center font-sans text-[12px] py-1 rounded-md bg-[#1A88FF] text-white w-full'
                      : state === 'range'
                        ? 'text-center font-sans text-[12px] py-1 rounded-md bg-[rgba(26,136,255,0.12)] text-[#1A88FF] w-full'
                        : 'text-center font-sans text-[12px] py-1 rounded-md text-primary-ds hover:surface-secondary w-full transition-colors'
                  }>{day}</button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Modal preview helper ───────────────────────────────────── */

function ModalPreview(props: {
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'default' | 'danger'
  withForm?: boolean
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button size="sm" variant={props.variant === 'danger' ? 'destructive' : 'ghost'} onClick={() => setOpen(true)}>
        Abrir modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        {...props}
      >
        {props.withForm && (
          <div className="flex flex-col gap-3 mt-1">
            <Input label="Keyword" placeholder="ex: globoplay" />
            <Input label="Categoria" placeholder="ex: Entretenimento" />
          </div>
        )}
      </Modal>
    </>
  )
}

/* ── Section wrapper ────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="surface-primary rounded-lg border border-[0.5px] border-[var(--border-default)] p-6 flex flex-col gap-5">
      <h2 className="label-upper text-secondary-ds">{title}</h2>
      {children}
    </section>
  )
}

/* ── Color swatch ───────────────────────────────────────────── */

function Swatch({ hex, name }: { hex: string; name: string }) {
  return (
    <div className="flex flex-col gap-[6px] items-start">
      <div
        className="w-14 h-14 rounded-lg border border-[var(--border-default)]"
        style={{ backgroundColor: hex }}
      />
      <span className="font-sans text-[11px] font-medium text-primary-ds leading-tight">{name}</span>
      <span className="font-sans text-[10px] text-secondary-ds uppercase">{hex}</span>
    </div>
  )
}

/* ── Color group ────────────────────────────────────────────── */

function ColorGroup({ label, swatches }: { label: string; swatches: { name: string; hex: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-sans text-[12px] font-medium text-secondary-ds">{label}</span>
      <div className="flex flex-wrap gap-4">
        {swatches.map(s => <Swatch key={s.name} {...s} />)}
      </div>
    </div>
  )
}

/* ── Type specimen ──────────────────────────────────────────── */

function TypeRow({
  sample, label, spec,
}: { sample: React.ReactNode; label: string; spec: string }) {
  return (
    <div className="flex items-baseline gap-4 py-3 border-b border-[0.5px] border-[var(--border-default)] last:border-0">
      <div className="flex-1">{sample}</div>
      <span className="font-sans text-[12px] text-secondary-ds w-40 shrink-0">{label}</span>
      <span className="font-sans text-[11px] text-secondary-ds w-48 shrink-0">{spec}</span>
    </div>
  )
}

/* ── Surface tile ───────────────────────────────────────────── */

function SurfaceTile({
  className, label, value,
}: { className: string; label: string; value: string }) {
  return (
    <div className={`${className} rounded-lg border border-[var(--border-emphasis)] p-4 flex flex-col gap-1`}>
      <span className="font-sans text-[13px] font-medium text-primary-ds">{label}</span>
      <span className="font-sans text-[11px] text-secondary-ds">{value}</span>
    </div>
  )
}

/* ── Spacing row ────────────────────────────────────────────── */

function SpacingRow({ size, px }: { size: string; px: number }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-sans text-[12px] text-secondary-ds w-8">{size}</span>
      <div className="h-4 bg-[#1A88FF] rounded-sm opacity-70" style={{ width: px }} />
      <span className="font-sans text-[12px] text-secondary-ds">{px}px</span>
    </div>
  )
}

/* ── Overview page ──────────────────────────────────────────── */

function OverviewDemo() {
  const [period, setPeriod] = useState('30')

  return (
    <div className="flex h-screen surface-tertiary">
      <Sidebar groups={sidebarGroups} />

      <main className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">

        {/* ── Header ── */}
        <div className="surface-primary rounded-lg border border-[0.5px] border-[var(--border-default)] p-6">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="label-upper text-secondary-ds">Design System</span>
              <h1 className="font-display text-[32px] font-bold text-primary-ds leading-tight">
                RankMyApp DS v1.0
              </h1>
              <p className="font-sans text-[14px] text-secondary-ds mt-1">
                Biblioteca de componentes, tokens e padrões visuais · Abril 2026
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">Figma</Button>
              <Button variant="secondary" size="sm">GitHub</Button>
              <Button size="sm">+ Novo componente</Button>
            </div>
          </div>

          {/* DS summary stats */}
          <div className="grid grid-cols-4 gap-[10px] mt-5">
            <MetricCard label="Componentes" value="13" delta={3} deltaLabel="+3 hoje" />
            <MetricCard label="Tokens de cor" value="22" />
            <MetricCard label="Pages no Storybook" value="3" delta={1} deltaLabel="+1 esta semana" />
            <MetricCard label="Chromatic Builds" value="7" delta={7} deltaLabel="todos aprovados" />
          </div>
        </div>

        {/* ── Colors ── */}
        <Section title="Tokens de Cor">
          <ColorGroup
            label="Brand"
            swatches={[
              { name: 'Blue', hex: colors.brand.blue },
              { name: 'Blue Dark', hex: colors.brand.blueDark },
              { name: 'Navy', hex: colors.brand.navy },
              { name: 'Cyan', hex: colors.brand.cyan },
              { name: 'Cyan Light', hex: colors.brand.cyanLight },
              { name: 'Orange', hex: colors.brand.orange },
              { name: 'Orange Light', hex: colors.brand.orangeLight },
              { name: 'Teal', hex: colors.brand.teal },
              { name: 'Purple', hex: colors.brand.purple },
              { name: 'Pink', hex: colors.brand.pink },
            ]}
          />
          <ColorGroup
            label="Semantic"
            swatches={[
              { name: 'Success', hex: colors.semantic.success },
              { name: 'Warning', hex: colors.semantic.warning },
              { name: 'Danger', hex: colors.semantic.danger },
              { name: 'Info', hex: colors.semantic.info },
            ]}
          />
          <ColorGroup
            label="Ranking"
            swatches={[
              { name: 'Top 10', hex: colors.ranking.top10 },
              { name: 'Top 20', hex: colors.ranking.top20 },
              { name: 'Top 30', hex: colors.ranking.top30 },
              { name: 'Top 40', hex: colors.ranking.top40 },
              { name: 'Top 50', hex: colors.ranking.top50 },
            ]}
          />
          <ColorGroup
            label="Delta"
            swatches={[
              { name: 'Positive', hex: colors.delta.positive },
              { name: 'Negative', hex: colors.delta.negative },
            ]}
          />
        </Section>

        {/* ── Typography ── */}
        <Section title="Tipografia">
          <div className="flex flex-col">
            <TypeRow
              sample={<span className="font-display text-[32px] font-bold text-primary-ds leading-none">Display Bold</span>}
              label="Display / Bold"
              spec="Nunito · 32px · 700"
            />
            <TypeRow
              sample={<span className="font-display text-[24px] font-semibold text-primary-ds leading-none">Heading Semibold</span>}
              label="Heading / Semibold"
              spec="Nunito · 24px · 600"
            />
            <TypeRow
              sample={<span className="font-display text-[18px] font-medium text-primary-ds leading-none">Section Title</span>}
              label="Section Title"
              spec="DM Sans · 18px · 500"
            />
            <TypeRow
              sample={<span className="font-sans text-[14px] text-primary-ds">Body Regular — Texto corrido de exemplo para visualização</span>}
              label="Body / Regular"
              spec="DM Sans · 14px · 400"
            />
            <TypeRow
              sample={<span className="font-sans text-[13px] text-primary-ds">Small / Regular — Texto secundário de apoio</span>}
              label="Small / Regular"
              spec="DM Sans · 13px · 400"
            />
            <TypeRow
              sample={<span className="font-sans text-[13px] font-medium text-primary-ds">Small / Medium</span>}
              label="Small / Medium"
              spec="DM Sans · 13px · 500"
            />
            <TypeRow
              sample={<span className="font-sans text-[12px] text-secondary-ds">Caption — metadado, legenda, hint</span>}
              label="Caption"
              spec="DM Sans · 12px · 400"
            />
            <TypeRow
              sample={<span className="label-upper text-secondary-ds">Label Uppercase</span>}
              label="Label / Uppercase"
              spec="DM Sans · 11px · 500 · 0.08em"
            />
          </div>
        </Section>

        {/* ── Surfaces & Borders ── */}
        <Section title="Superfícies e Bordas">
          <div className="grid grid-cols-3 gap-3">
            <SurfaceTile className="surface-primary" label="surface-primary" value="#FFFFFF" />
            <SurfaceTile className="surface-secondary" label="surface-secondary" value="#F5F7FA" />
            <SurfaceTile className="surface-tertiary" label="surface-tertiary" value="#EEF1F5" />
          </div>
          <div className="flex flex-col gap-3 mt-2">
            <div className="flex items-center gap-4">
              <div className="h-[1px] flex-1 bg-[var(--border-default)]" />
              <span className="font-sans text-[12px] text-secondary-ds shrink-0">border-default · rgba(0,0,0,0.08)</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-[1px] flex-1 bg-[var(--border-emphasis)]" />
              <span className="font-sans text-[12px] text-secondary-ds shrink-0">border-emphasis · rgba(0,0,0,0.18)</span>
            </div>
          </div>
        </Section>

        {/* ── Spacing ── */}
        <Section title="Espaçamento">
          <div className="flex flex-col gap-[10px]">
            <SpacingRow size="2"  px={2}  />
            <SpacingRow size="4"  px={4}  />
            <SpacingRow size="6"  px={6}  />
            <SpacingRow size="8"  px={8}  />
            <SpacingRow size="10" px={10} />
            <SpacingRow size="12" px={12} />
            <SpacingRow size="16" px={16} />
            <SpacingRow size="20" px={20} />
            <SpacingRow size="24" px={24} />
            <SpacingRow size="32" px={32} />
            <SpacingRow size="40" px={40} />
            <SpacingRow size="48" px={48} />
          </div>
        </Section>

        {/* ── Buttons ── */}
        <Section title="Buttons">
          <div className="flex flex-col gap-4">
            <div>
              <span className="font-sans text-[12px] text-secondary-ds mb-2 block">Variants</span>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
              </div>
            </div>
            <div>
              <span className="font-sans text-[12px] text-secondary-ds mb-2 block">Sizes</span>
              <div className="flex items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Badges ── */}
        <Section title="Badges">
          <div className="flex flex-col gap-3">
            <div>
              <span className="font-sans text-[12px] text-secondary-ds mb-2 block">Keyword status</span>
              <div className="flex flex-wrap gap-2">
                <Badge status="growing">Growing</Badge>
                <Badge status="stable">Stable</Badge>
                <Badge status="dropping">Dropping</Badge>
                <Badge status="critical">Critical</Badge>
              </div>
            </div>
            <div>
              <span className="font-sans text-[12px] text-secondary-ds mb-2 block">Variants</span>
              <div className="flex flex-wrap gap-2">
                <Badge variant="blue">Blue</Badge>
                <Badge variant="green">Green</Badge>
                <Badge variant="orange">Orange</Badge>
                <Badge variant="red">Red</Badge>
                <Badge variant="purple">Purple · Apple Store</Badge>
                <Badge variant="gray">Gray · Play Store</Badge>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Alerts ── */}
        <Section title="Alerts">
          <Alert variant="info" title="Atualização disponível">Seus dados serão sincronizados em breve.</Alert>
          <Alert variant="success" title="Análise concluída">10 novas keywords foram encontradas.</Alert>
          <Alert variant="warning" title="Plano expirando">Seu plano expira em 3 dias.</Alert>
          <Alert variant="danger" title="Erro ao carregar">Não foi possível buscar os dados de keywords.</Alert>
        </Section>

        {/* ── Progress Bars ── */}
        <Section title="Progress Bars — Ranking Distribution">
          <div className="flex flex-col gap-3 max-w-xs">
            <ProgressBar value={92} tier="top10" label="Top 10" />
            <ProgressBar value={75} tier="top20" label="Top 20" />
            <ProgressBar value={58} tier="top30" label="Top 30" />
            <ProgressBar value={40} tier="top40" label="Top 40" />
            <ProgressBar value={22} tier="top50" label="Top 50" />
          </div>
        </Section>

        {/* ── Inputs & Toggles ── */}
        <Section title="Inputs & Toggles">
          <div className="flex flex-col gap-4 max-w-sm">
            <Input label="App Name" placeholder="My App" />
            <Input type="search" placeholder="Search..." />
            <Input label="Error state" error="This field is required." placeholder="Type here..." />
            <Input label="With hint" hint="Use the app name as it appears on the store." placeholder="Type here..." />
            <div className="flex flex-col gap-2">
              <Toggle id="ov1" defaultChecked label="Auto-refresh" />
              <Toggle id="ov2" label="Email notifications" />
            </div>
          </div>
        </Section>

        {/* ── Tabs & PillGroup ── */}
        <Section title="Tabs & Pill Group">
          <div className="flex flex-col gap-5">
            <div>
              <span className="font-sans text-[12px] text-secondary-ds mb-3 block">Pill Group</span>
              <PillGroup
                options={[
                  { label: '7d', value: '7' },
                  { label: '15d', value: '15' },
                  { label: '30d', value: '30' },
                ]}
                value={period}
                onChange={setPeriod}
              />
            </div>
            <div>
              <span className="font-sans text-[12px] text-secondary-ds mb-3 block">Tabs</span>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="growing">Growing</TabsTrigger>
                  <TabsTrigger value="dropping">Dropping</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="pt-4">
                  <DataTable columns={tableColumns} data={tableData} />
                </TabsContent>
                <TabsContent value="growing" className="pt-4">
                  <DataTable columns={tableColumns} data={tableData.filter(r => r.status === 'growing')} />
                </TabsContent>
                <TabsContent value="dropping" className="pt-4">
                  <DataTable columns={tableColumns} data={tableData.filter(r => r.status === 'dropping')} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Section>

        {/* ── Date Range Picker ── */}
        <Section title="Date Range Picker">
          <div className="flex flex-col gap-4">
            <div>
              <span className="font-sans text-[12px] text-secondary-ds mb-3 block">Fechado — estado padrão</span>
              <DateRangePicker />
            </div>
            <div>
              <span className="font-sans text-[12px] text-secondary-ds mb-3 block">Aberto — com range selecionado</span>
              <div className="relative h-[380px]">
                <DateRangePicker defaultOpen />
              </div>
            </div>
          </div>
        </Section>

        {/* ── Modal ── */}
        <Section title="Modal">
          <div className="flex flex-col gap-5">
            <div>
              <span className="font-sans text-[12px] mb-3 block" style={{ color: 'var(--text-secondary)' }}>Default — confirmação</span>
              <ModalPreview
                title="Confirmar ação"
                description="Tem certeza que deseja continuar com esta operação?"
                confirmLabel="Confirmar"
                cancelLabel="Cancelar"
              />
            </div>
            <div>
              <span className="font-sans text-[12px] mb-3 block" style={{ color: 'var(--text-secondary)' }}>Danger — ação destrutiva</span>
              <ModalPreview
                variant="danger"
                title="Deletar keyword"
                description="Esta ação não pode ser desfeita. A keyword será removida permanentemente."
                confirmLabel="Deletar"
                cancelLabel="Cancelar"
              />
            </div>
            <div>
              <span className="font-sans text-[12px] mb-3 block" style={{ color: 'var(--text-secondary)' }}>With Form</span>
              <ModalPreview
                title="Adicionar Keyword"
                description="Insira uma nova keyword para começar a monitorar."
                confirmLabel="Adicionar"
                cancelLabel="Cancelar"
                withForm
              />
            </div>
          </div>
        </Section>

        {/* ── Tooltip ── */}
        <Section title="Tooltip">
          <div className="flex flex-col gap-4">
            <div>
              <span className="font-sans text-[12px] mb-3 block" style={{ color: 'var(--text-secondary)' }}>Posições</span>
              <div className="flex items-center gap-8 py-4">
                {(['top', 'bottom', 'left', 'right'] as const).map(side => (
                  <Tooltip key={side} content={`Tooltip ${side}`} side={side}>
                    <Button variant="ghost" size="sm">{side}</Button>
                  </Tooltip>
                ))}
              </div>
            </div>
            <div>
              <span className="font-sans text-[12px] mb-3 block" style={{ color: 'var(--text-secondary)' }}>Em badges e textos</span>
              <div className="flex items-center gap-4 py-2">
                <Tooltip content="Keywords crescendo de posição">
                  <Badge status="growing">Growing · 17</Badge>
                </Tooltip>
                <Tooltip content="Keywords perdendo posição">
                  <Badge status="dropping">Dropping · 4</Badge>
                </Tooltip>
                <Tooltip content="Quantidade total de buscas mensais para esta keyword">
                  <span className="font-sans text-[13px] underline decoration-dashed cursor-help" style={{ color: 'var(--text-secondary)' }}>
                    Search Volume ?
                  </span>
                </Tooltip>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Dropdown Menu ── */}
        <Section title="Dropdown Menu">
          <div className="flex flex-col gap-5">
            <div>
              <span className="font-sans text-[12px] mb-3 block" style={{ color: 'var(--text-secondary)' }}>Com ícones e item destrutivo</span>
              <DropdownMenu
                trigger={
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal size={16} /> Ações
                  </Button>
                }
                items={[
                  { label: 'Editar', icon: <Edit size={14} /> },
                  { label: 'Duplicar', icon: <Copy size={14} /> },
                  { label: 'Exportar', icon: <Download size={14} /> },
                  { label: 'Ocultar', icon: <EyeOff size={14} />, dividerBefore: true },
                  { label: 'Deletar', icon: <Trash2 size={14} />, variant: 'destructive', dividerBefore: true },
                ]}
              />
            </div>
            <div>
              <span className="font-sans text-[12px] mb-3 block" style={{ color: 'var(--text-secondary)' }}>Com item desabilitado</span>
              <DropdownMenu
                trigger={<Button variant="ghost" size="sm">Opções ▾</Button>}
                items={[
                  { label: 'Salvar alterações', icon: <Edit size={14} /> },
                  { label: 'Exportar (indisponível)', icon: <Download size={14} />, disabled: true },
                  { label: 'Deletar', icon: <Trash2 size={14} />, variant: 'destructive', dividerBefore: true },
                ]}
              />
            </div>
          </div>
        </Section>

        {/* ── Metric Cards ── */}
        <Section title="Metric Cards">
          <div className="grid grid-cols-4 gap-[10px]">
            <MetricCard label="Impressions" value="124.5K" delta={12} deltaLabel="+12%" />
            <MetricCard label="Downloads" value="8,230" delta={-3} deltaLabel="-3%" />
            <MetricCard label="Rating" value="4.7 ★" delta={0} />
            <MetricCard label="Keywords Ranked" value="342" delta={18} deltaLabel="+18" />
          </div>
        </Section>

      </main>
    </div>
  )
}

export const Default: Story = {
  render: () => <OverviewDemo />,
}
