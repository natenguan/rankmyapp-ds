import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

export interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  showFirstLast?: boolean
  siblingCount?: number
}

function buildPages(page: number, total: number, siblings: number): Array<number | '...'> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const left = Math.max(2, page - siblings)
  const right = Math.min(total - 1, page + siblings)

  const pages: Array<number | '...'> = [1]

  if (left > 2) pages.push('...')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < total - 1) pages.push('...')

  pages.push(total)
  return pages
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = buildPages(page, totalPages, siblingCount)

  const btnBase: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    minWidth: '32px', height: '32px', padding: '0 6px',
    fontSize: '13px', fontFamily: 'DM Sans, sans-serif', fontWeight: 400,
    borderRadius: '6px', border: 'none', cursor: 'pointer',
    transition: 'background-color 120ms',
  }

  const pageBtn = (p: number | '...', i: number) => {
    if (p === '...') {
      return (
        <span
          key={`ellipsis-${i}`}
          style={{ ...btnBase, cursor: 'default', color: 'var(--text-secondary)', background: 'none' }}
        >
          <MoreHorizontal size={14} />
        </span>
      )
    }

    const isActive = p === page
    return (
      <button
        key={p}
        onClick={() => onPageChange(p)}
        aria-current={isActive ? 'page' : undefined}
        style={{
          ...btnBase,
          backgroundColor: isActive ? '#1A88FF' : 'transparent',
          color: isActive ? '#fff' : 'var(--text-primary)',
          fontWeight: isActive ? 500 : 400,
        }}
        onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--surface-secondary)' }}
        onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
      >
        {p}
      </button>
    )
  }

  const navBtn = (dir: 'prev' | 'next') => {
    const disabled = dir === 'prev' ? page <= 1 : page >= totalPages
    const target = dir === 'prev' ? page - 1 : page + 1

    return (
      <button
        onClick={() => !disabled && onPageChange(target)}
        disabled={disabled}
        aria-label={dir === 'prev' ? 'Página anterior' : 'Próxima página'}
        style={{
          ...btnBase,
          backgroundColor: 'transparent',
          color: disabled ? 'var(--text-secondary)' : 'var(--text-primary)',
          opacity: disabled ? 0.4 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        {dir === 'prev' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    )
  }

  return (
    <nav
      aria-label="Paginação"
      style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}
    >
      {navBtn('prev')}
      {pages.map((p, i) => pageBtn(p, i))}
      {navBtn('next')}
    </nav>
  )
}
