import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Upload, FileText, Play, ArrowRight } from 'lucide-react';
import { useTheme } from '@/components/ui/sector-theme-selector';

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ open, onOpenChange }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    sector: '',
    documentType: ''
  });
  const { currentTheme } = useTheme();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    // Demo submission logic
    alert('Demo request submitted! We\'ll contact you within 24 hours.');
    onOpenChange(false);
    setStep(1);
    setFormData({
      name: '',
      email: '',
      company: '',
      sector: '',
      documentType: ''
    });
  };

  const stepVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
              style={{ background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.accent})` }}
            >
              <Play className="h-4 w-4" />
            </div>
            Try Iterativ Planner Demo
          </DialogTitle>
        </DialogHeader>

        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  stepNum <= step 
                    ? 'text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}
                style={stepNum <= step ? { 
                  background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.accent})` 
                } : {}}
              >
                {stepNum}
              </div>
              {stepNum < 3 && (
                <div 
                  className={`w-12 h-1 mx-2 transition-all duration-300 ${
                    stepNum < step ? 'opacity-100' : 'bg-gray-200'
                  }`}
                  style={stepNum < step ? { 
                    background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.accent})` 
                  } : {}}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="min-h-[300px]"
          >
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold mb-2">Let's get started</h3>
                  <p className="text-gray-600">Tell us about yourself and your business</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Your Startup Name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sector">Business Sector</Label>
                  <Select value={formData.sector} onValueChange={(value) => setFormData(prev => ({ ...prev, sector: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fintech">FinTech</SelectItem>
                      <SelectItem value="healthtech">HealthTech</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="sustainability">Sustainability</SelectItem>
                      <SelectItem value="edtech">EdTech</SelectItem>
                      <SelectItem value="foodtech">FoodTech</SelectItem>
                      <SelectItem value="mobility">Mobility</SelectItem>
                      <SelectItem value="proptech">PropTech</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold mb-2">Choose Demo Type</h3>
                  <p className="text-gray-600">What would you like to analyze?</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    { value: 'business-plan', label: 'Business Plan', icon: FileText, desc: 'Upload your business plan for comprehensive analysis' },
                    { value: 'pitch-deck', label: 'Pitch Deck', icon: Upload, desc: 'Analyze your investor presentation' },
                    { value: 'financial-model', label: 'Financial Model', icon: FileText, desc: 'Review your financial projections' }
                  ].map((option) => (
                    <div
                      key={option.value}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        formData.documentType === option.value
                          ? 'border-opacity-100 bg-opacity-10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={formData.documentType === option.value ? {
                        borderColor: currentTheme.colors.primary,
                        backgroundColor: currentTheme.colors.primary + '10'
                      } : {}}
                      onClick={() => setFormData(prev => ({ ...prev, documentType: option.value }))}
                    >
                      <div className="flex items-start space-x-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: currentTheme.colors.primary + '20' }}
                        >
                          <option.icon className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{option.label}</h4>
                          <p className="text-sm text-gray-600">{option.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold mb-2">You're all set!</h3>
                  <p className="text-gray-600">We'll prepare a personalized demo for you</p>
                </div>

                <div 
                  className="p-6 rounded-xl border-2"
                  style={{ 
                    backgroundColor: currentTheme.colors.primary + '10',
                    borderColor: currentTheme.colors.primary + '30'
                  }}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Company:</span>
                      <span className="font-medium">{formData.company}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sector:</span>
                      <span className="font-medium">{formData.sector}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Demo Type:</span>
                      <span className="font-medium">{formData.documentType?.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Our team will prepare a personalized demo environment</li>
                    <li>• You'll receive login credentials within 24 hours</li>
                    <li>• Schedule a guided walkthrough with our experts</li>
                    <li>• Get insights specific to your industry and use case</li>
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 1}
            className="px-6"
          >
            Previous
          </Button>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="px-6"
            >
              Cancel
            </Button>
            
            {step < 3 ? (
              <Button
                onClick={handleNext}
                disabled={
                  (step === 1 && (!formData.name || !formData.email || !formData.company || !formData.sector)) ||
                  (step === 2 && !formData.documentType)
                }
                className="px-6"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.accent})`,
                  color: 'white'
                }}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="px-6"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.accent})`,
                  color: 'white'
                }}
              >
                Request Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};