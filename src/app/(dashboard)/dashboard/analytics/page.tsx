'use client'

import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Clock, Globe } from 'lucide-react'
import { DashboardHeader } from '@/components/layout/header'
import { GlassCard } from '@/components/ui/glass-card'
import { UptimeChart } from '@/components/dashboard/uptime-chart'
import { useEndpoints } from '@/hooks/use-endpoints'

const responseTimeData = [
  { time: '00:00', value: 120 },
  { time: '04:00', value: 95 },
  { time: '08:00', value: 180 },
  { time: '12:00', value: 145 },
  { time: '16:00', value: 200 },
  { time: '20:00', value: 130 },
  { time: '24:00', value: 110 },
]

const maxResponse = Math.max(...responseTimeData.map((d) => d.value))

export default function AnalyticsPage() {
  const { stats } = useEndpoints()

  const metrics = [
    {
      label: 'Avg Response Time',
      value: '142ms',
      change: '-8ms',
      positive: true,
      icon: Clock,
    },
    {
      label: 'Uptime (30d)',
      value: `${stats?.uptimePercent ?? 99.8}%`,
      change: '+0.1%',
      positive: true,
      icon: TrendingUp,
    },
    {
      label: 'Total Checks (24h)',
      value: '4,320',
      change: '+120',
      positive: true,
      icon: BarChart3,
    },
    {
      label: 'Regions Active',
      value: '3',
      change: '',
      positive: true,
      icon: Globe,
    },
  ]

  return (
    <>
      <DashboardHeader
        title="Analytics"
        description="Performance insights and uptime trends"
      />

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <GlassCard
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              hover
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/15 flex items-center justify-center">
                    <m.icon className="w-4 h-4 text-indigo-400" />
                  </div>
                  {m.change && (
                    <span className="text-xs font-medium text-emerald-400">
                      {m.change}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
                  {m.label}
                </p>
                <p className="text-xl font-semibold text-white">{m.value}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UptimeChart />

          <GlassCard
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="px-5 py-4 border-b border-white/[0.06]">
              <h3 className="text-sm font-semibold text-white">
                Response Time (24h)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Average across all endpoints
              </p>
            </div>
            <div className="p-5">
              <div className="flex items-end gap-1 h-32">
                {responseTimeData.map((d, i) => {
                  const height = (d.value / maxResponse) * 100
                  return (
                    <motion.div
                      key={d.time}
                      className="flex-1 flex flex-col items-center gap-1"
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                    >
                      <div
                        className="w-full rounded-sm bg-violet-500/40 hover:bg-violet-400/60 transition-colors cursor-pointer"
                        style={{ height: `${height}%` }}
                        title={`${d.time}: ${d.value}ms`}
                      />
                    </motion.div>
                  )
                })}
              </div>
              <div className="flex items-center justify-between mt-3">
                {responseTimeData.map((d) => (
                  <span key={d.time} className="text-[9px] text-slate-600">
                    {d.time}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  )
}
