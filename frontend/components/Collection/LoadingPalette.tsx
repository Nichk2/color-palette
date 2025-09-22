import React from "react";

export const LoadingPalette: React.FC = () => {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2">
        <div className="h-5 sm:h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
        <div className="h-5 sm:h-6 bg-gray-200 rounded w-16 sm:w-20 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-1 sm:gap-2"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gray-200 rounded-lg sm:rounded-xl md:rounded-2xl animate-pulse"></div>
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};