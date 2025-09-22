import React, { useState, useRef } from "react";
import { Check, Sparkles, Download } from "lucide-react";
import type { ColorPalette } from '../../types/index';
import { downloadPaletteDataAsImage } from '../../src/utils/downloadutils';

export const CreatePaletteCard: React.FC<{
  palette: ColorPalette;
  onColorCopy?: (color: string) => void;
  onRemoveFromCollection?: (id: string) => void;
}> = ({ palette, onColorCopy, onRemoveFromCollection }) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const paletteRef = useRef<HTMLDivElement>(null);

  const copyAllColors = () => {
    const colorsString = palette.colors.join(", ");
    navigator.clipboard.writeText(colorsString);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
    onColorCopy && onColorCopy("All colors");
  };

  const handleColorCopy = (color: string, index: number) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
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

  const downloadPaletteAsImage = async () => {
    try {
      await downloadPaletteDataAsImage(palette.colors, palette.name || 'color-palette');
    } catch (error) {
      console.error('Error downloading palette:', error);
      alert('Failed to download palette. Please try again.');
    }
  };

  return (
    <div ref={paletteRef} className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 border border-[#E4E4E4] relative">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 gap-2 sm:gap-0">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base sm:text-lg text-[#3A3A3A] truncate">
              {palette.name}
            </h3>
            <span className="text-xs px-2 py-1 rounded-full flex items-center gap-1 bg-green-100 text-green-600">
              <Sparkles className="w-3 h-3" /> Created
            </span>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-xs text-gray-500">{formatDate(palette.dateCreated)}</p>
            {palette.style && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {palette.style}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-2 mt-2 sm:mt-0">
          {/* Download Button */}
          <button
            onClick={downloadPaletteAsImage}
            className="text-xs sm:text-sm text-[#ff008a] hover:text-pink-700 font-medium cursor-pointer flex items-center gap-1"
            title="Download as PNG"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
          
          {/* Copy All Button */}
          <button
            onClick={copyAllColors}
            className="text-xs sm:text-sm text-[#ff008a] hover:text-pink-700 font-medium cursor-pointer flex items-center gap-1"
          >
            {copiedAll ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              "Copy all"
            )}
          </button>
          
          {/* Remove Button */}
          {onRemoveFromCollection && (
            <button
              onClick={() => onRemoveFromCollection && onRemoveFromCollection(palette.id)}
              className="text-xs text-red-500 hover:text-red-700 font-medium cursor-pointer ml-2"
            >
              Remove
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2 sm:gap-3 md:gap-4">
        {palette.colors.map((color, index) => (
          <div key={index}>
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg sm:rounded-xl md:rounded-2xl cursor-pointer transition-all duration-200 transform hover:scale-105 relative"
                style={{ backgroundColor: color }}
                onClick={() => handleColorCopy(color, index)}
                title={`Click to copy ${color}`}
              >
                {copiedIndex === index && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg sm:rounded-xl md:rounded-2xl">
                    <span className="text-white text-xs font-bold">Copied!</span>
                  </div>
                )}
              </div>
              <span className="text-sm break-all text-center max-w-full px-1 font-mono">
                {color.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};