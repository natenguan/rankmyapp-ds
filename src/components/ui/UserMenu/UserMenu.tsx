import { useState, useRef, useEffect } from 'react'
import { LogOut, Settings, User, CreditCard, HelpCircle, ChevronDown } from 'lucide-react'
import { Avatar } from '../Avatar/Avatar'

export interface UserMenuProps {
  name: string
  email: string
  avatarSrc?: string
  plan?: string
  onSettings?: () => void
  onBilling?: () => void
  onHelp?: () => void
  onLogout?: () => void
}

export function UserMenu({ name, email, avatarSrc, plan, onSettings, onBilling, onHelp, onLogout }: UserMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const MenuItem = ({ icon, label, onClick, danger }: { icon: React.ReactNode; label: string; onClick?: () => void; danger?: boolean }) => (
    <button
      onClick={() => { onClick?.(); setOpen(false) }}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        width: '100%', padding: '8px 12px',
        fontSize: '13px', fontFamily: 'DM Sans, sans-serif', fontWeight: 400,
        color: danger ? '#E24B4A' : 'var(--text-primary)',
        backgroundColor: 'transparent', border: 'none',
        cursor: 'pointer', textAlign: 'left', borderRadius: '6px',
      }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = danger ? 'rgba(226,75,74,0.06)' : 'var(--surface-secondary)')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
    >
      <span style={{ color: danger ? '#E24B4A' : 'var(--text-secondary)', display: 'flex' }}>{icon}</span>
      {label}
    </button>
  )

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(p => !p)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          height: '36px', padding: '0 10px 0 6px',
          backgroundColor: open ? 'var(--surface-secondary)' : 'transparent',
          border: 'none', borderRadius: '8px', cursor: 'pointer',
          transition: 'background-color 120ms',
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--surface-secondary)')}
        onMouseLeave={e => { if (!open) e.currentTarget.style.backgroundColor = 'transparent' }}
      >
        <Avatar name={name} src={avatarSrc} size="sm" />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1px' }}>
          <span style={{ fontSize: '13px', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1 }}>
            {name.split(' ')[0]}
          </span>
          {plan && (
            <span style={{ fontSize: '11px', fontFamily: 'DM Sans, sans-serif', color: 'var(--text-secondary)', lineHeight: 1 }}>
              {plan}
            </span>
          )}
        </div>
        <ChevronDown
          size={14}
          style={{ color: 'var(--text-secondary)', transition: 'transform 150ms', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', right: 0,
          width: '220px', zIndex: 200,
          backgroundColor: 'var(--surface-primary)',
          border: '0.5px solid var(--border-default)',
          borderRadius: '10px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
          overflow: 'hidden',
        }}>
          {/* User info */}
          <div style={{ padding: '12px', borderBottom: '0.5px solid var(--border-default)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Avatar name={name} src={avatarSrc} size="md" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                <span style={{ fontSize: '13px', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {name}
                </span>
                <span style={{ fontSize: '12px', fontFamily: 'DM Sans, sans-serif', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {email}
                </span>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div style={{ padding: '6px' }}>
            <MenuItem icon={<User size={14} />} label="Perfil" onClick={onSettings} />
            <MenuItem icon={<Settings size={14} />} label="Configurações" onClick={onSettings} />
            <MenuItem icon={<CreditCard size={14} />} label="Plano & Cobrança" onClick={onBilling} />
            <MenuItem icon={<HelpCircle size={14} />} label="Ajuda & Suporte" onClick={onHelp} />
          </div>

          <div style={{ borderTop: '0.5px solid var(--border-default)', padding: '6px' }}>
            <MenuItem icon={<LogOut size={14} />} label="Sair" onClick={onLogout} danger />
          </div>
        </div>
      )}
    </div>
  )
}
