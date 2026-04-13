import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['text', 'search', 'email', 'password'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: { placeholder: 'Type something...', label: 'Label' },
}

export const WithHint: Story = {
  args: { label: 'Email', placeholder: 'you@company.com', hint: 'We will never share your email.' },
}

export const WithError: Story = {
  args: { label: 'Email', placeholder: 'you@company.com', error: 'Invalid email address.' },
}

export const Search: Story = {
  args: { type: 'search', placeholder: 'Search keywords...' },
}

export const Disabled: Story = {
  args: { label: 'Disabled', placeholder: 'Cannot edit', disabled: true },
}
