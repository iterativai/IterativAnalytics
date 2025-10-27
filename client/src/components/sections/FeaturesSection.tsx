import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { featuresList } from "@/lib/constants";
import DashboardPreview from "@/components/dashboards/DashboardPreview";
import { 
  CheckCircle2, Sparkles, ArrowRight, TrendingUp, Zap, Shield, 
  Star, Rocket, Eye, MousePointer, Clock, Award
} from "lucide-react";
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };
  
  // Determine badge based on category
  const getBadge = () => {
    if (feature.category === 'startups') return { text: 'Popular', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' };
    if (feature.category === 'investors') return { text: 'Pro', color: 'bg-gradient-to-r from-purple-500 to-pink-500' };
    if (feature.category === 'partners') return { text: 'Enterprise', color: 'bg-gradient-to-r from-orange-500 to-red-500' };
    return { text: 'Featured', color: 'bg-gradient-to-r from-green-500 to-emerald-500' };
  };
  
  const badge = getBadge();
  
  return (
    <motion.div
      variants={featureVariants}
      className="h-full perspective-1000"
      onHoverStart={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      <Card className="relative h-full bg-gradient-to-br from-white via-gray-50/80 to-white dark:from-gray-900 dark:via-gray-800/80 dark:to-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden group hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
        {/* Animated gradient background on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.05), transparent 70%)",
          }}
        />
        
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(135deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)",
            backgroundSize: "200% 200%",
          }}
          animate={isHovered ? { backgroundPosition: ["0% 0%", "100% 100%"] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        
        {/* Badge */}
        <div className="absolute top-4 right-4 z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
          >
            <Badge className={`${badge.color} text-white border-0 shadow-lg px-3 py-1 text-xs font-semibold`}>
              <Star className="w-3 h-3 mr-1" />
              {badge.text}
            </Badge>
          </motion.div>
        </div>
        
        <CardContent className="relative p-5 sm:p-6 md:p-8 z-10">
          <motion.div 
            className="relative w-16 h-16 sm:w-20 sm:h-20 mb-5 sm:mb-6"
            variants={iconVariants}
            initial="rest"
            animate={isHovered ? "hover" : "rest"}
          >
            {/* Icon background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative w-full h-full bg-gradient-to-br from-primary/10 to-blue-500/10 dark:from-primary/20 dark:to-blue-500/20 rounded-2xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-blue-500/20 dark:group-hover:from-primary/30 dark:group-hover:to-blue-500/30 transition-all duration-300 border border-primary/10">
              <i className={`${feature.icon} text-primary text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300`}></i>
            </div>
          </motion.div>
          
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent group-hover:from-primary group-hover:via-blue-600 group-hover:to-primary dark:group-hover:from-primary dark:group-hover:via-blue-400 dark:group-hover:to-primary transition-all duration-300">
              {feature.title}
            </h3>
          </div>
          
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-5 sm:mb-6 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
            {feature.description}
          </p>
          
          <ul className="space-y-2.5 sm:space-y-3 mb-4">
            {feature.benefits.map((benefit, idx) => (
              <motion.li 
                key={idx} 
                className="flex items-start gap-2 sm:gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 + 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mt-0.5">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {benefit}
                </span>
              </motion.li>
            ))}
          </ul>
          
          {/* Enhanced hover reveal button */}
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              height: isHovered ? "auto" : 0,
              marginTop: isHovered ? 16 : 0
            }}
            className="overflow-hidden"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="pt-5 border-t border-gray-200/50 dark:border-gray-700/50">
              <Button 
                variant="ghost" 
                className="w-full group/btn bg-gradient-to-r from-primary/5 to-blue-500/5 hover:from-primary/10 hover:to-blue-500/10 text-primary font-semibold"
                size="sm"
              >
                Explore Feature
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-2 transition-transform duration-300" />
              </Button>
            </div>
          </motion.div>
        </CardContent>
        
        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-primary/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
    <section id="features" className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900/50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-gradient-to-r from-primary/3 to-blue-500/3 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10 border border-primary/20 dark:border-primary/30 mb-4 sm:mb-6 shadow-lg shadow-primary/5"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm sm:text-base font-semibold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Platform Features
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Rocket className="w-4 h-4 text-blue-500" />
            </motion.div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-5 md:mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-gray-900 via-primary to-blue-600 dark:from-white dark:via-primary dark:to-blue-400 bg-clip-text text-transparent">
              Powerful Tools for
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-primary dark:from-blue-400 dark:via-purple-400 dark:to-primary bg-clip-text text-transparent">
              Every Stage
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed px-4 max-w-3xl mx-auto"
          >
            Choose your path: upload existing plans for instant feedback, or build from scratch with AI guidance. 
            <span className="font-semibold text-gray-700 dark:text-gray-300"> Tailored solutions for everyone.</span>
          </motion.p>
          
          {/* Stats badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 sm:mt-8"
          >
            {[
              { icon: <Eye className="w-4 h-4" />, label: "5K+ Users", color: "from-blue-500 to-cyan-500" },
              { icon: <Award className="w-4 h-4" />, label: "98% Satisfaction", color: "from-purple-500 to-pink-500" },
              { icon: <Clock className="w-4 h-4" />, label: "70% Faster", color: "from-orange-500 to-red-500" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + idx * 0.1, type: "spring" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${stat.color} text-white text-sm font-semibold shadow-lg`}
              >
                {stat.icon}
                {stat.label}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Tab Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          {/* Main Tabs - Enhanced Design */}
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 flex flex-col sm:flex-row gap-2">
              {/* Glow effect behind active tab */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-2xl blur-xl opacity-50" />
              
              <motion.button
                onClick={() => handleTabChange('startups')}
                className={`relative px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${
                  activeTab === 'startups'
                    ? 'text-white shadow-xl'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gradient-to-r hover:from-gray-100/70 hover:to-gray-50/70 dark:hover:from-gray-700/70 dark:hover:to-gray-600/70'
                }`}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {activeTab === 'startups' && (
                  <>
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 via-primary to-blue-600 rounded-xl shadow-lg shadow-primary/30"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-400/50 to-primary/50 rounded-xl blur-md"
                      animate={{ opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </>
                )}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Zap className={`w-4 h-4 ${activeTab === 'startups' ? 'animate-pulse' : ''}`} />
                  For Startups
                </span>
              </motion.button>
              
              <motion.button
                onClick={() => handleTabChange('investors')}
                className={`relative px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${
                  activeTab === 'investors'
                    ? 'text-white shadow-xl'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gradient-to-r hover:from-gray-100/70 hover:to-gray-50/70 dark:hover:from-gray-700/70 dark:hover:to-gray-600/70'
                }`}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {activeTab === 'investors' && (
                  <>
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-gradient-to-r from-purple-500 via-primary to-pink-600 rounded-xl shadow-lg shadow-purple-500/30"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-400/50 to-pink-500/50 rounded-xl blur-md"
                      animate={{ opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </>
                )}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <TrendingUp className={`w-4 h-4 ${activeTab === 'investors' ? 'animate-pulse' : ''}`} />
                  For Investors
                </span>
              </motion.button>
              
              <motion.button
                onClick={() => handleTabChange('partners')}
                className={`relative px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${
                  activeTab === 'partners'
                    ? 'text-white shadow-xl'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gradient-to-r hover:from-gray-100/70 hover:to-gray-50/70 dark:hover:from-gray-700/70 dark:hover:to-gray-600/70'
                }`}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {activeTab === 'partners' && (
                  <>
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-gradient-to-r from-orange-500 via-primary to-red-600 rounded-xl shadow-lg shadow-orange-500/30"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-orange-400/50 to-red-500/50 rounded-xl blur-md"
                      animate={{ opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </>
                )}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Shield className={`w-4 h-4 ${activeTab === 'partners' ? 'animate-pulse' : ''}`} />
                  For Partners
                </span>
              </motion.button>
            </div>
          </div>
          
          {/* Enhanced Sub-tabs for Startups */}
          <AnimatePresence mode="wait">
            {activeTab === 'startups' && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                className="flex justify-center"
              >
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl p-2 inline-flex gap-2 shadow-xl border border-gray-200/50 dark:border-gray-700/50 w-full sm:w-auto">
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-xl blur-sm" />
                  
                  <motion.button
                    onClick={() => setStartupOption(1)}
                    className={`relative flex-1 sm:flex-none px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 ${
                      startupOption === 1
                        ? 'text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-gray-100/80 hover:to-gray-50/80 dark:hover:from-gray-700/80 dark:hover:to-gray-600/80 hover:text-gray-900 dark:hover:text-white'
                    }`}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {startupOption === 1 && (
                      <>
                        <motion.div
                          layoutId="startupOptionBg"
                          className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 rounded-lg shadow-lg shadow-blue-500/30"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-400/50 to-cyan-500/50 rounded-lg blur-sm"
                          animate={{ opacity: [0.4, 0.7, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </>
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <i className="fas fa-upload text-xs" />
                      Upload & Evaluate
                    </span>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setStartupOption(2)}
                    className={`relative flex-1 sm:flex-none px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 ${
                      startupOption === 2
                        ? 'text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-gray-100/80 hover:to-gray-50/80 dark:hover:from-gray-700/80 dark:hover:to-gray-600/80 hover:text-gray-900 dark:hover:text-white'
                    }`}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {startupOption === 2 && (
                      <>
                        <motion.div
                          layoutId="startupOptionBg"
                          className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 rounded-lg shadow-lg shadow-purple-500/30"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-purple-400/50 to-blue-500/50 rounded-lg blur-sm"
                          animate={{ opacity: [0.4, 0.7, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </>
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <i className="fas fa-robot text-xs" />
                      Build with AI
                    </span>
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

        {/* Enhanced How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 sm:mt-20 md:mt-24 lg:mt-32 relative"
        >
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent rounded-3xl -z-10" />
          
          <div className="text-center mb-10 sm:mb-12 md:mb-16 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-4"
            >
              <MousePointer className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Simple Process</span>
            </motion.div>
            
            <motion.h3 
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-gray-900 via-primary to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                How It Works
              </span>
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

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 max-w-6xl mx-auto px-4 sm:px-6">
            {/* Connecting lines for desktop */}
            <div className="hidden lg:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-green-500/50" />
            
            {[
              {
                icon: "fas fa-upload",
                title: "Upload Documents",
                description: "Upload your business plans, pitch decks, or financial models in seconds",
                gradient: "from-blue-500 to-cyan-500",
                delay: 0.1
              },
              {
                icon: "fas fa-brain",
                title: "AI Analysis",
                description: "Our AI analyzes your documents against industry benchmarks and investor expectations",
                gradient: "from-purple-500 to-pink-500",
                delay: 0.2
              },
              {
                icon: "fas fa-chart-line",
                title: "Get Insights",
                description: "Receive actionable recommendations and track improvements in real-time",
                gradient: "from-green-500 to-emerald-500",
                delay: 0.3
              }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: step.delay, type: "spring" }}
                viewport={{ once: true }}
                className="relative text-center group"
                whileHover={{ y: -12, scale: 1.02 }}
              >
                {/* Card */}
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-lg group-hover:shadow-2xl group-hover:border-primary/30 transition-all duration-500">
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                  
                  <div className="relative mb-6 sm:mb-8">
                    {/* Icon container */}
                    <div className={`relative w-24 h-24 sm:w-28 sm:h-28 mx-auto bg-gradient-to-br ${step.gradient} rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl group-hover:scale-110 transition-all duration-500`}>
                      {/* Pulse effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-3xl animate-ping opacity-20`} />
                      <i className={`${step.icon} text-3xl sm:text-4xl text-white relative z-10`}></i>
                    </div>
                    
                    {/* Step number badge */}
                    <motion.div 
                      className={`absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${step.gradient} text-white rounded-full flex items-center justify-center font-bold text-base sm:text-lg shadow-xl`}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ delay: step.delay + 0.3, type: "spring", stiffness: 200 }}
                      viewport={{ once: true }}
                    >
                      {idx + 1}
                    </motion.div>
                  </div>
                  
                  <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {step.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Decorative arrow for desktop */}
                  {idx < 2 && (
                    <div className="hidden lg:block absolute top-1/4 -right-8 text-gray-300 dark:text-gray-600">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Interactive Dashboard Preview - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 sm:mt-20 md:mt-24 lg:mt-32 relative"
        >
          {/* Header section with container */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-8 sm:mb-10 md:mb-12">
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-50 rounded-3xl pointer-events-none" />
            
            <div className="text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 mb-4"
              >
                <Eye className="w-4 h-4 text-green-500" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Live Preview</span>
              </motion.div>
              
              <motion.h3 
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="bg-gradient-to-r from-gray-900 via-green-600 to-blue-600 dark:from-white dark:via-green-400 dark:to-blue-400 bg-clip-text text-transparent">
                  See It In Action
                </span>
              </motion.h3>
              <motion.p 
                className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Experience the power of our platform with <span className="font-semibold text-gray-700 dark:text-gray-300">interactive dashboards</span> tailored for each user type
              </motion.p>
            </div>
          </div>
          
          {/* Full-width preview container */}
          <motion.div 
            className="relative w-full px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Glow effect around preview */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-blue-500/20 to-purple-500/20 blur-3xl opacity-20 pointer-events-none" />
            
            <div className="relative rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
              <DashboardPreview />
            </div>
            
            {/* Decorative corner accents */}
            <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-blue-500 rounded-full opacity-20 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-2xl pointer-events-none" />
          </motion.div>
        </motion.div>

        {/* Enhanced Additional Features Section */}
        {(activeTab === 'startups' || activeTab === 'investors' || activeTab === 'partners') && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 sm:mt-20 md:mt-24 lg:mt-32 px-4 sm:px-6 relative"
          >
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent rounded-3xl -z-10" />
            
            <div className="text-center mb-10 sm:mb-12 md:mb-14">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 mb-4"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Bonus Features</span>
              </motion.div>
              
              <motion.h3 
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="bg-gradient-to-r from-gray-900 via-purple-600 to-primary dark:from-white dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Additional Powerful Features
                </span>
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
              >
                Essential tools and capabilities that work across all user types
              </motion.p>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-6xl mx-auto"
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
