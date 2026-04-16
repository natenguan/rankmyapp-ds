import {
  ResponsiveContainer,
  LineChart as RCLineChart,
  BarChart as RCBarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

/* ── Shared types ─────────────────────────────────────────────── */

export interface ChartSeries {
  key: string
  label: string
  color: string
}

export interface ChartProps {
  data: Record<string, unknown>[]
  series: ChartSeries[]
  xKey: string
  height?: number
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  yAxisReversed?: boolean   // useful for rank charts (1 = top)
}

/* ── Custom tooltip ───────────────────────────────────────────── */

function CustomTooltip({ active, payload, label }: {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null

  return (
    <div
      style={{
        backgroundColor: 'var(--surface-primary)',
        border: '0.5px solid var(--border-default)',
        borderRadius: '8px',
        padding: '10px 14px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        fontSize: '12px',
        fontFamily: 'DM Sans, sans-serif',
        minWidth: '120px',
      }}
    >
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

/* ── Axis styles ─────────────────────────────────────────────── */
const axisStyle = {
  fontSize: 11,
  fontFamily: 'DM Sans, sans-serif',
  fill: 'var(--text-secondary)',
}

/* ── LineChart ───────────────────────────────────────────────── */

export function LineChart({
  data,
  series,
  xKey,
  height = 240,
  showGrid = true,
  showLegend = false,
  showTooltip = true,
  yAxisReversed = false,
}: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RCLineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border-default)"
            vertical={false}
          />
        )}
        <XAxis
          dataKey={xKey}
          tick={axisStyle}
          axisLine={false}
          tickLine={false}
          dy={8}
        />
        <YAxis
          tick={axisStyle}
          axisLine={false}
          tickLine={false}
          reversed={yAxisReversed}
          width={32}
        />
        {showTooltip && <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-emphasis)', strokeWidth: 1, strokeDasharray: '4 2' }} />}
        {showLegend && (
          <Legend
            wrapperStyle={{ fontSize: '12px', fontFamily: 'DM Sans, sans-serif', paddingTop: '12px' }}
          />
        )}
        {series.map(s => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={s.color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        ))}
      </RCLineChart>
    </ResponsiveContainer>
  )
}

/* ── BarChart ────────────────────────────────────────────────── */

export function BarChart({
  data,
  series,
  xKey,
  height = 240,
  showGrid = true,
  showLegend = false,
  showTooltip = true,
}: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RCBarChart data={data} barCategoryGap="30%" barGap={4} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border-default)"
            vertical={false}
          />
        )}
        <XAxis
          dataKey={xKey}
          tick={axisStyle}
          axisLine={false}
          tickLine={false}
          dy={8}
        />
        <YAxis
          tick={axisStyle}
          axisLine={false}
          tickLine={false}
          width={32}
        />
        {showTooltip && <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--border-default)' }} />}
        {showLegend && (
          <Legend
            wrapperStyle={{ fontSize: '12px', fontFamily: 'DM Sans, sans-serif', paddingTop: '12px' }}
          />
        )}
        {series.map(s => (
          <Bar
            key={s.key}
            dataKey={s.key}
            name={s.label}
            fill={s.color}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RCBarChart>
    </ResponsiveContainer>
  )
}
