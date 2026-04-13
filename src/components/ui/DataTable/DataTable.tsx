import { cn } from '@/lib/utils'
import { Badge } from '../Badge/Badge'
import type { KeywordStatus } from '../Badge/Badge'

export interface Column<T> {
  key: keyof T
  label: string
  type?: 'text' | 'delta' | 'status'
  align?: 'left' | 'right' | 'center'
}

export interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[]
  data: T[]
  className?: string
}

function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn('w-full overflow-x-auto rounded-lg surface-primary border border-[0.5px] border-[var(--border-default)]', className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="surface-secondary">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={cn(
                  'label-upper text-secondary-ds px-3 py-2 font-medium',
                  col.align === 'right' && 'text-right',
                  col.align === 'center' && 'text-center',
                  col.align !== 'right' && col.align !== 'center' && 'text-left'
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={cn(
                'transition-colors duration-100 hover:surface-secondary',
                rowIdx < data.length - 1 && 'border-b border-[0.5px] border-[var(--border-default)]'
              )}
            >
              {columns.map((col) => {
                const val = row[col.key]
                return (
                  <td
                    key={String(col.key)}
                    className={cn(
                      'font-sans text-[14px] px-3 py-[10px] text-primary-ds',
                      col.align === 'right' && 'text-right',
                      col.align === 'center' && 'text-center'
                    )}
                  >
                    {col.type === 'delta' && typeof val === 'number' ? (
                      <span
                        className={cn(
                          'font-medium',
                          val > 0 && 'text-[#0F6E56]',
                          val < 0 && 'text-[#A32D2D]',
                          val === 0 && 'text-secondary-ds'
                        )}
                      >
                        {val > 0 ? `▲ +${val}` : val < 0 ? `▼ ${val}` : '—'}
                      </span>
                    ) : col.type === 'status' && typeof val === 'string' ? (
                      <Badge status={val as KeywordStatus}>
                        {val.charAt(0).toUpperCase() + val.slice(1)}
                      </Badge>
                    ) : (
                      String(val ?? '—')
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { DataTable }
