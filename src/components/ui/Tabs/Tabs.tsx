import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

/* ── Underline Tabs (primary) ───────────────────────────────── */

const Tabs = TabsPrimitive.Root

const TabsList = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    className={cn(
      'flex border-b border-[0.5px] border-[var(--border-default)]',
      className
    )}
    {...props}
  />
)

const TabsTrigger = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger
    className={cn(
      'font-sans text-[13px] px-[14px] py-2 text-secondary-ds transition-all duration-150',
      'border-b-2 border-transparent -mb-[1px]',
      'hover:text-primary-ds',
      'data-[state=active]:border-[#1A88FF] data-[state=active]:text-[#1A88FF] data-[state=active]:font-medium',
      'focus-visible:outline-none',
      className
    )}
    {...props}
  />
)

const TabsContent = TabsPrimitive.Content

/* ── Pill Group (period selector) ───────────────────────────── */

interface PillGroupProps {
  options: { label: string; value: string }[]
  value: string
  onChange: (value: string) => void
  className?: string
}

function PillGroup({ options, value, onChange, className }: PillGroupProps) {
  return (
    <div
      className={cn(
        'inline-flex surface-secondary rounded-md p-[3px] gap-[2px]',
        className
      )}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            'font-sans text-[13px] px-3 py-1 rounded-[6px] transition-all duration-150',
            value === opt.value
              ? 'surface-primary border border-[0.5px] border-[var(--border-emphasis)] text-primary-ds font-medium'
              : 'text-secondary-ds hover:text-primary-ds'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, PillGroup }
