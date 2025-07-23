import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, AlertTriangle, CheckCircle2, Users, Target, CreditCard } from 'lucide-react';

interface FlowStep {
  id: string;
  title: string;
  description: string;
  status: 'current' | 'pain-point' | 'improved';
  issues?: string[];
  improvements?: string[];
}

const currentFlow: FlowStep[] = [
  {
    id: 'landing',
    title: 'Landing Page',
    description: 'User arrives at homepage',
    status: 'current'
  },
  {
    id: 'hero',
    title: 'Hero Section',
    description: 'Complex value proposition with 3 modules',
    status: 'pain-point',
    issues: [
      'Information overload with 3 modules',
      'Competing CTAs confuse users',
      '2 primary buttons create decision paralysis'
    ]
  },
  {
    id: 'navigation',
    title: 'Navigation',
    description: 'User tries to understand offerings',
    status: 'pain-point',
    issues: [
      'Unclear difference between Solutions/Features',
      '5 nav items + theme controls overwhelm',
      'Mobile navigation overlaps'
    ]
  },
  {
    id: 'features',
    title: 'Features Overview',
    description: 'Detailed feature exploration',
    status: 'current'
  },
  {
    id: 'demo',
    title: 'Demo Modal',
    description: 'Disconnected demo experience',
    status: 'pain-point',
    issues: [
      'No clear post-demo path',
      'Demo not contextual to user needs',
      'No onboarding flow'
    ]
  },
  {
    id: 'contact',
    title: 'Contact Form',
    description: 'Generic contact without module specificity',
    status: 'pain-point',
    issues: [
      'No module-specific interest capture',
      'No role-based form fields',
      'Missing qualification questions'
    ]
  }
];

const improvedFlow: FlowStep[] = [
  {
    id: 'landing',
    title: 'Landing Page',
    description: 'User arrives with clear value prop',
    status: 'improved',
    improvements: [
      'Single clear headline',
      'One primary CTA: "Explore Solutions"',
      'Simplified navigation (3 items)'
    ]
  },
  {
    id: 'role-selection',
    title: 'Role Selection',
    description: 'User identifies their role',
    status: 'improved',
    improvements: [
      'Founder/Investor/Partner options',
      'Personalized content path',
      'Contextual demo experience'
    ]
  },
  {
    id: 'module-selection',
    title: 'Module Selection',
    description: 'Choose relevant solution module',
    status: 'improved',
    improvements: [
      'Progressive disclosure of complexity',
      'Role-specific recommendations',
      'Clear module differentiation'
    ]
  },
  {
    id: 'personalized-demo',
    title: 'Contextual Demo',
    description: 'Tailored demo experience',
    status: 'improved',
    improvements: [
      'Role and module-specific demo',
      'Interactive product tour',
      'Clear next steps'
    ]
  },
  {
    id: 'qualification',
    title: 'Smart Qualification',
    description: 'Intelligent lead capture',
    status: 'improved',
    improvements: [
      'Progressive profiling',
      'Module-specific questions',
      'Automatic lead scoring'
    ]
  },
  {
    id: 'onboarding',
    title: 'Guided Onboarding',
    description: 'Smooth transition to platform',
    status: 'improved',
    improvements: [
      'Step-by-step setup',
      'Role-based tutorials',
      'Quick wins early'
    ]
  }
];

export const UserFlowDiagram: React.FC = () => {
  const FlowCard: React.FC<{ step: FlowStep; index: number; isLast: boolean }> = ({ 
    step, 
    index, 
    isLast 
  }) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'pain-point': return 'border-red-200 bg-red-50';
        case 'improved': return 'border-green-200 bg-green-50';
        default: return 'border-gray-200 bg-gray-50';
      }
    };

    const getStatusIcon = (status: string) => {
      switch (status) {
        case 'pain-point': return <AlertTriangle className="h-5 w-5 text-red-500" />;
        case 'improved': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
        default: return <Users className="h-5 w-5 text-gray-500" />;
      }
    };

    return (
      <div className="relative">
        <Card className={`w-full max-w-sm mx-auto ${getStatusColor(step.status)}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                {getStatusIcon(step.status)}
                {step.title}
              </CardTitle>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/80">
                Step {index + 1}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-gray-600 mb-3">
              {step.description}
            </p>
            
            {step.issues && (
              <div className="mb-3">
                <h4 className="text-xs font-semibold text-red-600 mb-2 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Pain Points
                </h4>
                <ul className="space-y-1">
                  {step.issues.map((issue, idx) => (
                    <li key={idx} className="text-xs text-red-700 flex items-start gap-1">
                      <span className="text-red-400 mt-0.5">•</span>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {step.improvements && (
              <div>
                <h4 className="text-xs font-semibold text-green-600 mb-2 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Improvements
                </h4>
                <ul className="space-y-1">
                  {step.improvements.map((improvement, idx) => (
                    <li key={idx} className="text-xs text-green-700 flex items-start gap-1">
                      <span className="text-green-400 mt-0.5">•</span>
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
        
        {!isLast && (
          <div className="flex justify-center my-4">
            <ArrowRight className="h-6 w-6 text-gray-400" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          User Journey Flow Analysis
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Comprehensive analysis of current user pain points and proposed improvements 
          for the Iterativ Analytics platform experience.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Current Flow */}
        <div>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-red-600 mb-2 flex items-center justify-center gap-2">
              <AlertTriangle className="h-6 w-6" />
              Current User Journey
            </h3>
            <p className="text-gray-600">
              Identifying friction points and areas for improvement
            </p>
          </div>
          
          <div className="space-y-6">
            {currentFlow.map((step, index) => (
              <FlowCard 
                key={step.id} 
                step={step} 
                index={index} 
                isLast={index === currentFlow.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Improved Flow */}
        <div>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-green-600 mb-2 flex items-center justify-center gap-2">
              <CheckCircle2 className="h-6 w-6" />
              Proposed Improved Journey
            </h3>
            <p className="text-gray-600">
              Streamlined experience with reduced friction
            </p>
          </div>
          
          <div className="space-y-6">
            {improvedFlow.map((step, index) => (
              <FlowCard 
                key={step.id} 
                step={step} 
                index={index} 
                isLast={index === improvedFlow.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="mt-12 bg-blue-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
          <Target className="h-5 w-5" />
          Expected Impact
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">-35%</div>
            <div className="text-sm text-blue-800">Bounce Rate Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">+60%</div>
            <div className="text-sm text-blue-800">Demo Completion Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">+45%</div>
            <div className="text-sm text-blue-800">Conversion Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFlowDiagram;