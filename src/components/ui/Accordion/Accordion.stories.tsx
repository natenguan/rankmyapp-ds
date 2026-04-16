import type { Meta, StoryObj } from '@storybook/react'
import { Accordion } from './Accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof Accordion>

const FAQ_ITEMS = [
  {
    id: 'q1',
    title: 'Como funciona o rastreamento de keywords?',
    content: 'O RankMyApp monitora diariamente a posição do seu app nas buscas das lojas. Você adiciona as keywords relevantes e acompanha a evolução do ranking ao longo do tempo.',
  },
  {
    id: 'q2',
    title: 'Com que frequência os dados são atualizados?',
    content: 'Os rankings são atualizados todos os dias às 06:00 (horário de Brasília). Dados de downloads e reviews são sincronizados a cada 12 horas.',
  },
  {
    id: 'q3',
    title: 'Posso monitorar apps concorrentes?',
    content: 'Sim! Você pode adicionar apps concorrentes para comparar a performance de keywords lado a lado e identificar oportunidades.',
  },
  {
    id: 'q4',
    title: 'Quais lojas são suportadas?',
    subtitle: 'Google Play e App Store disponíveis',
    content: 'Atualmente suportamos Google Play e App Store. Huawei AppGallery e Amazon Appstore estão no roadmap para o próximo trimestre.',
  },
]

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: '560px' }}>
      <Accordion items={FAQ_ITEMS} defaultOpen={['q1']} />
    </div>
  ),
}

export const Multiple: Story = {
  render: () => (
    <div style={{ maxWidth: '560px' }}>
      <Accordion items={FAQ_ITEMS} defaultOpen={['q1', 'q3']} multiple />
    </div>
  ),
}

export const AllClosed: Story = {
  render: () => (
    <div style={{ maxWidth: '560px' }}>
      <Accordion items={FAQ_ITEMS} />
    </div>
  ),
}

export const WithSubtitles: Story = {
  render: () => (
    <div style={{ maxWidth: '560px' }}>
      <Accordion
        items={[
          {
            id: 'notifications',
            title: 'Notificações',
            subtitle: '3 configurações ativas',
            content: 'Configure quando receber alertas sobre mudanças significativas no ranking das suas keywords.',
          },
          {
            id: 'integrations',
            title: 'Integrações',
            subtitle: 'Slack, e-mail, webhook',
            content: 'Conecte o RankMyApp com suas ferramentas de monitoramento e receba alertas automaticamente.',
          },
          {
            id: 'billing',
            title: 'Cobrança',
            subtitle: 'Plano Pro — renova em 15/05',
            content: 'Gerencie seu plano, histórico de pagamentos e dados de faturamento.',
            disabled: false,
          },
        ]}
        defaultOpen={['notifications']}
      />
    </div>
  ),
}
