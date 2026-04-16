import type { Meta, StoryObj } from '@storybook/react'
import { RangeSlider } from './RangeSlider'

const meta: Meta<typeof RangeSlider> = {
  title: 'Components/RangeSlider',
  component: RangeSlider,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof RangeSlider>

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: '360px' }}>
      <RangeSlider label="Faixa de posição" min={1} max={100} />
    </div>
  ),
}

export const RankFilter: Story = {
  render: () => (
    <div style={{ maxWidth: '360px' }}>
      <RangeSlider
        label="Ranking"
        min={1}
        max={100}
        value={[5, 30]}
        hint="Filtra keywords cuja posição está nesta faixa."
        formatValue={v => `#${v}`}
      />
    </div>
  ),
}

export const DownloadRange: Story = {
  render: () => (
    <div style={{ maxWidth: '360px' }}>
      <RangeSlider
        label="Volume de downloads"
        min={0}
        max={1000000}
        step={10000}
        value={[50000, 500000]}
        formatValue={v => v >= 1000000 ? '1M+' : v >= 1000 ? `${v / 1000}k` : String(v)}
      />
    </div>
  ),
}

export const Stars: Story = {
  render: () => (
    <div style={{ maxWidth: '360px' }}>
      <RangeSlider
        label="Avaliação"
        min={1}
        max={5}
        step={0.5}
        value={[3.5, 5]}
        formatValue={v => `${v}★`}
        hint="Filtra apps com nota nesta faixa."
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: '360px' }}>
      <RangeSlider
        label="Filtro desabilitado"
        min={0}
        max={100}
        value={[20, 60]}
        disabled
      />
    </div>
  ),
}
