import React, { useState } from "react";
import { Copy } from "lucide-react";
import { ColorSquareProps } from "../../types";

export const ColorSquare: React.FC<ColorSquareProps> = ({ color, size = "large" }) => {
  const [copied, setCopied] = useState(false);

  const sizeClasses =
    size === "small"
      ? "w-12 h-12 sm:w-16 sm:h-16"
      : "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[173px] lg:h-[180px]";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-1 sm:gap-2">
      <div
        className={`${sizeClasses} rounded-lg sm:rounded-xl md:rounded-2xl cursor-pointer transition-all duration-200 transform hover:scale-105 relative`}
        style={{ backgroundColor: color }}
        onClick={copyToClipboard}
        title={`Click to copy ${color}`}
      >
        {copied && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg sm:rounded-xl md:rounded-2xl">
            <span className="text-white text-xs font-bold flex items-center gap-1">
              <Copy size={12} />
              Copied!
            </span>
          </div>
        )}
      </div>
      <span className="sm:text-sm lg:text-[18px] font-jersey-10 break-all text-center max-w-full px-1">
        {color.toUpperCase()}
      </span>
    </div>
  );
};