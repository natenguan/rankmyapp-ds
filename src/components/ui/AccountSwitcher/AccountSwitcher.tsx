import { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown, Plus } from 'lucide-react'

export interface Account {
  id: string
  name: string
  plan?: string
  avatarColor?: string
  initials?: string
}

export interface AccountSwitcherProps {
  accounts: Account[]
  activeAccountId: string
  onSwitch?: (accountId: string) => void
  onAddAccount?: () => void
}

function AccountAvatar({ account, size = 28 }: { account: Account; size?: number }) {
  const bg = account.avatarColor ?? '#1A88FF'
  const initials = account.initials ?? account.name.slice(0, 2).toUpperCase()
  return (
    <div style={{
      width: size, height: size, borderRadius: '6px',
      background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'DM Sans, sans-serif', fontSize: size <= 24 ? 10 : size <= 32 ? 12 : size <= 40 ? 14 : 16,
      fontWeight: 700, color: '#fff', flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

export function AccountSwitcher({
  accounts,
  activeAccountId,
  onSwitch,
  onAddAccount,
}: AccountSwitcherProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const active = accounts.find(a => a.id === activeAccountId) ?? accounts[0]

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(p => !p)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          height: '36px', padding: '0 8px 0 6px',
          backgroundColor: open ? 'var(--surface-secondary)' : 'transparent',
          border: '0.5px solid var(--border-default)',
          borderRadius: '8px', cursor: 'pointer',
          transition: 'background-color 120ms',
          maxWidth: '200px',
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--surface-secondary)')}
        onMouseLeave={e => { if (!open) e.currentTarget.style.backgroundColor = 'transparent' }}
      >
        <AccountAvatar account={active} size={22} />
        <span style={{
          fontSize: '13px', fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
          color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis',
          whiteSpace: 'nowrap', flex: 1,
        }}>
          {active.name}
        </span>
        <ChevronDown
          size={14}
          style={{ color: 'var(--text-secondary)', flexShrink: 0, transition: 'transform 150ms', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0,
          minWidth: '220px', zIndex: 200,
          backgroundColor: 'var(--surface-primary)',
          border: '0.5px solid var(--border-default)',
          borderRadius: '10px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            padding: '8px 12px 6px',
            borderBottom: '0.5px solid var(--border-default)',
          }}>
            <span style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '11px',
              fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
              color: 'var(--text-secondary)',
            }}>
              Workspaces
            </span>
          </div>

          {/* Account list */}
          <div style={{ padding: '6px' }}>
            {accounts.map(account => {
              const isActive = account.id === activeAccountId
              return (
                <button
                  key={account.id}
                  onClick={() => { onSwitch?.(account.id); setOpen(false) }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    width: '100%', padding: '8px', borderRadius: '6px',
                    backgroundColor: isActive ? 'var(--surface-secondary)' : 'transparent',
                    border: 'none', cursor: 'pointer', textAlign: 'left',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'var(--surface-secondary)' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent' }}
                >
                  <AccountAvatar account={account} size={28} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      margin: 0, fontSize: '13px', fontFamily: 'DM Sans, sans-serif',
                      fontWeight: isActive ? 600 : 400, color: 'var(--text-primary)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {account.name}
                    </p>
                    {account.plan && (
                      <p style={{
                        margin: 0, fontSize: '11px', fontFamily: 'DM Sans, sans-serif',
                        color: 'var(--text-secondary)',
                      }}>
                        {account.plan}
                      </p>
                    )}
                  </div>
                  {isActive && (
                    <Check size={14} style={{ color: '#1A88FF', flexShrink: 0 }} />
                  )}
                </button>
              )
            })}
          </div>

          {/* Add account */}
          {onAddAccount && (
            <div style={{ borderTop: '0.5px solid var(--border-default)', padding: '6px' }}>
              <button
                onClick={() => { onAddAccount(); setOpen(false) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  width: '100%', padding: '7px 8px', borderRadius: '6px',
                  backgroundColor: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--surface-secondary)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{
                  width: '28px', height: '28px', borderRadius: '6px',
                  border: '1.5px dashed var(--border-emphasis)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Plus size={14} style={{ color: 'var(--text-secondary)' }} />
                </div>
                <span style={{ fontSize: '13px', fontFamily: 'DM Sans, sans-serif', color: 'var(--text-secondary)' }}>
                  Adicionar workspace
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
