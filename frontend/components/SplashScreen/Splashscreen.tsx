import { motion, type Variants, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SplashScreenProps {
  onAnimationComplete?: () => void;
  onSkip?: () => void;
}

const SplashScreen = ({ onAnimationComplete, onSkip }: SplashScreenProps) => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showLogo, setShowLogo] = useState(false);
  
  // Logo text
  const logoText = "colorP";
  
  // Animation sequence control
  useEffect(() => {
    // Show welcome text for 2 seconds, then show logo
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false);
      setShowLogo(true);
    }, 2000);

    return () => clearTimeout(welcomeTimer);
  }, []);

  // Animation variants for "WELCOME TO" text
  const welcomeVariants: Variants = {
    hidden: { x: '-100vw', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: "easeIn"
      }
    }
  };

  // Animation variants for logo letters
  const letterVariants: Variants = {
    hidden: { y: '100vh', opacity: 0 },
    visible: (i: number) => ({ 
      y: 0, 
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div 
      className="fixed inset-0 flex justify-center items-center bg-white z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={onAnimationComplete}
    >
      {/* Skip button */}
      {onSkip && (
        <button 
          onClick={onSkip}
          className="absolute top-4 right-4 text-gray-600 hover:text-[#ff008a] transition-colors p-2 rounded-full hover:bg-gray-100"
          aria-label="Skip splash screen"
        >
          <X size={24} />
        </button>
      )}
      
      <div className="text-center relative h-40">
        {/* "WELCOME TO" text sliding from left */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              className="text-[#3a3a3a] text-5xl md:text-6xl font-jersey-10 absolute inset-0 flex items-center justify-center"
              variants={welcomeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              WELCOME TO
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Logo text with staggered letter animation */}
        <AnimatePresence>
          {showLogo && (
            <motion.div
              className="flex justify-center absolute inset-0 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {logoText.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-[#ff008a] text-7xl md:text-8xl lg:text-9xl font-jersey-10 mx-1"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SplashScreen;