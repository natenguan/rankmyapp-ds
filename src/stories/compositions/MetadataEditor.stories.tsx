import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Input } from '../../components/ui/Input/Input'
import { Textarea } from '../../components/ui/Textarea/Textarea'
import { Select } from '../../components/ui/Select/Select'
import { MultiSelect } from '../../components/ui/MultiSelect/MultiSelect'
import { Checkbox } from '../../components/ui/Checkbox/Checkbox'
import { Badge } from '../../components/ui/Badge/Badge'

const meta: Meta = {
  title: 'Compositions/Metadata Editor',
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => {
    const [categories, setCategories] = useState(['entertainment'])
    const [country, setCountry] = useState('br')
    const [indexed, setIndexed] = useState(true)

    return (
      <div style={{ maxWidth: '560px' }}>
        <div style={{
          backgroundColor: 'var(--surface-primary)',
          border: '0.5px solid var(--border-default)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{ padding: '20px 24px 16px', borderBottom: '0.5px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '16px', fontFamily: 'Nunito', fontWeight: 600, color: 'var(--text-primary)' }}>
                Metadados do app
              </h2>
              <p style={{ margin: '2px 0 0', fontSize: '12px', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>
                Globoplay — Google Play Brasil
              </p>
            </div>
            <Badge variant="success">Ativo</Badge>
          </div>

          {/* Form */}
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Input label="Nome do app" defaultValue="Globoplay" hint="Exibido na loja. Máximo 30 caracteres." />

            <Textarea
              label="Descrição curta"
              defaultValue="Assista ao melhor do entretenimento Globo: novelas, séries, filmes, jornalismo e esportes."
              rows={3}
              hint="Resumo exibido nos resultados de busca. Máximo 80 caracteres."
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Select
                label="País / Loja"
                options={[
                  { value: 'br', label: '🇧🇷 Brasil' },
                  { value: 'us', label: '🇺🇸 EUA' },
                  { value: 'pt', label: '🇵🇹 Portugal' },
                ]}
                value={country}
                onChange={setCountry}
              />
              <MultiSelect
                label="Categorias"
                options={[
                  { value: 'entertainment', label: 'Entretenimento' },
                  { value: 'sports', label: 'Esportes' },
                  { value: 'news', label: 'Notícias' },
                ]}
                value={categories}
                onChange={setCategories}
              />
            </div>

            <Checkbox
              checked={indexed}
              onChange={setIndexed}
              label="Indexado para rastreamento"
              hint="Monitorar este app nos relatórios diários de ranking."
              id="indexed"
            />
          </div>

          {/* Footer */}
          <div style={{ padding: '16px 24px', borderTop: '0.5px solid var(--border-default)', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button style={{ display: 'inline-flex', alignItems: 'center', height: '34px', padding: '0 14px', fontSize: '13px', fontFamily: 'DM Sans', fontWeight: 500, backgroundColor: 'transparent', color: 'var(--text-primary)', border: '0.5px solid var(--border-emphasis)', borderRadius: '8px', cursor: 'pointer' }}>
              Cancelar
            </button>
            <button style={{ display: 'inline-flex', alignItems: 'center', height: '34px', padding: '0 14px', fontSize: '13px', fontFamily: 'DM Sans', fontWeight: 500, backgroundColor: '#1A88FF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Salvar alterações
            </button>
          </div>
        </div>
      </div>
    )
  },
}
