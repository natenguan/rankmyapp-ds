import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsList, TabsTrigger, TabsContent, PillGroup } from './Tabs'

const meta: Meta = {
  title: 'Components/Tabs',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const UnderlineTabs: Story = {
  render: () => (
    <div className="p-4">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="pt-4">
          <p className="font-sans text-[14px] text-secondary-ds">Overview content here.</p>
        </TabsContent>
        <TabsContent value="keywords" className="pt-4">
          <p className="font-sans text-[14px] text-secondary-ds">Keywords content here.</p>
        </TabsContent>
        <TabsContent value="competitors" className="pt-4">
          <p className="font-sans text-[14px] text-secondary-ds">Competitors content here.</p>
        </TabsContent>
        <TabsContent value="reviews" className="pt-4">
          <p className="font-sans text-[14px] text-secondary-ds">Reviews content here.</p>
        </TabsContent>
      </Tabs>
    </div>
  ),
}

function PillGroupDemo() {
  const [period, setPeriod] = useState('30')
  return (
    <div className="p-4">
      <PillGroup
        options={[
          { label: '7 dias', value: '7' },
          { label: '15 dias', value: '15' },
          { label: '30 dias', value: '30' },
        ]}
        value={period}
        onChange={setPeriod}
      />
      <p className="font-sans text-[13px] text-secondary-ds mt-3">Selected: {period} dias</p>
    </div>
  )
}

export const PillGroupStory: Story = {
  name: 'Pill Group (Period Selector)',
  render: () => <PillGroupDemo />,
}
