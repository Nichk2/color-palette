import React from 'react';
import type { Palette } from '../../types/index';

interface PaletteGridProps {
  palettes: Palette[];
  loading?: boolean;
}

const PaletteGrid: React.FC<PaletteGridProps> = ({ palettes, loading = false }) => {
  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    // You can add toast notification here later
    console.log(`Copied: ${color}`);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="h-32 bg-gray-200"></div>
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (palettes.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No palettes found. Try selecting a different tag.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {palettes.map((palette) => (
        <div key={palette.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          {/* Image preview */}
          {palette.image_url && (
            <img 
              src={palette.image_url} 
              alt={palette.id}
              className="w-full h-32 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          
          {/* Color blocks */}
          <div className="flex h-16">
            {palette.colors.map((color, index) => (
              <div
                key={index}
                onClick={() => copyToClipboard(color)}
                className="flex-1 flex items-end justify-center p-1 transition-transform hover:scale-105 cursor-pointer"
                style={{ backgroundColor: color }}
                title={`Click to copy ${color}`}
              >
                <span className="text-xs font-mono bg-black/20 text-white px-1 rounded opacity-0 hover:opacity-100 transition-opacity">
                  {color}
                </span>
              </div>
            ))}
          </div>
          
          {/* Palette info */}
          <div className="p-3">
            <div className="text-xs text-gray-500 mb-1">
              {palette.source}
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(palette.colors.join(', '))}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              Copy all colors
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaletteGrid;