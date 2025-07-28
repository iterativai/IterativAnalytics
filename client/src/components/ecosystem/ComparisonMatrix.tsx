
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Brain,
  Network,
  Search,
  Info,
  ChevronDown,
  ChevronRight,
  Star,
  Shield,
  Zap,
  Globe,
  Filter,
  BarChart3,
  Target
} from 'lucide-react';

interface ComparisonFeature {
  category: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  features: {
    name: string;
    description: string;
    ventures: boolean | string;
    xchange: boolean | string;
    sourcing: boolean | string;
    importance: 'critical' | 'important' | 'nice-to-have';
  }[];
}

const comparisonData: ComparisonFeature[] = [
  {
    category: 'AI & Intelligence',
    description: 'Advanced artificial intelligence and machine learning capabilities',
    priority: 'high',
    features: [
      {
        name: 'AI-Powered Analytics',
        description: 'Advanced artificial intelligence for business insights and predictions',
        ventures: 'Business Intelligence & Scoring',
        xchange: 'Market Analysis & Predictions',
        sourcing: 'Supplier Matching & Risk Analysis',
        importance: 'critical'
      },
      {
        name: 'Real-time Scoring',
        description: 'Live performance and readiness metrics with continuous updates',
        ventures: 'Startup Readiness Score',
        xchange: 'Investment Risk Assessment',
        sourcing: 'Supplier Performance Metrics',
        importance: 'critical'
      },
      {
        name: 'Predictive Modeling',
        description: 'Future performance and trend predictions using ML algorithms',
        ventures: 'Growth Trajectory Modeling',
        xchange: 'Market Movement Predictions',
        sourcing: 'Demand Forecasting',
        importance: 'important'
      },
      {
        name: 'Natural Language Processing',
        description: 'Advanced text analysis and document understanding',
        ventures: 'Business Plan Analysis',
        xchange: 'Document Due Diligence',
        sourcing: 'Contract Analysis',
        importance: 'important'
      }
    ]
  },
  {
    category: 'Technology Infrastructure',
    description: 'Core technology stack and platform capabilities',
    priority: 'high',
    features: [
      {
        name: 'Blockchain Integration',
        description: 'Secure, transparent blockchain technology for transactions',
        ventures: false,
        xchange: 'Tokenized Equity & Smart Contracts',
        sourcing: 'Supply Chain Transparency',
        importance: 'critical'
      },
      {
        name: 'API Access',
        description: 'Comprehensive API for third-party integrations',
        ventures: 'Business Intelligence APIs',
        xchange: 'Trading & Portfolio APIs',
        sourcing: 'Procurement & Supplier APIs',
        importance: 'important'
      },
      {
        name: 'Real-time Data Sync',
        description: 'Live data synchronization across all platforms',
        ventures: 'Live Financial Modeling',
        xchange: 'Real-time Market Data',
        sourcing: 'Supply Chain Tracking',
        importance: 'critical'
      },
      {
        name: 'Mobile Optimization',
        description: 'Full mobile responsive design and native app support',
        ventures: true,
        xchange: true,
        sourcing: true,
        importance: 'important'
      }
    ]
  },
  {
    category: 'User Experience & Interface',
    description: 'User-focused design and interaction capabilities',
    priority: 'medium',
    features: [
      {
        name: 'Dashboard Customization',
        description: 'Personalized dashboards with role-based views',
        ventures: 'Founder-focused Analytics',
        xchange: 'Investor Portfolio Views',
        sourcing: 'Procurement Dashboards',
        importance: 'important'
      },
      {
        name: 'Multi-language Support',
        description: 'Support for major African languages and English',
        ventures: 'English + 8 Languages',
        xchange: 'English + 6 Languages',
        sourcing: 'English + 5 Languages',
        importance: 'nice-to-have'
      },
      {
        name: 'Offline Capabilities',
        description: 'Work offline with data sync when connection returns',
        ventures: 'Limited Offline Access',
        xchange: false,
        sourcing: 'Mobile Offline Mode',
        importance: 'nice-to-have'
      }
    ]
  },
  {
    category: 'Target User Groups',
    description: 'Primary user segments and specialized features',
    priority: 'high',
    features: [
      {
        name: 'Startup Founders',
        description: 'Tools and insights specifically for entrepreneurs',
        ventures: 'Primary Focus - Complete Suite',
        xchange: 'Fundraising & Growth Support',
        sourcing: 'Operational Efficiency Tools',
        importance: 'critical'
      },
      {
        name: 'Investors & VCs',
        description: 'Deal discovery, due diligence, and portfolio management',
        ventures: 'Due Diligence Tools',
        xchange: 'Primary Focus - Full Platform',
        sourcing: 'Portfolio Company Support',
        importance: 'critical'
      },
      {
        name: 'Enterprise Partners',
        description: 'Corporate innovation and partnership programs',
        ventures: 'Innovation Program Management',
        xchange: 'Strategic Investment Tools',
        sourcing: 'Primary Focus - Full Suite',
        importance: 'critical'
      },
      {
        name: 'Financial Institutions',
        description: 'Banks, lenders, and financial service providers',
        ventures: 'Credit Risk Assessment',
        xchange: 'Investment Banking Tools',
        sourcing: 'Trade Finance Solutions',
        importance: 'important'
      }
    ]
  },
  {
    category: 'Core Features & Capabilities',
    description: 'Essential platform features and specialized tools',
    priority: 'high',
    features: [
      {
        name: 'Financial Modeling',
        description: 'Advanced financial planning and analysis tools',
        ventures: 'AI-Enhanced Business Models',
        xchange: 'Investment Scenario Analysis',
        sourcing: 'Cost Optimization Models',
        importance: 'critical'
      },
      {
        name: 'Network Effects',
        description: 'Platform-based networking and connection capabilities',
        ventures: 'Mentor & Advisor Network',
        xchange: 'Investor-Startup Ecosystem',
        sourcing: 'Supplier & Buyer Network',
        importance: 'important'
      },
      {
        name: 'Compliance Management',
        description: 'Regulatory and legal compliance automation',
        ventures: 'Startup Legal Compliance',
        xchange: 'Securities & Investment Rules',
        sourcing: 'Procurement Standards',
        importance: 'critical'
      },
      {
        name: 'Performance Analytics',
        description: 'Comprehensive performance tracking and reporting',
        ventures: 'Business Performance Metrics',
        xchange: 'Investment Performance Tracking',
        sourcing: 'Supplier Performance Analysis',
        importance: 'important'
      }
    ]
  },
  {
    category: 'Security & Trust',
    description: 'Security measures and trust-building features',
    priority: 'high',
    features: [
      {
        name: 'Enterprise Security',
        description: 'Bank-grade security with encryption and compliance',
        ventures: true,
        xchange: true,
        sourcing: true,
        importance: 'critical'
      },
      {
        name: 'KYC/AML Compliance',
        description: 'Know Your Customer and Anti-Money Laundering protocols',
        ventures: 'Basic KYC',
        xchange: 'Full KYC/AML Suite',
        sourcing: 'Supplier Verification',
        importance: 'critical'
      },
      {
        name: 'Data Privacy',
        description: 'GDPR, POPI Act, and local data protection compliance',
        ventures: true,
        xchange: true,
        sourcing: true,
        importance: 'critical'
      },
      {
        name: 'Audit Trails',
        description: 'Complete transaction and activity logging',
        ventures: 'Business Activity Logs',
        xchange: 'Investment Transaction Logs',
        sourcing: 'Procurement Audit Trails',
        importance: 'important'
      }
    ]
  }
];

