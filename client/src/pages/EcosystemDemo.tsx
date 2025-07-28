
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ModuleSelector } from '@/components/ecosystem/ModuleSelector';
import { ComparisonMatrix } from '@/components/ecosystem/ComparisonMatrix';
import {
  ArrowLeft,
  Brain,
  Network,
  Search,
  Users,
  TrendingUp,
  Building,
  Sparkles,
  CheckCircle2,
  Star,
  Globe,
  Shield,
  Zap,
  BarChart3,
  Target,
  Play,
  BookOpen,
  MessageCircle,
  Download
} from 'lucide-react';

const ecosystemStats = [
  { label: 'Total Active Users', value: '17,000+', icon: Users, color: 'text-blue-400' },
  { label: 'Startups Analyzed', value: '10,500+', icon: Brain, color: 'text-green-400' },
  { label: 'Investment Facilitated', value: '$127M+', icon: TrendingUp, color: 'text-purple-400' },
  { label: 'African Countries', value: '25+', icon: Globe, color: 'text-orange-400' },
  { label: 'Success Rate', value: '89%', icon: Target, color: 'text-cyan-400' },
  { label: 'Platform Uptime', value: '99.9%', icon: Shield, color: 'text-green-400' },
];

const moduleHighlights = [
  {
    id: 'ventures',
    title: 'Business Intelligence Revolution',
    description: 'AI-powered analysis that turns complex business plans into actionable insights',
    stats: { users: '10K+', satisfaction: '4.9/5', funding: '$85M+' },
    features: ['AI Business Plan Analysis', 'Investor Readiness Scoring', 'Market Intelligence'],
    gradient: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'xchange',
    title: 'Capital Access Innovation',
    description: 'Blockchain-powered platform democratizing investment opportunities',
    stats: { users: '5K+', satisfaction: '4.8/5', funding: '$42M+' },
    features: ['Tokenized Equity', 'Smart Matching', 'Global Investor Network'],
    gradient: 'from-purple-600 to-pink-600'
  },
  {
    id: 'sourcing',
    title: 'Supply Chain Optimization',
    description: 'Intelligent procurement platform connecting African suppliers globally',
    stats: { users: '2K+', satisfaction: '4.7/5', funding: 'Beta' },
    features: ['AI Supplier Matching', 'Performance Analytics', 'Risk Intelligence'],
    gradient: 'from-violet-600 to-purple-600'
  }
];

const testimonials = [
  {
    quote: "The Iterativ ecosystem transformed our entire approach to business development. From plan analysis to funding, it's been incredible.",
    author: "Amara Okafor",
    company: "TechNova Nigeria",
    role: "CEO & Founder",
    module: "Full Ecosystem",
    image: "/api/placeholder/60/60",
    rating: 5
  },
  {
    quote: "As an investor, having all three modules integrated gives me unprecedented insight into the African startup landscape.",
    author: "Jean-Baptiste Mukasa",
    company: "East Africa Ventures",
    role: "Managing Partner",
    module: "Investor Focus",
    image: "/api/placeholder/60/60",
    rating: 5
  },
  {
    quote: "The beta version of Sourcing already shows incredible potential. Can't wait for the full launch!",
    author: "Fatima Al-Rashid",
    company: "Cairo Manufacturing",
    role: "Procurement Director",
    module: "Enterprise User",
    image: "/api/placeholder/60/60",
    rating: 5
  }
];

