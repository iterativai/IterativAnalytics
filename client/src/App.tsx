import { useState } from 'react';
import React from 'react';
import { ArrowRight, BarChart3, CheckCircle2, Rocket, Sparkles, Star, TrendingUp, Zap, Brain, Coins, GitBranch } from 'lucide-react';
import { RoleBasedDashboards } from '@/components/ui/role-based-dashboards';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from '@/components/layout/Navbar';
import { FeatureCard } from '@/components/ui/feature-card';

import { FadeIn, ScaleIn, SlideUp, SlideIn, Stagger, HoverScale } from '@/components/ui/animated';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { StickyHeader } from '@/components/ui/sticky-header';
import { ScrollProgress } from '@/components/ui/progress-indicator';
import { Chatbot } from '@/components/ui/chatbot';
import { FundingCalculator } from '@/components/ui/interactive-calculator';
import { RecentActivityFeed } from '@/components/ui/urgency-cues';
import { ScrollDownIndicator, SectionNavigationDots } from '@/components/ui/scroll-indicators';
import { FloatingUrgencyBanner, CountdownBanner } from '@/components/ui/floating-banner';
import { DarkModeToggle, ParallaxBackground, ScrollIndicator, EnhancedButton, RevealOnScroll, Interactive3DCard, FloatingActionBubble } from '@/components/ui/advanced-ui-features';
import { SectorThemeProvider, ThemeSelectorButton, ThemeSelectionModal, useTheme } from '@/components/ui/sector-theme-selector';
import { ThemeProvider } from '@/context/ThemeContext';
import HeroSection from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt';
import { PWAUpdatePrompt } from '@/components/PWAUpdatePrompt';
import { OfflineIndicator } from '@/components/OfflineIndicator';

