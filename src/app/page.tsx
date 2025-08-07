"use client" 
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { backgrounds, buttonVariants, colors, animationDelays } from "@/lib/design-system";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/quiz/new');
  };

  return (
    <div className={backgrounds.main}>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20  h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40  h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <motion.main 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center">
            <motion.div 
              className="flex flex-col md:gap-10 max-w-4xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1 
                  className="text-2xl md:text-4xl underline decoration-4 uppercase font-serif decoration-violet-500 font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-6 md:mb-2 pt-2 md:pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  The Quizzard
                </motion.h1>
              {/* Glassmorphism card */}
              <div className={backgrounds.glassHover}>
                <motion.h2 
                  className="text-xl md:text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Test your knowledge of ANYTHING!
                </motion.h2>
                
                <motion.p 
                  className={`text-lg ${colors.text.secondary} mb-8 leading-relaxed`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Upload a PDF and generate a quiz using artificial intelligence. 
                  <span className={`block mt-2 ${colors.text.muted}`}>Transform any document into an interactive learning experience.</span>
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <button 
                    onClick={handleGetStarted}
                    className={buttonVariants.primary.base}
                  >
                    <span className={buttonVariants.primary.content}>Get Started</span>
                    <div className={buttonVariants.primary.overlay}></div>
                    <div className={buttonVariants.primary.shine}></div>
                  </button>
                </motion.div>
              </div>

              {/* Feature cards */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <div className={`backdrop-blur-lg ${colors.glass.bg} rounded-2xl ${colors.glass.border} p-6 ${colors.glass.hover} hover:scale-105 transition-all duration-300 group`}>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className={`${colors.text.primary} font-semibold mb-2`}>AI-Powered</h3>
                  <p className={`${colors.text.secondary} text-sm`}>Advanced AI generates intelligent questions from your documents</p>
                </div>

                <div className={`backdrop-blur-lg ${colors.glass.bg} rounded-2xl ${colors.glass.border} p-6 ${colors.glass.hover} hover:scale-105 transition-all duration-300 group`}>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className={`${colors.text.primary} font-semibold mb-2`}>Instant Results</h3>
                  <p className={`${colors.text.secondary} text-sm`}>Get your quiz ready in seconds with real-time processing</p>
                </div>

                <div className={`backdrop-blur-lg ${colors.glass.bg} rounded-2xl ${colors.glass.border} p-6 ${colors.glass.hover} hover:scale-105 transition-all duration-300 group`}>
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className={`${colors.text.primary} font-semibold mb-2`}>Track Progress</h3>
                  <p className={`${colors.text.secondary} text-sm`}>Monitor your learning progress with detailed analytics</p>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <div className="flex justify-center md:hidden"><button 
                    onClick={handleGetStarted}
                    className={buttonVariants.primary.base}
                  >
                    <span className={buttonVariants.primary.content}>Get Started</span>
                    <div className={buttonVariants.primary.overlay}></div>
                    <div className={buttonVariants.primary.shine}></div>
                  </button> </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.main>
        
      </div>
    </div>
  );
}
