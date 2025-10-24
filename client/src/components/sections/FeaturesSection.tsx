import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { featuresList } from "@/lib/constants";
import DashboardPreview from "@/components/dashboards/DashboardPreview";
import { CheckCircle2, Sparkles, ArrowRight, TrendingUp, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

// Animation variants with mobile-first approach
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const featureVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    } 
  }
};

const iconVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.1, 
    rotate: 5,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    }
  }
};

const FeatureCard = ({ feature, index }: { feature: typeof featuresList[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      variants={featureVariants}
      className="h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
    >
      <Card className="h-full bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
        <CardContent className="p-5 sm:p-6 md:p-8">
          <motion.div 
            className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300"
            variants={iconVariants}
            initial="rest"
            animate={isHovered ? "hover" : "rest"}
          >
            <i className={`${feature.icon} text-primary text-2xl sm:text-3xl`}></i>
          </motion.div>
          
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            {feature.title}
          </h3>
          
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 leading-relaxed">
            {feature.description}
          </p>
          
          <ul className="space-y-2 sm:space-y-3">
            {feature.benefits.map((benefit, idx) => (
              <motion.li 
                key={idx} 
                className="flex items-start gap-2 sm:gap-3"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {benefit}
                </span>
              </motion.li>
            ))}
          </ul>
          
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              height: isHovered ? "auto" : 0 
            }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
              <Button 
                variant="ghost" 
                className="w-full group/btn text-primary hover:bg-primary/5"
                size="sm"
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState<'startups' | 'investors' | 'partners'>('startups');
  const [startupOption, setStartupOption] = useState<1 | 2>(1);
  const [isTabChanging, setIsTabChanging] = useState(false);
  
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

  const handleTabChange = (tab: 'startups' | 'investors' | 'partners') => {
    setIsTabChanging(true);
    setActiveTab(tab);
    setTimeout(() => setIsTabChanging(false), 300);
  };

  return (
    <section id="features" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/20 mb-4 sm:mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm sm:text-base font-semibold text-primary">
              Features
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent leading-tight"
          >
            Powerful Tools for Every Stage
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed px-4"
          >
            Choose your path: upload existing plans for instant feedback, or build from scratch with AI guidance. Tailored solutions for startups, investors, and partners.
          </motion.p>
        </div>

        {/* Mobile-First Tab Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          {/* Main Tabs - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-lg border border-gray-200/50 dark:border-gray-700/50 flex flex-col sm:flex-row gap-1.5 sm:gap-2">
              <motion.button
                onClick={() => handleTabChange('startups')}
                className={`relative px-4 sm:px-6 py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                  activeTab === 'startups'
                    ? 'text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-700/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeTab === 'startups' && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 rounded-lg sm:rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  For Startups
                </span>
              </motion.button>
              
              <motion.button
                onClick={() => handleTabChange('investors')}
                className={`relative px-4 sm:px-6 py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                  activeTab === 'investors'
                    ? 'text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-700/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeTab === 'investors' && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 rounded-lg sm:rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  For Investors
                </span>
              </motion.button>
              
              <motion.button
                onClick={() => handleTabChange('partners')}
                className={`relative px-4 sm:px-6 py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                  activeTab === 'partners'
                    ? 'text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-700/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeTab === 'partners' && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 rounded-lg sm:rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  For Partners
                </span>
              </motion.button>
            </div>
          </div>
          
          {/* Sub-tabs for Startups - Mobile Optimized */}
          <AnimatePresence mode="wait">
            {activeTab === 'startups' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center"
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-1.5 inline-flex gap-1.5 shadow-md border border-gray-200/50 dark:border-gray-700/50 w-full sm:w-auto">
                  <motion.button
                    onClick={() => setStartupOption(1)}
                    className={`relative flex-1 sm:flex-none px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 ${
                      startupOption === 1
                        ? 'text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-700/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {startupOption === 1 && (
                      <motion.div
                        layoutId="startupOptionBg"
                        className="absolute inset-0 bg-gradient-to-r from-primary/90 to-blue-600/90 rounded-lg"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">Upload & Evaluate</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setStartupOption(2)}
                    className={`relative flex-1 sm:flex-none px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 ${
                      startupOption === 2
                        ? 'text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-700/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {startupOption === 2 && (
                      <motion.div
                        layoutId="startupOptionBg"
                        className="absolute inset-0 bg-gradient-to-r from-primary/90 to-blue-600/90 rounded-lg"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">Build with AI</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Section Title Based on Tab - Mobile Optimized */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${startupOption}-headline`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8 sm:mb-10 md:mb-12 px-4"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent leading-tight">
              {getTabTitle()}
            </h3>
          </motion.div>
        </AnimatePresence>

        {/* Features Grid - Mobile-First Responsive */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${activeTab}-${startupOption}-grid`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-0"
            variants={containerVariants}
            initial="hidden"
            animate={isTabChanging ? "hidden" : "visible"}
            viewport={{ once: true, amount: 0.1 }}
          >
            {filteredFeatures.map((feature, index) => (
              <FeatureCard key={`${activeTab}-${startupOption}-${index}`} feature={feature} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* How It Works Quick Steps - Mobile-First */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 sm:mt-16 md:mt-20 lg:mt-24"
        >
          <div className="text-center mb-8 sm:mb-10 md:mb-12 px-4">
            <motion.h3 
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              How It Works
            </motion.h3>
            <motion.p 
              className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Get started in minutes with our intuitive, AI-powered workflow
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
              whileHover={{ y: -8 }}
            >
              <div className="relative mb-6 sm:mb-8">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <i className="fas fa-upload text-2xl sm:text-3xl md:text-4xl text-white"></i>
                </div>
                <div className="absolute -top-2 -right-2 sm:top-0 sm:right-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base shadow-lg">1</div>
              </div>
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">Upload Documents</h4>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">Upload your business plans, pitch decks, or financial models in seconds</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
              whileHover={{ y: -8 }}
            >
              <div className="relative mb-6 sm:mb-8">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <i className="fas fa-brain text-2xl sm:text-3xl md:text-4xl text-white"></i>
                </div>
                <div className="absolute -top-2 -right-2 sm:top-0 sm:right-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base shadow-lg">2</div>
              </div>
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">AI Analysis</h4>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">Our AI analyzes your documents against industry benchmarks and investor expectations</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center group sm:col-span-2 lg:col-span-1"
              whileHover={{ y: -8 }}
            >
              <div className="relative mb-6 sm:mb-8">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <i className="fas fa-chart-line text-2xl sm:text-3xl md:text-4xl text-white"></i>
                </div>
                <div className="absolute -top-2 -right-2 sm:top-0 sm:right-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base shadow-lg">3</div>
              </div>
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">Get Insights</h4>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">Receive actionable recommendations and track improvements in real-time</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Interactive Dashboard Preview - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 px-4 sm:px-6"
        >
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <motion.h3 
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              See It In Action
            </motion.h3>
            <motion.p 
              className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Experience the power of our platform with interactive dashboards tailored for each user type
            </motion.p>
          </div>
          <div className="bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <DashboardPreview />
          </div>
        </motion.div>

        {/* General Features - Mobile Optimized */}
        {(activeTab === 'startups' || activeTab === 'investors' || activeTab === 'partners') && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 sm:mt-16 md:mt-20 px-4 sm:px-6"
          >
            <motion.h3 
              className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Additional Powerful Features
            </motion.h3>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {featuresList
                .filter(feature => feature.category === 'general')
                .map((feature, index) => (
                  <FeatureCard key={`general-${index}`} feature={feature} index={index} />
                ))
              }
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;
