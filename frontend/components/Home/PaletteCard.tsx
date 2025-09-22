import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Heart, HeartOff } from "lucide-react";
import type { PaletteCardProps } from "../../types";
import { ColorSquare } from "./ColorSquare";

export const PaletteCard: React.FC<PaletteCardProps> = ({ 
  palette, 
  onColorCopy,
  onAddToFavorites,
  onRemoveFromFavorites,
  isFavorite = false
}) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const copyAllColors = () => {
    const colorsString = palette.colors.join(", ");
    navigator.clipboard.writeText(colorsString);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
    onColorCopy && onColorCopy("All colors");
  };

  const handleColorCopy = (color: string) => {
    onColorCopy && onColorCopy(color);
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      onRemoveFromFavorites && onRemoveFromFavorites(palette.id);
    } else {
      onAddToFavorites && onAddToFavorites(palette);
    }
  };

  return (
    <div 
      className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 border border-[#E4E4E4] relative group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-0">
        <div className="flex-1">
          <h3 className="text-base sm:text-lg text-[#3A3A3A] truncate">
            {palette.name}
          </h3>
        </div>
        
        {/* Action Buttons Container */}
        <div className="flex items-center justify-between sm:justify-end gap-2">
          {palette.source && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full hidden sm:block">
              {palette.source}
            </span>
          )}
          
          {/* Favorite and Copy All Actions */}
          <div className="flex items-center gap-2">
            {/* Favorite Button - Always visible */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleFavorite}
              className={`p-2 rounded-full transition-colors ${
                isFavorite 
                  ? 'bg-[#ff008a] text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-[#ff008a] hover:text-white'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? <Heart size={16} fill="currentColor" /> : <Heart size={16} />}
            </motion.button>

            {/* Copy All Button */}
            <motion.button
              layout
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={copyAllColors}
              className="text-xs sm:text-sm text-[#ff008a] hover:text-pink-700 font-medium cursor-pointer flex items-center gap-1 whitespace-nowrap"
            >
              {copiedAll ? (
                <>
                  <Check size={16} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy all
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
        {palette.colors.map((color, index) => (
          <div key={index} onClick={() => handleColorCopy(color)}>
            <ColorSquare color={color} />
          </div>
        ))}
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {copiedAll && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-4 left-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium"
          >
            Copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};