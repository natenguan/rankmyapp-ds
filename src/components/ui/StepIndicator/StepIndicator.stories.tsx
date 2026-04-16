import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { StepIndicator } from './StepIndicator'

const meta: Meta<typeof StepIndicator> = {
  title: 'Components/StepIndicator',
  component: StepIndicator,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof StepIndicator>

const ONBOARDING_STEPS = [
  { label: 'Criar conta' },
  { label: 'Adicionar app' },
  { label: 'Escolher plano' },
  { label: 'Confirmar' },
]

const SETUP_STEPS = [
  { label: 'Conectar app', description: 'Google Play ou App Store' },
  { label: 'Definir keywords', description: 'Mínimo 5 keywords' },
  { label: 'Configurar alertas', description: 'Notificações por e-mail' },
  { label: 'Revisar', description: 'Confirme as configurações' },
]

/* ── Horizontal ──────────────────────────────────────────────────── */

export const HorizontalStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '8px 0' }}>
      {[0, 1, 2, 3].map((step) => (
        <div key={step}>
          <p style={{ margin: '0 0 16px', fontFamily: 'DM Sans', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Step {step + 1} ativo
          </p>
          <StepIndicator steps={ONBOARDING_STEPS} currentStep={step} />
        </div>
      ))}
    </div>
  ),
}

export const HorizontalInteractive: Story = {
  render: () => {
    const [current, setCurrent] = useState(0)

    return (
      <div style={{ maxWidth: '560px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <StepIndicator steps={ONBOARDING_STEPS} currentStep={current} />

        <div style={{
          background: 'var(--surface-secondary)', borderRadius: '10px',
          padding: '24px', border: '0.5px solid var(--border-default)',
          minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <p style={{ margin: 0, fontFamily: 'DM Sans', fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center' }}>
            Conteúdo do passo: <strong style={{ color: 'var(--text-primary)' }}>{ONBOARDING_STEPS[current].label}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          {current > 0 && (
            <button
              onClick={() => setCurrent(c => c - 1)}
              style={{
                height: '36px', padding: '0 16px', borderRadius: '8px',
                fontFamily: 'DM Sans', fontSize: '13px', fontWeight: 500,
                background: 'var(--surface-secondary)', color: 'var(--text-primary)',
                border: '0.5px solid var(--border-emphasis)', cursor: 'pointer',
              }}
            >
              Voltar
            </button>
          )}
          {current < ONBOARDING_STEPS.length - 1 ? (
            <button
              onClick={() => setCurrent(c => c + 1)}
              style={{
                height: '36px', padding: '0 16px', borderRadius: '8px',
                fontFamily: 'DM Sans', fontSize: '13px', fontWeight: 500,
                background: '#1A88FF', color: '#fff', border: 'none', cursor: 'pointer',
              }}
            >
              Próximo
            </button>
          ) : (
            <button
              onClick={() => setCurrent(0)}
              style={{
                height: '36px', padding: '0 16px', borderRadius: '8px',
                fontFamily: 'DM Sans', fontSize: '13px', fontWeight: 500,
                background: '#07C6C3', color: '#fff', border: 'none', cursor: 'pointer',
              }}
            >
              Concluir ✓
            </button>
          )}
        </div>
      </div>
    )
  },
}

/* ── Vertical ────────────────────────────────────────────────────── */

export const VerticalWithDescriptions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
      {[0, 1, 2, 3].map((step) => (
        <div key={step} style={{ minWidth: '220px' }}>
          <p style={{ margin: '0 0 16px', fontFamily: 'DM Sans', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Step {step + 1} ativo
          </p>
          <StepIndicator steps={SETUP_STEPS} currentStep={step} orientation="vertical" />
        </div>
      ))}
    </div>
  ),
}
