import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  Clock
} from 'lucide-react';

interface Module {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<any>;
  status: 'available' | 'coming-soon';
  color: string;
  gradient: string;
  features: string[];
  cta: {
    primary: string;
    secondary: string;
  };
}

const modules: Module[] = [
  {
    id: 'ventures',
    name: 'Iterativ Ventures',
    tagline: 'AI-Powered Venture Intelligence',
    description: 'Transform your business plans with AI insights, comprehensive scoring, and investor readiness assessment.',
    icon: Brain,
    status: 'available',
    color: '#667eea',
    gradient: 'from-blue-600 to-indigo-600',
    features: [
      'Venture Readiness Scoring',
      'AI Co-Founders & Pitch Copilots',
      'Startup ID Score™',
      'Real-time Financial Modeling'
    ],
    cta: {
      primary: 'Start Free Analysis',
      secondary: 'Watch Demo'
    }
  },
  {
    id: 'xchange',
    name: 'Iterativ Xchange',
    tagline: 'Connect Startups with Capital',
    description: 'Blockchain-powered capital markets with equity tokenization and integrated supply chain finance.',
    icon: Network,
    status: 'available',
    color: '#764ba2',
    gradient: 'from-purple-600 to-pink-600',
    features: [
      'Predictive Deal Discovery',
      'DEI & Risk Benchmarking',
      'Tokenized Investment Pools',
      'African Equity Exchange (AEX)'
    ],
    cta: {
      primary: 'Join Network',
      secondary: 'Browse Opportunities'
    }
  },
  {
    id: 'sourcing',
    name: 'Iterativ Sourcing',
    tagline: 'Smart Supply Chain Management',
    description: 'Intelligent supply chain optimization with AI-powered supplier matching and performance analytics.',
    icon: Search,
    status: 'coming-soon',
    color: '#8b5cf6',
    gradient: 'from-violet-600 to-purple-600',
    features: [
      'AI-Powered Supplier Matching',
      'Procurement Optimization',
      'Performance Analytics',
      'Risk Intelligence & Verification'
    ],
    cta: {
      primary: 'Join Waitlist',
      secondary: 'Request Demo'
    }
  }
];

interface ModuleSelectorProps {
  onModuleSelect?: (moduleId: string) => void;
  selectedModule?: string;
}

export const ModuleSelector: React.FC<ModuleSelectorProps> = ({ 
  onModuleSelect, 
  selectedModule = 'ventures' 
}) => {
  const [activeModule, setActiveModule] = useState(selectedModule);
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  const handleModuleSelect = (moduleId: string) => {
    setActiveModule(moduleId);
    onModuleSelect?.(moduleId);
  };

  const selectedModuleData = modules.find(m => m.id === activeModule);

  return (
    <div className="w-full">
      {/* Module Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            className={`relative cursor-pointer group ${
              activeModule === module.id ? 'z-10' : ''
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredModule(module.id)}
            onMouseLeave={() => setHoveredModule(null)}
            onClick={() => handleModuleSelect(module.id)}
          >
            <Card className={`
              bg-white/5 backdrop-blur-sm border transition-all duration-300 h-full
              ${activeModule === module.id 
                ? 'border-white/30 bg-white/10 ring-2 ring-blue-400/50' 
                : 'border-white/10 hover:border-white/20 hover:bg-white/8'
              }
            `}>
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-gradient-to-r ${module.gradient} rounded-xl p-3`}>
                    <module.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge 
                    className={`
                      ${module.status === 'available' 
                        ? 'bg-green-900/30 text-green-400 border-green-800/50' 
                        : 'bg-orange-900/30 text-orange-400 border-orange-800/50'
                      }
                    `}
                  >
                    {module.status === 'available' ? (
                      <>
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Available
                      </>
                    ) : (
                      <>
                        <Clock className="h-3 w-3 mr-1" />
                        Coming Soon
                      </>
                    )}
                  </Badge>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white mb-2">{module.name}</h3>
                  <p className="text-white/60 text-sm mb-3">{module.tagline}</p>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {module.description}
                  </p>
                </div>

                {/* Features Preview */}
                <div className="space-y-2 mb-6">
                  {module.features.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="flex items-center text-white/70 text-xs">
                      <div className="w-1 h-1 bg-white/40 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                  {module.features.length > 2 && (
                    <div className="text-white/50 text-xs">
                      +{module.features.length - 2} more features
                    </div>
                  )}
                </div>

                {/* CTA */}
                <motion.div
                  animate={{
                    scale: activeModule === module.id ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Button 
                    className={`
                      w-full bg-gradient-to-r ${module.gradient} 
                      hover:opacity-90 text-white font-medium py-2 text-sm
                      transition-all duration-200
                    `}
                    disabled={module.status === 'coming-soon'}
                  >
                    {module.cta.primary}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </CardContent>
            </Card>

            {/* Hover Effect */}
            {hoveredModule === module.id && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-lg pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Selected Module Details */}
      {selectedModuleData && (
        <motion.div
          key={activeModule}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className={`bg-gradient-to-r ${selectedModuleData.gradient} rounded-xl p-4 mr-4`}>
                  <selectedModuleData.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedModuleData.name}</h3>
                  <p className="text-white/60">{selectedModuleData.tagline}</p>
                </div>
              </div>
              
              <p className="text-white/80 mb-6 leading-relaxed">
                {selectedModuleData.description}
              </p>

              <div className="flex gap-4">
                <Button 
                  className={`bg-gradient-to-r ${selectedModuleData.gradient} hover:opacity-90 text-white`}
                  disabled={selectedModuleData.status === 'coming-soon'}
                >
                  {selectedModuleData.cta.primary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                  {selectedModuleData.cta.secondary}
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Key Features</h4>
              <div className="space-y-3">
                {selectedModuleData.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="flex items-center text-white/80"
                  >
                    <CheckCircle2 className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                    {feature}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ModuleSelector;