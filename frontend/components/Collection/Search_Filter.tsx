import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import type { CollectionSearchAndFilterProps, CollectionSearchFilters } from "../../types/index";

export const SearchAndFilter: React.FC<CollectionSearchAndFilterProps> = ({ 
  filters, 
  onFiltersChange, 
  availableTags 
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilters = (updates: Partial<CollectionSearchFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    updateFilters({ tags: newTags });
  };

  return (
    <div className="bg-white rounded-xl border border-[#E4E4E4] p-4 sm:p-6 mb-6">
      {/* Basic Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search your palettes..."
            value={filters.query}
            onChange={(e) => updateFilters({ query: e.target.value })}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff008a] focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
            showAdvanced 
              ? 'bg-[#ff008a] text-white border-[#ff008a]' 
              : 'bg-white text-gray-600 border-gray-200 hover:border-[#ff008a]'
          }`}
        >
          <Filter size={20} />
          Advanced
        </button>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 pt-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => updateFilters({ type: e.target.value as CollectionSearchFilters['type'] })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff008a]"
                >
                  <option value="all">All Palettes</option>
                  <option value="created">Created by Me</option>
                  <option value="favorite">Favorites</option>
                </select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => updateFilters({ dateRange: e.target.value as CollectionSearchFilters['dateRange'] })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff008a]"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={() => onFiltersChange({ query: '', type: 'all', dateRange: 'all', tags: [] })}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <X size={16} />
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Tags Filter */}
            {availableTags.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                        filters.tags.includes(tag)
                          ? 'bg-[#ff008a] text-white border-[#ff008a]'
                          : 'bg-white text-gray-600 hover:text-white border-gray-200 hover:bg-[#ff008a]'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};