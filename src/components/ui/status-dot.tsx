import { cn } from '@/lib/utils'

interface StatusDotProps {
  status: 'up' | 'down' | 'degraded'
  size?: 'sm' | 'md'
  className?: string
}

export function StatusDot({ status, size = 'sm', className }: StatusDotProps) {
  return (
    <span className={cn('relative flex', className)}>
      <span
        className={cn(
          'absolute inline-flex rounded-full opacity-75 animate-ping',
          size === 'sm' ? 'h-2 w-2' : 'h-3 w-3',
          {
            'bg-emerald-400': status === 'up',
            'bg-rose-400': status === 'down',
            'bg-amber-400': status === 'degraded',
          },
        )}
      />
      <span
        className={cn(
          'relative inline-flex rounded-full',
          size === 'sm' ? 'h-2 w-2' : 'h-3 w-3',
          {
            'bg-emerald-500': status === 'up',
            'bg-rose-500': status === 'down',
            'bg-amber-500': status === 'degraded',
          },
        )}
      />
    </span>
  )
}
