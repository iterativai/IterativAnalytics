
import { useState } from 'react';
import React from 'react';
import { ArrowRight, BarChart3, CheckCircle2, Rocket, Sparkles, Star, TrendingUp, Zap, Brain, Coins } from 'lucide-react';
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
      icon: <Rocket className="h-6 w-6 text-cyan-400" />,
      title: "Iterativ Startups",
      description: "Founder tools, AI copilots, milestone tracking, and startup readiness scoring."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-blue-400" />,
      title: "Iterativ Xchange", 
      description: "Investor dashboards, deal flow analytics, and tokenized capital access."
    },
    {
      icon: <Zap className="h-6 w-6 text-purple-400" />,
      title: "Iterativ AI Core",
      description: "Bias auditing, benchmarking, and predictive analytics — privacy-first and compliance-ready."
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
      <div id="hero" className={isScrolled ? "pt-16" : ""}>
        <Navbar />

        <HeroSection />
      </div>

      {/* Floating Urgency Banners */}
      <FloatingUrgencyBanner />
      <CountdownBanner />

      {/* What Is Iterativ Section */}
      <div id="about">
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Transforming Venture Intelligence & Inclusion
                  </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Iterativ Analytics is a unified, AI-native platform helping African startups launch, grow, and raise capital — smarter, faster, and with radical transparency.
                </p>
              </div>
            </FadeIn>

            <Stagger staggerDelay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    variant="glass"
                  />
                ))}
              </div>
            </Stagger>
          </div>
        </section>
      </div>

      {/* Built for Different Users */}
      <div id="solutions">
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
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-gray-700/50 inline-flex">
                  <button
                    onClick={() => setActiveFeatureTab('founders')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      activeFeatureTab === 'founders'
                        ? 'bg-gradient-to-r from-cyan-600/50 to-blue-700/50 text-white shadow-md border border-cyan-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    For Founders
                  </button>
                  <button
                    onClick={() => setActiveFeatureTab('investors')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      activeFeatureTab === 'investors'
                        ? 'bg-gradient-to-r from-cyan-600/50 to-blue-700/50 text-white shadow-md border border-cyan-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    For Investors
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
              ) : (
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
              )}

              <FadeIn delay={0.4}>
                <div className="relative">
                  <div className="bg-gray-800/30 backdrop-blur rounded-2xl border border-gray-700/50 overflow-hidden">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6">
                      <div className="aspect-video bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-cyan-400 text-lg mb-2">
                            {activeFeatureTab === 'founders' ? 'Founder Dashboard' : 'Investor Dashboard'}
                          </div>
                          <div className="text-gray-400">Interactive metrics visualization</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </div>

      {/* Why Iterativ Comparison Table */}
      <div id="features">
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
                  Iterativ Analytics
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
            © 2025 Iterativ Analytics. All rights reserved.
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
