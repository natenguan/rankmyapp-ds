import { Badge } from '../Badge/Badge'
import type { BadgeProps } from '../Badge/Badge'

export interface TimelineEvent {
  date: string
  description: string
  tag: string
  tagVariant?: BadgeProps['variant']
}

export interface TimelineProps {
  events: TimelineEvent[]
  /** Link exibido no rodapé (ex: "Ver todos") */
  footerLabel?: string
  footerHref?: string
}

/**
 * Lista cronológica de eventos de um app, exibidos do mais recente para o mais antigo.
 *
 * @example
 * <Timeline
 *   events={[
 *     { date: '18/04', description: 'Nova versão v9.98.1 publicada', tag: 'App Version', tagVariant: 'blue' },
 *     { date: '14/04', description: 'Pico negativo de rating: 3,92 estrelas', tag: 'Rating', tagVariant: 'orange' },
 *   ]}
 *   footerLabel="Ver todos"
 *   footerHref="/changes"
 * />
 */
export function Timeline({ events, footerLabel, footerHref }: TimelineProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {events.map((event, i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: '48px 1px 1fr auto',
            gap: '0 12px',
            alignItems: 'stretch',
          }}
        >
          {/* Data */}
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 12,
            color: 'var(--text-secondary)',
            paddingTop: 10,
            textAlign: 'right',
            whiteSpace: 'nowrap',
          }}>
            {event.date}
          </span>

          {/* Trilha vertical */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              backgroundColor: 'var(--border-emphasis)',
              marginTop: 13, flexShrink: 0,
            }} />
            {i < events.length - 1 && (
              <div style={{ flex: 1, width: 1, backgroundColor: 'var(--border-default)', marginTop: 4 }} />
            )}
          </div>

          {/* Descrição */}
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 13,
            color: 'var(--text-primary)',
            padding: '8px 0',
            lineHeight: 1.5,
          }}>
            {event.description}
          </span>

          {/* Tag */}
          <div style={{ paddingTop: 8 }}>
            <Badge variant={event.tagVariant ?? 'gray'}>{event.tag}</Badge>
          </div>
        </div>
      ))}

      {footerLabel && (
        <div style={{ marginTop: 12, paddingLeft: 60 }}>
          <a
            href={footerHref ?? '#'}
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 12,
              color: '#1A88FF',
              textDecoration: 'none',
            }}
          >
            {footerLabel} →
          </a>
        </div>
      )}
    </div>
  )
}
