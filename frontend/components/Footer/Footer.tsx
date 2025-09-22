import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Footer = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  
  // Text variations for the jumbotron loop
  const jumbotronTexts = [
    "HAVE FUN",
    "GET CREATIVE",
    "EXPLORE COLORS",
    "BE INSPIRED",
    "EXPRESS YOURSELF",
    "CREATE AWESOMENESS"
  ]

  // Animation variants for horizontal sliding with spring effect
  const jumbotronVariants = {
    initial: { 
      opacity: 0, 
      x: 300,
      scale: 0.8
    },
    animate: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: 0.6
      }
    },
    exit: {
      opacity: 0,
      x: -300,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  }

  // Set up interval to cycle through texts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % jumbotronTexts.length)
    }, 2000) // Change text every 2 seconds
    
    return () => clearInterval(interval)
  }, [jumbotronTexts.length])

  return (
    <footer className='bg-[#ff008a] min-h-70 mt-40 overflow-hidden'>
      <div className='flex flex-col p-5'>
        <h1 className='font-jersey-10 text-[50px] text-white'>colorP</h1>
        <p className='font-rethink-sans text-[14px] text-white'>Painting your ideas with awesome colors!</p>
      </div>
      
      <div className='h-24 flex items-center justify-center overflow-hidden mx-5 rounded-lg bg-gradient-to-r from-[#ff008a] to-[#e0007a] border-2 border-white/30 shadow-lg'>
        <AnimatePresence mode='wait'>
          <motion.h1
            key={currentTextIndex}
            className='font-jersey-10 text-white text-[45px] md:text-[65px] lg:text-[80px] absolute text-center px-4'
            variants={jumbotronVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {jumbotronTexts[currentTextIndex]}
          </motion.h1>
        </AnimatePresence>
      </div>
    
    </footer>
  )
}

export default Footer