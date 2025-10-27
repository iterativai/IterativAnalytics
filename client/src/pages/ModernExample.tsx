import React, { useState } from 'react';
import { ModernButton } from '@/components/ui/modern-button';
import { ModernCard, ModernCardHeader, ModernCardContent, ModernCardFooter } from '@/components/ui/modern-card';
import { ModernInput } from '@/components/ui/modern-input';
import { ModernBadge } from '@/components/ui/modern-badge';
import { Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';

export default function ModernExample() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {
      name: formData.name.length < 2 ? 'Name must be at least 2 characters' : '',
      email: !validateEmail(formData.email) ? 'Please enter a valid email' : '',
      password: formData.password.length < 6 ? 'Password must be at least 6 characters' : ''
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    // Simulate API call
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form after success
    setTimeout(() => {
      setFormData({ name: '', email: '', password: '' });
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <ModernBadge variant="premium" className="mb-4">
            New Design System
          </ModernBadge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Modern Components in Action
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Experience the new premium design system with this interactive example
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sign Up Form Example */}
          <ModernCard variant="premium">
            <ModernCardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Create Account
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Get started with modern components
                  </p>
                </div>
                {isSuccess && (
                  <ModernBadge variant="success" icon={<CheckCircle className="h-3 w-3" />}>
                    Success!
                  </ModernBadge>
                )}
              </div>
            </ModernCardHeader>

            <ModernCardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <ModernInput
                  label="Full Name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange('name')}
                  error={errors.name}
                  icon={<User className="h-4 w-4" />}
                  hint="Your first and last name"
                />

                <ModernInput
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange('email')}
                  error={errors.email}
                  icon={<Mail className="h-4 w-4" />}
                  hint="We'll never share your email"
                />

                <ModernInput
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange('password')}
                  error={errors.password}
                  icon={<Lock className="h-4 w-4" />}
                  hint="Must be at least 6 characters"
                />

                <ModernButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  isLoading={isSubmitting}
                  icon={<ArrowRight className="h-4 w-4" />}
                  iconPosition="right"
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </ModernButton>
              </form>
            </ModernCardContent>

            <ModernCardFooter>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Already have an account?{' '}
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign in
                </button>
              </p>
            </ModernCardFooter>
          </ModernCard>

          {/* Floating Label Example */}
          <ModernCard variant="glass">
            <ModernCardHeader>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Floating Labels
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Modern input style with animated labels
              </p>
            </ModernCardHeader>

            <ModernCardContent className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-700/50">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Try the floating label effect
                </h3>
                
                <div className="space-y-5">
                  <ModernInput
                    floatingLabel
                    label="Full Name"
                    type="text"
                    icon={<User className="h-4 w-4" />}
                  />

                  <ModernInput
                    floatingLabel
                    label="Email Address"
                    type="email"
                    icon={<Mail className="h-4 w-4" />}
                  />

                  <ModernInput
                    floatingLabel
                    label="Password"
                    type="password"
                    icon={<Lock className="h-4 w-4" />}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Button Variants
                </h3>
                <div className="flex flex-wrap gap-3">
                  <ModernButton variant="primary" size="md">
                    Primary
                  </ModernButton>
                  <ModernButton variant="secondary" size="md">
                    Secondary
                  </ModernButton>
                  <ModernButton variant="gradient" size="md">
                    Gradient
                  </ModernButton>
                  <ModernButton variant="ghost" size="md">
                    Ghost
                  </ModernButton>
                </div>
              </div>
            </ModernCardContent>
          </ModernCard>
        </div>

        {/* Additional Examples */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ModernCard variant="elevated" hover>
            <ModernCardContent className="text-center py-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Modern Inputs
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Enhanced form fields with icons, floating labels, and smooth animations
              </p>
            </ModernCardContent>
          </ModernCard>

          <ModernCard variant="elevated" hover>
            <ModernCardContent className="text-center py-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Premium Buttons
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Multiple variants with loading states and micro-interactions
              </p>
            </ModernCardContent>
          </ModernCard>

          <ModernCard variant="elevated" hover>
            <ModernCardContent className="text-center py-8">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Smart Validation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Real-time error handling with elegant feedback messages
              </p>
            </ModernCardContent>
          </ModernCard>
        </div>

        {/* Code Example */}
        <ModernCard variant="premium" className="mt-8">
          <ModernCardHeader>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              How to Use
            </h2>
          </ModernCardHeader>
          <ModernCardContent>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-gray-100">
                <code>{`import { ModernButton } from '@/components/ui/modern-button';
import { ModernCard } from '@/components/ui/modern-card';
import { ModernInput } from '@/components/ui/modern-input';
import { Mail } from 'lucide-react';

<ModernCard variant="premium">
  <ModernInput 
    label="Email" 
    floatingLabel 
    icon={<Mail className="h-4 w-4" />}
  />
  <ModernButton variant="primary" size="lg">
    Submit
  </ModernButton>
</ModernCard>`}</code>
              </pre>
            </div>
          </ModernCardContent>
        </ModernCard>
      </div>
    </div>
  );
}
