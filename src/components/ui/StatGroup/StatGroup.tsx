import React from 'react'
import { cn } from '@/lib/utils'

export interface StatGroupProps {
  children: React.ReactNode
  columns?: 2 | 3 | 4
  title?: string
  loading?: boolean
}

const gridClass: Record<number, string> = {
  2: 'grid grid-cols-2 gap-[10px]',
  3: 'grid grid-cols-2 sm:grid-cols-3 gap-[10px]',
  4: 'grid grid-cols-2 lg:grid-cols-4 gap-[10px]',
}

/**
 * Wrapper de layout que organiza MetricCards em uma grade responsiva.
 *
 * @example
 * <StatGroup columns={4} title="Keywords">
 *   <MetricCard label="Growing" value={17} delta="+3" deltaType="positive" variant="growing" />
 *   <MetricCard label="Dropping" value={15} delta="-2" deltaType="negative" variant="dropping" />
 *   <MetricCard label="Stable" value={28} deltaType="neutral" />
 *   <MetricCard label="Total" value={60} deltaType="neutral" />
 * </StatGroup>
 */
export function StatGroup({ children, columns = 4, title, loading = false }: StatGroupProps) {
  const enhancedChildren = loading
    ? React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ loading?: boolean }>, { loading: true })
          : child
      )
    : children

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {title && (
        <span style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 14,
          fontWeight: 500,
          color: 'var(--text-primary)',
        }}>
          {title}
        </span>
      )}
      <div className={cn(gridClass[columns])}>
        {enhancedChildren}
      </div>
    </div>
  )
}
