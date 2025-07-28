import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { featuresList } from "@/lib/constants";
import DashboardPreview from "@/components/dashboards/DashboardPreview";

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const FeatureCard = ({ feature, index }: { feature: typeof featuresList[0], index: number }) => {
  return (
    <motion.div
      variants={featureVariants}
      className="h-full"
    >
      <Card className="h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
        <CardContent className="p-6">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <i className={`${feature.icon} text-primary text-xl`}></i>
          </div>
          <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
          <p className="text-gray-600 mb-4">{feature.description}</p>
          <ul className="space-y-2">
            {feature.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start">
                <i className="fas fa-check text-[#10B981] mt-1 mr-2"></i>
                <span className="text-gray-600">{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState<'startups' | 'investors' | 'partners'>('startups');
  const [startupOption, setStartupOption] = useState<1 | 2>(1);
  
  // Filter features based on active tab and option
  const getFilteredFeatures = () => {
    if (activeTab === 'startups') {
      return featuresList.filter(
        feature => feature.category === 'startups' && feature.option === startupOption
      );
    } else if (activeTab === 'investors') {
      return featuresList.filter(feature => feature.category === 'investors');
    } else if (activeTab === 'partners') {
      return featuresList.filter(feature => feature.category === 'partners');
    }
    return featuresList.filter(feature => !feature.category || feature.category === 'general');
  };

  const filteredFeatures = getFilteredFeatures();

  // Get title based on active tab
  const getTabTitle = () => {
    switch(activeTab) {
      case 'startups':
        return startupOption === 1 
          ? "Upload, Evaluate and Reiterate Your Existing Plans"
          : "Build Investor-Ready Plans, Faster & Smarter";
      case 'investors':
        return "Efficient, Fair, and Data-Driven Proposal Assessment";
      case 'partners':
        return "Enhanced Tools for Accelerators, Incubators & Advisors";
      default:
        return "Everything You Need for Successful Business Planning";
    }
  };

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4"
          >
            Features
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Everything You Need for Successful Business Planning
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
          >
            Our AI-powered platform provides all the tools you need to plan, model, and present your business with confidence.
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-10">
          <div className="bg-white/80 rounded-lg p-1.5 inline-flex mb-6 shadow-sm border border-gray-100 flex-wrap md:flex-nowrap">
            <div className="relative group">
              <button
                onClick={() => setActiveTab('startups')}
                className={`px-5 py-2.5 rounded-md font-medium transition-all inline-flex items-center ${
                  activeTab === 'startups'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                For Startups <i className="fas fa-chevron-down ml-2"></i>
              </button>
              <div className="hidden group-hover:block absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1">
                  <button
                    onClick={() => setStartupOption(1)}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      startupOption === 1
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Upload & Evaluate
                  </button>
                  <button
                    onClick={() => setStartupOption(2)}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      startupOption === 2
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Build with AI Co-Founder
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('investors')}
              className={`px-5 py-2.5 rounded-md font-medium transition-all ${
                activeTab === 'investors'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              For Investors
            </button>
            <button
              onClick={() => setActiveTab('partners')}
              className={`px-5 py-2.5 rounded-md font-medium transition-all ${
                activeTab === 'partners'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              For Partners
            </button>
          </div>
          
          {/* Sub-tabs for Startups */}
          {activeTab === 'startups' && (
            <div className="w-full flex justify-center mb-8">
              <div className="bg-white/60 rounded-lg p-1 inline-flex shadow-sm border border-gray-100">
                <div className="relative group">
                  <button
                    className={`px-5 py-2 rounded-md font-medium text-sm transition-all inline-flex items-center ${
                      activeTab === 'startups'
                        ? 'bg-primary/10 text-primary shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Choose Option <i className="fas fa-chevron-down ml-2"></i>
                  </button>
                  <div className="hidden group-hover:block absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      <button
                        onClick={() => setStartupOption(1)}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          startupOption === 1
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Upload & Evaluate
                      </button>
                      <button
                        onClick={() => setStartupOption(2)}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          startupOption === 2
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Build with AI Co-Founder
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section Title Based on Tab */}
        <motion.div
          key={`${activeTab}-${startupOption}-headline`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
            {getTabTitle()}
          </h3>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          key={`${activeTab}-${startupOption}-grid`}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {filteredFeatures.map((feature, index) => (
            <FeatureCard key={`${activeTab}-${startupOption}-${index}`} feature={feature} index={index} />
          ))}
        </motion.div>

        {/* Interactive Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Interactive Dashboard Preview</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the power of our platform with interactive dashboards tailored for each user type.
              Explore real-time metrics and insights designed for your specific needs.
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <DashboardPreview />
          </div>
        </motion.div>

        {/* General Features */}
        {(activeTab === 'startups' || activeTab === 'investors' || activeTab === 'partners') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-center mb-8">Additional Powerful Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuresList
                .filter(feature => feature.category === 'general')
                .map((feature, index) => (
                  <FeatureCard key={`general-${index}`} feature={feature} index={index} />
                ))
              }
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;
