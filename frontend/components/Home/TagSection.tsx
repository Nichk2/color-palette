import React from "react";
import { TagButton } from "./TagButton";

interface TagsSectionProps {
  tags: string[];
  selectedTag: string;
  onTagSelect: (tag: string) => void;
  isLoading: boolean;
  error?: string;
}

export const TagsSection: React.FC<TagsSectionProps> = ({ 
  tags, 
  selectedTag, 
  onTagSelect, 
  isLoading,
  error 
}) => {
  if (isLoading) {
    return (
      <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6 overflow-x-hidden items-center">
        <h2 className="text-base sm:text-lg text-[#959595] mr-3 whitespace-nowrap">
          Popular styles
        </h2>
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="h-8 sm:h-10 bg-gray-200 rounded-full w-16 sm:w-20 animate-pulse flex-shrink-0"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <section className="mb-8 sm:mb-12">
      {/* Tags Carousel */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 mb-4 sm:mb-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <h2 className="text-base sm:text-lg text-[#959595] whitespace-nowrap flex-shrink-0">
          Popular styles
        </h2>
        <div className="flex gap-2 sm:gap-3">
          {tags.map((tag) => (
            <TagButton
              key={tag}
              tag={tag}
              isSelected={selectedTag === tag}
              onClick={() => onTagSelect(tag)}
            />
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-3 py-2 sm:px-4 sm:py-3 rounded-lg mb-4 sm:mb-6 text-sm">
          <p>{error}</p>
        </div>
      )}
    </section>
  );
};