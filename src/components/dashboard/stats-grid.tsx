'use client'

import { motion } from 'framer-motion'
import {
  Radio,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Activity,
  Zap,
  TrendingUp,
} from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import type { EndpointStats } from '@/types'

interface StatsGridProps {
  stats: EndpointStats | null
  loading?: boolean
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

function StatSkeleton() {
  return (
    <div className="p-6 space-y-3 animate-pulse">
      <div className="w-10 h-10 rounded-xl bg-white/[0.04]" />
      <div className="w-20 h-4 rounded bg-white/[0.04]" />
      <div className="w-16 h-8 rounded bg-white/[0.06]" />
    </div>
  )
}

export function StatsGrid({ stats, loading }: StatsGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <GlassCard key={i}>
            <StatSkeleton />
          </GlassCard>
        ))}
      </div>
    )
  }

  const cards = [
    {
      label: 'Total Endpoints',
      value: stats?.total ?? 0,
      icon: Radio,
      iconBg: 'bg-indigo-500/15',
      iconColor: 'text-indigo-400',
      change: null,
    },
    {
      label: 'Uptime',
      value: `${stats?.uptimePercent ?? 0}%`,
      icon: TrendingUp,
      iconBg: 'bg-emerald-500/15',
      iconColor: 'text-emerald-400',
      change: { value: '+0.2%', positive: true },
    },
    {
      label: 'Operational',
      value: stats?.up ?? 0,
      icon: Activity,
      iconBg: 'bg-emerald-500/15',
      iconColor: 'text-emerald-400',
      change: null,
    },
    {
      label: 'Avg Response',
      value: `${stats?.avgResponseTime ?? 0}ms`,
      icon: Zap,
      iconBg: 'bg-amber-500/15',
      iconColor: 'text-amber-400',
      change: { value: '-12ms', positive: true },
    },
  ]

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {cards.map((card) => (
        <GlassCard key={card.label} variants={item} hover>
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                <card.icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
              {card.change && (
                <span
                  className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                    card.change.positive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {card.change.positive ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {card.change.value}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
              {card.label}
            </p>
            <p className="text-2xl font-semibold text-white tracking-tight">
              {card.value}
            </p>
          </div>
        </GlassCard>
      ))}
    </motion.div>
  )
}
