'use client'

import { motion } from 'framer-motion'
import { Bell, BellOff, Mail, Webhook, Clock } from 'lucide-react'
import { DashboardHeader } from '@/components/layout/header'
import { GlassCard } from '@/components/ui/glass-card'
import { StatusDot } from '@/components/ui/status-dot'

const alertHistory = [
  {
    id: '1',
    endpoint: 'Stripe API',
    type: 'down',
    message: 'Endpoint returned 503 Service Unavailable',
    time: '2 hours ago',
    resolved: true,
  },
  {
    id: '2',
    endpoint: 'Google Maps Platform',
    type: 'degraded',
    message: 'Response time exceeded 2000ms threshold (2,341ms)',
    time: '6 hours ago',
    resolved: true,
  },
  {
    id: '3',
    endpoint: 'Razorpay API',
    type: 'down',
    message: 'Connection timeout after 5000ms',
    time: '1 day ago',
    resolved: true,
  },
]

export default function AlertsPage() {
  return (
    <>
      <DashboardHeader
        title="Alerts"
        description="Notification history and alert configuration"
      />

      <div className="space-y-6">
        {/* Alert Config */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Mail,
              title: 'Email Alerts',
              description: 'Receive downtime notifications via email',
              enabled: true,
            },
            {
              icon: Webhook,
              title: 'Webhook Alerts',
              description: 'POST alerts to your custom webhook URL',
              enabled: false,
            },
            {
              icon: Bell,
              title: 'Slack Integration',
              description: 'Send alerts to a Slack channel',
              enabled: false,
            },
          ].map((channel, i) => (
            <GlassCard
              key={channel.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              hover
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/15 flex items-center justify-center">
                    <channel.icon className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div
                    className={`w-9 h-5 rounded-full relative transition-colors cursor-pointer ${
                      channel.enabled ? 'bg-indigo-500' : 'bg-white/10'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
                        channel.enabled ? 'left-[18px]' : 'left-0.5'
                      }`}
                    />
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">
                  {channel.title}
                </h3>
                <p className="text-xs text-slate-400">{channel.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Alert History */}
        <GlassCard
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Alert History</h3>
            <span className="text-xs text-slate-500">Last 7 days</span>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {alertHistory.map((alert, i) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.06 }}
                className="px-5 py-4 flex items-start gap-3 hover:bg-white/[0.02] transition-colors"
              >
                <StatusDot
                  status={alert.type as 'up' | 'down' | 'degraded'}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">
                      {alert.endpoint}
                    </span>
                    {alert.resolved && (
                      <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        Resolved
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{alert.message}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-600 shrink-0">
                  <Clock className="w-3 h-3" />
                  {alert.time}
                </div>
              </motion.div>
            ))}
          </div>
          {alertHistory.length === 0 && (
            <div className="px-5 py-12 text-center">
              <BellOff className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <p className="text-sm text-slate-400">No alerts in the last 7 days</p>
            </div>
          )}
        </GlassCard>
      </div>
    </>
  )
}
