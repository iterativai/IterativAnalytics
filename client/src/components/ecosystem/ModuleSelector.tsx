
import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Network, 
  Search, 
  ArrowRight, 
  Users, 
  TrendingUp, 
  Building, 
  Sparkles,
  CheckCircle2,
  Clock,
  Star,
  Play,
  ChevronRight,
  Zap,
  Shield,
  Globe
} from 'lucide-react';

interface Module {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  detailedDescription: string;
  icon: React.ComponentType<any>;
  status: 'available' | 'coming-soon' | 'beta';
  color: string;
  gradient: string;
  features: string[];
  benefits: string[];
  targetUsers: string[];
  pricing: {
    free: string[];
    pro: string[];
    enterprise: string[];
  };
  metrics: {
    users: string;
    growth: string;
    satisfaction: string;
  };
  cta: {
    primary: string;
    secondary: string;
  };
  demoAvailable: boolean;
  testimonial?: {
    quote: string;
    author: string;
    company: string;
    rating: number;
  };
}

const modules: Module[] = [
  {
    id: 'ventures',
    name: 'Iterativ Ventures',
    shortName: 'Ventures',
    tagline: 'AI-Powered Venture Intelligence',
    description: 'Transform your business plans with AI insights, comprehensive scoring, and investor readiness assessment.',
    detailedDescription: 'Our flagship AI-powered platform analyzes business plans, financial models, and market strategies to provide comprehensive venture intelligence. With advanced machine learning algorithms and African market expertise, we help startups become investor-ready and scale successfully.',
    icon: Brain,
    status: 'available',
    color: '#667eea',
    gradient: 'from-blue-600 to-indigo-600',
    features: [
      'AI Business Plan Analysis',
      'Venture Readiness Scoring',
      'Financial Model Optimization',
      'Market Fit Assessment',
      'Competitor Analysis',
      'Investor Pitch Deck Review'
    ],
    benefits: [
      'Increase funding success rate by 89%',
      'Reduce time to investment by 6 months',
      'Comprehensive market insights',
      'Real-time performance tracking'
    ],
    targetUsers: ['Startup Founders', 'Early-stage Entrepreneurs', 'Business Plan Writers'],
    pricing: {
      free: ['Basic business plan analysis', 'Simple scoring', '1 analysis per month'],
      pro: ['Advanced AI analysis', 'Unlimited analyses', 'Market comparisons', 'Investor matching'],
      enterprise: ['Custom AI models', 'White-label solution', 'API access', 'Priority support']
    },
    metrics: {
      users: '10K+',
      growth: '+156%',
      satisfaction: '4.9/5'
    },
    cta: {
      primary: 'Start Free Analysis',
      secondary: 'Watch Demo'
    },
    demoAvailable: true,
    testimonial: {
      quote: "Iterativ Ventures helped us secure $2M in Series A funding. The AI insights were game-changing.",
      author: "Amara Okafor",
      company: "TechNova Nigeria",
      rating: 5
    }
  },
  {
    id: 'xchange',
    name: 'Iterativ Xchange',
    shortName: 'Xchange',
    tagline: 'Connect Startups with Capital',
    description: 'Blockchain-powered capital markets with equity tokenization and integrated supply chain finance.',
    detailedDescription: 'Revolutionary blockchain-based platform connecting African startups with global investors through tokenized equity and transparent deal flow. Features smart contracts, regulatory compliance, and cross-border payment solutions.',
    icon: Network,
    status: 'available',
    color: '#764ba2',
    gradient: 'from-purple-600 to-pink-600',
    features: [
      'Equity Tokenization Platform',
      'Smart Investor Matching',
      'African Equity Exchange (AEX)',
      'Cross-border Payments',
      'Regulatory Compliance',
      'Secondary Market Trading'
    ],
    benefits: [
      'Access to global investor network',
      'Automated compliance management',
      'Reduced transaction costs by 60%',
      'Real-time portfolio tracking'
    ],
    targetUsers: ['Growth-stage Startups', 'Angel Investors', 'Venture Capital Firms'],
    pricing: {
      free: ['Basic investor matching', 'Market insights', 'Community access'],
      pro: ['Advanced matching', 'Due diligence tools', 'Transaction support'],
      enterprise: ['White-label exchange', 'Custom tokenization', 'Institutional features']
    },
    metrics: {
      users: '5K+',
      growth: '+234%',
      satisfaction: '4.8/5'
    },
    cta: {
      primary: 'Join Network',
      secondary: 'Browse Opportunities'
    },
    demoAvailable: true,
    testimonial: {
      quote: "The tokenization process was seamless. We raised $5M through Xchange in just 3 months.",
      author: "Jean-Baptiste Mukasa",
      company: "East Africa Ventures",
      rating: 5
    }
  },
  {
    id: 'sourcing',
    name: 'Iterativ Sourcing',
    shortName: 'Sourcing',
    tagline: 'Smart Supply Chain Management',
    description: 'Intelligent supply chain optimization with AI-powered supplier matching and performance analytics.',
    detailedDescription: 'Advanced procurement and supply chain management platform leveraging AI to match businesses with verified African suppliers, optimize costs, and ensure quality standards across the continent.',
    icon: Search,
    status: 'beta',
    color: '#8b5cf6',
    gradient: 'from-violet-600 to-purple-600',
    features: [
      'AI Supplier Matching',
      'Procurement Automation',
      'Performance Analytics',
      'Risk Intelligence',
      'Quality Verification',
      'Payment Management'
    ],
    benefits: [
      'Reduce procurement costs by 40%',
      'Improve supplier reliability',
      'Streamline payment processes',
      'Real-time supply chain visibility'
    ],
    targetUsers: ['Enterprise Companies', 'Procurement Teams', 'Supply Chain Managers'],
    pricing: {
      free: ['Basic supplier search', 'Performance insights', 'Community features'],
      pro: ['Advanced matching', 'Risk analysis', 'Contract management'],
      enterprise: ['Custom integrations', 'Advanced analytics', 'Dedicated support']
    },
    metrics: {
      users: '2K+',
      growth: '+89%',
      satisfaction: '4.7/5'
    },
    cta: {
      primary: 'Join Beta',
      secondary: 'Request Demo'
    },
    demoAvailable: true,
    testimonial: {
      quote: "Beta access to Sourcing transformed our procurement process. Can't wait for the full launch!",
      author: "Fatima Al-Rashid",
      company: "Cairo Manufacturing",
      rating: 4
    }
  }
];