export default function EcosystemDemo() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedModule, setSelectedModule] = useState<string>('ventures');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
      {/* Enhanced Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Ecosystem Demo
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-900/30 text-green-400 border-green-800/50">
                <Sparkles className="h-3 w-3 mr-1" />
                Interactive Demo
              </Badge>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Full Access
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                The Complete African
              </span>
              <br />
              <span className="text-white">Startup Ecosystem</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Explore how our three integrated platforms work together to empower entrepreneurs, 
              connect investors, and optimize business operations across Africa.
            </p>
            
            {/* Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
            >
              {ecosystemStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300"
                >
                  <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
                  <div className="text-lg font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/5 backdrop-blur-sm border border-white/10">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="modules"
                className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
              >
                <Brain className="h-4 w-4 mr-2" />
                Modules
              </TabsTrigger>
              <TabsTrigger 
                value="comparison"
                className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
              >
                <Target className="h-4 w-4 mr-2" />
                Compare
              </TabsTrigger>
              <TabsTrigger 
                value="success"
                className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
              >
                <Star className="h-4 w-4 mr-2" />
                Success Stories
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                {/* Module Highlights */}
                <div className="grid md:grid-cols-3 gap-8">
                  {moduleHighlights.map((module, index) => (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                      className="group"
                    >
                      <Card className="h-full bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                        <CardContent className="p-6">
                          <div className={`h-2 w-full bg-gradient-to-r ${module.gradient} rounded-full mb-6`} />
                          
                          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
                            {module.title}
                          </h3>
                          <p className="text-slate-400 mb-6 leading-relaxed">
                            {module.description}
                          </p>
                          
                          {/* Module Stats */}
                          <div className="grid grid-cols-3 gap-3 mb-6">
                            <div className="text-center">
                              <div className="text-white font-semibold">{module.stats.users}</div>
                              <div className="text-slate-400 text-xs">Users</div>
                            </div>
                            <div className="text-center">
                              <div className="text-yellow-400 font-semibold">{module.stats.satisfaction}</div>
                              <div className="text-slate-400 text-xs">Rating</div>
                            </div>
                            <div className="text-center">
                              <div className="text-green-400 font-semibold">{module.stats.funding}</div>
                              <div className="text-slate-400 text-xs">Funding</div>
                            </div>
                          </div>
                          
                          {/* Key Features */}
                          <ul className="space-y-2 mb-6">
                            {module.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center text-white/80 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          
                          <Button 
                            className={`w-full bg-gradient-to-r ${module.gradient} hover:opacity-90`}
                            onClick={() => {
                              setSelectedModule(module.id);
                              setActiveTab('modules');
                            }}
                          >
                            Explore Module
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Integration Benefits */}
                <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center gap-2">
                      <Network className="h-6 w-6 text-cyan-400" />
                      Ecosystem Integration Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">For Startups</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start text-white/80">
                            <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                            <span>Seamless journey from business planning to funding to scaling</span>
                          </li>
                          <li className="flex items-start text-white/80">
                            <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                            <span>Unified data and insights across all business functions</span>
                          </li>
                          <li className="flex items-start text-white/80">
                            <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                            <span>Access to comprehensive African market intelligence</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">For Investors</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start text-white/80">
                            <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                            <span>Complete startup lifecycle visibility and tracking</span>
                          </li>
                          <li className="flex items-start text-white/80">
                            <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                            <span>AI-powered due diligence and risk assessment</span>
                          </li>
                          <li className="flex items-start text-white/80">
                            <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                            <span>Portfolio optimization and performance analytics</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Modules Tab */}
            <TabsContent value="modules" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Explore Our Integrated Modules
                  </h3>
                  <p className="text-slate-300 max-w-2xl mx-auto">
                    Each module is designed to work independently or as part of the complete ecosystem, 
                    providing maximum flexibility for your specific needs.
                  </p>
                </div>
                
                <ModuleSelector 
                  selectedModule={selectedModule}
                  onModuleSelect={setSelectedModule}
                />
              </motion.div>
            </TabsContent>

            {/* Comparison Tab */}
            <TabsContent value="comparison" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <ComparisonMatrix />
              </motion.div>
            </TabsContent>

            {/* Success Stories Tab */}
            <TabsContent value="success" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                {/* Featured Testimonial */}
                <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 backdrop-blur-sm border-white/10">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-4">
                        Success Stories from Our Community
                      </h3>
                      <p className="text-slate-300 max-w-2xl mx-auto">
                        Real entrepreneurs sharing their transformation journeys using the Iterativ ecosystem.
                      </p>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentTestimonial}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto"
                      >
                        <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm">
                          <div className="flex justify-center mb-6">
                            {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                              <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          
                          <blockquote className="text-xl text-white text-center mb-8 italic leading-relaxed">
                            "{testimonials[currentTestimonial].quote}"
                          </blockquote>
                          
                          <div className="flex items-center justify-center space-x-6">
                            <img
                              src={testimonials[currentTestimonial].image}
                              alt={testimonials[currentTestimonial].author}
                              className="w-16 h-16 rounded-full border-2 border-white/20"
                            />
                            <div className="text-center">
                              <div className="font-semibold text-white text-lg">
                                {testimonials[currentTestimonial].author}
                              </div>
                              <div className="text-slate-300">
                                {testimonials[currentTestimonial].role}
                              </div>
                              <div className="text-slate-400 text-sm">
                                {testimonials[currentTestimonial].company}
                              </div>
                              <Badge className="mt-2 bg-blue-900/30 text-blue-400 border-blue-800/50 text-xs">
                                {testimonials[currentTestimonial].module}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* Testimonial Navigation */}
                    <div className="flex justify-center space-x-2 mt-8">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonial(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentTestimonial 
                              ? 'bg-blue-500 scale-125' 
                              : 'bg-white/30 hover:bg-white/50'
                          }`}
                          aria-label={`View testimonial ${index + 1}`}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Impact Metrics */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Average Funding Increase', value: '+156%', icon: TrendingUp, color: 'text-green-400' },
                    { label: 'Time to Investment', value: '-6 months', icon: Clock, color: 'text-blue-400' },
                    { label: 'Success Rate Improvement', value: '+89%', icon: Target, color: 'text-purple-400' },
                    { label: 'Cost Reduction', value: '-40%', icon: BarChart3, color: 'text-orange-400' }
                  ].map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                        <CardContent className="p-6 text-center">
                          <metric.icon className={`h-8 w-8 ${metric.color} mx-auto mb-4`} />
                          <div className="text-2xl font-bold text-white mb-2">{metric.value}</div>
                          <div className="text-slate-400 text-sm">{metric.label}</div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16 py-16 border-t border-white/10"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Startup Journey?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful entrepreneurs using the Iterativ ecosystem 
            to build, fund, and scale their businesses across Africa.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Start Your Free Trial
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Schedule Demo
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              14-day free trial
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-400" />
              Enterprise security
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-400" />
              24/7 support
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-orange-400" />
              25+ African markets
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
