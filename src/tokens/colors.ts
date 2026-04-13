export const colors = {
  brand: {
    blue: '#1A88FF',
    blueDark: '#0050E5',
    navy: '#00132C',
    cyan: '#00A3FF',
    cyanLight: '#00D9FF',
    orange: '#FF5700',
    orangeLight: '#FF935B',
    teal: '#07C6C3',
    purple: '#8243FF',
    pink: '#FF0167',
  },
  semantic: {
    success: '#07C6C3',
    warning: '#FF5700',
    danger: '#E24B4A',
    info: '#1A88FF',
  },
  ranking: {
    top10: '#1A88FF',
    top20: '#00A3FF',
    top30: '#8243FF',
    top40: '#FF5700',
    top50: '#FF0167',
  },
  keyword: {
    growing: { bg: 'rgba(26,136,255,0.12)', text: '#0050E5' },
    stable: { bg: 'rgba(7,198,195,0.12)', text: '#00A3A0' },
    dropping: { bg: 'rgba(255,87,0,0.12)', text: '#CC4500' },
    critical: { bg: 'rgba(226,75,74,0.12)', text: '#A32D2D' },
  },
  delta: {
    positive: '#0F6E56',
    negative: '#A32D2D',
  },
} as const