const modules = [
  {
    id: 'ventures',
    name: 'Iterativ Ventures',
    shortName: 'Ventures',
    icon: Brain,
    gradient: 'from-blue-600 to-indigo-600',
    color: '#667eea',
    description: 'AI-powered business intelligence and venture readiness scoring for African startups',
    bestFor: 'Early-stage startups seeking funding readiness and comprehensive business optimization',
    userCount: '10K+',
    satisfaction: '4.9/5'
  },
  {
    id: 'xchange',
    name: 'Iterativ Xchange',
    shortName: 'Xchange',
    icon: Network,
    gradient: 'from-purple-600 to-pink-600',
    color: '#764ba2',
    description: 'Blockchain-powered capital markets and tokenized investment platform',
    bestFor: 'Growth-stage startups and investors seeking transparent, efficient capital access',
    userCount: '5K+',
    satisfaction: '4.8/5'
  },
  {
    id: 'sourcing',
    name: 'Iterativ Sourcing',
    shortName: 'Sourcing',
    icon: Search,
    gradient: 'from-violet-600 to-purple-600',
    color: '#8b5cf6',
    description: 'Intelligent supply chain and procurement optimization platform',
    bestFor: 'Scaling companies needing supply chain optimization and efficient procurement',
    userCount: '2K+',
    satisfaction: '4.7/5'
  }
];

