import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart,
} from 'recharts'

import { Button } from '../components/ui/Button/Button'
import { Badge } from '../components/ui/Badge/Badge'
import { Input } from '../components/ui/Input/Input'
import { MetricCard } from '../components/ui/Card/Card'
import { Tabs, TabsList, TabsTrigger, TabsContent, PillGroup } from '../components/ui/Tabs/Tabs'
import { Sidebar } from '../components/ui/Sidebar/Sidebar'

const meta: Meta = {
  title: 'Pages/My Apps',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

/* ── Mock data ──────────────────────────────────────────────── */

const keywordEvolutionData = [
  { date: '04/06', top10: 31, top20: 17, top30: 7, top40: 2, top50: 1, total: 58 },
  { date: '04/07', top10: 31, top20: 17, top30: 7, top40: 4, top50: 1, total: 58 },
  { date: '04/08', top10: 31, top20: 16, top30: 7, top40: 2, top50: 1, total: 58 },
  { date: '04/09', top10: 31, top20: 18, top30: 7, top40: 2, top50: 1, total: 56 },
  { date: '04/10', top10: 31, top20: 17, top30: 8, top40: 2, top50: 1, total: 58 },
  { date: '04/11', top10: 31, top20: 17, top30: 7, top40: 2, top50: 1, total: 58 },
  { date: '04/12', top10: 31, top20: 17, top30: 9, top40: 2, top50: 1, total: 58 },
  { date: '04/13', top10: 31, top20: 17, top30: 7, top40: 2, top50: 1, total: 58 },
]

const categoryPositionData = [
  { date: '04/06', position: 5 },
  { date: '04/07', position: 8 },
  { date: '04/08', position: 4 },
  { date: '04/09', position: 1 },
  { date: '04/10', position: 3 },
  { date: '04/11', position: 6 },
  { date: '04/12', position: 10 },
  { date: '04/13', position: 7 },
]

const sidebarGroups = [
  {
    label: 'Principal',
    items: [
      { label: 'Apps', active: true },
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

/* ── Sub-components ─────────────────────────────────────────── */

function AppCard({ selected = false }: { selected?: boolean }) {
  return (
    <div
      className={[
        'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all',
        selected
          ? 'border-[1.5px] border-[#1A88FF] bg-[rgba(26,136,255,0.04)]'
          : 'border-[0.5px] border-[var(--border-default)] surface-primary hover:surface-secondary',
      ].join(' ')}
    >
      <img
        src="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/6b/8f/6e/6b8f6e6e-6e6e-6e6e-6e6e-6e6e6e6e6e6e/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png"
        alt="Globoplay"
        className="w-10 h-10 rounded-xl object-cover bg-[var(--surface-secondary)]"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none'
        }}
      />
      <div className="flex flex-col gap-[2px] min-w-0">
        <span className="font-sans text-[13px] font-medium text-primary-ds truncate">
          Globoplay: BBB, Brasileiro
        </span>
        <span className="font-sans text-[12px] text-secondary-ds truncate">
          GLOBO COM. E PART. S/A
        </span>
        <Badge variant="purple" className="self-start mt-[2px]">Apple Store</Badge>
      </div>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[18px] font-semibold text-primary-ds">{children}</h2>
  )
}

function MetricStat({
  label, value, variant,
}: {
  label: string
  value: number
  variant: 'blue' | 'orange' | 'green' | 'gray'
}) {
  const colorMap = {
    blue: { bg: 'rgba(26,136,255,0.08)', text: '#1A88FF', border: 'rgba(26,136,255,0.2)' },
    orange: { bg: 'rgba(255,87,0,0.08)', text: '#FF5700', border: 'rgba(255,87,0,0.2)' },
    green: { bg: 'rgba(7,198,195,0.08)', text: '#07C6C3', border: 'rgba(7,198,195,0.2)' },
    gray: { bg: 'rgba(107,114,128,0.08)', text: '#374151', border: 'rgba(107,114,128,0.2)' },
  }
  const c = colorMap[variant]
  return (
    <div
      className="flex items-center gap-3 px-4 py-2 rounded-lg border"
      style={{ backgroundColor: c.bg, borderColor: c.border }}
    >
      <span className="font-sans text-[13px] text-secondary-ds">{label}</span>
      <span
        className="font-sans text-[13px] font-medium underline cursor-pointer"
        style={{ color: c.text }}
      >
        view all
      </span>
      <span
        className="font-display text-[20px] font-bold ml-auto"
        style={{ color: c.text }}
      >
        {value}
      </span>
    </div>
  )
}

/* ── Page ───────────────────────────────────────────────────── */

function MyAppsPage() {
  const [period, setPeriod] = useState('7')
  const [keywordsTab, setKeywordsTab] = useState('typed')
  const [metadataTab, setMetadataTab] = useState('title')
  const [ratingsTab, setRatingsTab] = useState('ratings')

  return (
    <div className="flex h-screen overflow-hidden surface-tertiary">
      <Sidebar groups={sidebarGroups} />

      <main className="flex-1 overflow-y-auto">
        {/* ── Page header ── */}
        <div className="surface-primary border-b border-[0.5px] border-[var(--border-default)] px-6 py-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="font-display text-[22px] font-bold text-primary-ds">My Apps</h1>
              <p className="font-sans text-[13px] text-secondary-ds mt-1">
                Select the main app. You can also add new apps or delete them.
              </p>
            </div>
            <Button size="sm">+ Add New App</Button>
          </div>

          {/* App selector */}
          <div className="flex items-center gap-3 mb-4">
            <Input type="search" placeholder="Search app by name..." className="w-56" />
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">🍎 Apple Store</Button>
              <Button variant="ghost" size="sm">▶ Play Store</Button>
            </div>
          </div>

          <div className="flex flex-col gap-2 max-w-xs">
            <AppCard selected />
            <AppCard />
          </div>
        </div>

        <div className="px-6 py-5 flex flex-col gap-6">

          {/* ── Time range + filter ── */}
          <div className="flex items-center gap-4">
            <span className="font-sans text-[13px] text-secondary-ds">Select the time range</span>
            <PillGroup
              options={[
                { label: '7', value: '7' },
                { label: '15', value: '15' },
                { label: '30', value: '30' },
              ]}
              value={period}
              onChange={setPeriod}
            />
            <div className="ml-auto flex gap-2">
              <Button variant="secondary" size="sm">Filter</Button>
              <Button size="sm">+</Button>
            </div>
          </div>

          {/* ── My Keywords ── */}
          <div className="surface-primary rounded-lg border border-[0.5px] border-[var(--border-default)] p-5 flex flex-col gap-4">
            <SectionTitle>My Keywords</SectionTitle>

            <Tabs value={keywordsTab} onValueChange={setKeywordsTab}>
              <TabsList>
                <TabsTrigger value="typed">Typed Keywords</TabsTrigger>
                <TabsTrigger value="all">All Keywords</TabsTrigger>
              </TabsList>

              <TabsContent value="typed" className="pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-sans text-[13px] font-medium text-primary-ds">
                    Daily Keyword Evolution
                  </span>
                  <div className="flex gap-2 text-[12px] font-sans text-secondary-ds">
                    {[
                      { label: 'Top 1-50', color: '#1A88FF' },
                      { label: 'Top 10', color: '#07C6C3' },
                      { label: 'Top 20', color: '#00A3FF' },
                      { label: 'Top 30', color: '#8243FF' },
                      { label: 'Top 40', color: '#FF5700' },
                      { label: 'Top 50', color: '#FF0167' },
                    ].map(({ label, color }) => (
                      <span key={label} className="flex items-center gap-1">
                        <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={220}>
                  <ComposedChart data={keywordEvolutionData} barGap={2}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--surface-primary)',
                        border: '1px solid var(--border-default)',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                    />
                    <Line type="monotone" dataKey="total" stroke="#1A88FF" strokeWidth={2} dot={{ r: 3, fill: '#1A88FF' }} />
                    <Bar dataKey="top10" stackId="a" fill="#07C6C3" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="top20" stackId="a" fill="#00A3FF" />
                    <Bar dataKey="top30" stackId="a" fill="#8243FF" />
                    <Bar dataKey="top40" stackId="a" fill="#FF5700" />
                    <Bar dataKey="top50" stackId="a" fill="#FF0167" radius={[3, 3, 0, 0]} />
                  </ComposedChart>
                </ResponsiveContainer>

                {/* Keyword stats */}
                <div className="grid grid-cols-4 gap-3 mt-4">
                  <MetricStat label="Growing Keywords" value={17} variant="blue" />
                  <MetricStat label="Dropping Keywords" value={15} variant="orange" />
                  <MetricStat label="Stable Keywords" value={28} variant="green" />
                  <MetricStat label="Total Keywords" value={60} variant="gray" />
                </div>
              </TabsContent>

              <TabsContent value="all" className="pt-4">
                <p className="font-sans text-[13px] text-secondary-ds">All Keywords view</p>
              </TabsContent>
            </Tabs>
          </div>

          {/* ── Metadata ── */}
          <div className="surface-primary rounded-lg border border-[0.5px] border-[var(--border-default)] p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <SectionTitle>Metadata</SectionTitle>
              <Button variant="ghost" size="sm">Show All</Button>
            </div>

            <Tabs value={metadataTab} onValueChange={setMetadataTab}>
              <TabsList>
                {['title', 'icon', 'developer', 'subtitle', 'promotional', 'description', 'screenshots', 'version', 'details'].map((t) => (
                  <TabsTrigger key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="title" className="pt-4">
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className="flex flex-col items-center gap-2">
                    <span className="label-upper text-secondary-ds">Icon</span>
                    <div className="w-14 h-14 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border-default)]" />
                  </div>

                  {/* Title and Developer */}
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[13px] font-medium text-primary-ds">Title and Developer:</span>
                      <Badge variant="blue">29/30 characters</Badge>
                    </div>
                    <div className="border border-[var(--border-emphasis)] rounded-md p-3">
                      <p className="font-sans text-[14px] text-primary-ds">Globoplay: BBB, Brasileiro +</p>
                      <p className="font-sans text-[12px] text-secondary-ds mt-1">GLOBO COM. E PART. S/A</p>
                    </div>
                  </div>

                  {/* Subtitle */}
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[13px] font-medium text-primary-ds">Subtitle</span>
                      <Badge variant="green">30/30 characters</Badge>
                    </div>
                    <div className="border border-[var(--border-emphasis)] rounded-md p-3 min-h-[60px]">
                      <p className="font-sans text-[13px] text-secondary-ds">Brasileiro, séries, filmes e+</p>
                    </div>
                  </div>

                  {/* Promotional Text */}
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[13px] font-medium text-primary-ds">Promotional Text</span>
                      <Badge variant="gray">0/170 characters</Badge>
                    </div>
                    <div className="border border-[var(--border-emphasis)] rounded-md p-3 min-h-[60px]" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="version" className="pt-4">
                <p className="font-sans text-[13px] text-secondary-ds">Version content</p>
              </TabsContent>

              {['icon', 'developer', 'subtitle', 'promotional', 'description', 'screenshots', 'details'].map((t) => (
                <TabsContent key={t} value={t} className="pt-4">
                  <p className="font-sans text-[13px] text-secondary-ds">{t} content</p>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* ── App Version | What's New ── */}
          <div className="surface-primary rounded-lg border border-[0.5px] border-[var(--border-default)] p-5 flex flex-col gap-4">
            <SectionTitle>App Version | What's New</SectionTitle>
            <div className="flex gap-4">
              <div className="flex-1 border border-[var(--border-emphasis)] rounded-md p-4">
                <p className="font-sans text-[13px] font-medium text-[#1A88FF] mb-2">Version 4.221.1</p>
                <p className="font-sans text-[13px] text-secondary-ds leading-relaxed">
                  Fique à vontade com os ajustes importantes para garantir uma melhor experiência no Globoplay. Veja abaixo o que há de novo...
                </p>
              </div>
              <MetricCard label="Last Update" value="04/04/2026" className="w-40" />
            </div>
          </div>

          {/* ── App Details ── */}
          <div className="surface-primary rounded-lg border border-[0.5px] border-[var(--border-default)] p-5 flex flex-col gap-4">
            <SectionTitle>App Details</SectionTitle>
            <div className="grid grid-cols-3 gap-3">
              <MetricCard label="App Size" value="296.39 MB" />
              <MetricCard label="Pricing" value="Free" />
              <MetricCard label="Content Rating" value="+12" />
            </div>
          </div>

          {/* ── Ratings & Reviews ── */}
          <div className="surface-primary rounded-lg border border-[0.5px] border-[var(--border-default)] p-5 flex flex-col gap-4">
            <SectionTitle>My Apps on App Store</SectionTitle>

            <Tabs value={ratingsTab} onValueChange={setRatingsTab}>
              <TabsList>
                <TabsTrigger value="ratings">Ratings</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="ratings" className="pt-4 flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-3">
                  <MetricCard label="Ratings Total" value="457,396" delta={12} deltaLabel="+12%" />
                  <MetricCard label="App Store Ratings" value="4.55 ★" />
                  <MetricCard label="Ratings Average: 7 Days" value="4.55 ★" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-sans text-[13px] font-medium text-primary-ds">Breakdown Graphs</span>
                    <div className="flex gap-3 text-[12px] font-sans text-secondary-ds">
                      {[
                        { label: '5 Stars', color: '#07C6C3' },
                        { label: '4 Stars', color: '#1A88FF' },
                        { label: '3 Stars', color: '#FF5700' },
                        { label: '2 Stars', color: '#FF935B' },
                        { label: '1 Star', color: '#FF0167' },
                      ].map(({ label, color }) => (
                        <span key={label} className="flex items-center gap-1">
                          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ResponsiveContainer width="100%" height={180}>
                    <ComposedChart data={keywordEvolutionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
                      <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: 'var(--surface-primary)', border: '1px solid var(--border-default)', borderRadius: '8px', fontSize: '12px' }} />
                      <Bar dataKey="top10" stackId="a" fill="#07C6C3" />
                      <Bar dataKey="top20" stackId="a" fill="#1A88FF" />
                      <Bar dataKey="top30" stackId="a" fill="#FF5700" />
                      <Bar dataKey="top40" stackId="a" fill="#FF935B" radius={[3, 3, 0, 0]} />
                      <Line type="monotone" dataKey="total" stroke="#1A88FF" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="5 5" yAxisId={0} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="pt-4">
                <p className="font-sans text-[13px] text-secondary-ds">Reviews content</p>
              </TabsContent>
            </Tabs>
          </div>

          {/* ── Category ── */}
          <div className="surface-primary rounded-lg border border-[0.5px] border-[var(--border-default)] p-5 flex flex-col gap-4">
            <SectionTitle>Category</SectionTitle>

            <div className="grid grid-cols-3 gap-3">
              <MetricCard label="Category" value="Entretenimento" />
              <MetricCard label="Current Position" value="7" delta={-2} deltaLabel="-2 pos" />
              <MetricCard label="Position Average: 7 Days" value="6" />
            </div>

            <div>
              <span className="font-sans text-[13px] font-medium text-primary-ds mb-3 block">Category graph:</span>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={categoryPositionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                  <YAxis reversed tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--surface-primary)', border: '1px solid var(--border-default)', borderRadius: '8px', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="position" stroke="#1A88FF" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export const Default: Story = {
  render: () => <MyAppsPage />,
}
