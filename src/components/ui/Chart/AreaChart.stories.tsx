import type { Meta, StoryObj } from '@storybook/react'
import { AreaChart } from './AreaChart'

const meta: Meta = {
  title: 'Components/Chart',
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj

const DOWNLOADS = [
  { month: 'Out', ios: 142000, android: 98000 },
  { month: 'Nov', ios: 165000, android: 112000 },
  { month: 'Dez', ios: 210000, android: 143000 },
  { month: 'Jan', ios: 188000, android: 131000 },
  { month: 'Fev', ios: 172000, android: 120000 },
  { month: 'Mar', ios: 195000, android: 138000 },
  { month: 'Abr', ios: 220000, android: 152000 },
]

export const AreaDownloads: Story = {
  name: 'Area — Downloads por plataforma',
  render: () => (
    <div style={{ backgroundColor: 'var(--surface-primary)', padding: '24px', borderRadius: '12px', border: '0.5px solid var(--border-default)' }}>
      <p style={{ fontSize: '14px', fontFamily: 'Nunito', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
        Downloads mensais
      </p>
      <p style={{ fontSize: '12px', fontFamily: 'DM Sans', color: 'var(--text-secondary)', marginBottom: '20px' }}>
        Out 2025 – Abr 2026
      </p>
      <AreaChart
        data={DOWNLOADS}
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

export const AreaSingle: Story = {
  name: 'Area — Série única',
  render: () => (
    <div style={{ backgroundColor: 'var(--surface-primary)', padding: '24px', borderRadius: '12px', border: '0.5px solid var(--border-default)' }}>
      <AreaChart
        data={DOWNLOADS.map(d => ({ month: d.month, total: d.ios + d.android }))}
        xKey="month"
        height={180}
        series={[{ key: 'total', label: 'Total downloads', color: '#8243FF' }]}
      />
    </div>
  ),
}
