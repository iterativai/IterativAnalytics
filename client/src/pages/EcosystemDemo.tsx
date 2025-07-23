import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, Info, Target } from 'lucide-react';
import { Link } from 'wouter';
import { ModuleSelector } from '@/components/ecosystem/ModuleSelector';
import { ComparisonMatrix } from '@/components/ecosystem/ComparisonMatrix';
import { FadeIn } from '@/components/ui/animated';

const EcosystemDemo: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'selector' | 'comparison'>('selector');
  const [selectedModule, setSelectedModule] = useState('ventures');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">Ecosystem Implementation Demo</h1>
            <p className="text-slate-300 text-lg">
              Interactive module selector and comparison matrix based on the UI/UX guide
            </p>
          </div>
          <Link href="/">
            <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Section Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-slate-700/50 inline-flex">
            <button
              onClick={() => setActiveSection('selector')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                activeSection === 'selector'
                  ? 'bg-gradient-to-r from-cyan-600/50 to-blue-700/50 text-white shadow-md border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Target className="h-4 w-4" />
              Module Selector
            </button>
            <button
              onClick={() => setActiveSection('comparison')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                activeSection === 'comparison'
                  ? 'bg-gradient-to-r from-cyan-600/50 to-blue-700/50 text-white shadow-md border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Info className="h-4 w-4" />
              Comparison Matrix
            </button>
          </div>
        </div>

        {/* Content Sections */}
        {activeSection === 'selector' && (
          <FadeIn>
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-white mb-4">Interactive Module Selector</h2>
                <p className="text-slate-300 max-w-3xl mx-auto">
                  Choose the right solution for your startup journey. Each module is designed for specific 
                  stages and needs in the African startup ecosystem.
                </p>
              </div>
              
              <ModuleSelector 
                onModuleSelect={setSelectedModule}
                selectedModule={selectedModule}
              />
            </div>
          </FadeIn>
        )}

        {activeSection === 'comparison' && (
          <FadeIn>
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-white mb-4">Module Comparison Matrix</h2>
                <p className="text-slate-300 max-w-3xl mx-auto">
                  Compare features across modules to understand which solutions best fit your 
                  current and future needs.
                </p>
              </div>
              
              <ComparisonMatrix />
            </div>
          </FadeIn>
        )}

        {/* Implementation Notes */}
        <div className="mt-16 p-6 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-cyan-400" />
            Implementation Guide Features
          </h3>
          <div className="grid md:grid-cols-2 gap-8 text-sm text-slate-300">
            <div>
              <h4 className="font-medium text-white mb-4">Implemented Features:</h4>
              <ul className="space-y-2">
                <li>• Enhanced module selector with interactive cards</li>
                <li>• Module-specific color system and gradients</li>
                <li>• Feature comparison matrix with toggle selection</li>
                <li>• Status indicators (Available/Coming Soon)</li>
                <li>• Animated transitions and hover effects</li>
                <li>• Responsive design for mobile users</li>
                <li>• Best-for recommendations per module</li>
                <li>• Unified ecosystem branding</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">UI/UX Guide Alignment:</h4>
              <ul className="space-y-2">
                <li>• ✅ Ecosystem overview in hero section</li>
                <li>• ✅ Interactive module selector interface</li>
                <li>• ✅ Visual journey to help users find solutions</li>
                <li>• ✅ Unified brand identity with module colors</li>
                <li>• ✅ Module-specific presentations</li>
                <li>• ✅ Comparison tools for decision making</li>
                <li>• ✅ Mobile-first responsive design</li>
                <li>• ✅ Strategic CTAs for each module</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcosystemDemo;