import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  X, 
  ArrowRight, 
  Users, 
  TrendingUp, 
  Building, 
  CreditCard,
  Brain,
  Network,
  Search,
  Info
} from 'lucide-react';

interface ComparisonFeature {
  category: string;
  features: {
    name: string;
    description: string;
    ventures: boolean | string;
    xchange: boolean | string;
    sourcing: boolean | string;
  }[];
}

const comparisonData: ComparisonFeature[] = [
  {
    category: 'Core Functionality',
    features: [
      {
        name: 'AI-Powered Analytics',
        description: 'Advanced artificial intelligence for business insights',
        ventures: 'Business Intelligence',
        xchange: 'Market Analysis',
        sourcing: 'Supplier Matching'
      },
      {
        name: 'Real-time Scoring',
        description: 'Live performance and readiness metrics',
        ventures: 'Startup Readiness',
        xchange: 'Investment Risk',
        sourcing: 'Supplier Performance'
      },
      {
        name: 'Blockchain Integration',
        description: 'Secure, transparent blockchain technology',
        ventures: false,
        xchange: 'Tokenized Equity',
        sourcing: 'Supply Chain Trust'
      }
    ]
  },
  {
    category: 'Target Users',
    features: [
      {
        name: 'Startup Founders',
        description: 'Tools and insights for entrepreneurs',
        ventures: 'Primary Focus',
        xchange: 'Fundraising Support',
        sourcing: 'Team Building'
      },
      {
        name: 'Investors & VCs',
        description: 'Deal discovery and due diligence',
        ventures: 'Due Diligence',
        xchange: 'Primary Focus',
        sourcing: false
      },
      {
        name: 'Enterprise Partners',
        description: 'Corporate innovation programs',
        ventures: 'Program Management',
        xchange: 'Strategic Investment',
        sourcing: 'Primary Focus'
      }
    ]
  },
  {
    category: 'Key Features',
    features: [
      {
        name: 'Financial Modeling',
        description: 'Advanced financial planning and analysis',
        ventures: 'AI-Enhanced Models',
        xchange: 'Investment Scenarios',
        sourcing: 'Cost Optimization'
      },
      {
        name: 'Network Effects',
        description: 'Platform-based networking capabilities',
        ventures: 'Mentor Network',
        xchange: 'Investor-Startup Matching',
        sourcing: 'Supplier Network'
      },
      {
        name: 'Compliance Tools',
        description: 'Regulatory and legal compliance features',
        ventures: 'Startup Compliance',
        xchange: 'Investment Regulations',
        sourcing: 'Procurement Standards'
      }
    ]
  }
];

const modules = [
  {
    id: 'ventures',
    name: 'Iterativ Ventures',
    icon: Brain,
    color: 'blue',
    gradient: 'from-blue-600 to-indigo-600',
    description: 'AI-powered business intelligence and venture readiness scoring',
    bestFor: 'Early-stage startups seeking funding readiness and business optimization'
  },
  {
    id: 'xchange',
    name: 'Iterativ Xchange',
    icon: Network,
    color: 'purple',
    gradient: 'from-purple-600 to-pink-600',
    description: 'Blockchain-powered capital markets and investment platform',
    bestFor: 'Growth-stage startups and investors seeking tokenized capital access'
  },
  {
    id: 'sourcing',
    name: 'Iterativ Sourcing',
    icon: Search,
    color: 'violet',
    gradient: 'from-violet-600 to-purple-600',
    description: 'Intelligent supply chain and talent acquisition platform',
    bestFor: 'Scaling companies needing supply chain optimization and team building'
  }
];

export const ComparisonMatrix: React.FC = () => {
  const [selectedModules, setSelectedModules] = useState<string[]>(['ventures', 'xchange']);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleModuleSelection = (moduleId: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getFeatureValue = (feature: any, moduleId: string) => {
    const value = feature[moduleId];
    if (typeof value === 'string') return value;
    return value;
  };

  const renderFeatureCell = (feature: any, moduleId: string) => {
    const value = getFeatureValue(feature, moduleId);
    
    if (typeof value === 'string') {
      return (
        <div className="text-sm">
          <CheckCircle2 className="h-4 w-4 text-green-400 inline mr-2" />
          <span className="text-white">{value}</span>
        </div>
      );
    } else if (value === true) {
      return <CheckCircle2 className="h-5 w-5 text-green-400 mx-auto" />;
    } else {
      return <X className="h-5 w-5 text-red-400 mx-auto" />;
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Module Selection */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Compare Solutions</h3>
        <p className="text-white/70 mb-6">
          Select modules to compare their features and find the right solution for your needs
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {modules.map((module) => (
            <motion.button
              key={module.id}
              onClick={() => toggleModuleSelection(module.id)}
              className={`
                flex items-center gap-3 px-6 py-3 rounded-xl border transition-all duration-200
                ${selectedModules.includes(module.id)
                  ? 'border-white/30 bg-white/10 text-white'
                  : 'border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/8'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`bg-gradient-to-r ${module.gradient} rounded-lg p-2`}>
                <module.icon className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium">{module.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Best For Cards */}
      {selectedModules.length > 0 && (
        <div className="grid gap-4 mb-8">
          {modules
            .filter(module => selectedModules.includes(module.id))
            .map((module) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className={`bg-gradient-to-r ${module.gradient} rounded-xl p-3`}>
                    <module.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-2">{module.name}</h4>
                    <p className="text-white/70 text-sm mb-3">{module.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-900/30 text-green-400 border-green-800/50">
                        Best For
                      </Badge>
                      <span className="text-white/80 text-sm">{module.bestFor}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      )}

      {/* Comparison Table */}
      {selectedModules.length > 1 && (
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Info className="h-5 w-5 text-cyan-400" />
              Feature Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-white font-medium">Features</th>
                    {selectedModules.map(moduleId => {
                      const module = modules.find(m => m.id === moduleId);
                      return (
                        <th key={moduleId} className="text-center py-4 px-4">
                          <div className="flex flex-col items-center gap-2">
                            <div className={`bg-gradient-to-r ${module?.gradient} rounded-lg p-2`}>
                              {module?.icon && <module.icon className="h-5 w-5 text-white" />}
                            </div>
                            <span className="text-white font-medium text-sm">{module?.name}</span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((category, categoryIndex) => (
                    <React.Fragment key={category.category}>
                      <tr>
                        <td 
                          colSpan={selectedModules.length + 1}
                          className="py-4 px-4 border-b border-white/5"
                        >
                          <button
                            onClick={() => setExpandedCategory(
                              expandedCategory === category.category ? null : category.category
                            )}
                            className="flex items-center gap-2 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
                          >
                            <span>{category.category}</span>
                            <ArrowRight 
                              className={`h-4 w-4 transition-transform ${
                                expandedCategory === category.category ? 'rotate-90' : ''
                              }`} 
                            />
                          </button>
                        </td>
                      </tr>
                      {(expandedCategory === category.category || expandedCategory === null) && 
                        category.features.map((feature, featureIndex) => (
                          <motion.tr
                            key={feature.name}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: featureIndex * 0.1 }}
                            className="border-b border-white/5 hover:bg-white/2 transition-colors"
                          >
                            <td className="py-4 px-4">
                              <div>
                                <div className="text-white font-medium mb-1">{feature.name}</div>
                                <div className="text-white/60 text-sm">{feature.description}</div>
                              </div>
                            </td>
                            {selectedModules.map(moduleId => (
                              <td key={moduleId} className="py-4 px-4 text-center">
                                {renderFeatureCell(feature, moduleId)}
                              </td>
                            ))}
                          </motion.tr>
                        ))
                      }
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* CTA Section */}
      {selectedModules.length > 0 && (
        <div className="text-center">
          <h4 className="text-xl font-semibold text-white mb-4">Ready to get started?</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {selectedModules.map(moduleId => {
              const module = modules.find(m => m.id === moduleId);
              return (
                <Button
                  key={moduleId}
                  className={`bg-gradient-to-r ${module?.gradient} hover:opacity-90 text-white`}
                >
                  Try {module?.name}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonMatrix;