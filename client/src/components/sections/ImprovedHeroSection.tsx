import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Users, Building, TrendingUp, Play } from 'lucide-react';
import { FadeIn, ScaleIn } from '@/components/ui/animated';
import { useTheme } from '@/components/ui/sector-theme-selector';
import { Card, CardContent } from '@/components/ui/card';

interface UserRole {
  id: 'founder' | 'investor' | 'partner';
  label: string;
  icon: React.ReactNode;
  description: string;
  cta: string;
}

export const ImprovedHeroSection: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(false);
  const { currentTheme } = useTheme();

  const userRoles: UserRole[] = [
    {
      id: 'founder',
      label: 'Startup Founder',
      icon: <Users className="h-6 w-6" />,
      description: 'Build investor-ready business plans with AI-powered insights',
      cta: 'Start Building Your Plan'
    },
    {
      id: 'investor',
      label: 'Investor/VC',
      icon: <TrendingUp className="h-6 w-6" />,
      description: 'Access comprehensive startup intelligence and deal flow',
      cta: 'Explore Deal Flow'
    },
    {
      id: 'partner',
      label: 'Enterprise Partner',
      icon: <Building className="h-6 w-6" />,
      description: 'Connect with verified African startups for partnerships',
      cta: 'Find Partners'
    }
  ];

  const handleRoleSelection = (roleId: string) => {
    setSelectedRole(roleId);
    // This would typically navigate to a role-specific onboarding flow
  };

  const handleWatchDemo = () => {
    setShowDemo(true);
    // This would open a contextual demo based on selected role
  };

  const SuccessMetrics = () => (
    <div className="grid grid-cols-3 gap-6 text-center">
      <div>
        <div className="text-2xl font-bold text-white mb-1">2,500+</div>
        <div className="text-sm text-gray-300">African Startups</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-white mb-1">$50M+</div>
        <div className="text-sm text-gray-300">Capital Raised</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-white mb-1">15</div>
        <div className="text-sm text-gray-300">Countries</div>
      </div>
    </div>
  );

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      style={{
        background: `linear-gradient(135deg, ${currentTheme.colors.primary}15, ${currentTheme.colors.background})`
      }}
    >
      {/* Simplified Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: currentTheme.colors.primary + '20' }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Simplified Badge */}
          <FadeIn delay={0.2}>
            <div 
              className="inline-flex items-center mb-8 px-6 py-3 rounded-full text-white border backdrop-blur-sm"
              style={{ 
                backgroundColor: currentTheme.colors.primary + '20',
                borderColor: currentTheme.colors.primary + '40'
              }}
            >
              <Sparkles className="h-5 w-5 mr-3" />
              <span className="font-medium">Complete African Startup Ecosystem Platform</span>
            </div>
          </FadeIn>

          {/* Clear, Focused Headline */}
          <FadeIn delay={0.4}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              <span 
                className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent font-bold"
                style={{ textShadow: '0 0 30px rgba(6, 182, 212, 0.4)' }}
              >
                Democratising Financial Intelligence
              </span>
              <br />
              <span className="text-white/90 text-3xl md:text-5xl lg:text-6xl">
                for African Startups
              </span>
            </h1>
          </FadeIn>

          {/* Simplified Value Proposition */}
          <FadeIn delay={0.6}>
            <p className="text-xl md:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              AI-powered business intelligence, blockchain capital access, and intelligent supply chain management 
              - all in one integrated platform designed for African entrepreneurs.
            </p>
          </FadeIn>

          {/* Progressive Disclosure: Role Selection or Single CTA */}
          <FadeIn delay={0.8}>
            {!selectedRole ? (
              <div className="space-y-8">
                {/* Primary CTA - Single Clear Action */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    size="lg"
                    className="px-8 py-4 text-lg font-semibold min-w-[200px] h-14 group"
                    style={{
                      background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.accent})`,
                      color: 'white'
                    }}
                    onClick={() => setSelectedRole('exploring')}
                  >
                    Explore Solutions
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="px-8 py-4 text-lg border-2 text-white hover:bg-white/10 min-w-[200px] h-14 group"
                    style={{ borderColor: currentTheme.colors.primary }}
                    onClick={handleWatchDemo}
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Button>
                </div>

                {/* Social Proof */}
                <div className="pt-8">
                  <SuccessMetrics />
                </div>
              </div>
            ) : (
              /* Role Selection Interface */
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-2">
                    What describes you best?
                  </h2>
                  <p className="text-gray-300">
                    Choose your role to get a personalized experience
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {userRoles.map((role) => (
                    <ScaleIn key={role.id} delay={0.1}>
                      <Card 
                        className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 bg-white/10 backdrop-blur-sm border-white/20 hover:border-white/40"
                        onClick={() => handleRoleSelection(role.id)}
                      >
                        <CardContent className="p-6 text-center">
                          <div 
                            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: currentTheme.colors.primary + '30' }}
                          >
                            <div style={{ color: currentTheme.colors.primary }}>
                              {role.icon}
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold text-white mb-3">
                            {role.label}
                          </h3>
                          <p className="text-gray-300 mb-4 text-sm">
                            {role.description}
                          </p>
                          <Button 
                            size="sm"
                            variant="outline"
                            className="w-full border-white/30 text-white hover:bg-white/10"
                          >
                            {role.cta}
                          </Button>
                        </CardContent>
                      </Card>
                    </ScaleIn>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  onClick={() => setSelectedRole(null)}
                  className="text-gray-300 hover:text-white hover:bg-white/10"
                >
                  ← Back to main options
                </Button>
              </div>
            )}
          </FadeIn>
        </div>
      </div>

      {/* Accessibility Improvements */}
      <div className="sr-only">
        <h2>Iterativ Analytics Platform Overview</h2>
        <p>
          Comprehensive business intelligence platform for African startups, 
          providing AI-powered planning tools, blockchain capital access, 
          and supply chain management solutions.
        </p>
      </div>
    </section>
  );
};

export default ImprovedHeroSection;