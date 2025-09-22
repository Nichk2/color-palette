import { useState, useEffect } from 'react';
import Home from '../pages/Home';
import AboutUs from '../pages/About Us';
import Settings from '../pages/Settings'
import Nav from '../components/Home/nav';
import Collection from '../pages/Collection'
import Footer from '../components/Footer/Footer'
import {Create} from '../pages/Create'
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import SplashScreen from '../components/SplashScreen/Splashscreen';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Auto-hide splash screen after 5 seconds (enough time for both animations)
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleNavLinkClick = (link: string) => {
    console.log('Nav link clicked:', link);
    // You can add analytics or other side effects here
  };

  const handleSkipSplash = () => {
    setShowSplash(false);
  };

  return (
    <Router>
      <div className="min-h-screen">
        {showSplash && (
          <SplashScreen 
            onAnimationComplete={() => setShowSplash(false)} 
            onSkip={handleSkipSplash}
          />
        )}
        
        {!showSplash && (
          <>
            <Nav onLinkClick={handleNavLinkClick} />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/create" element={<Create />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
            <Footer/>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;