import type { Meta, StoryObj } from '@storybook/react'
import { DataTable } from './DataTable'
import type { Column } from './DataTable'

const meta: Meta = {
  title: 'Components/DataTable',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

type KeywordRow = { keyword: string; volume: string; position: number; delta: number; status: string }

const columns: Column<KeywordRow>[] = [
  { key: 'keyword', label: 'Keyword' },
  { key: 'volume', label: 'Volume', align: 'right' },
  { key: 'position', label: 'Position', align: 'right' },
  { key: 'delta', label: 'Change', type: 'delta', align: 'right' },
  { key: 'status', label: 'Status', type: 'status' },
]

const data: KeywordRow[] = [
  { keyword: 'app store optimization', volume: '12,400', position: 3, delta: 2, status: 'growing' },
  { keyword: 'aso tools', volume: '8,900', position: 7, delta: 0, status: 'stable' },
  { keyword: 'keyword research mobile', volume: '5,200', position: 14, delta: -3, status: 'dropping' },
  { keyword: 'play store ranking', volume: '3,800', position: 22, delta: -8, status: 'critical' },
  { keyword: 'app visibility boost', volume: '2,100', position: 9, delta: 5, status: 'growing' },
]

export const Default: Story = {
  render: () => (
    <div className="p-4">
      <DataTable columns={columns} data={data} />
    </div>
  ),
}
