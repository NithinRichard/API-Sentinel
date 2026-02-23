'use client'

import { motion } from 'framer-motion'
import { User, Mail, Shield, CreditCard, Trash2 } from 'lucide-react'
import { DashboardHeader } from '@/components/layout/header'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'

function SettingsSection({
  title,
  description,
  children,
  delay = 0,
}: {
  title: string
  description: string
  children: React.ReactNode
  delay?: number
}) {
  return (
    <GlassCard
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <div className="px-6 py-5">{children}</div>
    </GlassCard>
  )
}

function InputField({
  label,
  type = 'text',
  placeholder,
  defaultValue,
  icon: Icon,
}: {
  label: string
  type?: string
  placeholder: string
  defaultValue?: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
        />
      </div>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <>
      <DashboardHeader
        title="Settings"
        description="Manage your account and preferences"
      />

      <div className="space-y-6 max-w-2xl">
        <SettingsSection
          title="Profile"
          description="Your personal information"
          delay={0}
        >
          <div className="space-y-4">
            <InputField
              label="Name"
              placeholder="Your name"
              icon={User}
            />
            <InputField
              label="Email"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
            />
            <div className="pt-2">
              <Button size="sm">Save Changes</Button>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Security"
          description="Password and authentication"
          delay={0.1}
        >
          <div className="space-y-4">
            <InputField
              label="Current Password"
              type="password"
              placeholder="••••••••"
              icon={Shield}
            />
            <InputField
              label="New Password"
              type="password"
              placeholder="Min 8 characters"
              icon={Shield}
            />
            <div className="pt-2">
              <Button size="sm">Update Password</Button>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Billing"
          description="Manage your subscription and billing"
          delay={0.2}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Free Plan</p>
                <p className="text-xs text-slate-400">3 endpoints included</p>
              </div>
            </div>
            <Button size="sm" variant="secondary">
              Upgrade
            </Button>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Danger Zone"
          description="Irreversible account actions"
          delay={0.3}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-rose-400">Delete Account</p>
              <p className="text-xs text-slate-500">
                Permanently delete your account and all data
              </p>
            </div>
            <Button
              size="sm"
              className="bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 shadow-none"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </Button>
          </div>
        </SettingsSection>
      </div>
    </>
  )
}
