import React, { useEffect, useState } from 'react';
import '../Fonts.css';
import type {AboutSectionProps, FloatingIconProps } from '../types/index'
import Palettes from '../src/images/The Palettes.svg'
import Quill_Ink from '../src/images/The Quill & Ink.svg'
import Flask from '../src/images/The Flask.svg'
import Bucket from '../src/images/Bucket.svg'
 

// Image URLs - commented out unused variables
// const imgEllipse119 = "http://localhost:3845/assets/a8f85b617f4645a7d0e91d46bdead2196c7847e0.png";
// const imgGroup = "http://localhost:3845/assets/6ec7be73da6c9781e19b45b209fa4ea1a73b1d98.svg";
// const imgGroup1 = "http://localhost:3845/assets/8b80ed74ea5f84b55b527a331bafd984531ce304.svg";
// const imgGroup2 = "http://localhost:3845/assets/d40a81b80ff63886adf8ce6f53964a022e2246b6.svg";
// const imgGroup3 = "http://localhost:3845/assets/85ba3731676873855e31c714c755b599db87da41.svg";


// Custom hook for floating animation
const useFloatingAnimation = (delay = 0) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Calculate the vertical offset with a sine wave
      const newOffset = Math.sin((elapsed + delay * 1000) / 2000) * 15;
      setOffset(newOffset);
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [delay]);

  return offset;
};

// Animation
const FloatingIcon: React.FC<FloatingIconProps> = ({ children, delay = 0 }) => {
  const offset = useFloatingAnimation(delay);
  
  return (
    <div style={{ transform: `translateY(${offset}px)`, transition: 'transform 0.3s ease' }}>
      {children}
    </div>
  );
};

// Fade-in component with custom animation
const FadeInSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease'
      }}
    >
      {children}
    </div>
  );
};

// Component for each section with icon and text
const AboutSection: React.FC<AboutSectionProps> = ({ icon, title, text, reverse = false }) => (
  <FadeInSection>
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-16 py-16`}>
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div className="max-w-lg">
        <h3 className="text-2xl md:text-3xl font-bold text-[#ff008a] mb-4 font-jersey-10">{title}</h3>
        <p className="text-[#3a3a3a] text-lg leading-relaxed font-rethink-sans">{text}</p>
      </div>
    </div>
  </FadeInSection>
);

const AboutUs: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-[#ff008a] text-2xl font-jersey-10">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 md:py-20">
        <h1 
          className="text-5xl md:text-7xl text-[#ff008a] text-center mb-16 font-jersey-10"
        >
          ABOUT US
        </h1>

        <div className="max-w-4xl mx-auto">
          <AboutSection
            icon={
              <FloatingIcon delay={0.2}>
                <div className="w-48 h-48 md:w-64 md:h-64">
                  <img src={Quill_Ink} alt="Art Box" className="w-full h-full" />
                </div>
              </FloatingIcon>
            }
            title="Your Playful Art Box"
            text="Think of us as your playful art box. Whether you're a designer, developer, or just someone who loves matching colors, we give you the tools to mix, match, and discover what makes your projects unique. After all, palettes aren't just about colors—they're about personality."
          />

          <AboutSection
            icon={
              <FloatingIcon delay={0.4}>
                <div className="w-48 h-48 md:w-64 md:h-64">
                  <img src={Palettes} alt="Quill & Ink" className="w-full h-full" />
                </div>
              </FloatingIcon>
            }
            title="Start With a Spark"
            text="Every idea starts with a spark. Just like an old-school quill dipping into ink, our palettes begin with inspiration—sometimes messy, sometimes bold, but always the first step toward something beautiful. We believe colors tell stories, and we're here to help you write yours."
            reverse={true}
          />

          <AboutSection
            icon={
              <FloatingIcon delay={0.6}>
                <div className="w-48 h-48 md:w-64 md:h-64">
                  <img src={Flask} alt="Experimentation" className="w-full h-full" />
                </div>
              </FloatingIcon>
            }
            title="Mad Scientists at Work"
            text="Behind the scenes, we experiment like mad scientists. Every gradient, every combination, every tiny hue has been tested, tweaked, and refined to make sure your experience feels smooth, creative, and maybe just a little magical. Because who says coding and chemistry don't mix?"
          />

          <AboutSection
            icon={
              <FloatingIcon delay={0.8}>
                <div className="w-48 h-48 md:w-64 md:h-64">
                  <img src={Bucket} alt="Paint Splash" className="w-full h-full" />
                </div>
              </FloatingIcon>
            }
            title="Splash It Everywhere"
            text="Finally, it's time to splash it everywhere. The paint can is our promise: the colors you create here aren't meant to stay locked away—they're meant to transform your projects, your brand, or maybe even your entire vibe. Dip in, get messy, and let your world shine brighter."
            reverse={true}
          />
        </div>
      </main>

    
    </div>
  );
};

export default AboutUs;