import React from 'react'

export type StepStatus = 'completed' | 'active' | 'upcoming'

export interface Step {
  label: string
  description?: string
}

export interface StepIndicatorProps {
  steps: Step[]
  currentStep: number /** 0-indexed */
  orientation?: 'horizontal' | 'vertical'
}

const COLORS = {
  completed: { bg: '#07C6C3', border: '#07C6C3', text: '#fff', label: 'var(--text-primary)' },
  active:    { bg: '#1A88FF', border: '#1A88FF', text: '#fff', label: 'var(--text-primary)' },
  upcoming:  { bg: 'var(--surface-primary)', border: 'var(--border-emphasis)', text: 'var(--text-secondary)', label: 'var(--text-secondary)' },
}

function CheckIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StepNode({ index, status, total }: { index: number; status: StepStatus; total: number }) {
  const c = COLORS[status]
  return (
    <div style={{
      width: '28px', height: '28px', borderRadius: '50%',
      background: c.bg, border: `1.5px solid ${c.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, transition: 'all 0.2s',
      fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 600,
      color: c.text,
      boxShadow: status === 'active' ? '0 0 0 4px rgba(26,136,255,0.15)' : 'none',
    }}>
      {status === 'completed' ? <CheckIcon /> : index + 1}
      <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
        Step {index + 1} of {total}
      </span>
    </div>
  )
}

function Connector({ active, orientation }: { active: boolean; orientation: 'horizontal' | 'vertical' }) {
  const color = active ? '#07C6C3' : 'var(--border-default)'
  if (orientation === 'horizontal') {
    return (
      <div style={{
        flex: 1, height: '1.5px', background: color,
        transition: 'background 0.2s', minWidth: '24px',
      }} />
    )
  }
  return (
    <div style={{
      width: '1.5px', flex: 1, background: color,
      transition: 'background 0.2s', minHeight: '16px', margin: '0 auto',
    }} />
  )
}

export function StepIndicator({
  steps,
  currentStep,
  orientation = 'horizontal',
}: StepIndicatorProps) {
  function getStatus(index: number): StepStatus {
    if (index < currentStep) return 'completed'
    if (index === currentStep) return 'active'
    return 'upcoming'
  }

  if (orientation === 'vertical') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {steps.map((step, i) => {
          const status = getStatus(i)
          const c = COLORS[status]
          const isLast = i === steps.length - 1
          return (
            <div key={i}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <StepNode index={i} status={status} total={steps.length} />
                  {!isLast && (
                    <div style={{
                      width: '1.5px', height: '32px', marginTop: '4px',
                      background: status === 'completed' ? '#07C6C3' : 'var(--border-default)',
                      transition: 'background 0.2s',
                    }} />
                  )}
                </div>
                <div style={{ paddingTop: '4px', paddingBottom: isLast ? 0 : '8px' }}>
                  <p style={{
                    margin: 0, fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
                    fontWeight: status === 'active' ? 600 : 500,
                    color: c.label, lineHeight: 1.3,
                  }}>
                    {step.label}
                  </p>
                  {step.description && (
                    <p style={{
                      margin: '2px 0 0', fontFamily: 'DM Sans, sans-serif',
                      fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4,
                    }}>
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      {steps.map((step, i) => {
        const status = getStatus(i)
        const c = COLORS[status]
        const isLast = i === steps.length - 1
        return (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <StepNode index={i} status={status} total={steps.length} />
              <span style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '11px',
                fontWeight: status === 'active' ? 600 : 500,
                color: c.label, whiteSpace: 'nowrap', textAlign: 'center',
                maxWidth: '80px',
              }}>
                {step.label}
              </span>
            </div>
            {!isLast && (
              <Connector active={i < currentStep} orientation="horizontal" />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
