import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { howItWorksSteps } from "@/lib/constants";

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

type StepType = {
  icon: string;
  title: string;
  description: string;
};

const StepCard = ({ step, index }: { step: StepType, index: number }) => {
  return (
    <motion.div 
      className="relative"
      variants={itemVariants}
    >
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold z-10">
        {index + 1}
      </div>
      <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 relative z-0 h-full">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="mx-auto mb-6">
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              <i className={`${step.icon} text-5xl`}></i>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-3 text-center">{step.title}</h3>
          <p className="text-gray-600 text-center flex-grow">{step.description}</p>
          <div className="pt-4 text-center">
            <a href="#" className="text-primary hover:text-primary/80 font-medium inline-flex items-center">
              Learn more <i className="fas fa-arrow-right ml-2 text-sm"></i>
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const HowItWorksSection = () => {
  const [activeTab, setActiveTab] = useState<'startupsOption1' | 'startupsOption2' | 'investors' | 'partners'>('startupsOption1');
  
  // Get steps based on the active tab
  const getSteps = () => {
    return howItWorksSteps[activeTab] || [];
  };
  
  const currentSteps = getSteps();
  
  // Get title based on active tab
  const getTitle = () => {
    switch(activeTab) {
      case 'startupsOption1':
        return "Upload, Evaluate and Reiterate Your Existing Plans";
      case 'startupsOption2':
        return "Build Investor-Ready Plans, Faster & Smarter";
      case 'investors':
        return "Efficient, Fair, and Data-Driven Proposal Assessment";
      case 'partners':
        return "Enhanced Tools for Accelerators, Incubators & Advisors";
      default:
        return "Simple Steps to Transform Your Business Planning";
    }
  };

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4"
          >
            How It Works
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {getTitle()}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
          >
            Our intuitive platform makes it easy to get started and see results quickly.
          </motion.p>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-12">
          <div className="bg-white/80 rounded-lg p-1.5 inline-flex mb-6 shadow-sm border border-gray-100 flex-wrap md:flex-nowrap">
            <div className="relative group">
              <button
                onClick={() => setActiveTab('startupsOption1')}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-all inline-flex items-center ${
                  (activeTab === 'startupsOption1' || activeTab === 'startupsOption2')
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                For Startups <i className="fas fa-chevron-down ml-2"></i>
              </button>
              <div className="hidden group-hover:block absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1">
                  <button
                    onClick={() => setActiveTab('startupsOption1')}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      activeTab === 'startupsOption1'
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Upload
                  </button>
                  <button
                    onClick={() => setActiveTab('startupsOption2')}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      activeTab === 'startupsOption2'
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('investors')}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                activeTab === 'investors'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              For Investors
            </button>
            <button
              onClick={() => setActiveTab('partners')}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                activeTab === 'partners'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              For Partners
            </button>
          </div>
        </div>

        <motion.div 
          key={activeTab}
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {currentSteps.map((step, index) => (
            <StepCard key={`${activeTab}-${index}`} step={step} index={index} />
          ))}
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Button variant="outline" className="inline-flex items-center px-6 py-3 border border-primary/30 text-primary bg-white rounded-lg font-medium hover:bg-primary/5 transition-colors duration-200 h-auto">
            <i className="fas fa-play-circle mr-2"></i> Watch Demo Video
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
