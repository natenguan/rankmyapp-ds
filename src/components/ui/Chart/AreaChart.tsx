import {
  ResponsiveContainer,
  AreaChart as RCAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import type { ChartProps } from './Chart'

function CustomTooltip({ active, payload, label }: {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      backgroundColor: 'var(--surface-primary)', border: '0.5px solid var(--border-default)',
      borderRadius: '8px', padding: '10px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      fontSize: '12px', fontFamily: 'DM Sans, sans-serif', minWidth: '120px',
    }}>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>{label}</p>
      {payload.map(p => (
        <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: p.color, flexShrink: 0 }} />
          <span style={{ color: 'var(--text-secondary)' }}>{p.name}:</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{p.value}</span>
        </div>
      ))}
    </div>
  )
}

const axisStyle = { fontSize: 11, fontFamily: 'DM Sans, sans-serif', fill: 'var(--text-secondary)' }

export function AreaChart({
  data, series, xKey, height = 240,
  showGrid = true, showLegend = false, showTooltip = true,
}: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RCAreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          {series.map(s => (
            <linearGradient key={s.key} id={`gradient-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity={0.18} />
              <stop offset="100%" stopColor={s.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />}
        <XAxis dataKey={xKey} tick={axisStyle} axisLine={false} tickLine={false} dy={8} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={32} />
        {showTooltip && <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-emphasis)', strokeWidth: 1, strokeDasharray: '4 2' }} />}
        {showLegend && <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'DM Sans, sans-serif', paddingTop: '12px' }} />}
        {series.map(s => (
          <Area
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={s.color}
            strokeWidth={2}
            fill={`url(#gradient-${s.key})`}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        ))}
      </RCAreaChart>
    </ResponsiveContainer>
  )
}
