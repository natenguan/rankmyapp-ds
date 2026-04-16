import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton, SkeletonText, SkeletonCard, SkeletonTableRow, SkeletonAvatar } from './Skeleton'

const meta: Meta = {
  title: 'Components/Skeleton',
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj

export const Primitives: Story = {
  render: () => (
    <div style={{ maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Skeleton height={13} width="80%" />
      <Skeleton height={13} width="60%" />
      <Skeleton height={80} borderRadius={10} />
      <div style={{ display: 'flex', gap: '10px' }}>
        <SkeletonAvatar size={36} />
        <SkeletonAvatar size={28} />
        <SkeletonAvatar size={24} />
      </div>
    </div>
  ),
}

export const TextBlock: Story = {
  render: () => (
    <div style={{ maxWidth: '360px' }}>
      <SkeletonText lines={4} lastLineWidth="45%" />
    </div>
  ),
}

export const Card: Story = {
  render: () => (
    <div style={{ maxWidth: '360px' }}>
      <SkeletonCard />
    </div>
  ),
}

export const Table: Story = {
  render: () => (
    <div
      style={{
        maxWidth: '600px',
        borderRadius: '10px',
        border: '0.5px solid var(--border-default)',
        overflow: 'hidden',
        backgroundColor: 'var(--surface-primary)',
      }}
    >
      <div style={{ padding: '12px 16px', borderBottom: '0.5px solid var(--border-default)', display: 'flex', gap: '16px' }}>
        {['40%', '25%', '20%', '15%'].map((w, i) => (
          <Skeleton key={i} width={w} height={11} />
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonTableRow key={i} cols={4} />
      ))}
    </div>
  ),
}

export const Dashboard: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '700px' }}>
      {/* Metric cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} style={{ padding: '16px', borderRadius: '10px', border: '0.5px solid var(--border-default)', backgroundColor: 'var(--surface-primary)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Skeleton width="50%" height={11} />
            <Skeleton width="35%" height={24} borderRadius={6} />
            <Skeleton width="40%" height={10} />
          </div>
        ))}
      </div>
      {/* Chart area */}
      <div style={{ padding: '20px', borderRadius: '12px', border: '0.5px solid var(--border-default)', backgroundColor: 'var(--surface-primary)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Skeleton width="30%" height={14} />
        <Skeleton width="100%" height={160} borderRadius={8} />
      </div>
    </div>
  ),
}