function AppContent() {
  const [activeFeatureTab, setActiveFeatureTab] = useState('founders');
  const [activeTab, setActiveTab] = useState('startups');
  const [email, setEmail] = useState('');
  const isScrolled = useScrollPosition();
  const { currentTheme } = useTheme();

  const handleJoinWaitlist = () => {
    if (email) {
      alert(`Thank you! ${email} has been added to our waitlist.`);
      setEmail('');
    }
  };

  const features = [
    {
      icon: <Brain className="h-6 w-6 text-cyan-400" />,
      title: "Iterativ Startups",
      description: "AI-powered business intelligence & planning with CoFounder AI integration, real-time financial modeling, and investor readiness scoring."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-blue-400" />,
      title: "Iterativ Xchange", 
      description: "Blockchain-powered capital markets with equity tokenization, African Equity Exchange (AEX), and integrated supply chain finance solutions."
    },
    {
      icon: <GitBranch className="h-6 w-6 text-purple-400" />,
      title: "Iterativ Sourcing",
      description: "Intelligent supply chain management with AI-powered supplier matching, procurement optimization, and performance analytics."
    }
  ];

  const comparisonFeatures = [
    'AI-Native, Multi-LLM Engine',
    'Africa-Focused & Localized',
    'DEI, Risk, and Bias Audits',
    'Tokenized Capital Access',
    'Startup Benchmarking Engine',
    'GDPR/POPIA/AI Act Aligned'
  ];

  const testimonials = [
    {
      quote: "Iterativ could change how capital finds underrepresented founders. It's not just analytics — it's infrastructure.",
      author: "VC Partner, Nairobi"
    },
    {
      quote: "The Startup ID Score gave our team a way to prove we were fundable — even before revenue.",
      author: "Healthtech Founder, Lagos"
    },
    {
      quote: "DEI + Fintech + Real Data. Finally.",
      author: "Accelerator Director, Cape Town"
    }
  ];

  // Beta launch countdown date (30 days from now)
  const betaLaunchDate = new Date();
  betaLaunchDate.setDate(betaLaunchDate.getDate() + 30);

  // Placeholder function for rendering the enhanced dashboard
  const renderEnhancedDashboard = () => {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Enhanced Interactive Dashboard Preview
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Explore the power of our interactive dashboards with real-time data visualization.
              </p>
            </div>
          </FadeIn>
          {/* Add your enhanced dashboard component here */}
          <p className="text-center text-gray-400">
            [Enhanced Dashboard Component Placeholder]
          </p>
        </div>
      </section>
    );
  };

  return (
    <div 
      className="min-h-screen text-gray-100 theme-animated-bg"
      style={{
        background: `linear-gradient(135deg, ${currentTheme.colors.background})`
      }}
    >
      <ParallaxBackground />
      <ScrollProgress />
      <StickyHeader />
      <DarkModeToggle />
      <ThemeSelectorButton />
      <ThemeSelectionModal />
      <ScrollIndicator />
      <SectionNavigationDots />
      <FloatingActionBubble />
      <PWAInstallPrompt />
      <PWAUpdatePrompt />
      <OfflineIndicator />
      <div id="hero" className={isScrolled ? "pt-16" : ""}>
        <Navbar />

        <HeroSection />
      </div>

      {/* Floating Urgency Banners */}
      <FloatingUrgencyBanner />
      <CountdownBanner />

      {/* About Section */}
      <AboutSection />

      {/* Solutions Section */}
      <div id="solutions">
        <section className="py-24">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">
                    Our Solutions
                  </span>
                </h2>
                <p className="text-xl text-white/80 max-w-3xl mx-auto">
                  A comprehensive ecosystem of AI-powered tools designed to transform your business and unlock capital opportunities.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              <FadeIn delay={0.2}>
                <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-xl rounded-3xl p-8 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="bg-purple-600 rounded-xl p-3 mr-4">
                      <Rocket className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Iterativ Startups</h3>
                  </div>

                  <p className="text-white/70 mb-6 text-lg">
                    AI-powered business intelligence & planning with CoFounder AI integration, multi-format plan upload, real-time financial modeling, and investor readiness scoring for African entrepreneurs.
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-white/80">
                      <CheckCircle2 className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
                      <span>Template business plan development</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <CheckCircle2 className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
                      <span>AI-powered business plan evaluation</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <CheckCircle2 className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
                      <span>Startup and SME valuations</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <CheckCircle2 className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
                      <span>Application selection automation</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                    Explore Startup Solutions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 backdrop-blur-xl rounded-3xl p-8 border border-pink-400/30 hover:border-pink-400/50 transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="bg-pink-600 rounded-xl p-3 mr-4">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Iterativ Xchange</h3>
                  </div>

                  <p className="text-white/70 mb-6 text-lg">
                    Blockchain-powered capital markets with equity tokenization, African Equity Exchange (AEX), crowdfunding infrastructure, secondary market trading, and integrated supply chain finance solutions.
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-white/80">
                      <CheckCircle2 className="h-5 w-5 text-pink-400 mr-3 flex-shrink-0" />
                      <span>Equity tokenization platform</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <CheckCircle2 className="h-5 w-5 text-pink-400 mr-3 flex-shrink-0" />
                      <span>African Equity Exchange (AEX)</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <CheckCircle2 className="h-5 w-5 text-pink-400 mr-3 flex-shrink-0" />
                      <span>Cross-border payment solutions</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <CheckCircle2 className="h-5 w-5 text-pink-400 mr-3 flex-shrink-0" />
                      <span>Supply chain finance marketplace</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-500 hover:to-red-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-pink-500/25 transition-all duration-300">
                    Discover Xchange Platform
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </FadeIn>

              <FadeIn delay={0.6}>
                <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 backdrop-blur-xl rounded-3xl p-8 border border-green-400/30 hover:border-green-400/50 transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="bg-green-600 rounded-xl p-3 mr-4">
                      <GitBranch className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Iterativ Sourcing</h3>
                  </div>

                  <p className="text-white/70 mb-6 text-lg">
                    Intelligent supply chain management platform with AI-powered supplier matching, procurement optimization, performance analytics, and automated payment management.
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-white/80">
                      <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>Smart supplier matching</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>Procurement workflow automation</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>Performance analytics & scoring</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>Risk intelligence & verification</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-green-500/25 transition-all duration-300">
                    Explore Sourcing Platform
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </div>

      {/* Built for the Entire Ecosystem */}
      <div id="features">
        <section className="py-20 bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Built for the Entire Ecosystem
                  </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Discover our comprehensive suite of financial intelligence tools and capital access solutions designed specifically for African businesses.
                </p>
              </div>
            </FadeIn>

            {/* Tab Navigation */}
            <FadeIn delay={0.2}>
              <div className="flex justify-center mb-8">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-gray-700/50 inline-flex flex-wrap">
                  <button
                    onClick={() => setActiveFeatureTab('founders')}
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 text-sm ${
                      activeFeatureTab === 'founders'
                        ? 'bg-gradient-to-r from-cyan-600/50 to-blue-700/50 text-white shadow-md border border-cyan-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    For Founders
                  </button>
                  <button
                    onClick={() => setActiveFeatureTab('investors')}
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 text-sm ${
                      activeFeatureTab === 'investors'
                        ? 'bg-gradient-to-r from-cyan-600/50 to-blue-700/50 text-white shadow-md border border-cyan-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    For Investors
                  </button>
                  <button
                    onClick={() => setActiveFeatureTab('partners')}
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 text-sm ${
                      activeFeatureTab === 'partners'
                        ? 'bg-gradient-to-r from-cyan-600/50 to-blue-700/50 text-white shadow-md border border-cyan-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    For Partners
                  </button>
                  <button
                    onClick={() => setActiveFeatureTab('lenders')}
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 text-sm ${
                      activeFeatureTab === 'lenders'
                        ? 'bg-gradient-to-r from-cyan-600/50 to-blue-700/50 text-white shadow-md border border-cyan-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    For Lenders
                  </button>
                </div>
              </div>
            </FadeIn>

            {/* Tab Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {activeFeatureTab === 'founders' ? (
                <FadeIn delay={0.3}>
                  <div className="glass-panel rounded-xl p-8 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="bg-cyan-900/30 rounded-xl p-4 w-14 h-14 flex items-center justify-center mr-3">
                        <Brain className="h-8 w-8 text-cyan-400" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white">Unlock Your Startup Potential</h3>
                    </div>
                    <p className="text-gray-300 mb-6">
                      Enhance your financial intelligence and funding readiness with our comprehensive planning tools.
                    </p>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-cyan-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-white">Venture Readiness Scoring</h4>
                          <p className="text-sm text-gray-400">Get comprehensive scores across key startup dimensions</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-cyan-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-white">AI Co-Founders & Pitch Copilots</h4>
                          <p className="text-sm text-gray-400">Get AI assistance for business planning and pitch development</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-cyan-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-white">Startup ID Score™</h4>
                          <p className="text-sm text-gray-400">Portable, verified startup credentials for all funding rounds</p>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                      Start Your Readiness Score
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </FadeIn>
              ) : activeFeatureTab === 'investors' ? (
                <FadeIn delay={0.3}>
                  <div className="glass-panel rounded-xl p-8 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-900/30 rounded-xl p-4 w-14 h-14 flex items-center justify-center mr-3">
                        <Coins className="h-8 w-8 text-blue-400" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white">Find, Filter & Fund Smarter</h3>
                    </div>
                    <p className="text-gray-300 mb-6">
                      Access modern funding solutions and capital through our innovative platform.
                    </p>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-white">Predictive Deal Discovery</h4>
                          <p className="text-sm text-gray-400">AI-powered startup identification and screening</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-white">DEI & Risk Benchmarking</h4>
                          <p className="text-sm text-gray-400">Comprehensive diversity and risk assessment tools</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-white">Tokenized Investment Pools</h4>
                          <p className="text-sm text-gray-400">Modern capital access through blockchain infrastructure</p>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                      Request Investor Access
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </FadeIn>
              ) : activeFeatureTab === 'partners' ? (
                <FadeIn delay={0.3}>
                  <div className="glass-panel rounded-xl p-8 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-900/30 rounded-xl p-4 w-14 h-14 flex items-center justify-center mr-3">
                        <Sparkles className="h-8 w-8 text-purple-400" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white">Scale Your Impact</h3>
                    </div>
                    <p className="text-gray-300 mb-6">
                      Manage cohorts, track startup progress, and deliver support at scale with AI-enhanced tools.
                    </p>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-white">Cohort Management</h4>
                          <p className="text-sm text-gray-400">Streamline program administration and participant tracking</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-white">Progress Analytics</h4>
                          <p className="text-sm text-gray-400">Monitor startup development with real-time metrics</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-white">Scalable Support Delivery</h4>
                          <p className="text-sm text-gray-400">Provide personalized guidance to multiple ventures simultaneously</p>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-700 hover:from-purple-500 hover:to-pink-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                      Partner With Us
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </FadeIn>
              ) : (
                <FadeIn delay={0.3}>
                  <div className="glass-panel rounded-xl p-8 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-900/30 rounded-xl p-4 w-14 h-14 flex items-center justify-center mr-3">
                        <BarChart3 className="h-8 w-8 text-green-400" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white">Smart Lending Decisions</h3>
                    </div>
                    <p className="text-gray-300 mb-6">
                      Assess business viability, analyze risk profiles, and provide funding recommendations using standardized, AI-enhanced documentation.
                    </p>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-white">Business Viability Assessment</h4>
                          <p className="text-sm text-gray-400">Comprehensive evaluation of business model sustainability</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-white">Risk Profile Analysis</h4>
                          <p className="text-sm text-gray-400">AI-powered risk scoring and mitigation recommendations</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-white">Standardized Documentation</h4>
                          <p className="text-sm text-gray-400">Consistent, AI-enhanced business documentation for better decisions</p>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-teal-700 hover:from-green-500 hover:to-teal-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-green-500/25 transition-all duration-300">
                      Explore Lending Tools
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </FadeIn>
              )}

              <FadeIn delay={0.4}>
                <div className="relative">
                  <div className="bg-gray-800/30 backdrop-blur rounded-2xl border border-gray-700/50 overflow-hidden">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6">
                      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="text-cyan-400 text-lg font-semibold mb-1">
                              {activeFeatureTab === 'founders' ? 'Founder Dashboard' : 
                               activeFeatureTab === 'investors' ? 'Investor Dashboard' :
                               activeFeatureTab === 'partners' ? 'Partner Dashboard' : 'Lender Dashboard'}
                            </h3>
                            <p className="text-gray-400 text-sm">Real-time business intelligence</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-green-400 text-xs font-medium">Live</span>
                          </div>
                        </div>

                        {/* Role-Based Interactive Dashboard */}
                        <div className="min-h-[400px]">
                          {activeFeatureTab === 'founders' && <RoleBasedDashboards.FounderDashboard />}
                          {activeFeatureTab === 'investors' && <RoleBasedDashboards.InvestorDashboard />}
                          {activeFeatureTab === 'partners' && <RoleBasedDashboards.PartnerDashboard />}
                          {activeFeatureTab === 'lenders' && <RoleBasedDashboards.LenderDashboard />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Why Iterativ Comparison Table */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Why Iterativ?
                  </span>
                </h2>
                <p className="text-xl text-gray-300">
                  "The venture ecosystem needs new infrastructure. We built it."
                </p>
              </div>
            </FadeIn>

            <SlideUp delay={0.2}>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20">
                      <th className="px-6 py-4 text-left font-semibold text-gray-300">Feature</th>
                      <th className="px-6 py-4 text-center font-semibold text-cyan-400">Iterativ</th>
                      <th className="px-6 py-4 text-center font-semibold text-gray-400">Traditional Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((feature, index) => (
                      <tr key={index} className="hover:bg-gray-800/50 transition-colors border-b border-gray-700/50 last:border-0">
                        <td className="px-6 py-4 text-gray-300">{feature}</td>
                        <td className="px-6 py-4 text-center">
                          <CheckCircle2 className="h-6 w-6 text-green-500 mx-auto" />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="h-6 w-6 mx-auto bg-red-500/10 rounded-full flex items-center justify-center">
                            <span className="text-red-500 text-sm">✕</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SlideUp>
          </div>
        </section>

        {/* Enhanced Interactive Dashboard Preview */}
        {renderEnhancedDashboard()}

        {/* AI-Native Comparison Section */}
      </div>

      {/* Testimonials */}
      <div id="testimonials">
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/30 backdrop-blur-sm border-t border-gray-700/30">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    What People Say
                  </span>
                </h2>
              </div>
            </FadeIn>

            <Stagger staggerDelay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="bg-gray-800/30 backdrop-blur border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-300 mb-4 italic">
                        "{testimonial.quote}"
                      </p>
                      <div className="text-sm text-gray-400 font-medium">— {testimonial.author}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Stagger>
          </div>
        </section>
      </div>

      {/* Join the Waitlist CTA */}
      <div id="waitlist">
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-800/30 to-blue-900/30 backdrop-blur">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Be First to Build the Future of Venture
              </h2>
              <p className="text-xl text-cyan-100 mb-8">
                Join founders, investors, and ecosystem partners shaping the next generation of African startups.
              </p>
            </FadeIn>

            <ScaleIn delay={0.2}>
              <div className="bg-gray-900/50 backdrop-blur rounded-2xl border border-cyan-500/30 p-8 max-w-2xl mx-auto">
                <div className="mb-6">
                  <div className="text-center mb-4">
                    <h3 className="text-red-400 font-semibold text-lg mb-2">⏰ LIMITED BETA LAUNCH</h3>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="bg-white/90 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-red-600">{Math.floor((betaLaunchDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))}</div>
                      <div className="text-xs text-red-500 font-medium">DAYS</div>
                    </div>
                    <div className="bg-white/90 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-red-600">{Math.floor(((betaLaunchDate.getTime() - Date.now()) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}</div>
                      <div className="text-xs text-red-500 font-medium">HOURS</div>
                    </div>
                    <div className="bg-white/90 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-red-600">{Math.floor(((betaLaunchDate.getTime() - Date.now()) % (1000 * 60 * 60)) / (1000 * 60))}</div>
                      <div className="text-xs text-red-500 font-medium">MINUTES</div>
                    </div>
                    <div className="bg-white/90 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-red-600">{Math.floor(((betaLaunchDate.getTime() - Date.now()) % (1000 * 60)) / 1000)}</div>
                      <div className="text-xs text-red-500 font-medium">SECONDS</div>
                    </div>
                  </div>
                  <p className="text-center text-red-300 text-sm mb-4">Secure your spot in our exclusive beta program before it closes</p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  <Badge className="bg-cyan-900/30 text-cyan-400 border border-cyan-800/50">✅ Founders</Badge>
                  <Badge className="bg-blue-900/30 text-blue-400 border border-blue-800/50">✅ Investors</Badge>
                  <Badge className="bg-purple-900/30 text-purple-400 border border-purple-800/50">✅ Partners</Badge>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-gray-800/50 border border-gray-700/50 text-white rounded-lg px-4 py-3 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent backdrop-blur-sm"
                  />
                  <Button 
                    onClick={handleJoinWaitlist}
                    className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white px-8 py-3 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  >
                    Join Now
                  </Button>
                </div>
              </div>
            </ScaleIn>
          </div>
        </section>
      </div>

      {/* Interactive Calculator Section */}
      <div id="calculator">
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-850 to-gray-900">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Calculate Your Funding Potential
                  </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Get an instant estimate of your startup's funding potential using our AI-powered calculator
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <SlideIn direction="left">
                <FundingCalculator />
              </SlideIn>

              <SlideIn direction="right" delay={0.2}>
                <RecentActivityFeed />
              </SlideIn>
            </div>
          </div>
        </section>
      </div>

      {/* Chatbot */}
      <Chatbot />

      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg p-2">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  IterativAnalytics
                </span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Democratizing financial intelligence and inclusive capital access for African startups.
              </p>
              <div className="text-sm text-gray-500">
                📍 HQ: Cape Town / Nairobi / Remote<br />
                📬 contact@iterativ.africa
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-200 mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-cyan-400 transition-colors">About</a></li>
                <li><a href="#deck" className="hover:text-cyan-400 transition-colors">Deck</a></li>
                <li><a href="#privacy" className="hover:text-cyan-400 transition-colors">Privacy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-200 mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#linkedin" className="hover:text-cyan-400 transition-colors">LinkedIn</a></li>
                <li><a href="#github" className="hover:text-cyan-400 transition-colors">GitHub</a></li>
                <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            © 2025 IterativAnalytics. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SectorThemeProvider>
        <AppContent />
      </SectorThemeProvider>
    </ThemeProvider>
  );
}