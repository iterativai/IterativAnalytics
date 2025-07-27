
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Package, 
  ArrowRight, 
  CheckCircle,
  Clock,
  Sparkles,
  Globe,
  TrendingUp,
  Star,
  Play,
  Shield,
  Zap,
  Target
} from 'lucide-react';
import { 
  GlassCard,
  EnhancedButton,
  EnhancedBadge,
  RevealOnScroll,
  Interactive3DCard,
  StaggerContainer,
  GradientText,
  ParticleBackground
} from '@/components/ui/enhanced-visual-components';

// Enhanced Module Card Component
interface ModuleCardProps {
  module: any;
  isSelected: boolean;
  onSelect: (id: string) => void;
  index: number;
}

const ModuleCard = ({ module, isSelected, onSelect, index }: ModuleCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`
          cursor-pointer transition-all duration-300 h-full
          ${isSelected ? 'ring-2 ring-blue-400 bg-white/10' : ''}
          ${module.status === 'coming-soon' ? 'opacity-75' : ''}
        `}
        onClick={() => onSelect(module.id)}
      >
        <Interactive3DCard className="h-full">
        {/* Header with Icon and Status */}
        <div className="flex items-center justify-between mb-4">
          <motion.div 
            className={`p-3 rounded-xl bg-gradient-to-br ${module.gradient} shadow-lg`}
            whileHover={{ rotate: 10, scale: 1.1 }}
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          >
            <module.icon className="h-6 w-6 text-white" />
          </motion.div>
          <EnhancedBadge 
            variant={module.status === 'available' ? 'success' : 'warning'}
            className="animate-pulse"
          >
            {module.status === 'available' ? (
              <>
                <CheckCircle className="w-3 h-3 mr-1" />
                Available
              </>
            ) : (
              <>
                <Clock className="w-3 h-3 mr-1" />
                Coming Soon
              </>
            )}
          </EnhancedBadge>
        </div>
        
        {/* Content */}
        <h3 className="text-white text-xl font-bold mb-2">{module.name}</h3>
        <p className="text-blue-200 text-sm font-medium mb-3">{module.tagline}</p>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">{module.description}</p>
        
        {/* Features */}
        <div className="space-y-3 mb-6">
          <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
            Key Features:
          </p>
          <div className="flex flex-wrap gap-1">
            {module.features.map((feature: string, idx: number) => (
              <EnhancedBadge key={idx} variant="outline" className="text-xs">
                {feature}
              </EnhancedBadge>
            ))}
          </div>
        </div>

        {/* Target Users */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
            Perfect for:
          </p>
          <div className="flex flex-wrap gap-1">
            {module.bestFor.map((item: string, idx: number) => (
              <EnhancedBadge key={idx} variant="gradient" className="text-xs">
                {item}
              </EnhancedBadge>
            ))}
          </div>
        </div>
        
        {/* CTA Button */}
        <motion.div 
          className="mt-6 pt-4 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isSelected || isHovered ? 1 : 0.7 }}
          transition={{ duration: 0.2 }}
        >
          <EnhancedButton 
            variant={module.status === 'available' ? 'primary' : 'outline'}
            size="sm" 
            className="w-full"
            disabled={module.status === 'coming-soon'}
          >
            {module.status === 'available' ? 'Explore Module' : 'Join Waitlist'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </EnhancedButton>
        </motion.div>
        </Interactive3DCard>
      </div>
    </motion.div>
  );
};

// Enhanced Stats Card
interface StatCardProps {
  stat: any;
  index: number;
}

const StatCard = ({ stat, index }: StatCardProps) => (
  <RevealOnScroll delay={index * 0.1}>
    <Interactive3DCard className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
        className="mb-4"
      >
        <stat.icon className="h-8 w-8 text-blue-400 mx-auto group-hover:text-blue-300 transition-colors" />
      </motion.div>
      <motion.div 
        className="text-3xl font-bold text-white mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 + index * 0.1 }}
      >
        <GradientText gradient="from-blue-400 to-purple-400">
          {stat.value}
        </GradientText>
      </motion.div>
      <div className="text-slate-300 group-hover:text-slate-200 transition-colors">
        {stat.label}
      </div>
    </Interactive3DCard>
  </RevealOnScroll>
);

