import type { Meta, StoryObj } from '@storybook/react'
import { Link } from './Link'

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Link>

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Link href="#">Default — Ver detalhes</Link>
      <Link href="#" variant="subtle">Subtle — Saiba mais</Link>
      <Link href="#" variant="danger">Danger — Remover app</Link>
    </div>
  ),
}

export const External: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Link href="https://play.google.com" external>Google Play</Link>
      <Link href="https://apps.apple.com" external variant="subtle">App Store</Link>
    </div>
  ),
}

export const InText: Story = {
  render: () => (
    <p style={{ fontSize: '13px', fontFamily: 'DM Sans', color: 'var(--text-primary)', lineHeight: 1.6, maxWidth: '400px' }}>
      Para monitorar seu app, acesse as{' '}
      <Link href="#">configurações de integração</Link>{' '}
      ou consulte nossa{' '}
      <Link href="#" external>documentação</Link>{' '}
      para mais detalhes. Em caso de dúvidas,{' '}
      <Link href="#" variant="subtle">entre em contato</Link>.
    </p>
  ),
}
