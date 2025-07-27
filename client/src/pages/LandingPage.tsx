import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import SignIn from "@/components/SignIn";
import { useAuth } from "@/lib/AuthProvider";
import { 
  Rocket, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Building,
  CreditCard,
  Search,
  Network,
  Zap,
  Star,
  PlayCircle
} from "lucide-react";

import EnhancedNavbar from '@/components/layout/EnhancedNavbar';
import EnhancedHeroSection from '@/components/sections/EnhancedHeroSection';

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeModule, setActiveModule] = useState("ventures");
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

  const modules = [
    {
      id: "ventures",
      name: "Iterativ Ventures",
      tagline: "AI-Powered Business Intelligence",
      description: "Transform your business plans and pitch decks with AI-powered insights, real-time analytics, and intelligent optimization.",
      status: "available",
      color: "#667eea",
      gradient: "from-blue-600 to-indigo-600",
      icon: Rocket,
      features: [
        "AI Business Plan Analysis",
        "Investor Readiness Scoring", 
        "Financial Model Optimization",
        "Market Fit Assessment",
        "Pitch Deck Enhancement"
      ],
      ctaPrimary: "Start Free Analysis",
      ctaSecondary: "Watch Demo",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "xchange",
      name: "Iterativ Xchange", 
      tagline: "Blockchain Capital Markets",
      description: "Connect startups with investors through our innovative blockchain-powered capital marketplace and equity tokenization platform.",
      status: "available",
      color: "#764ba2",
      gradient: "from-purple-600 to-pink-600",
      icon: Network,
      features: [
        "Equity Tokenization Platform",
        "African Equity Exchange (AEX)",
        "Smart Investor Matching",
        "Cross-border Payment Solutions",
        "Secondary Market Trading"
      ],
      ctaPrimary: "Join Network",
      ctaSecondary: "Browse Opportunities", 
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "sourcing",
      name: "Iterativ Sourcing",
      tagline: "Smart Supply Chain Management",
      description: "Intelligent supply chain management with AI-powered supplier matching, procurement optimization, and automated workflows.",
      status: "coming-soon",
      color: "#8b5cf6",
      gradient: "from-violet-600 to-purple-600",
      icon: Search,
      features: [
        "Smart Supplier Matching",
        "Procurement Automation",
        "Performance Analytics",
        "Risk Intelligence",
        "Payment Management"
      ],
      ctaPrimary: "Join Waitlist",
      ctaSecondary: "Request Demo",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const testimonials = [
    {
      quote: "Iterativ Ventures helped us secure $1.2M in funding by optimizing our pitch deck and business plan metrics.",
      author: "Sarah Johnson",
      company: "TechStart Inc.",
      module: "ventures",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      quote: "Through Iterativ Xchange, we connected with the perfect investors for our Series A. The platform made the process seamless.",
      author: "Michael Chen", 
      company: "Quantum Finance",
      module: "xchange",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      quote: "Can't wait for Iterativ Sourcing to launch. The beta preview shows exactly what we need for our supply chain optimization.",
      author: "Alicia Rodriguez",
      company: "EcoSolutions",
      module: "sourcing",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
    }, 3000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentModule = modules.find(m => m.id === activeModule) || modules[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white">
      {/* Header */}
      <EnhancedNavbar />
      
      {/* Hero Section */}
      <EnhancedHeroSection />

      {/* Featured Module Section */}
      <section className="container mx-auto px-4 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <div className="flex items-center mb-6">
                <div className={`bg-gradient-to-r ${currentModule.gradient} rounded-xl p-4 mr-4`}>
                  <currentModule.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{currentModule.name}</h2>
                  <p className="text-white/60">{currentModule.tagline}</p>
                </div>
              </div>

              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                {currentModule.description}
              </p>

              <div className="space-y-3 mb-8">
                {currentModule.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center text-white/80"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  className={`bg-gradient-to-r ${currentModule.gradient} hover:opacity-90 px-8 py-6 text-lg`}
                  disabled={currentModule.status === 'coming-soon'}
                >
                  {currentModule.ctaPrimary}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  {currentModule.ctaSecondary}
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/5 p-4 rounded-xl shadow-xl backdrop-blur-sm transform rotate-1 border border-white/10 hover:rotate-0 transition-transform duration-500">
                <img 
                  src={currentModule.image}
                  alt={`${currentModule.name} Preview`}
                  className="rounded-md w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent rounded-xl"></div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex justify-between items-end">
                    <div className="text-white font-medium">{currentModule.name} Dashboard</div>
                    <div className="flex items-center text-white/70 text-sm">
                      <span className="mr-2">Status:</span>
                      <span className={`text-${currentModule.status === 'available' ? 'green' : 'yellow'}-400`}>
                        {currentModule.status === 'available' ? 'Live' : 'Coming Soon'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div 
                className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-20 filter blur-3xl"
                style={{ backgroundColor: currentModule.color }}
              ></div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted by African Entrepreneurs</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Join the businesses transforming their operations with our ecosystem platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full border-2 border-white/20 mr-4"
                />
                <div>
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-white/60 text-sm">{testimonial.company}</div>
                </div>
                <div className="ml-auto">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    testimonial.module === 'ventures' ? 'bg-blue-500/20 text-blue-300' :
                    testimonial.module === 'xchange' ? 'bg-purple-500/20 text-purple-300' :
                    'bg-violet-500/20 text-violet-300'
                  }`}>
                    {modules.find(m => m.id === testimonial.module)?.name.split(' ')[1]}
                  </span>
                </div>
              </div>
              <p className="text-white/80 italic">"{testimonial.quote}"</p>
            </motion.div>
          ))}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Startup Journey?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Choose your path in the Iterativ ecosystem. Start with any module and unlock the full potential of your African startup.
            </p>

            <form onSubmit={handleSubmit} className="flex max-w-md mx-auto mb-8 relative">
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
                Get Full Access
              </button>

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
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Thank you! We'll be in touch shortly.</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <div className="flex items-center justify-center space-x-2 text-sm text-white/60">
              <Star className="w-5 h-5 fill-current" />
              <span>No credit card required • 14-day free trial • Full ecosystem access</span>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-900/50 rounded-full filter blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl p-2">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                  Iterativ Analytics
                </span>
              </div>
              <p className="text-white/60 text-sm max-w-md">
                Democratising financial intelligence, capital access, and operational efficiency for African startups through integrated AI and blockchain solutions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Modules</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#ventures" className="hover:text-white transition-colors">Iterativ Ventures</a></li>
                <li><a href="#xchange" className="hover:text-white transition-colors">Iterativ Xchange</a></li>
                <li><a href="#sourcing" className="hover:text-white transition-colors">Iterativ Sourcing</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/60 text-sm">
            © {new Date().getFullYear()} Iterativ Analytics. All rights reserved. Built for African entrepreneurs.
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