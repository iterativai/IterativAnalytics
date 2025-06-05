import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/modals/AuthModal";
import { DemoModal } from "@/components/modals/DemoModal";
import { useAuth } from "@/hooks/use-auth";

const CTASection = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const { user } = useAuth();

  const openAuthModal = () => {
    setAuthModalOpen(true);
  };

  const openDemoModal = () => {
    setDemoModalOpen(true);
  };

  return (
    <>
      <AuthModal 
        defaultTab="register"
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
      />

      <DemoModal
        open={demoModalOpen}
        onOpenChange={setDemoModalOpen}
      />

      <section className="apple-section bg-apple-gray-50 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-white pointer-events-none"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-200 opacity-20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center apple-glass p-10 md:p-16 rounded-3xl shadow-apple"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="md:text-4xl font-semibold text-foreground mb-6">
              Ready to Transform Your Business Planning?
            </h2>
            
            <p className="text-xl text-apple-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses using Iterativ Planner to make smarter decisions and accelerate growth.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <Button 
                className="apple-button text-base font-medium px-8 py-2.5 h-auto"
                size="lg"
                onClick={openAuthModal}
              >
                Start Your Free Trial
              </Button>
              
              <Button 
                variant="outline" 
                className="rounded-full bg-white text-primary-600 border-apple-gray-200 hover:border-primary-300 hover:bg-primary-50 font-medium px-8 py-2.5 h-auto transition-all"
                size="lg"
                onClick={openDemoModal}
              >
                Start with Demo
              </Button>
            </div>
            
            <p className="text-apple-gray-500 mt-6 text-sm">No credit card required. 14-day free trial.</p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CTASection;