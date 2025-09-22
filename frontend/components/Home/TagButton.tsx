import React from "react";

interface TagButtonProps {
  tag: string;
  isSelected: boolean;
  onClick: () => void;
}

export const TagButton: React.FC<TagButtonProps> = ({ tag, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full cursor-pointer text-xs sm:text-sm transition-all whitespace-nowrap font-rethink-sans ${
        isSelected
          ? "bg-[#ff008a] text-white"
          : "bg-white text-[#959595] border-[#E4E4E4] border-1 hover:bg-[#ff008a] hover:text-white hover:border-[#ff008a]"
      }`}
    >
      {tag}
    </button>
  );
};