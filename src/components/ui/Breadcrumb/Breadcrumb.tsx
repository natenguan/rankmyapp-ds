import { ChevronRight } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol style={{ display: 'flex', alignItems: 'center', gap: '4px', listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {i > 0 && (
                <ChevronRight size={13} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} aria-hidden />
              )}
              {isLast ? (
                <span
                  style={{
                    fontSize: '13px', fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
                    color: 'var(--text-primary)',
                  }}
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href ?? '#'}
                  onClick={item.onClick}
                  style={{
                    fontSize: '13px', fontFamily: 'DM Sans, sans-serif', fontWeight: 400,
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 120ms',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
                >
                  {item.label}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