// Enhanced Hero Section
export const EnhancedHeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(false);

  const modules = [
    {
      id: 'ventures',
      name: 'Iterativ Ventures',
      tagline: 'AI-Powered Venture Intelligence',
      description: 'Comprehensive startup evaluation, business plan analysis, and investor readiness scoring powered by African market expertise.',
      icon: BarChart3,
      status: 'available',
      gradient: 'from-blue-500 to-purple-600',
      bestFor: ['Startup Founders', 'Accelerators', 'Early-stage VCs'],
      features: ['AI Business Plan Analysis', 'Investor Readiness Scoring', 'Market Assessment']
    },
    {
      id: 'xchange',
      name: 'Iterativ Xchange',
      tagline: 'Connect Startups with Capital',
      description: 'Intelligent investor-startup matching platform facilitating transparent deal flow and due diligence across African markets.',
      icon: Users,
      status: 'available',
      gradient: 'from-purple-500 to-pink-600',
      bestFor: ['Investors', 'VCs', 'Angel Networks'],
      features: ['Smart Matching', 'Due Diligence', 'Deal Flow Management']
    },
    {
      id: 'sourcing',
      name: 'Iterativ Sourcing',
      tagline: 'Smart Talent & Supplier Discovery',
      description: 'Advanced procurement and talent acquisition platform connecting enterprises with verified African suppliers and professionals.',
      icon: Package,
      status: 'coming-soon',
      gradient: 'from-green-500 to-emerald-600',
      bestFor: ['Enterprises', 'Procurement Teams', 'HR Departments'],
      features: ['Supplier Intelligence', 'Talent Matching', 'Performance Analytics']
    }
  ];

  const stats = [
    { icon: Users, value: "10K+", label: "Startups Analyzed" },
    { icon: TrendingUp, value: "$500M+", label: "Investment Facilitated" },
    { icon: Globe, value: "25+", label: "African Countries" },
    { icon: Star, value: "4.9", label: "User Rating" }
  ];

  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with Azure cloud infrastructure and compliance with African data protection laws."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "AI-powered analysis delivers insights in seconds, not days. Get instant feedback on your business plans."
    },
    {
      icon: Target,
      title: "African-Focused",
      description: "Purpose-built for African markets with local expertise, regulations, and market dynamics."
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background with Particles */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900" />
        <ParticleBackground />
        <motion.div 
          style={{ y }}
          className="absolute inset-0 opacity-20"
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)`,
          }} />
        </motion.div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Main Headline */}
        <RevealOnScroll className="text-center mb-16">
          <motion.div className="mb-8">
            <motion.div 
              className="flex items-center justify-center mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-4 shadow-2xl">
                <BarChart3 className="h-10 w-10 text-white relative z-10" />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl opacity-50"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <GradientText gradient="from-white via-blue-100 to-purple-100">
                The Complete
              </GradientText>
              <br />
              <GradientText gradient="from-blue-400 via-purple-400 to-pink-400">
                African Startup
              </GradientText>
              <br />
              <GradientText gradient="from-white via-blue-100 to-purple-100">
                Ecosystem Platform
              </GradientText>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Three powerful solutions. One unified vision.{' '}
              <span className="text-blue-300 font-semibold">
                Empowering founders, investors, and enterprises
              </span>{' '}
              across Africa with AI-driven insights and opportunities.
            </p>
          </motion.div>

          {/* Enhanced CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <EnhancedButton
              size="lg"
              className="group text-lg px-8 py-4 rounded-xl shadow-2xl"
              onClick={() => setShowDemo(true)}
            >
              <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
              Explore Platform
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </EnhancedButton>
            
            <EnhancedButton
              size="lg"
              variant="outline"
              className="group text-lg px-8 py-4 rounded-xl"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </EnhancedButton>
          </div>
        </RevealOnScroll>

        {/* Enhanced Module Selector */}
        <RevealOnScroll delay={0.2} className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Choose Your Path to Success
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Discover the perfect solution for your journey in the African startup ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {modules.map((module, index) => (
              <ModuleCard
                key={module.id}
                module={module}
                isSelected={selectedModule === module.id}
                onSelect={setSelectedModule}
                index={index}
              />
            ))}
          </div>
        </RevealOnScroll>

        {/* Enhanced Stats Section */}
        <RevealOnScroll delay={0.4} className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>
        </RevealOnScroll>

        {/* Features Section */}
        <RevealOnScroll delay={0.6}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Why Choose Iterativ Analytics?
            </h2>
          </div>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Interactive3DCard key={index} className="text-center">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="mb-6"
                >
                  <feature.icon className="h-12 w-12 text-blue-400 mx-auto" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </Interactive3DCard>
            ))}
          </StaggerContainer>
        </RevealOnScroll>
      </motion.div>
    </section>
  );
};

export default EnhancedHeroSection;
