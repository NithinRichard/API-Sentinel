import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: 'up' | 'down' | 'degraded'
  className?: string
}

const config = {
  up: {
    label: 'Operational',
    dot: 'bg-emerald-400',
    bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  down: {
    label: 'Down',
    dot: 'bg-rose-400',
    bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  },
  degraded: {
    label: 'Degraded',
    dot: 'bg-amber-400',
    bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
} as const

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { label, dot, bg } = config[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
        bg,
        className,
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full animate-pulse', dot)} />
      {label}
    </span>
  )
}
