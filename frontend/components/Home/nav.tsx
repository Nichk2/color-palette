import React, { useState } from "react";
import { Link, useLocation } from 'react-router';
import type { HeaderProps } from "../../types";
import Profile from '../../src/images/profile.svg'

const Nav: React.FC<HeaderProps> = ({
  onLinkClick 
}) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const getActiveLink = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/':
      case '/home':
        return 'Home';
      case '/collection':
        return 'Collection';
      case '/create':
        return 'Create';
      case '/about':
        return 'About us';
      default:
        if (path.includes('/collection')) return 'Collection';
        if (path.includes('/create')) return 'Create';
        if (path.includes('/about')) return 'About us';
        if (path.includes('/home')) return 'Home';
        return 'Home';
    }
  };

  const activeLink = getActiveLink();

  const handleLinkClick = (link: string) => {
    if (onLinkClick) {
      onLinkClick(link);
    }
    // Close mobile menu when a link is clicked
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 flex justify-between items-center relative">
      {/* Logo */}
      <Link 
        to="/" 
        className="text-2xl sm:text-3xl md:text-4xl text-[#ff008a] font-jersey-10 hover:opacity-80 transition-opacity z-50"
        onClick={() => handleLinkClick("Home")}
      >
        colorP
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 lg:gap-8 items-center font-rethink-sans">
        <Link 
          to="/" 
          className={`transition-colors text-sm lg:text-base ${activeLink === "Home" ? "text-[#ff008a] font-semibold" : "text-[#494949] hover:text-[#ff008a]"}`}
          onClick={() => handleLinkClick("Home")}
        >
          Home
        </Link>

        <Link 
          to="/collection" 
          className={`transition-colors text-sm lg:text-base ${activeLink === "Collection" ? "text-[#ff008a] font-semibold" : "text-[#494949] hover:text-[#ff008a]"}`}
          onClick={() => handleLinkClick("Collection")}
        >
          Collection
        </Link>
        
        <Link 
          to="/create" 
          className={`transition-colors text-sm lg:text-base ${activeLink === "Create" ? "text-[#ff008a] font-semibold" : "text-[#494949] hover:text-[#ff008a]"}`}
          onClick={() => handleLinkClick("Create")}
        >
          Create
        </Link>
        
        <Link 
          to="/about" 
          className={`transition-colors text-sm lg:text-base ${activeLink === "About us" ? "text-[#ff008a] font-semibold" : "text-[#494949] hover:text-[#ff008a]"}`}
          onClick={() => handleLinkClick("About us")}
        >
          About us
        </Link>
        
        <Link to="/settings"><img 
          src={Profile} 
          alt="Profile" 
          className="w-10 h-10 lg:w-12 lg:h-12 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => handleLinkClick("Profile")}
        /></Link>
      </nav>
      
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-[#494949] z-50"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Navigation Menu */}
      <div className={`
        md:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col items-center justify-center h-full space-y-8 relative">

          <Link 
            to="/" 
            className={`text-xl transition-colors ${activeLink === "Home" ? "text-[#ff008a] font-semibold" : "text-[#494949] hover:text-[#ff008a]"}`}
            onClick={() => handleLinkClick("Home")}
          >
            Home
          </Link>

          <Link 
            to="/collection" 
            className={`text-xl transition-colors ${activeLink === "Collection" ? "text-[#ff008a] font-semibold" : "text-[#494949] hover:text-[#ff008a]"}`}
            onClick={() => handleLinkClick("Collection")}
          >
            Collection
          </Link>
          
          <Link 
            to="/create" 
            className={`text-xl transition-colors ${activeLink === "Create" ? "text-[#ff008a] font-semibold" : "text-[#494949] hover:text-[#ff008a]"}`}
            onClick={() => handleLinkClick("Create")}
          >
            Create
          </Link>
          
          <Link 
            to="/about" 
            className={`text-xl transition-colors ${activeLink === "About us" ? "text-[#ff008a] font-semibold" : "text-[#494949] hover:text-[#ff008a]"}`}
            onClick={() => handleLinkClick("About us")}
          >
            About us
          </Link>
          
          <div className="flex items-center space-x-4 mt-8">
            <img 
              src={Profile} 
              alt="Profile" 
              className="w-12 h-12 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handleLinkClick("Profile")}
            />
            <span className="text-[#494949]">Profile</span>
          </div>
        </div>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMobileMenu}
        />
      )}
    </header>
  );
};

export default Nav;