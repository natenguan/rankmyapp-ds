import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

export interface NavItem {
  label: string
  icon?: React.ReactNode
  active?: boolean
  href?: string
  onClick?: () => void
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export interface SidebarProps {
  groups: NavGroup[]
  className?: string
}

function Sidebar({ groups, className }: SidebarProps) {
  return (
    <aside
      className={cn(
        'w-[200px] h-full surface-primary border-r border-[0.5px] border-[var(--border-default)]',
        'flex flex-col gap-1 py-4',
        className
      )}
    >
      {/* Brand */}
      <div className="flex items-center gap-2 px-4 mb-4">
        <div className="w-7 h-7 rounded-[6px] bg-[#1A88FF] flex items-center justify-center shrink-0">
          <ChevronRight size={14} className="text-white" />
        </div>
        <span className="font-sans text-[14px] font-medium text-primary-ds">RankMyApp</span>
      </div>

      {groups.map((group) => (
        <div key={group.label} className="flex flex-col">
          <span className="label-upper text-secondary-ds px-4 py-2">{group.label}</span>
          {group.items.map((item) => (
            <NavItemComponent key={item.label} item={item} />
          ))}
        </div>
      ))}
    </aside>
  )
}

function NavItemComponent({ item }: { item: NavItem }) {
  return (
    <button
      onClick={item.onClick}
      className={cn(
        'flex items-center gap-2 mx-2 px-3 h-9 rounded-md text-left w-[calc(100%-16px)]',
        'font-sans text-[13px] transition-colors duration-100',
        item.active
          ? 'bg-[rgba(26,136,255,0.10)] text-[#1A88FF] font-medium'
          : 'text-secondary-ds hover:surface-secondary hover:text-primary-ds'
      )}
    >
      {item.icon && <span className="shrink-0 w-4 h-4">{item.icon}</span>}
      <span className="truncate">{item.label}</span>
    </button>
  )
}

export { Sidebar }
