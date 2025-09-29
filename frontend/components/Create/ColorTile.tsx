import React, { useState } from "react";


export const ColorTile: React.FC<{
    color: string;
    index: number;
    onColorChange: (index: number, color: string) => void;
    onColorCopy: (color: string, index: number) => void;
    copiedIndex: number | null;
  }> = ({ color, index, onColorChange, onColorCopy, copiedIndex }) => {
    const [copied, setCopied] = useState(false);
  
    const copyToClipboard = (e: React.MouseEvent) => {
      e.stopPropagation();
      navigator.clipboard.writeText(color);
      setCopied(true);
      onColorCopy(color, index);
      setTimeout(() => setCopied(false), 2000);
    };
  
    const handleColorChange = () => {
      const input = document.createElement('input');
      input.type = 'color';
      input.value = color;
      input.onchange = (e) => {
        const target = e.target as HTMLInputElement;
        onColorChange(index, target.value);
      };
      input.click();
    };
  
    return (
      <div className="flex flex-col items-center gap-1 sm:gap-2">
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[173px] lg:h-[180px] rounded-lg sm:rounded-xl md:rounded-2xl cursor-pointer transition-all duration-200 transform hover:scale-105 relative"
          style={{ backgroundColor: color }}
          onClick={handleColorChange}
          title={`Click to change color`}
        >
          {(copied || copiedIndex === index) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg sm:rounded-xl md:rounded-2xl">
              <span className="text-white text-xs font-bold">Copied!</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span 
            className="sm:text-sm lg:text-[18px] font-jersey-10 break-all text-center cursor-pointer hover:text-[#ff008a] transition-colors"
            onClick={copyToClipboard}
          >
            {color.toUpperCase()}
          </span>
        </div>
      </div>
    );
  };