export const ComparisonMatrix: React.FC = () => {
  const [selectedModules, setSelectedModules] = useState<string[]>(['ventures', 'xchange']);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['AI & Intelligence']));
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);

  const toggleModuleSelection = (moduleId: string) => {
    setSelectedModules(prev => {
      if (prev.includes(moduleId)) {
        return prev.filter(id => id !== moduleId);
      } else if (prev.length < 3) {
        return [...prev, moduleId];
      }
      return prev;
    });
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const filteredData = useMemo(() => {
    let filtered = comparisonData;
    
    if (filterPriority !== 'all') {
      filtered = filtered.filter(category => category.priority === filterPriority);
    }
    
    if (showOnlyDifferences) {
      filtered = filtered.map(category => ({
        ...category,
        features: category.features.filter(feature => {
          const values = selectedModules.map(moduleId => feature[moduleId as keyof typeof feature]);
          return new Set(values).size > 1;
        })
      })).filter(category => category.features.length > 0);
    }
    
    return filtered;
  }, [filterPriority, showOnlyDifferences, selectedModules]);

  const getFeatureValue = (feature: any, moduleId: string) => {
    return feature[moduleId];
  };

  const renderFeatureCell = (feature: any, moduleId: string) => {
    const value = getFeatureValue(feature, moduleId);
    
    if (typeof value === 'string') {
      return (
        <div className="text-sm p-2">
          <div className="flex items-start">
            <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-white leading-relaxed">{value}</span>
          </div>
        </div>
      );
    } else if (value === true) {
      return (
        <div className="text-center p-2">
          <CheckCircle2 className="h-5 w-5 text-green-400 mx-auto" />
        </div>
      );
    } else {
      return (
        <div className="text-center p-2">
          <X className="h-5 w-5 text-red-400 mx-auto" />
        </div>
      );
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'text-red-400';
      case 'important': return 'text-yellow-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h3 className="text-3xl font-bold text-white mb-4">Compare Our Solutions</h3>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            Understand the differences between our three specialized platforms and find the perfect fit for your needs in the African startup ecosystem.
          </p>
        </motion.div>
        
        {/* Module Selection */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {modules.map((module) => (
              <motion.button
                key={module.id}
                onClick={() => toggleModuleSelection(module.id)}
                className={`
                  group relative flex items-center gap-3 px-6 py-4 rounded-xl border transition-all duration-300
                  ${selectedModules.includes(module.id)
                    ? 'border-white/30 bg-white/10 text-white shadow-lg'
                    : 'border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/8'
                  }
                  ${selectedModules.length >= 3 && !selectedModules.includes(module.id) 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:scale-105'
                  }
                `}
                whileHover={{ scale: selectedModules.length < 3 || selectedModules.includes(module.id) ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
                disabled={selectedModules.length >= 3 && !selectedModules.includes(module.id)}
              >
                <div className={`bg-gradient-to-r ${module.gradient} rounded-lg p-2`}>
                  <module.icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{module.shortName}</div>
                  <div className="text-xs opacity-70">{module.userCount} users</div>
                </div>
                {selectedModules.includes(module.id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1"
                  >
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
          
          {selectedModules.length >= 3 && (
            <p className="text-yellow-400 text-sm mt-2">
              Maximum 3 modules can be compared at once
            </p>
          )}
        </motion.div>

        {/* Filters */}
        {selectedModules.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex flex-wrap justify-center gap-4 mb-6"
          >
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-white/60" />
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value as any)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm backdrop-blur-sm"
              >
                <option value="all">All Categories</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
            
            <label className="flex items-center gap-2 text-white/70 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyDifferences}
                onChange={(e) => setShowOnlyDifferences(e.target.checked)}
                className="rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
              />
              Show only differences
            </label>
          </motion.div>
        )}
      </div>

      {/* Module Overview Cards */}
      {selectedModules.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid gap-4 mb-8"
        >
          {modules
            .filter(module => selectedModules.includes(module.id))
            .map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className={`bg-gradient-to-r ${module.gradient} rounded-xl p-3 flex-shrink-0`}>
                    <module.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-white">{module.name}</h4>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center text-white/70">
                          <Users className="h-4 w-4 mr-1" />
                          {module.userCount}
                        </div>
                        <div className="flex items-center text-yellow-400">
                          <Star className="h-4 w-4 mr-1 fill-current" />
                          {module.satisfaction}
                        </div>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm mb-3 leading-relaxed">{module.description}</p>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-green-900/30 text-green-400 border-green-800/50 text-xs">
                        <Target className="h-3 w-3 mr-1" />
                        Best For
                      </Badge>
                      <span className="text-white/80 text-sm leading-relaxed">{module.bestFor}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>
      )}

      {/* Comparison Table */}
      {selectedModules.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-cyan-400" />
                Feature Comparison Matrix
                <Badge className="ml-auto bg-blue-900/30 text-blue-400 border-blue-800/50">
                  {filteredData.reduce((acc, cat) => acc + cat.features.length, 0)} features compared
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="text-left py-4 px-6 text-white font-medium min-w-[300px]">
                        Features & Capabilities
                      </th>
                      {selectedModules.map(moduleId => {
                        const module = modules.find(m => m.id === moduleId);
                        return (
                          <th key={moduleId} className="text-center py-4 px-4 min-w-[200px]">
                            <div className="flex flex-col items-center gap-2">
                              <div className={`bg-gradient-to-r ${module?.gradient} rounded-lg p-2`}>
                                {module?.icon && <module.icon className="h-5 w-5 text-white" />}
                              </div>
                              <div className="text-white font-medium text-sm">{module?.shortName}</div>
                              <div className="text-white/60 text-xs">{module?.userCount} users</div>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((category, categoryIndex) => (
                      <React.Fragment key={category.category}>
                        {/* Category Header */}
                        <tr className="bg-white/3">
                          <td 
                            colSpan={selectedModules.length + 1}
                            className="py-4 px-6 border-t border-white/10"
                          >
                            <button
                              onClick={() => toggleCategory(category.category)}
                              className="flex items-center justify-between w-full text-left group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                  {expandedCategories.has(category.category) ? (
                                    <ChevronDown className="h-4 w-4 text-cyan-400" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4 text-cyan-400" />
                                  )}
                                  <span className="text-cyan-400 font-semibold text-lg">
                                    {category.category}
                                  </span>
                                </div>
                                <Badge 
                                  className={`
                                    text-xs
                                    ${category.priority === 'high' ? 'bg-red-900/30 text-red-400 border-red-800/50' :
                                      category.priority === 'medium' ? 'bg-yellow-900/30 text-yellow-400 border-yellow-800/50' :
                                      'bg-blue-900/30 text-blue-400 border-blue-800/50'
                                    }
                                  `}
                                >
                                  {category.priority} priority
                                </Badge>
                              </div>
                              <div className="text-white/60 text-sm">
                                {category.features.length} features
                              </div>
                            </button>
                            <p className="text-white/60 text-sm mt-2 ml-7">
                              {category.description}
                            </p>
                          </td>
                        </tr>
                        
                        {/* Category Features */}
                        <AnimatePresence>
                          {expandedCategories.has(category.category) && 
                            category.features.map((feature, featureIndex) => (
                              <motion.tr
                                key={feature.name}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ delay: featureIndex * 0.05 }}
                                className="border-b border-white/5 hover:bg-white/3 transition-colors"
                              >
                                <td className="py-4 px-6">
                                  <div className="flex items-start gap-3">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="text-white font-medium">{feature.name}</span>
                                        <Star className={`h-3 w-3 ${getImportanceColor(feature.importance)}`} />
                                      </div>
                                      <p className="text-white/60 text-sm leading-relaxed">
                                        {feature.description}
                                      </p>
                                      <Badge className={`
                                        mt-2 text-xs
                                        ${feature.importance === 'critical' ? 'bg-red-900/30 text-red-400 border-red-800/50' :
                                          feature.importance === 'important' ? 'bg-yellow-900/30 text-yellow-400 border-yellow-800/50' :
                                          'bg-blue-900/30 text-blue-400 border-blue-800/50'
                                        }
                                      `}>
                                        {feature.importance}
                                      </Badge>
                                    </div>
                                  </div>
                                </td>
                                {selectedModules.map(moduleId => (
                                  <td key={moduleId} className="py-4 px-4 text-center align-top">
                                    {renderFeatureCell(feature, moduleId)}
                                  </td>
                                ))}
                              </motion.tr>
                            ))
                          }
                        </AnimatePresence>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* CTA Section */}
      {selectedModules.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center space-y-6"
        >
          <h4 className="text-2xl font-semibold text-white mb-4">
            Ready to Transform Your Journey?
          </h4>
          <div className="flex flex-wrap justify-center gap-4">
            {selectedModules.map(moduleId => {
              const module = modules.find(m => m.id === moduleId);
              return (
                <Button
                  key={moduleId}
                  className={`bg-gradient-to-r ${module?.gradient} hover:opacity-90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                  size="lg"
                >
                  <module?.icon className="h-5 w-5 mr-2" />
                  Try {module?.shortName}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              );
            })}
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-400" />
              Enterprise Security
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-400" />
              15+ African Markets
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-400" />
              AI-Powered Intelligence
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-400" />
              17K+ Active Users
            </div>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {selectedModules.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-white/40 mb-4">
            <BarChart3 className="h-16 w-16 mx-auto mb-4" />
          </div>
          <h4 className="text-xl font-semibold text-white mb-2">
            Select Modules to Compare
          </h4>
          <p className="text-white/60">
            Choose 2-3 modules above to see a detailed feature comparison
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ComparisonMatrix;
