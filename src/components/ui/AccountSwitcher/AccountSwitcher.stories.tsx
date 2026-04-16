import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { AccountSwitcher } from './AccountSwitcher'
import type { Account } from './AccountSwitcher'

const meta: Meta<typeof AccountSwitcher> = {
  title: 'Components/AccountSwitcher',
  component: AccountSwitcher,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof AccountSwitcher>

const ACCOUNTS: Account[] = [
  { id: 'globoplay',  name: 'Globoplay',      plan: 'Enterprise',  avatarColor: '#E24B4A', initials: 'GP' },
  { id: 'sportv',    name: 'SporTV',          plan: 'Pro',         avatarColor: '#FF5700', initials: 'SP' },
  { id: 'canalsports',name: 'Canal Sports',   plan: 'Growth',      avatarColor: '#07C6C3', initials: 'CS' },
  { id: 'premiere',  name: 'Premiere',        plan: 'Starter',     avatarColor: '#8243FF', initials: 'PR' },
]

export const Default: Story = {
  render: () => (
    <div style={{ padding: '16px' }}>
      <AccountSwitcher
        accounts={ACCOUNTS}
        activeAccountId="globoplay"
        onSwitch={() => {}}
        onAddAccount={() => {}}
      />
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('globoplay')
    const active = ACCOUNTS.find(a => a.id === activeId)!

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '16px' }}>
        <AccountSwitcher
          accounts={ACCOUNTS}
          activeAccountId={activeId}
          onSwitch={setActiveId}
          onAddAccount={() => alert('Adicionar workspace')}
        />
        <div style={{
          padding: '16px', borderRadius: '10px',
          background: 'var(--surface-secondary)', border: '0.5px solid var(--border-default)',
          maxWidth: '300px',
        }}>
          <p style={{ margin: '0 0 4px', fontFamily: 'DM Sans', fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
            Workspace ativo
          </p>
          <p style={{ margin: 0, fontFamily: 'Nunito', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {active.name}
          </p>
          <p style={{ margin: '2px 0 0', fontFamily: 'DM Sans', fontSize: '12px', color: 'var(--text-secondary)' }}>
            {active.plan}
          </p>
        </div>
      </div>
    )
  },
}

export const TwoAccounts: Story = {
  render: () => (
    <div style={{ padding: '16px' }}>
      <AccountSwitcher
        accounts={ACCOUNTS.slice(0, 2)}
        activeAccountId="sportv"
        onSwitch={() => {}}
      />
    </div>
  ),
}

export const SingleAccount: Story = {
  render: () => (
    <div style={{ padding: '16px' }}>
      <AccountSwitcher
        accounts={[ACCOUNTS[0]]}
        activeAccountId="globoplay"
        onSwitch={() => {}}
        onAddAccount={() => {}}
      />
    </div>
  ),
}
