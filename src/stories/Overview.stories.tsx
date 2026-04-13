import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
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

const meta: Meta = {
  title: 'Overview',
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj

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

function OverviewDemo() {
  const [period, setPeriod] = useState('30')

  return (
    <div className="flex h-screen surface-tertiary">
      <Sidebar groups={sidebarGroups} />

      <main className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-[28px] font-bold text-primary-ds">RankMyApp DS v1.0</h1>
            <p className="font-sans text-[14px] text-secondary-ds mt-1">Design System — Abril 2026</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">Export</Button>
            <Button size="sm">Novo App</Button>
          </div>
        </div>

        {/* Metric Cards */}
        <section>
          <h2 className="label-upper text-secondary-ds mb-3">Métricas</h2>
          <div className="grid grid-cols-4 gap-[10px]">
            <MetricCard label="Impressions" value="124.5K" delta={12} deltaLabel="+12%" />
            <MetricCard label="Downloads" value="8,230" delta={-3} deltaLabel="-3%" />
            <MetricCard label="Rating" value="4.7" delta={0} />
            <MetricCard label="Keywords Ranked" value="342" delta={18} deltaLabel="+18" />
          </div>
        </section>

        {/* Tabs + Table */}
        <section className="surface-primary rounded-lg border border-[0.5px] border-[var(--border-default)] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-[18px] font-semibold text-primary-ds">Keywords</h2>
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

          <Tabs defaultValue="all">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="growing">Growing</TabsTrigger>
                <TabsTrigger value="dropping">Dropping</TabsTrigger>
              </TabsList>
              <Input type="search" placeholder="Search keywords..." className="w-48" />
            </div>
            <TabsContent value="all">
              <DataTable columns={tableColumns} data={tableData} />
            </TabsContent>
            <TabsContent value="growing">
              <DataTable columns={tableColumns} data={tableData.filter(r => r.status === 'growing')} />
            </TabsContent>
            <TabsContent value="dropping">
              <DataTable columns={tableColumns} data={tableData.filter(r => r.status === 'dropping')} />
            </TabsContent>
          </Tabs>
        </section>

        {/* Buttons */}
        <section className="surface-primary rounded-lg border border-[0.5px] border-[var(--border-default)] p-5">
          <h2 className="label-upper text-secondary-ds mb-4">Buttons</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
          </div>
        </section>

        {/* Badges */}
        <section className="surface-primary rounded-lg border border-[0.5px] border-[var(--border-default)] p-5">
          <h2 className="label-upper text-secondary-ds mb-4">Badges</h2>
          <div className="flex flex-wrap gap-2">
            <Badge status="growing">Growing</Badge>
            <Badge status="stable">Stable</Badge>
            <Badge status="dropping">Dropping</Badge>
            <Badge status="critical">Critical</Badge>
            <Badge variant="purple">App Store</Badge>
            <Badge variant="gray">Play Store</Badge>
          </div>
        </section>

        {/* Alerts */}
        <section className="flex flex-col gap-3">
          <h2 className="label-upper text-secondary-ds">Alerts</h2>
          <Alert variant="info" title="Atualização disponível">Seus dados serão sincronizados em breve.</Alert>
          <Alert variant="success" title="Análise concluída">10 novas keywords foram encontradas.</Alert>
          <Alert variant="warning" title="Plano expirando">Seu plano expira em 3 dias.</Alert>
          <Alert variant="danger" title="Erro ao carregar">Não foi possível buscar os dados de keywords.</Alert>
        </section>

        {/* Progress Bars */}
        <section className="surface-primary rounded-lg border border-[0.5px] border-[var(--border-default)] p-5">
          <h2 className="label-upper text-secondary-ds mb-4">Ranking Distribution</h2>
          <div className="flex flex-col gap-3 max-w-xs">
            <ProgressBar value={92} tier="top10" label="Top 10" />
            <ProgressBar value={75} tier="top20" label="Top 20" />
            <ProgressBar value={58} tier="top30" label="Top 30" />
            <ProgressBar value={40} tier="top40" label="Top 40" />
            <ProgressBar value={22} tier="top50" label="Top 50" />
          </div>
        </section>

        {/* Form */}
        <section className="surface-primary rounded-lg border border-[0.5px] border-[var(--border-default)] p-5">
          <h2 className="label-upper text-secondary-ds mb-4">Inputs & Toggles</h2>
          <div className="flex flex-col gap-4 max-w-sm">
            <Input label="App Name" placeholder="My App" />
            <Input type="search" placeholder="Search..." />
            <Input label="Error state" error="This field is required." placeholder="Type here..." />
            <div className="flex flex-col gap-2">
              <Toggle id="ov1" defaultChecked label="Auto-refresh" />
              <Toggle id="ov2" label="Email notifications" />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export const Default: Story = {
  render: () => <OverviewDemo />,
}
