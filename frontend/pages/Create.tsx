import React, { useState, useRef, useEffect } from "react";
import { Heart } from "lucide-react";
import { savePalettesToStorage, getPalettesFromStorage, addCreatedToCollection } from '../src/utils/storage';
import { CreatePaletteCard } from '../components/Create/CreatePaletteCard';
import { downloadPaletteDataAsImage } from '../src/utils/downloadutils';
import type { ColorPalette } from '../types/index';
import { ColorTile } from '../components/Create/ColorTile';
import { CopyNotificationModal } from '../components/Create/NotificatioModal';

export const Create: React.FC = () => {
  const paletteRef = useRef<HTMLDivElement>(null);
  const [palette, setPalette] = useState<ColorPalette>({
    id: "1",
    name: "",
    style: "",
    colors: ["#D9D9D9", "#D9D9D9", "#D9D9D9", "#D9D9D9", "#D9D9D9"],
    dateCreated: new Date().toISOString(),
  });
  
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [copiedColor, setCopiedColor] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [savedPalettes, setSavedPalettes] = useState<ColorPalette[]>([]);

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...palette.colors];
    newColors[index] = color;
    setPalette({ ...palette, colors: newColors });
  };

  const copyColorCode = (color: string, index: number) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setCopiedColor(color);
    setShowCopyNotification(true);
    setTimeout(() => {
      setCopiedIndex(null);
      setShowCopyNotification(false);
    }, 2000);
  };
  
  // Load saved palettes from localStorage on component mount
  useEffect(() => {
    const storedPalettes = getPalettesFromStorage();
    setSavedPalettes(storedPalettes);
  }, []);

  // Save to localStorage whenever savedPalettes changes
  useEffect(() => {
    savePalettesToStorage(savedPalettes);
  }, [savedPalettes]);

  const showNotification = (color: string) => {
    setCopiedColor(color);
    setShowCopyNotification(true);
    setTimeout(() => setShowCopyNotification(false), 2000);
  };

  const saveToCollection = () => {
    if (!palette.name.trim()) {
      alert("Please enter a name for your palette");
      return;
    }
    
    // Add to saved palettes
    const newPalette = { ...palette, id: Date.now().toString() };
    const newSavedPalettes = [...savedPalettes, newPalette];
    setSavedPalettes(newSavedPalettes);
    // Persist into Collection store as 'created'
    addCreatedToCollection({ ...newPalette });
    setIsSaved(true);
    
    setPalette({
      id: Date.now().toString(),
      name: "",
      style: "",
      colors: ["#D9D9D9", "#D9D9D9", "#D9D9D9", "#D9D9D9", "#D9D9D9"],
      dateCreated: new Date().toISOString(),
    });
    
    setTimeout(() => setIsSaved(false), 3000);
  };

  const removeFromCollection = (id: string) => {
    const newSavedPalettes = savedPalettes.filter(p => p.id !== id);
    setSavedPalettes(newSavedPalettes);
  };

  const downloadAsPng = async () => {
    try {
      // Check if all colors are still the default gray
      const isDefaultPalette = palette.colors.every(color => color === "#D9D9D9");
      if (isDefaultPalette) {
        alert("Please customize your colors before downloading");
        return;
      }
      
      if (!palette.name.trim()) {
        alert("Please enter a name for your palette before downloading");
        return;
      }
      
      await downloadPaletteDataAsImage(palette.colors, palette.name);
    } catch (error) {
      console.error('Error downloading palette:', error);
      alert('Failed to download palette. Please try again.');
    }
  };

  return (
    <div className="min-h-screen font-rethink-sans">
      <CopyNotificationModal show={showCopyNotification} color={copiedColor} />
      
      <main className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-5 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="">
          <h1 className="lg:text-[40px] text-[30px] text-[#3A3A3A] font-jersey-10 mb-2 ">Create your own!</h1>
        </div>
        {/* Info Text */}
        <div className="mb-8  text-gray-600">
          <p>Create and customize your perfect 5-color palette. Click on any color to change it, give it a name, and save it to your collection.</p>
        </div>

        {/* Palette Creation Form */}
        <div ref={paletteRef} className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 border border-[#E4E4E4] mb-8">
          {/* Color Palette Display - Fixed to 5 colors */}
          <div className="grid grid-cols-5 gap-2 sm:gap-3 md:gap-4 justify-center mb-8">
            {palette.colors.map((color, index) => (
              <ColorTile
                key={index}
                color={color}
                index={index}
                onColorChange={handleColorChange}
                onColorCopy={copyColorCode}
                copiedIndex={copiedIndex}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <button 
              onClick={saveToCollection}
              className="group relative w-[190px] inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-[#ff008a] px-6 font-medium text-white font-jersey-10 transition-all duration-100 hover:bg-pink-700 cursor-pointer [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]"
            >
              <Heart size={18} className="mr-2" fill={isSaved ? "currentColor" : "none"} />
              {isSaved ? "Saved!" : "Add to collection"}
            </button>
          </div>
          

          {/* Form Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                value={palette.name}
                onChange={(e) => setPalette({...palette, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#ff008a] focus:border-[#ff008a]"
                placeholder="Enter palette name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Style
              </label>
              <input
                type="text"
                value={palette.style}
                onChange={(e) => setPalette({...palette, style: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#ff008a] focus:border-[#ff008a]"
                placeholder="e.g. Minimal, Vibrant, Pastel..."
              />
            </div>
          </div>
          
          <button 
            onClick={downloadAsPng}
            className="group mt-10 relative w-[130px] h-12 overflow-hidden rounded-md bg-[#ff008a] px-6 font-medium text-white font-jersey-10 transition-all duration-100 hover:bg-pink-700 cursor-pointer [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]"
          >
            Download PNG
          </button>
        </div>

        {/* Display Saved Palettes */}
        {savedPalettes.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-[#3A3A3A] mb-6">Your Saved Palettes</h3>
            <div className="space-y-5 sm:space-y-6 md:space-y-8">
              {savedPalettes.map((savedPalette) => (
                <CreatePaletteCard
                  key={savedPalette.id}
                  palette={savedPalette}
                  onRemoveFromCollection={removeFromCollection}
                  onColorCopy={showNotification}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};