'use client'

import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/glass-card'

const uptimeData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  uptime: 95 + Math.random() * 5,
}))

export function UptimeChart() {
  const maxUptime = 100
  const barWidth = 100 / uptimeData.length

  return (
    <GlassCard
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.4 }}
    >
      <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">Uptime History</h3>
          <p className="text-xs text-slate-500 mt-0.5">Last 30 days</p>
        </div>
        <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
          99.8% avg
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-end gap-[2px] h-24">
          {uptimeData.map((d, i) => {
            const height = (d.uptime / maxUptime) * 100
            const isLow = d.uptime < 98

            return (
              <motion.div
                key={d.day}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: 0.4 + i * 0.02, duration: 0.4, ease: 'easeOut' }}
                className={`flex-1 rounded-sm ${
                  isLow
                    ? 'bg-amber-500/60 hover:bg-amber-400/80'
                    : 'bg-indigo-500/40 hover:bg-indigo-400/60'
                } transition-colors cursor-pointer`}
                title={`Day ${d.day}: ${d.uptime.toFixed(1)}%`}
              />
            )
          })}
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-[10px] text-slate-600">30 days ago</span>
          <span className="text-[10px] text-slate-600">Today</span>
        </div>
      </div>
    </GlassCard>
  )
}