interface ModuleSelectorProps {
  onModuleSelect?: (moduleId: string) => void;
  selectedModule?: string;
  viewMode?: 'grid' | 'detailed';
}

export const ModuleSelector: React.FC<ModuleSelectorProps> = ({ 
  onModuleSelect, 
  selectedModule = 'ventures',
  viewMode = 'grid'
}) => {
  const [activeModule, setActiveModule] = useState(selectedModule);
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const [expandedFeatures, setExpandedFeatures] = useState<string | null>(null);
  const [showPricingModal, setShowPricingModal] = useState<string | null>(null);

  const handleModuleSelect = useCallback((moduleId: string) => {
    setActiveModule(moduleId);
    onModuleSelect?.(moduleId);
  }, [onModuleSelect]);

  const selectedModuleData = useMemo(() => 
    modules.find(m => m.id === activeModule),
    [activeModule]
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      available: { color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: CheckCircle2, text: 'Available' },
      beta: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: Zap, text: 'Beta' },
      'coming-soon': { color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', icon: Clock, text: 'Coming Soon' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.available;
    const IconComponent = config.icon;
    
    return (
      <Badge className={`${config.color} text-xs font-medium`}>
        <IconComponent className="h-3 w-3 mr-1" />
        {config.text}
      </Badge>
    );
  };

  const ModuleCard = ({ module, index }: { module: Module; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHoveredModule(module.id)}
      onMouseLeave={() => setHoveredModule(null)}
      className="h-full"
    >
      <Card 
        className={`
          h-full cursor-pointer transition-all duration-300 group
          ${activeModule === module.id 
            ? 'ring-2 ring-blue-400/50 bg-white/10 border-white/30' 
            : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/8'
          }
          backdrop-blur-sm hover:backdrop-blur-md
        `}
        onClick={() => handleModuleSelect(module.id)}
      >
        <CardContent className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <motion.div 
              className={`p-3 rounded-xl bg-gradient-to-r ${module.gradient} shadow-lg`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <module.icon className="h-6 w-6 text-white" />
            </motion.div>
            {getStatusBadge(module.status)}
          </div>

          {/* Content */}
          <div className="flex-1 mb-4">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
              {module.name}
            </h3>
            <p className="text-blue-200/80 text-sm font-medium mb-3">{module.tagline}</p>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              {module.description}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <div className="text-white font-semibold text-sm">{module.metrics.users}</div>
                <div className="text-slate-400 text-xs">Users</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 font-semibold text-sm">{module.metrics.growth}</div>
                <div className="text-slate-400 text-xs">Growth</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 font-semibold text-sm">{module.metrics.satisfaction}</div>
                <div className="text-slate-400 text-xs">Rating</div>
              </div>
            </div>

            {/* Features Preview */}
            <div className="space-y-2 mb-4">
              {module.features.slice(0, 3).map((feature, idx) => (
                <div key={idx} className="flex items-center text-white/70 text-xs">
                  <div className="w-1 h-1 bg-white/40 rounded-full mr-2 flex-shrink-0"></div>
                  {feature}
                </div>
              ))}
              {module.features.length > 3 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedFeatures(expandedFeatures === module.id ? null : module.id);
                  }}
                  className="text-blue-300 text-xs hover:text-blue-200 transition-colors flex items-center"
                >
                  <span>+{module.features.length - 3} more features</span>
                  <ChevronRight className={`h-3 w-3 ml-1 transform transition-transform ${
                    expandedFeatures === module.id ? 'rotate-90' : ''
                  }`} />
                </button>
              )}
            </div>

            {/* Expanded features */}
            <AnimatePresence>
              {expandedFeatures === module.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 mb-4 overflow-hidden"
                >
                  {module.features.slice(3).map((feature, idx) => (
                    <div key={idx} className="flex items-center text-white/70 text-xs">
                      <div className="w-1 h-1 bg-white/40 rounded-full mr-2 flex-shrink-0"></div>
                      {feature}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <div className="space-y-2">
            <Button 
              className={`
                w-full bg-gradient-to-r ${module.gradient} 
                hover:opacity-90 text-white font-medium text-sm
                transition-all duration-200 shadow-lg hover:shadow-xl
                transform hover:scale-105
              `}
              disabled={module.status === 'coming-soon'}
            >
              {module.cta.primary}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            {module.demoAvailable && (
              <Button 
                variant="outline" 
                size="sm"
                className="w-full text-white/70 border-white/20 hover:bg-white/10 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle demo modal
                }}
              >
                <Play className="mr-1 h-3 w-3" />
                {module.cta.secondary}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="w-full space-y-8">
      {/* Module Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {modules.map((module, index) => (
          <ModuleCard key={module.id} module={module} index={index} />
        ))}
      </div>

      {/* Selected Module Detailed View */}
      {selectedModuleData && (
        <motion.div
          key={activeModule}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Column - Information */}
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className={`bg-gradient-to-r ${selectedModuleData.gradient} rounded-xl p-4 mr-4`}>
                  <selectedModuleData.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{selectedModuleData.name}</h3>
                  <p className="text-white/60">{selectedModuleData.tagline}</p>
                  {getStatusBadge(selectedModuleData.status)}
                </div>
              </div>
              
              <p className="text-white/80 mb-6 leading-relaxed">
                {selectedModuleData.detailedDescription}
              </p>

              {/* Key Benefits */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-2" />
                  Key Benefits
                </h4>
                <div className="space-y-2">
                  {selectedModuleData.benefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="flex items-center text-white/80"
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                      {benefit}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Target Users */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Users className="h-5 w-5 text-blue-400 mr-2" />
                  Perfect For
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedModuleData.targetUsers.map((user, idx) => (
                    <Badge key={idx} className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      {user}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-white">{selectedModuleData.metrics.users}</div>
                  <div className="text-white/60 text-sm">Active Users</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">{selectedModuleData.metrics.growth}</div>
                  <div className="text-white/60 text-sm">YoY Growth</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">{selectedModuleData.metrics.satisfaction}</div>
                  <div className="text-white/60 text-sm">Satisfaction</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4">
                <Button 
                  className={`flex-1 bg-gradient-to-r ${selectedModuleData.gradient} hover:opacity-90 text-white`}
                  disabled={selectedModuleData.status === 'coming-soon'}
                >
                  {selectedModuleData.cta.primary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="text-white border-white/30 hover:bg-white/10"
                  onClick={() => setShowPricingModal(selectedModuleData.id)}
                >
                  View Pricing
                </Button>
              </div>
            </div>

            {/* Right Column - Features & Testimonial */}
            <div className="bg-white/5 p-8">
              <h4 className="text-lg font-semibold text-white mb-4">Complete Feature Set</h4>
              <div className="space-y-3 mb-8">
                {selectedModuleData.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="flex items-center text-white/80"
                  >
                    <CheckCircle2 className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                    {feature}
                  </motion.div>
                ))}
              </div>

              {/* Testimonial */}
              {selectedModuleData.testimonial && (
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center mb-3">
                    {[...Array(selectedModuleData.testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-white/80 italic mb-4">
                    "{selectedModuleData.testimonial.quote}"
                  </blockquote>
                  <div className="text-sm">
                    <div className="font-semibold text-white">{selectedModuleData.testimonial.author}</div>
                    <div className="text-white/60">{selectedModuleData.testimonial.company}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Security & Trust Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-6 pt-8 border-t border-white/10"
      >
        <div className="flex items-center text-white/70">
          <Shield className="h-5 w-5 text-green-400 mr-2" />
          <span className="text-sm">Enterprise Security</span>
        </div>
        <div className="flex items-center text-white/70">
          <Globe className="h-5 w-5 text-blue-400 mr-2" />
          <span className="text-sm">15+ African Markets</span>
        </div>
        <div className="flex items-center text-white/70">
          <Zap className="h-5 w-5 text-yellow-400 mr-2" />
          <span className="text-sm">AI-Powered Intelligence</span>
        </div>
        <div className="flex items-center text-white/70">
          <CheckCircle2 className="h-5 w-5 text-green-400 mr-2" />
          <span className="text-sm">99.9% Uptime</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ModuleSelector;
