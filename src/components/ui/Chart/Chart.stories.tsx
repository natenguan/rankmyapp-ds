import type { Meta, StoryObj } from '@storybook/react'
import { LineChart, BarChart } from './Chart'

const meta: Meta = {
  title: 'Components/Chart',
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj

/* ── Mock data ──────────────────────────────────────────────── */

const RANK_DATA = [
  { date: '01/04', globoplay: 3, sportv: 8, gshow: 12 },
  { date: '02/04', globoplay: 2, sportv: 7, gshow: 11 },
  { date: '03/04', globoplay: 4, sportv: 6, gshow: 9  },
  { date: '04/04', globoplay: 1, sportv: 5, gshow: 10 },
  { date: '05/04', globoplay: 2, sportv: 4, gshow: 8  },
  { date: '06/04', globoplay: 3, sportv: 6, gshow: 7  },
  { date: '07/04', globoplay: 1, sportv: 5, gshow: 6  },
]

const DOWNLOADS_DATA = [
  { month: 'Out', ios: 142000, android: 98000 },
  { month: 'Nov', ios: 165000, android: 112000 },
  { month: 'Dez', ios: 210000, android: 143000 },
  { month: 'Jan', ios: 188000, android: 131000 },
  { month: 'Fev', ios: 172000, android: 120000 },
  { month: 'Mar', ios: 195000, android: 138000 },
  { month: 'Abr', ios: 220000, android: 152000 },
]

const REVIEWS_DATA = [
  { week: 'S1', positivas: 320, negativas: 45 },
  { week: 'S2', positivas: 298, negativas: 62 },
  { week: 'S3', positivas: 410, negativas: 38 },
  { week: 'S4', positivas: 385, negativas: 51 },
  { week: 'S5', positivas: 432, negativas: 29 },
  { week: 'S6', positivas: 467, negativas: 33 },
]

/* ── Line Chart stories ─────────────────────────────────────── */

export const LineRanking: Story = {
  name: 'Line — Ranking de Keywords',
  render: () => (
    <div style={{ backgroundColor: 'var(--surface-primary)', padding: '24px', borderRadius: '12px', border: '0.5px solid var(--border-default)' }}>
      <p style={{ fontSize: '14px', fontFamily: 'Nunito', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
        Posição no ranking
      </p>
      <p style={{ fontSize: '12px', fontFamily: 'DM Sans', color: 'var(--text-secondary)', marginBottom: '20px' }}>
        Últimos 7 dias — quanto menor, melhor
      </p>
      <LineChart
        data={RANK_DATA}
        xKey="date"
        height={200}
        yAxisReversed
        series={[
          { key: 'globoplay', label: 'Globoplay', color: '#1A88FF' },
          { key: 'sportv',    label: 'SporTV',    color: '#07C6C3' },
          { key: 'gshow',     label: 'GShow',     color: '#8243FF' },
        ]}
      />
    </div>
  ),
}

export const LineSingleSeries: Story = {
  name: 'Line — Série única',
  render: () => (
    <div style={{ backgroundColor: 'var(--surface-primary)', padding: '24px', borderRadius: '12px', border: '0.5px solid var(--border-default)' }}>
      <LineChart
        data={DOWNLOADS_DATA.map(d => ({ ...d, total: d.ios + d.android }))}
        xKey="month"
        height={180}
        series={[{ key: 'total', label: 'Total downloads', color: '#1A88FF' }]}
      />
    </div>
  ),
}

export const LineWithLegend: Story = {
  name: 'Line — Com legenda',
  render: () => (
    <div style={{ backgroundColor: 'var(--surface-primary)', padding: '24px', borderRadius: '12px', border: '0.5px solid var(--border-default)' }}>
      <LineChart
        data={DOWNLOADS_DATA}
        xKey="month"
        height={220}
        showLegend
        series={[
          { key: 'ios',     label: 'App Store', color: '#1A88FF' },
          { key: 'android', label: 'Google Play', color: '#07C6C3' },
        ]}
      />
    </div>
  ),
}

/* ── Bar Chart stories ──────────────────────────────────────── */

export const BarDownloads: Story = {
  name: 'Bar — Downloads por plataforma',
  render: () => (
    <div style={{ backgroundColor: 'var(--surface-primary)', padding: '24px', borderRadius: '12px', border: '0.5px solid var(--border-default)' }}>
      <p style={{ fontSize: '14px', fontFamily: 'Nunito', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
        Downloads mensais
      </p>
      <p style={{ fontSize: '12px', fontFamily: 'DM Sans', color: 'var(--text-secondary)', marginBottom: '20px' }}>
        Out 2025 — Abr 2026
      </p>
      <BarChart
        data={DOWNLOADS_DATA}
        xKey="month"
        height={200}
        showLegend
        series={[
          { key: 'ios',     label: 'App Store',   color: '#1A88FF' },
          { key: 'android', label: 'Google Play',  color: '#07C6C3' },
        ]}
      />
    </div>
  ),
}

export const BarReviews: Story = {
  name: 'Bar — Reviews positivas vs negativas',
  render: () => (
    <div style={{ backgroundColor: 'var(--surface-primary)', padding: '24px', borderRadius: '12px', border: '0.5px solid var(--border-default)' }}>
      <BarChart
        data={REVIEWS_DATA}
        xKey="week"
        height={200}
        showLegend
        series={[
          { key: 'positivas', label: 'Positivas', color: '#07C6C3' },
          { key: 'negativas', label: 'Negativas', color: '#E24B4A' },
        ]}
      />
    </div>
  ),
}

export const BarSingleSeries: Story = {
  name: 'Bar — Série única',
  render: () => (
    <div style={{ backgroundColor: 'var(--surface-primary)', padding: '24px', borderRadius: '12px', border: '0.5px solid var(--border-default)' }}>
      <BarChart
        data={DOWNLOADS_DATA.map(d => ({ month: d.month, total: d.ios + d.android }))}
        xKey="month"
        height={180}
        series={[{ key: 'total', label: 'Total', color: '#8243FF' }]}
      />
    </div>
  ),
}
