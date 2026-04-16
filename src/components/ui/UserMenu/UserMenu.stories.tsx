import type { Meta, StoryObj } from '@storybook/react'
import { UserMenu } from './UserMenu'

const meta: Meta<typeof UserMenu> = {
  title: 'Components/UserMenu',
  component: UserMenu,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof UserMenu>

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px' }}>
      <UserMenu
        name="Natalia Tenguan"
        email="natalia@rankmyapp.com"
        plan="Pro"
      />
    </div>
  ),
}

export const InHeader: Story = {
  render: () => (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', height: '56px',
      backgroundColor: 'var(--surface-primary)',
      borderBottom: '0.5px solid var(--border-default)',
    }}>
      <span style={{ fontSize: '16px', fontFamily: 'Nunito', fontWeight: 700, color: 'var(--text-primary)' }}>
        RankMyApp
      </span>
      <UserMenu
        name="Natalia Tenguan"
        email="natalia@rankmyapp.com"
        plan="Pro"
      />
    </div>
  ),
}

export const Noplan: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px' }}>
      <UserMenu
        name="Carlos Silva"
        email="carlos@empresa.com"
      />
    </div>
  ),
}
