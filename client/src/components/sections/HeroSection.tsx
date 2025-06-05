import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { FadeIn, ScaleIn } from '@/components/ui/animated';
import { useTheme } from '@/components/ui/sector-theme-selector';
import { Link } from 'wouter';
import { DemoModal } from '@/components/modals/DemoModal';

const HeroSection = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const { currentTheme } = useTheme();

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
                  <span className="font-medium text-sm">AI-Powered Business Planning</span>
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
                    Democratizing Financial Intelligence
                  </span>
                  <br />
                  <span className="text-white/90">Across Africa</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.6}>
                <p className="text-xl text-gray-100 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed drop-shadow-lg">
                  Empowering businesses and entrepreneurs with AI-driven financial solutions and capital access
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

            {/* Dashboard Visualization */}
            <ScaleIn delay={1.2}>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <div className="absolute -inset-4">
                  <div 
                    className="w-full h-full rounded-3xl rotate-2 opacity-70"
                    style={{ backgroundColor: currentTheme.colors.primary + '20' }}
                  ></div>
                </div>

                <div className="relative z-10 w-full aspect-video bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200">
                  {/* Dashboard Header */}
                  <div 
                    className="border-b px-5 py-4 flex justify-between items-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${currentTheme.colors.primary}15, ${currentTheme.colors.accent}10)`,
                      borderColor: currentTheme.colors.primary + '20'
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.accent})` }}
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">AI Business Intelligence</h3>
                        <p className="text-xs text-gray-500">Real-time Analytics</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm border"
                        style={{ 
                          backgroundColor: currentTheme.colors.primary + '10',
                          borderColor: currentTheme.colors.primary + '20'
                        }}
                      >
                        <svg className="h-4 w-4" style={{ color: currentTheme.colors.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </div>
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm border"
                        style={{ 
                          backgroundColor: currentTheme.colors.accent + '10',
                          borderColor: currentTheme.colors.accent + '20'
                        }}
                      >
                        <svg className="h-4 w-4" style={{ color: currentTheme.colors.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="flex-1 p-5 grid grid-cols-3 gap-4">
                    {/* Metrics */}
                    <div className="col-span-3 grid grid-cols-3 gap-3 mb-4">
                      <div 
                        className="dashboard-stat rounded-xl p-3 border shadow-sm"
                        style={{ 
                          backgroundColor: currentTheme.colors.primary + '10',
                          borderColor: currentTheme.colors.primary + '30'
                        }}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          <svg className="h-3 w-3" style={{ color: currentTheme.colors.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <div className="text-xs font-medium" style={{ color: currentTheme.colors.primary }}>Startup Plans</div>
                        </div>
                        <div className="text-xl font-bold" style={{ color: currentTheme.colors.primary }}>24</div>
                      </div>
                      <div 
                        className="dashboard-stat rounded-xl p-3 border shadow-sm"
                        style={{ 
                          backgroundColor: currentTheme.colors.accent + '10',
                          borderColor: currentTheme.colors.accent + '30'
                        }}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          <svg className="h-3 w-3" style={{ color: currentTheme.colors.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                          <div className="text-xs font-medium" style={{ color: currentTheme.colors.accent }}>Readiness Score</div>
                        </div>
                        <div className="text-xl font-bold" style={{ color: currentTheme.colors.accent }}>92<span className="text-sm font-normal">/100</span></div>
                      </div>
                      <div 
                        className="dashboard-stat rounded-xl p-3 border shadow-sm"
                        style={{ 
                          backgroundColor: currentTheme.colors.secondary + '10',
                          borderColor: currentTheme.colors.secondary + '30'
                        }}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          <svg className="h-3 w-3" style={{ color: currentTheme.colors.secondary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          <div className="text-xs font-medium" style={{ color: currentTheme.colors.secondary }}>Funding Potential</div>
                        </div>
                        <div className="text-xl font-bold" style={{ color: currentTheme.colors.secondary }}>$2.1M</div>
                      </div>
                    </div>

                    {/* Chart */}
                    <div className="col-span-2 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-sm font-semibold text-gray-700">Capital Access Trends</h4>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.colors.primary }}></div>
                          <span className="text-xs text-gray-500">Growth</span>
                        </div>
                      </div>
                      <div className="h-24 flex items-end justify-center space-x-1">
                        {[45, 65, 38, 85, 72, 80, 92].map((height, index) => (
                          <motion.div
                            key={index}
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ 
                              duration: 0.8,
                              delay: 1.5 + (index * 0.1),
                              ease: "easeOut"
                            }}
                            className="w-6 rounded-t-md shadow-sm"
                            style={{ 
                              background: `linear-gradient(to top, ${currentTheme.colors.primary}80, ${currentTheme.colors.accent})` 
                            }}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>Q1</span>
                        <span>Q2</span>
                        <span>Q3</span>
                        <span>Q4</span>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="col-span-1 p-4 bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col items-center justify-center">
                      <div className="text-xs font-medium text-gray-600 mb-2">AI Score</div>
                      <div className="relative">
                        <motion.div
                          initial={{ scale: 0, rotate: 0 }}
                          animate={{ scale: 1, rotate: 360 }}
                          transition={{ 
                            duration: 1.2,
                            delay: 1.8,
                            ease: "easeOut"
                          }}
                          className="w-20 h-20 rounded-full border-4 flex items-center justify-center shadow-lg"
                          style={{ 
                            borderColor: currentTheme.colors.primary + '30',
                            background: `linear-gradient(135deg, ${currentTheme.colors.primary}10, ${currentTheme.colors.accent}05)`
                          }}
                        >
                          <div 
                            className="text-lg font-bold"
                            style={{ color: currentTheme.colors.primary }}
                          >92</div>
                        </motion.div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ 
                            duration: 0.6,
                            delay: 2.5,
                            ease: "easeOut"
                          }}
                          className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs"
                          style={{ backgroundColor: currentTheme.colors.accent }}
                        >
                          ✓
                        </motion.div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Excellent</div>
                    </div>
                  </div>
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