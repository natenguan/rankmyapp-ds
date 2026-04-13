import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'

export interface ToggleProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: string
}

function Toggle({ className, label, id, ...props }: ToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <SwitchPrimitive.Root
        id={id}
        className={cn(
          'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full',
          'border border-[var(--border-emphasis)] bg-[var(--surface-secondary)]',
          'transition-colors duration-200',
          'data-[state=checked]:bg-[#1A88FF] data-[state=checked]:border-[#1A88FF]',
          'focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(26,136,255,0.4)]',
          'disabled:opacity-40 disabled:pointer-events-none',
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            'pointer-events-none block h-[14px] w-[14px] rounded-full bg-white shadow-sm',
            'transition-transform duration-200',
            'translate-x-[3px] data-[state=checked]:translate-x-[19px]'
          )}
        />
      </SwitchPrimitive.Root>
      {label && (
        <label htmlFor={id} className="font-sans text-[13px] text-primary-ds cursor-pointer">
          {label}
        </label>
      )}
    </div>
  )
}

export { Toggle }
