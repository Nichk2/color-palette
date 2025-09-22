import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Edit3, Trash2, Heart, Sparkles } from "lucide-react";
import type { CollectionPaletteCardProps } from "../../types";
import { ColorSquare } from "../Home/ColorSquare";

export const CollectionPaletteCard: React.FC<CollectionPaletteCardProps> = ({ 
  palette, 
  onColorCopy, 
  onRemoveFromCollection, 
  onEditPalette 
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div 
      className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 border border-[#E4E4E4] relative group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 gap-2 sm:gap-0">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base sm:text-lg text-[#3A3A3A] truncate">
              {palette.name}
            </h3>
            <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
              palette.type === 'created' 
                ? 'bg-green-100 text-green-600' 
                : 'bg-pink-100 text-pink-600'
            }`}>
              {palette.type === 'created' ? (
                <>
                  <Sparkles size={12} />
                  Created
                </>
              ) : (
                <>
                  <Heart size={12} />
                  Favorite
                </>
              )}
            </span>
          </div>
          <p className="text-xs text-gray-500">{formatDate(palette.dateCreated)}</p>
          {palette.tags && palette.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {palette.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Action Buttons Container - Aligned with Copy All button */}
        <div className="flex items-center justify-between sm:justify-end gap-2 mt-2 sm:mt-0 relative">
          {/* Edit and Delete Actions */}
          <AnimatePresence>
            {showActions && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="flex gap-2"
              >
                {palette.type === 'created' && onEditPalette && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onEditPalette(palette.id)}
                    className="bg-[#ff008a] text-white p-2 rounded-full hover:bg-[#e0007a] transition-colors shadow-md"
                    title="Edit Palette"
                  >
                    <Edit3 size={16} />
                  </motion.button>
                )}
                {onRemoveFromCollection && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onRemoveFromCollection(palette.id)}
                    className="bg-[#ff008a] text-white p-2 rounded-full hover:bg-[#e0007a] transition-colors shadow-md"
                    title={palette.type === 'favorite' ? 'Remove from Favorites' : 'Delete Palette'}
                  >
                    <Trash2 size={16} />
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

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
      
      <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
        {palette.colors.map((color, index) => (
          <div key={index} onClick={() => handleColorCopy(color)}>
            <ColorSquare color={color} />
          </div>
        ))}
      </div>
    </div>
  );
};