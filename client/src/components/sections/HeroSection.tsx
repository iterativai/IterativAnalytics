import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, ChevronRight, TrendingUp, Target, DollarSign, Brain } from 'lucide-react';
import { FadeIn, ScaleIn } from '@/components/ui/animated';
import { useTheme } from '@/components/ui/sector-theme-selector';
import { Link } from 'wouter';
import { DemoModal } from '@/components/modals/DemoModal';
import { DashboardCards } from '@/components/ui/dashboard-cards';

const HeroSection = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const { currentTheme } = useTheme();

  // Dashboard metrics for the enhanced AI Business Intelligence element
  const [dashboardMetrics, setDashboardMetrics] = useState({
    analysisProgress: 75,
    feasibilityScore: 87,
    aiInsightsReady: true
  });

  useEffect(() => {
    // Animate metrics on component mount
    const timer = setTimeout(() => {
      setDashboardMetrics({
        analysisProgress: 87,
        feasibilityScore: 92,
        aiInsightsReady: true
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <DemoModal
        open={demoModalOpen}
        onOpenChange={setDemoModalOpen}
      />

      <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
          <div 
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: currentTheme.colors.primary + '40' }}
          ></div>
          <div 
            className="absolute bottom-20 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ backgroundColor: currentTheme.colors.accent + '30' }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <FadeIn delay={0.2}>
                <div 
                  className="inline-flex items-center mb-6 px-4 py-2 rounded-full text-white border"
                  style={{ 
                    backgroundColor: currentTheme.colors.primary + '20',
                    borderColor: currentTheme.colors.primary + '40'
                  }}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  <span className="font-medium text-sm">Complete African Startup Ecosystem</span>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                  <span 
                    className="font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent"
                    style={{
                      textShadow: '0 0 30px rgba(6, 182, 212, 0.4)'
                    }}
                  >
                    Democratising Financial Intelligence
                  </span>
                  <br />
                  <span className="text-white/90">Capital Access & Operations</span>
                  <br />
                  <span className="text-3xl md:text-4xl lg:text-5xl text-white/80">for African Startups</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.6}>
                <p className="text-xl text-gray-100 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed drop-shadow-lg">
                  The complete ecosystem platform integrating AI-powered business planning, blockchain capital markets, 
                  and intelligent supply chain management - designed for African entrepreneurs.
                </p>
              </FadeIn>

              <FadeIn delay={0.8}>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <Button
                    onClick={() => setDemoModalOpen(true)}
                    className="px-8 py-4 text-lg group"
                    size="lg"
                    style={{
                      background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.accent})`,
                      color: 'white'
                    }}
                  >
                    Try Free Demo
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="px-8 py-4 text-lg border-2 text-white hover:bg-white/10"
                    style={{ borderColor: currentTheme.colors.primary }}
                  >
                    Get Investor Deck
                  </Button>
                </div>
              </FadeIn>
            </div>

            {/* Enhanced AI Business Intelligence Dashboard */}
            <ScaleIn delay={1.2}>
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="absolute -inset-4">
                  <div 
                    className="w-full h-full rounded-3xl rotate-2 opacity-70"
                    style={{ backgroundColor: currentTheme.colors.primary + '20' }}
                  ></div>
                </div>

                <div className="relative z-10 bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">AI Business Intelligence</h3>
                      <p className="text-white/60 text-sm">Live Analytics Dashboard</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-xs font-medium">Live</span>
                    </div>
                  </div>

                  {/* Dashboard Cards matching the exact design from the image */}
                  <DashboardCards />
                </div>

                <div 
                  className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-20 blur-xl"
                  style={{ background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.accent})` }}
                ></div>
              </motion.div>
            </ScaleIn>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;