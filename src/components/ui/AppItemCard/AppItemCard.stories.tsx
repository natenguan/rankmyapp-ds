import type { Meta, StoryObj } from '@storybook/react'
import { AppItemCard } from './AppItemCard'

const meta: Meta<typeof AppItemCard> = {
  title: 'Components/AppItemCard',
  component: AppItemCard,
  parameters: { layout: 'padded' },
  argTypes: {
    appName:   { control: 'text' },
    developer: { control: 'text' },
    category:  { control: 'text' },
    store:     { control: 'select', options: ['apple', 'google', 'both'] },
    isActive:  { control: 'boolean' },
    iconUrl:   { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof AppItemCard>

const baseArgs = {
  appName: 'Globoplay: BBB, Brasileirão',
  developer: 'GLOBO COM. E PART. S/A',
  category: 'Entretenimento',
  onExpand: () => {},
  onDelete: () => {},
  onSelect: () => {},
}

export const Default: Story = {
  args: { ...baseArgs, store: 'apple' },
}

export const PlayStore: Story = {
  args: { ...baseArgs, store: 'google' },
}

export const BothStores: Story = {
  args: { ...baseArgs, store: 'both' },
}

export const Active: Story = {
  args: { ...baseArgs, store: 'apple', isActive: true },
}

export const WithoutIcon: Story = {
  args: { ...baseArgs, store: 'apple', iconUrl: undefined },
}

export const LongName: Story = {
  args: {
    ...baseArgs,
    store: 'apple',
    appName: 'Nome de App Muito Longo Que Vai Truncar Com Ellipsis na Tela',
    developer: 'Developer Name Também Muito Longo Para Testar Truncate',
  },
}

export const Loading: Story = {
  args: { ...baseArgs, store: 'apple', loading: true },
}
