'use client'

import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/glass-card'
import { StatusDot } from '@/components/ui/status-dot'

interface ActivityItem {
  id: string
  endpoint: string
  status: 'up' | 'down' | 'degraded'
  message: string
  time: string
}

const mockActivity: ActivityItem[] = [
  {
    id: '1',
    endpoint: 'Google Maps Platform',
    status: 'up',
    message: 'Health check passed (142ms)',
    time: '2m ago',
  },
  {
    id: '2',
    endpoint: 'Stripe API',
    status: 'up',
    message: 'Health check passed (89ms)',
    time: '2m ago',
  },
  {
    id: '3',
    endpoint: 'Razorpay API',
    status: 'up',
    message: 'Health check passed (201ms)',
    time: '2m ago',
  },
  {
    id: '4',
    endpoint: 'Google Maps Platform',
    status: 'up',
    message: 'Health check passed (156ms)',
    time: '5m ago',
  },
  {
    id: '5',
    endpoint: 'Stripe API',
    status: 'degraded',
    message: 'Slow response (1,823ms)',
    time: '8m ago',
  },
]

export function ActivityFeed() {
  return (
    <GlassCard
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-white/[0.06]">
        <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {mockActivity.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.06 }}
            className="px-5 py-3 flex items-center gap-3 hover:bg-white/[0.02] transition-colors"
          >
            <StatusDot status={item.status} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-200 truncate">
                <span className="font-medium">{item.endpoint}</span>
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{item.message}</p>
            </div>
            <span className="text-xs text-slate-600 shrink-0">{item.time}</span>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  )
}
