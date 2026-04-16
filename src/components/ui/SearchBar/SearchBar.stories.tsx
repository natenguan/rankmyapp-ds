import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SearchBar } from './SearchBar'

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof SearchBar>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div style={{ maxWidth: '320px' }}>
        <SearchBar value={value} onChange={setValue} placeholder="Buscar keywords..." />
      </div>
    )
  },
}

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState('futebol')
    return (
      <div style={{ maxWidth: '320px' }}>
        <SearchBar value={value} onChange={setValue} />
      </div>
    )
  },
}

export const Widths: Story = {
  render: () => {
    const [v1, setV1] = useState('')
    const [v2, setV2] = useState('')
    const [v3, setV3] = useState('')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <SearchBar value={v1} onChange={setV1} placeholder="240px" width={240} />
        <SearchBar value={v2} onChange={setV2} placeholder="360px" width={360} />
        <SearchBar value={v3} onChange={setV3} placeholder="100% (padrão)" />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: '320px' }}>
      <SearchBar value="" placeholder="Busca desabilitada" disabled />
    </div>
  ),
}

export const InHeader: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', height: '56px',
          backgroundColor: 'var(--surface-primary)',
          borderBottom: '0.5px solid var(--border-default)',
        }}
      >
        <span style={{ fontSize: '15px', fontFamily: 'Nunito', fontWeight: 600, color: 'var(--text-primary)' }}>
          RankMyApp
        </span>
        <SearchBar value={value} onChange={setValue} placeholder="Buscar apps, keywords..." width={280} />
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#1A88FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '12px', fontFamily: 'DM Sans', fontWeight: 600, color: '#fff' }}>MT</span>
        </div>
      </div>
    )
  },
}
