import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import SignIn from "@/components/SignIn";
import { useAuth } from "@/lib/AuthProvider";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const { user } = useAuth();
  const [_, navigate] = useLocation();
  
  // Redirect authenticated users to app
  useEffect(() => {
    if (user) {
      navigate('/app');
    }
  }, [user, navigate]);
  const testimonials = [
    {
      quote: "Iterativ Startups helped us secure $1.2M in funding by optimizing our pitch deck and business plan metrics.",
      author: "Sarah Johnson",
      company: "TechStart Inc.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      quote: "The AI analysis pointed out critical gaps in our financial projections that we were able to fix before presenting to investors.",
      author: "Michael Chen",
      company: "Quantum Finance",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      quote: "We've seen a 40% improvement in our investor meetings conversion rate since using Iterativ Startups.",
      author: "Alicia Rodriguez",
      company: "EcoSolutions",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];
  
  const animatedRef = useRef<HTMLDivElement>(null);
  const [isAnimatedVisible, setIsAnimatedVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
    }, 3000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Check if animated section is visible
      if (animatedRef.current) {
        const rect = animatedRef.current.getBoundingClientRect();
        setIsAnimatedVisible(
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
        );
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Dashboard demo data
  const [dashboardMetrics, setDashboardMetrics] = useState({
    marketFit: 80,
    investorReadiness: 75,
    financialHealth: 68
  });

  // Simulate live updating dashboard metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardMetrics(prev => ({
        marketFit: Math.min(100, Math.max(60, prev.marketFit + (Math.random() * 6 - 3))),
        investorReadiness: Math.min(100, Math.max(60, prev.investorReadiness + (Math.random() * 6 - 3))),
        financialHealth: Math.min(100, Math.max(50, prev.financialHealth + (Math.random() * 6 - 3)))
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-indigo-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.43,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.43C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
              </svg>
            </motion.div>
            <motion.span 
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              iterativ
            </motion.span>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-white/80 hover:text-white transition relative group">
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#testimonials" className="text-white/80 hover:text-white transition relative group">
              Testimonials
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#pricing" className="text-white/80 hover:text-white transition relative group">
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>
          
          <div className="hidden md:flex space-x-4">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10 transition-all duration-300"
              onClick={() => setIsSignInOpen(true)}
            >
              Log In
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-450 to-indigo-450 hover:from-blue-550 hover:to-indigo-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              onClick={() => setIsSignInOpen(true)}
            >
              Get Started
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden bg-indigo-800/95 backdrop-blur-lg shadow-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-5 space-y-5">
                <a 
                  href="#features" 
                  className="block text-lg font-medium text-white" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#testimonials" 
                  className="block text-lg font-medium text-white" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testimonials
                </a>
                <a 
                  href="#pricing" 
                  className="block text-lg font-medium text-white" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </a>
                <div className="pt-4 flex flex-col space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full text-white border-white/20"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsSignInOpen(true);
                    }}
                  >
                    Log In
                  </Button>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsSignInOpen(true);
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section - with padding to account for fixed header */}
      <section className="container mx-auto px-4 pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <motion.div
              className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-blue-400 font-medium">For Startups & Investors</span>
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-violet-300">
                Iterativ Planner
              </span>
              <br />
              <span className="text-white">AI-Driven Business Success</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-white/80 mb-8 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Transform your business plans and pitch decks into investor-ready documents with AI-powered insights, real-time analytics, and intelligent optimization.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <form onSubmit={handleSubmit} className="flex max-w-md mb-8 relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-l-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitted}
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-r-md font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                  disabled={isSubmitted}
                >
                  Schedule a Demo
                </button>
                
                {/* Success message */}
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div 
                      className="absolute -bottom-12 left-0 right-0 text-center text-green-300 bg-green-900/40 rounded-md py-2 backdrop-blur-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Thank you! We'll be in touch shortly.</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2 text-sm text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,17V16H9V14H13V13H10A1,1 0 0,1 9,12V9A1,1 0 0,1 10,8H11V7H13V8H15V10H11V11H14A1,1 0 0,1 15,12V15A1,1 0 0,1 14,16H13V17H11Z" />
              </svg>
              <span>No credit card required • 14-day free trial</span>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative hidden md:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white/5 p-4 rounded-lg shadow-xl backdrop-blur-sm transform rotate-1 border border-white/10 hover:rotate-0 transition-transform duration-500">
              <div className="relative z-10 overflow-hidden rounded-md">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Iterativ Dashboard Preview" 
                  className="rounded-md w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent"></div>
                
                {/* Dashboard overlay elements */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex justify-between items-end">
                    <div className="text-white font-medium">Project Health Overview</div>
                    <div className="flex items-center text-white/70 text-sm">
                      <span className="mr-2">Last updated:</span>
                      <span className="text-white">Just now</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating UI elements */}
              <motion.div 
                className="absolute top-1/4 -left-16 bg-white/10 p-3 rounded-lg backdrop-blur-sm shadow-lg w-60 border border-white/20"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                  <span className="text-sm font-medium">Market Fit Score</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full mb-1">
                  <motion.div 
                    className="h-2 bg-green-400 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${Math.round(dashboardMetrics.marketFit)}%` }}
                    transition={{ duration: 1 }}
                  ></motion.div>
                </div>
                <span className="text-xs text-white/70">{Math.round(dashboardMetrics.marketFit)}% - Above industry average</span>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-12 -right-12 bg-white/10 p-3 rounded-lg backdrop-blur-sm shadow-lg border border-white/20 w-64"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                  <span className="text-sm font-medium">Investor Readiness</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full mb-2">
                  <motion.div 
                    className="h-2 bg-blue-400 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${Math.round(dashboardMetrics.investorReadiness)}%` }}
                    transition={{ duration: 1 }}
                  ></motion.div>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-white/70">{Math.round(dashboardMetrics.investorReadiness)}%</span>
                  <span className="text-xs text-green-400">↑ 12% from last week</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute top-1/2 -right-14 bg-white/10 p-3 rounded-lg backdrop-blur-sm shadow-lg border border-white/20 w-56"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-amber-400 mr-2"></div>
                  <span className="text-sm font-medium">Financial Health</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full mb-1">
                  <motion.div 
                    className="h-2 bg-amber-400 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${Math.round(dashboardMetrics.financialHealth)}%` }}
                    transition={{ duration: 1 }}
                  ></motion.div>
                </div>
                <span className="text-xs text-white/70">{Math.round(dashboardMetrics.financialHealth)}% - Improvement needed</span>
              </motion.div>
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-blue-500/20 filter blur-3xl animate-pulse"></div>
            <div className="absolute -z-10 bottom-0 right-0 w-56 h-56 rounded-full bg-purple-500/20 filter blur-3xl animate-pulse" style={{ animationDelay: '1s'}}></div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16" ref={animatedRef}>
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isAnimatedVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Transform Your Business Planning
          </motion.h2>
          <motion.p 
            className="text-xl text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isAnimatedVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our AI-powered platform evaluates your business plans and pitch decks to provide data-driven insights and recommendations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            initial={{ opacity: 0, y: 20 }}
            animate={isAnimatedVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg transition-all duration-300">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-300 transition-colors">Document Analysis</h3>
            <p className="text-white/70 group-hover:text-white/90 transition-colors">Upload your business plans and pitch decks for comprehensive AI analysis across multiple key performance dimensions.</p>
          </motion.div>

          <motion.div 
            className="bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            initial={{ opacity: 0, y: 20 }}
            animate={isAnimatedVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg transition-all duration-300">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-pink-300 transition-colors">Performance Metrics</h3>
            <p className="text-white/70 group-hover:text-white/90 transition-colors">Get detailed scores on feasibility, scalability, financial health, innovation, and market fit with industry benchmarks.</p>
          </motion.div>

          <motion.div 
            className="bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            initial={{ opacity: 0, y: 20 }}
            animate={isAnimatedVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg transition-all duration-300">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-amber-300 transition-colors">AI Recommendations</h3>
            <p className="text-white/70 group-hover:text-white/90 transition-colors">Receive personalized improvement suggestions to strengthen weak areas and optimize your business strategy.</p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Join the businesses that have transformed their planning process with Iterativ Planner.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden shadow-xl">
            <div className="relative">
              {/* Testimonial tabs */}
              <div className="flex border-b border-white/10">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={index}
                    className={`flex-1 py-3 px-4 text-sm font-medium ${activeTab === index ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white/80'} transition-colors`}
                    onClick={() => setActiveTab(index)}
                  >
                    {testimonial.company}
                  </button>
                ))}
              </div>
              
              {/* Testimonial content */}
              <div className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col md:flex-row gap-6 items-start"
                  >
                    <div className="flex-shrink-0">
                      <img 
                        src={testimonials[activeTab].avatar} 
                        alt={testimonials[activeTab].author}
                        className="w-16 h-16 rounded-full border-2 border-white/20"
                      />
                    </div>
                    <div>
                      <p className="italic text-white/90 text-lg mb-4">"{testimonials[activeTab].quote}"</p>
                      <div>
                        <div className="font-semibold">{testimonials[activeTab].author}</div>
                        <div className="text-white/60 text-sm">{testimonials[activeTab].company}</div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Progress bar */}
              <div className="h-1 bg-white/10">
                <motion.div 
                  className="h-1 bg-blue-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((activeTab + 1) / testimonials.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo section with interactive elements */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-6">See How It Works</h2>
            <p className="text-white/80 text-lg mb-8">
              Our AI-powered platform analyzes your business documents across multiple dimensions to provide comprehensive insights and actionable recommendations.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mt-1 flex-shrink-0">
                  <span className="font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Upload Your Documents</h3>
                  <p className="text-white/70">Simply upload your business plan, pitch deck, or financial projections in common formats like PDF, PPTX, or DOCX.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center mt-1 flex-shrink-0">
                  <span className="font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">AI Analysis</h3>
                  <p className="text-white/70">Our AI engine analyzes your documents, extracting key metrics and comparing them against industry standards and investor expectations.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center mt-1 flex-shrink-0">
                  <span className="font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Get Actionable Insights</h3>
                  <p className="text-white/70">Receive a detailed report with scores, visualizations, and specific improvement recommendations to enhance your business documents.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link href="/app">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                  Try it for Free
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative z-10 bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm text-white/60">Iterativ Report</div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Overall Score</h3>
                    <div className="text-lg font-bold text-blue-400">78/100</div>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full">
                    <motion.div 
                      className="h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "78%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                      viewport={{ once: true }}
                    ></motion.div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium">Feasibility</h4>
                      <div className="text-sm font-bold">85%</div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full">
                      <motion.div 
                        className="h-2 bg-green-500 rounded-full"
                        initial={{ width: "0%" }}
                        whileInView={{ width: "85%" }}
                        transition={{ duration: 1, delay: 0.6 }}
                        viewport={{ once: true }}
                      ></motion.div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium">Scalability</h4>
                      <div className="text-sm font-bold">72%</div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full">
                      <motion.div 
                        className="h-2 bg-yellow-500 rounded-full"
                        initial={{ width: "0%" }}
                        whileInView={{ width: "72%" }}
                        transition={{ duration: 1, delay: 0.7 }}
                        viewport={{ once: true }}
                      ></motion.div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium">Financial Health</h4>
                      <div className="text-sm font-bold">68%</div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full">
                      <motion.div 
                        className="h-2 bg-yellow-500 rounded-full"
                        initial={{ width: "0%" }}
                        whileInView={{ width: "68%" }}
                        transition={{ duration: 1, delay: 0.8 }}
                        viewport={{ once: true }}
                      ></motion.div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium">Market Fit</h4>
                      <div className="text-sm font-bold">88%</div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full">
                      <motion.div 
                        className="h-2 bg-green-500 rounded-full"
                        initial={{ width: "0%" }}
                        whileInView={{ width: "88%" }}
                        transition={{ duration: 1, delay: 0.9 }}
                        viewport={{ once: true }}
                      ></motion.div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Key Recommendations</h3>
                  <ul className="space-y-2 text-sm text-white/80">
                    <motion.li 
                      className="flex items-start space-x-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1 }}
                      viewport={{ once: true }}
                    >
                      <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>Strengthen financial projections with more detailed cash flow analysis</span>
                    </motion.li>
                    <motion.li 
                      className="flex items-start space-x-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.1 }}
                      viewport={{ once: true }}
                    >
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Market fit analysis is strong, highlighting clear customer needs</span>
                    </motion.li>
                    <motion.li 
                      className="flex items-start space-x-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                      viewport={{ once: true }}
                    >
                      <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>Provide more details on scaling strategy for years 3-5</span>
                    </motion.li>
                  </ul>
                </div>
                
                <div className="flex justify-between text-sm">
                  <div className="text-white/60">Generated on March 27, 2025</div>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors">
                    View Full Report
                  </button>
                </div>
              </div>
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 rounded-full bg-blue-500/10 filter blur-3xl animate-pulse"></div>
            <div className="absolute -z-10 -top-10 -left-10 w-64 h-64 rounded-full bg-purple-500/10 filter blur-3xl animate-pulse" style={{ animationDelay: '0.5s'}}></div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Choose the plan that's right for your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div 
            className="bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 overflow-hidden"
            whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.2 } }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Starter</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">$29</span>
                <span className="text-white/60">/month</span>
              </div>
              <p className="text-white/70 mb-6">Perfect for entrepreneurs and early-stage startups.</p>
              <ul className="space-y-3 mb-8">
                {['5 document analyses per month', 'Basic performance metrics', 'Email support', '14-day history'].map((feature) => (
                  <li key={feature} className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors text-white font-medium">
                Get Started
              </button>
            </div>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-blue-800/50 to-indigo-800/50 rounded-xl backdrop-blur-sm border border-white/20 overflow-hidden shadow-xl relative transform md:-translate-y-4 md:scale-105"
            whileHover={{ scale: 1.04, y: -10, transition: { duration: 0.2 } }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="absolute top-0 left-0 right-0 bg-blue-500/80 text-white text-sm font-medium py-1 text-center">
              Most Popular
            </div>
            <div className="p-8 pt-7">
              <h3 className="text-2xl font-semibold mb-2">Professional</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$79</span>
                <span className="text-white/60">/month</span>
              </div>
              <p className="text-white/70 mb-6">Ideal for growing businesses seeking investor funding.</p>
              <ul className="space-y-3 mb-8">
                {[
                  '20 document analyses per month', 
                  'Advanced performance metrics', 
                  'Priority email & chat support', 
                  'Unlimited history',
                  'Competitor analysis',
                  'Investor readiness dashboard'
                ].map((feature) => (
                  <li key={feature} className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-colors text-white font-medium shadow-lg">
                Get Started
              </button>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 overflow-hidden"
            whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.2 } }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">$199</span>
                <span className="text-white/60">/month</span>
              </div>
              <p className="text-white/70 mb-6">For established businesses with complex needs.</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited document analyses', 
                  'Custom integrations', 
                  'Dedicated support manager', 
                  'Team collaboration',
                  'Custom reporting',
                  'API access'
                ].map((feature) => (
                  <li key={feature} className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors text-white font-medium">
                Contact Sales
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div 
          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 0.6 } }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="relative z-10 text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1, transition: { duration: 0.6, delay: 0.2 } }}
              viewport={{ once: true }}
            >
              Ready to Optimize Your Business Plans?
            </motion.h2>
            <motion.p 
              className="text-xl text-white/80 max-w-2xl mx-auto mb-8"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1, transition: { duration: 0.6, delay: 0.4 } }}
              viewport={{ once: true }}
            >
              Join thousands of businesses already using Iterativ Planner to create better business plans and secure more funding.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1, transition: { duration: 0.6, delay: 0.6 } }}
              viewport={{ once: true }}
            >
              <Link href="/app">
                <Button className="px-8 py-3 bg-white text-indigo-700 hover:bg-white/90 font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                  Start Your Free Trial
                </Button>
              </Link>
            </motion.div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-900/50 rounded-full filter blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </motion.div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-white/10 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Webinars</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.43,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.43C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
              </svg>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                iterativ
              </span>
            </div>
            <div className="text-white/60 text-sm">
              © {new Date().getFullYear()} Iterativ Planner. All rights reserved.
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
                </svg>
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20,3H4A1,1 0 0,0 3,4V20A1,1 0 0,0 4,21H11.63V14.97H8.945V11.92H11.63V9.64C11.63,7.01 13.18,5.57 15.55,5.57C16.705,5.57 17.855,5.74 17.855,5.74V8.32H16.47C15.075,8.32 14.675,9.16 14.675,10.02V11.92H17.71L17.23,14.97H14.675V21H20A1,1 0 0,0 21,20V4A1,1 0 0,0 20,3Z" />
                </svg>
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                </svg>
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Sign In Dialog */}
      <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="sr-only">Authentication</DialogTitle>
          <SignIn />
        </DialogContent>
      </Dialog>
    </div>
  );
}