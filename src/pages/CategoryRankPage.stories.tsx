import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react'

import { Button } from '../components/ui/Button/Button'
import { Badge } from '../components/ui/Badge/Badge'
import { Input } from '../components/ui/Input/Input'
import { Sidebar } from '../components/ui/Sidebar/Sidebar'
import { PillGroup } from '../components/ui/Tabs/Tabs'

const meta: Meta = {
  title: 'Pages/Category Rank',
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

/* ── Sidebar groups ─────────────────────────────────────────── */

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

/* ── Mock chart data ────────────────────────────────────────── */

const chartData = [
  { date: '03/13', bbFin: 3, bbProd: 7, bradescoPay: 5, bradescoFin: 9, itau: 2, nubank: 4, picpay: 14, santander: 11 },
  { date: '03/14', bbFin: 2, bbProd: 8, bradescoPay: 6, bradescoFin: 8, itau: 1, nubank: 5, picpay: 13, santander: 12 },
  { date: '03/15', bbFin: 4, bbProd: 6, bradescoPay: 4, bradescoFin: 10, itau: 3, nubank: 4, picpay: 15, santander: 10 },
  { date: '03/16', bbFin: 3, bbProd: 9, bradescoPay: 7, bradescoFin: 9, itau: 2, nubank: 6, picpay: 13, santander: 11 },
  { date: '03/17', bbFin: 2, bbProd: 7, bradescoPay: 5, bradescoFin: 8, itau: 1, nubank: 3, picpay: 14, santander: 12 },
  { date: '03/18', bbFin: 3, bbProd: 8, bradescoPay: 6, bradescoFin: 9, itau: 2, nubank: 4, picpay: 16, santander: 10 },
  { date: '03/19', bbFin: 4, bbProd: 7, bradescoPay: 4, bradescoFin: 10, itau: 3, nubank: 5, picpay: 14, santander: 11 },
  { date: '03/20', bbFin: 3, bbProd: 9, bradescoPay: 8, bradescoFin: 8, itau: 2, nubank: 4, picpay: 12, santander: 13 },
  { date: '03/21', bbFin: 2, bbProd: 7, bradescoPay: 5, bradescoFin: 9, itau: 1, nubank: 3, picpay: 15, santander: 11 },
  { date: '03/22', bbFin: 3, bbProd: 8, bradescoPay: 6, bradescoFin: 8, itau: 2, nubank: 5, picpay: 13, santander: 10 },
  { date: '03/23', bbFin: 4, bbProd: 6, bradescoPay: 4, bradescoFin: 10, itau: 3, nubank: 4, picpay: 14, santander: 12 },
  { date: '03/24', bbFin: 3, bbProd: 9, bradescoPay: 7, bradescoFin: 9, itau: 2, nubank: 6, picpay: 16, santander: 11 },
  { date: '03/25', bbFin: 5, bbProd: 7, bradescoPay: 5, bradescoFin: 8, itau: 1, nubank: 3, picpay: 13, santander: 10 },
  { date: '03/26', bbFin: 3, bbProd: 8, bradescoPay: 6, bradescoFin: 9, itau: 2, nubank: 4, picpay: 15, santander: 12 },
  { date: '03/27', bbFin: 4, bbProd: 6, bradescoPay: 4, bradescoFin: 10, itau: 3, nubank: 5, picpay: 14, santander: 11 },
  { date: '03/28', bbFin: 2, bbProd: 9, bradescoPay: 7, bradescoFin: 8, itau: 2, nubank: 3, picpay: 12, santander: 10 },
  { date: '03/29', bbFin: 3, bbProd: 7, bradescoPay: 5, bradescoFin: 9, itau: 1, nubank: 4, picpay: 16, santander: 13 },
  { date: '03/30', bbFin: 4, bbProd: 8, bradescoPay: 6, bradescoFin: 8, itau: 2, nubank: 5, picpay: 14, santander: 11 },
  { date: '03/31', bbFin: 3, bbProd: 6, bradescoPay: 4, bradescoFin: 10, itau: 3, nubank: 4, picpay: 15, santander: 10 },
  { date: '04/01', bbFin: 2, bbProd: 9, bradescoPay: 8, bradescoFin: 9, itau: 1, nubank: 3, picpay: 13, santander: 12 },
  { date: '04/02', bbFin: 3, bbProd: 7, bradescoPay: 5, bradescoFin: 8, itau: 2, nubank: 5, picpay: 14, santander: 11 },
  { date: '04/03', bbFin: 4, bbProd: 8, bradescoPay: 6, bradescoFin: 9, itau: 3, nubank: 4, picpay: 16, santander: 10 },
  { date: '04/04', bbFin: 3, bbProd: 6, bradescoPay: 4, bradescoFin: 10, itau: 2, nubank: 3, picpay: 13, santander: 12 },
  { date: '04/05', bbFin: 2, bbProd: 9, bradescoPay: 7, bradescoFin: 8, itau: 1, nubank: 5, picpay: 15, santander: 11 },
  { date: '04/06', bbFin: 3, bbProd: 7, bradescoPay: 5, bradescoFin: 9, itau: 2, nubank: 4, picpay: 14, santander: 10 },
  { date: '04/07', bbFin: 4, bbProd: 8, bradescoPay: 6, bradescoFin: 8, itau: 3, nubank: 3, picpay: 12, santander: 13 },
  { date: '04/08', bbFin: 3, bbProd: 6, bradescoPay: 4, bradescoFin: 10, itau: 2, nubank: 5, picpay: 16, santander: 11 },
  { date: '04/09', bbFin: 2, bbProd: 9, bradescoPay: 8, bradescoFin: 9, itau: 1, nubank: 4, picpay: 14, santander: 10 },
  { date: '04/10', bbFin: 3, bbProd: 7, bradescoPay: 5, bradescoFin: 8, itau: 2, nubank: 3, picpay: 15, santander: 12 },
  { date: '04/11', bbFin: 4, bbProd: 8, bradescoPay: 6, bradescoFin: 9, itau: 3, nubank: 5, picpay: 13, santander: 11 },
  { date: '04/12', bbFin: 3, bbProd: 6, bradescoPay: 4, bradescoFin: 10, itau: 2, nubank: 4, picpay: 16, santander: 10 },
  { date: '04/13', bbFin: 2, bbProd: 9, bradescoPay: 7, bradescoFin: 8, itau: 1, nubank: 3, picpay: 14, santander: 12 },
]

/* ── App lines config ───────────────────────────────────────── */

const APP_LINES = [
  { key: 'bbFin',      label: 'BB Banco, Cartão... (Finance)',        color: '#1A88FF' },
  { key: 'bbProd',     label: 'BB Banco, Cartão... (Productivity)',   color: '#07C6C3' },
  { key: 'bradescoPay',label: 'Banco Bradesco (Finance)',             color: '#FF5700' },
  { key: 'bradescoFin',label: 'Banco Bradesco (Business)',            color: '#8243FF' },
  { key: 'itau',       label: 'Banco Itaú Conta C... (Finance)',      color: '#00A3FF' },
  { key: 'nubank',     label: 'Nubank Conta Cart... (Finance)',       color: '#FF0167' },
  { key: 'picpay',     label: 'PicPay Conta Cart... (Finance)',       color: '#FF935B' },
  { key: 'santander',  label: 'Banco Santander Br... (Business)',     color: '#6B7280' },
]

/* ── DateRangePicker ────────────────────────────────────────── */

const PRESETS = [
  'Today',
  'Yesterday',
  'This Week',
  'Last Week',
  'This Month',
  'Last Month',
  '32 days up to today',
  'days starting today',
]

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const DAY_HEADERS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function DateRangePicker({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [viewMonth, setViewMonth] = useState(new Date(2026, 2)) // March 2026

  const START = new Date(2026, 2, 13)
  const END   = new Date(2026, 3, 13)

  const year  = viewMonth.getFullYear()
  const month = viewMonth.getMonth()
  const firstDay    = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const isSameDay = (d: Date, ref: Date) =>
    d.getFullYear() === ref.getFullYear() &&
    d.getMonth()    === ref.getMonth()    &&
    d.getDate()     === ref.getDate()

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

          {/* Presets */}
          <div className="w-44 border-r border-[var(--border-default)] p-2 flex flex-col gap-[2px]">
            {PRESETS.map((preset) => (
              <button
                key={preset}
                className="text-left font-sans text-[13px] text-primary-ds px-3 py-[7px] rounded-md hover:surface-secondary transition-colors"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Calendar */}
          <div className="p-4 flex flex-col gap-3 w-[272px]">

            {/* Date inputs */}
            <div className="flex items-center gap-2">
              <Input defaultValue="Mar 13, 2026" className="h-8 text-[12px] flex-1" />
              <span className="font-sans text-[12px] text-secondary-ds">—</span>
              <Input defaultValue="Apr 13, 2026" className="h-8 text-[12px] flex-1" />
            </div>

            {/* Month navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setViewMonth(new Date(year, month - 1))}
                className="p-1 rounded hover:surface-secondary transition-colors"
              >
                <ChevronLeft size={16} className="text-secondary-ds" />
              </button>
              <span className="font-sans text-[14px] font-medium text-primary-ds">
                {MONTH_NAMES[month]} {year}
              </span>
              <button
                onClick={() => setViewMonth(new Date(year, month + 1))}
                className="p-1 rounded hover:surface-secondary transition-colors"
              >
                <ChevronRight size={16} className="text-secondary-ds" />
              </button>
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 gap-y-[2px]">
              {DAY_HEADERS.map(d => (
                <div
                  key={d}
                  className="text-center font-sans text-[11px] text-secondary-ds py-1"
                >
                  {d}
                </div>
              ))}

              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}

              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                const state = getState(day)
                return (
                  <button
                    key={day}
                    className={
                      state === 'edge'
                        ? 'text-center font-sans text-[12px] py-1 rounded-md bg-[#1A88FF] text-white w-full'
                        : state === 'range'
                          ? 'text-center font-sans text-[12px] py-1 rounded-md bg-[rgba(26,136,255,0.12)] text-[#1A88FF] w-full'
                          : 'text-center font-sans text-[12px] py-1 rounded-md text-primary-ds hover:surface-secondary w-full transition-colors'
                    }
                  >
                    {day}
                  </button>
                )
              })}
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

/* ── App Chip ───────────────────────────────────────────────── */

function AppChip({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-[6px] font-sans text-[12px] font-medium rounded-md px-3 py-[6px] border"
      style={{
        backgroundColor: `${color}18`,
        color,
        borderColor: `${color}40`,
      }}
    >
      <span
        className="w-2 h-2 rounded-full inline-block flex-shrink-0"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  )
}

/* ── Page ───────────────────────────────────────────────────── */

function CategoryRankPage({ datePickerOpen = false }: { datePickerOpen?: boolean }) {
  const [period, setPeriod]   = useState('daily')
  const [category, setCategory] = useState('all')
  const [pricing, setPricing] = useState('all')

  return (
    <div className="flex h-screen overflow-hidden surface-tertiary">
      <Sidebar groups={sidebarGroups} />

      <main className="flex-1 overflow-y-auto">

        {/* ── Page header ── */}
        <div className="surface-primary border-b border-[0.5px] border-[var(--border-default)] px-6 py-5">
          <h1 className="font-display text-[22px] font-semibold text-primary-ds">
            Category Rank
          </h1>
          <p className="font-sans text-[13px] text-secondary-ds mt-1">
            See the position of the app and its competitors in their respective categories during the selected period.
          </p>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">

          {/* ── Filters card ── */}
          <div className="surface-primary rounded-lg border border-[0.5px] border-[var(--border-default)] p-5 flex flex-col gap-4">

            {/* App info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl surface-secondary border border-[var(--border-default)] flex items-center justify-center flex-shrink-0">
                <span className="font-sans text-[10px] font-bold text-secondary-ds">BB</span>
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="font-sans text-[14px] font-medium text-primary-ds">
                  BB: Banco, Cartão e Muito Mais
                </span>
                <span className="font-sans text-[12px] text-secondary-ds">Banco do Brasil</span>
              </div>
              <div className="flex gap-2 ml-1">
                <Badge variant="blue">Finance</Badge>
                <Badge variant="gray">Productivity</Badge>
              </div>
            </div>

            {/* Filters row */}
            <div className="flex items-center gap-3 flex-wrap">

              {/* Category */}
              <div className="flex items-center gap-2">
                <span className="font-sans text-[13px] text-secondary-ds">Category:</span>
                <select
                  className="h-9 rounded-md border border-[var(--border-emphasis)] surface-primary font-sans text-[13px] text-primary-ds px-3 focus:outline-none focus:border-[#1A88FF]"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="finance">Finance</option>
                  <option value="productivity">Productivity</option>
                </select>
              </div>

              {/* Period */}
              <PillGroup
                options={[
                  { label: 'Daily',   value: 'daily'   },
                  { label: 'Weekly',  value: 'weekly'  },
                  { label: 'Monthly', value: 'monthly' },
                ]}
                value={period}
                onChange={setPeriod}
              />

              {/* Pricing */}
              <div className="flex items-center gap-2">
                <span className="font-sans text-[13px] text-secondary-ds">Pricing:</span>
                <PillGroup
                  options={[
                    { label: 'All',  value: 'all'  },
                    { label: 'Free', value: 'free' },
                    { label: 'Paid', value: 'paid' },
                  ]}
                  value={pricing}
                  onChange={setPricing}
                />
              </div>

              {/* Date range picker */}
              <DateRangePicker defaultOpen={datePickerOpen} />

              {/* Search */}
              <Button size="sm">Search</Button>
            </div>

            {/* Info row */}
            <div className="flex items-center gap-3 font-sans text-[12px] text-secondary-ds">
              <span>Last updated 0 hours ago</span>
              <span className="w-[1px] h-3 bg-[var(--border-default)] inline-block" />
              <span>Category data is only gathered up to the 200th position</span>
            </div>

          </div>

          {/* ── Chart + App chips ── */}
          <div className="surface-primary rounded-lg border border-[0.5px] border-[var(--border-default)] p-5 flex flex-col gap-4">

            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
                  axisLine={false}
                  tickLine={false}
                  interval={3}
                />
                <YAxis
                  reversed
                  domain={[1, 20]}
                  tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--surface-primary)',
                    border: '1px solid var(--border-default)',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                {APP_LINES.map(app => (
                  <Line
                    key={app.key}
                    type="monotone"
                    dataKey={app.key}
                    stroke={app.color}
                    strokeWidth={2}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>

            {/* App chips */}
            <div className="flex flex-wrap gap-2">
              {APP_LINES.map(app => (
                <AppChip key={app.key} label={app.label} color={app.color} />
              ))}
            </div>

          </div>

        </div>
      </main>
    </div>
  )
}

/* ── Stories ────────────────────────────────────────────────── */

export const Default: Story = {
  render: () => <CategoryRankPage />,
}

export const WithDatePickerOpen: Story = {
  render: () => <CategoryRankPage datePickerOpen />,
}
