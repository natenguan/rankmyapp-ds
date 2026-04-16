import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface AccordionItem {
  id: string
  title: string
  subtitle?: string
  content: React.ReactNode
  disabled?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  defaultOpen?: string[]
  multiple?: boolean
}

export function Accordion({ items, defaultOpen = [], multiple = false }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultOpen)

  function toggle(id: string) {
    if (open.includes(id)) {
      setOpen(open.filter(o => o !== id))
    } else {
      setOpen(multiple ? [...open, id] : [id])
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', borderRadius: '10px', border: '0.5px solid var(--border-default)', overflow: 'hidden' }}>
      {items.map((item, i) => {
        const isOpen = open.includes(item.id)
        const isLast = i === items.length - 1

        return (
          <div key={item.id}>
            {/* Trigger */}
            <button
              type="button"
              onClick={() => !item.disabled && toggle(item.id)}
              disabled={item.disabled}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '14px 16px',
                backgroundColor: isOpen ? 'var(--surface-secondary)' : 'var(--surface-primary)',
                border: 'none',
                borderBottom: isLast && !isOpen ? 'none' : '0.5px solid var(--border-default)',
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                opacity: item.disabled ? 0.5 : 1,
                transition: 'background-color 120ms',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '14px', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {item.title}
                </span>
                {item.subtitle && (
                  <span style={{ fontSize: '12px', fontFamily: 'DM Sans, sans-serif', color: 'var(--text-secondary)' }}>
                    {item.subtitle}
                  </span>
                )}
              </div>
              <ChevronDown
                size={16}
                style={{
                  color: 'var(--text-secondary)',
                  flexShrink: 0,
                  marginLeft: '12px',
                  transition: 'transform 200ms',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </button>

            {/* Content */}
            <div
              id={`accordion-content-${item.id}`}
              role="region"
              style={{
                overflow: 'hidden',
                maxHeight: isOpen ? '600px' : '0',
                transition: 'max-height 200ms ease',
              }}
            >
              <div
                style={{
                  padding: '16px',
                  fontSize: '13px',
                  fontFamily: 'DM Sans, sans-serif',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  backgroundColor: 'var(--surface-primary)',
                  borderBottom: isLast ? 'none' : '0.5px solid var(--border-default)',
                }}
              >
                {item.content}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
