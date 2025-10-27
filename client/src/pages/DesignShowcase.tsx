import React, { useState } from 'react';
import { ModernButton } from '@/components/ui/modern-button';
import { ModernCard, ModernCardHeader, ModernCardContent, ModernCardFooter } from '@/components/ui/modern-card';
import { ModernBadge } from '@/components/ui/modern-badge';
import { ModernTooltip } from '@/components/ui/modern-tooltip';
import { ModernInput } from '@/components/ui/modern-input';
import { Skeleton, SkeletonCard, SkeletonAvatar, SkeletonText } from '@/components/ui/modern-skeleton';
import { ArrowRight, Sparkles, Mail, Search, Star, TrendingUp, Check } from 'lucide-react';

export default function DesignShowcase() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Modern Design System
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            A comprehensive collection of premium UI components
          </p>
        </div>

        {/* Buttons Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Buttons</h2>
          <ModernCard variant="premium">
            <ModernCardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-300">Primary</h3>
                  <ModernButton variant="primary" size="lg" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                    Get Started
                  </ModernButton>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-300">Secondary</h3>
                  <ModernButton variant="secondary" size="lg">
                    Learn More
                  </ModernButton>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-300">Gradient</h3>
                  <ModernButton variant="gradient" size="lg" icon={<Sparkles className="h-4 w-4" />}>
                    Premium
                  </ModernButton>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-300">Loading</h3>
                  <ModernButton variant="primary" size="lg" isLoading>
                    Processing
                  </ModernButton>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-3">Sizes</h3>
                <div className="flex flex-wrap gap-3">
                  <ModernButton variant="primary" size="sm">Small</ModernButton>
                  <ModernButton variant="primary" size="md">Medium</ModernButton>
                  <ModernButton variant="primary" size="lg">Large</ModernButton>
                  <ModernButton variant="primary" size="xl">Extra Large</ModernButton>
                </div>
              </div>
            </ModernCardContent>
          </ModernCard>
        </section>

        {/* Cards Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ModernCard variant="premium" hover>
              <ModernCardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Premium Card</h3>
                  <ModernBadge variant="premium" icon={<Star className="h-3 w-3" />}>Pro</ModernBadge>
                </div>
              </ModernCardHeader>
              <ModernCardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  A premium card with elevated design, subtle borders, and smooth hover effects.
                </p>
              </ModernCardContent>
              <ModernCardFooter>
                <ModernButton variant="primary" size="sm" className="w-full">
                  Explore
                </ModernButton>
              </ModernCardFooter>
            </ModernCard>

            <ModernCard variant="glass" hover>
              <ModernCardHeader>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Glass Card</h3>
              </ModernCardHeader>
              <ModernCardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  A glassmorphic card with backdrop blur and translucent effects.
                </p>
              </ModernCardContent>
              <ModernCardFooter>
                <ModernButton variant="secondary" size="sm" className="w-full">
                  View Details
                </ModernButton>
              </ModernCardFooter>
            </ModernCard>

            <ModernCard variant="elevated" hover>
              <ModernCardHeader>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Elevated Card</h3>
              </ModernCardHeader>
              <ModernCardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  A card with strong elevation and prominent shadow effects.
                </p>
              </ModernCardContent>
              <ModernCardFooter>
                <ModernButton variant="ghost" size="sm" className="w-full">
                  Learn More
                </ModernButton>
              </ModernCardFooter>
            </ModernCard>
          </div>
        </section>

        {/* Badges Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Badges</h2>
          <ModernCard variant="premium">
            <ModernCardContent>
              <div className="flex flex-wrap gap-3">
                <ModernBadge variant="default">Default</ModernBadge>
                <ModernBadge variant="success" icon={<Check className="h-3 w-3" />}>Success</ModernBadge>
                <ModernBadge variant="warning">Warning</ModernBadge>
                <ModernBadge variant="error">Error</ModernBadge>
                <ModernBadge variant="info" icon={<TrendingUp className="h-3 w-3" />}>Info</ModernBadge>
                <ModernBadge variant="premium" icon={<Star className="h-3 w-3" />}>Premium</ModernBadge>
                <ModernBadge variant="success" pulse>Live</ModernBadge>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-3">Sizes</h3>
                <div className="flex flex-wrap gap-3 items-center">
                  <ModernBadge variant="info" size="sm">Small</ModernBadge>
                  <ModernBadge variant="info" size="md">Medium</ModernBadge>
                  <ModernBadge variant="info" size="lg">Large</ModernBadge>
                </div>
              </div>
            </ModernCardContent>
          </ModernCard>
        </section>

        {/* Inputs Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Inputs</h2>
          <ModernCard variant="premium">
            <ModernCardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ModernInput
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  icon={<Mail className="h-4 w-4" />}
                  hint="We'll never share your email"
                />
                
                <ModernInput
                  label="Search"
                  type="text"
                  placeholder="Search..."
                  icon={<Search className="h-4 w-4" />}
                  iconPosition="right"
                />
                
                <ModernInput
                  floatingLabel
                  label="Floating Label"
                  type="text"
                  icon={<Mail className="h-4 w-4" />}
                />
                
                <ModernInput
                  label="With Error"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={email && !email.includes('@') ? 'Please enter a valid email' : ''}
                  placeholder="you@example.com"
                />
              </div>
            </ModernCardContent>
          </ModernCard>
        </section>

        {/* Tooltips Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Tooltips</h2>
          <ModernCard variant="premium">
            <ModernCardContent>
              <div className="flex flex-wrap gap-6">
                <ModernTooltip content="Tooltip on top" position="top">
                  <ModernButton variant="secondary">Hover me (Top)</ModernButton>
                </ModernTooltip>
                
                <ModernTooltip content="Tooltip on bottom" position="bottom">
                  <ModernButton variant="secondary">Hover me (Bottom)</ModernButton>
                </ModernTooltip>
                
                <ModernTooltip content="Tooltip on left" position="left">
                  <ModernButton variant="secondary">Hover me (Left)</ModernButton>
                </ModernTooltip>
                
                <ModernTooltip content="Tooltip on right" position="right">
                  <ModernButton variant="secondary">Hover me (Right)</ModernButton>
                </ModernTooltip>
              </div>
            </ModernCardContent>
          </ModernCard>
        </section>

        {/* Loading States Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Loading States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ModernCard variant="premium">
              <ModernCardHeader>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Skeleton Card</h3>
              </ModernCardHeader>
              <ModernCardContent>
                <SkeletonCard />
              </ModernCardContent>
            </ModernCard>

            <ModernCard variant="premium">
              <ModernCardHeader>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Skeleton Components</h3>
              </ModernCardHeader>
              <ModernCardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <SkeletonAvatar size="lg" />
                    <div className="flex-1">
                      <Skeleton className="h-6 w-32 mb-2" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </div>
                  <SkeletonText lines={4} />
                </div>
              </ModernCardContent>
            </ModernCard>
          </div>
        </section>

        {/* Combined Example */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Real-World Example</h2>
          <ModernCard variant="premium">
            <ModernCardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Startup Analytics Dashboard</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Track your key metrics in real-time</p>
                </div>
                <ModernBadge variant="success" pulse>Live</ModernBadge>
              </div>
            </ModernCardHeader>
            <ModernCardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</span>
                    <ModernBadge variant="success" size="sm">+12%</ModernBadge>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">$24,500</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200/50 dark:border-purple-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Users</span>
                    <ModernBadge variant="info" size="sm">+8%</ModernBadge>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">1,234</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200/50 dark:border-green-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Growth</span>
                    <ModernBadge variant="success" size="sm" icon={<TrendingUp className="h-3 w-3" />}>+23%</ModernBadge>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">87%</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <ModernInput
                  type="email"
                  placeholder="Enter your email"
                  icon={<Mail className="h-4 w-4" />}
                  className="flex-1"
                />
                <ModernButton variant="primary" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                  Subscribe
                </ModernButton>
              </div>
            </ModernCardContent>
            <ModernCardFooter>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Last updated: 2 minutes ago
                </p>
                <ModernTooltip content="Refresh dashboard data">
                  <ModernButton variant="ghost" size="sm">
                    Refresh
                  </ModernButton>
                </ModernTooltip>
              </div>
            </ModernCardFooter>
          </ModernCard>
        </section>
      </div>
    </div>
  );
}
