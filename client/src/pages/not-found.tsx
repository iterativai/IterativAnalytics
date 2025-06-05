import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Home, AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#050d2e] to-[#0a1642] relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px] opacity-70"></div>
      
      {/* Animated blobs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-[pulse_8s_ease-in-out_infinite]"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-[pulse_7s_ease-in-out_1s_infinite]"></div>
      
      <div className="relative z-10 w-full max-w-md mx-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-xl"
        >
          <div className="p-6 sm:p-8">
            <div className="flex flex-col items-center text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  delay: 0.2,
                  duration: 0.8 
                }}
                className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-4"
              >
                <AlertCircle className="h-12 w-12 text-red-400" />
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-3xl font-bold text-white mb-2"
              >
                404 - Page Not Found
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-gray-300/80"
              >
                <p>
                  The page you are looking for doesn't exist or has been moved.
                </p>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            >
              <Button 
                asChild
                variant="outline" 
                className="border border-indigo-700/30 bg-indigo-950/30 text-white hover:bg-indigo-900/50 transition-all"
              >
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Link>
              </Button>
              
              <Button 
                asChild
                className="bg-gradient-to-r from-[#7c4dff] to-[#9d6dff] text-white hover:from-[#6a3bff] hover:to-[#8d5dff] shadow-lg transition-all"
              >
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Return Home
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-8 text-gray-400/60 text-sm"
        >
          <p>© {new Date().getFullYear()} Iterativ Planner. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
}
