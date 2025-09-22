import React, { useState, useEffect } from "react";
import { CollectionPaletteCard } from "../components/Collection/CollectionPaletteCard";
import { SearchAndFilter } from "../components/Collection/Search_Filter";
import { CopyNotification } from "../components/Collection/CollectionCopyNotification";
// import { LoadingPalette } from "../components/Collection/LoadingPalette";
import type { CollectionPalette, CollectionSearchFilters } from "../types";
import Tea from '../src/images/waiting.svg'
import { getAllCollectionPalettes, removeCreatedFromCollection, removeFavoriteFromCollection } from "../src/utils/storage";

const Collection: React.FC = () => {
  const [palettes, setPalettes] = useState<CollectionPalette[]>([]);
  const [filteredPalettes, setFilteredPalettes] = useState<CollectionPalette[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [copiedColor, setCopiedColor] = useState("");
  const [filters, setFilters] = useState<CollectionSearchFilters>({
    query: '',
    type: 'all',
    dateRange: 'all',
    tags: []
  });

  // Load from storage
  useEffect(() => {
    const load = () => {
      const all = getAllCollectionPalettes();
      setPalettes(all);
      setLoading(false);
    };
    load();
    // Also listen to storage events for cross-tab updates
    const handler = () => load();
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  // Filter palettes based on search criteria
  useEffect(() => {
    let filtered = [...palettes];

    // Filter by query
    if (filters.query) {
      filtered = filtered.filter(palette => 
        palette.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        palette.tags?.some(tag => tag.toLowerCase().includes(filters.query.toLowerCase()))
      );
    }

    // Filter by type
    if (filters.type !== 'all') {
      filtered = filtered.filter(palette => palette.type === filters.type);
    }

    // Filter by date range
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters.dateRange) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(palette => 
        new Date(palette.dateCreated) >= filterDate
      );
    }

    // Filter by tags
    if (filters.tags.length > 0) {
      filtered = filtered.filter(palette =>
        palette.tags?.some(tag => filters.tags.includes(tag))
      );
    }

    setFilteredPalettes(filtered);
  }, [palettes, filters]);

  const showNotification = (color: string) => {
    setCopiedColor(color);
    setShowCopyNotification(true);
    setTimeout(() => setShowCopyNotification(false), 2000);
  };

  const handleRemoveFromCollection = (paletteId: string) => {
    const toRemove = palettes.find(p => p.id === paletteId);
    if (!toRemove) return;
    if (toRemove.type === 'created') {
      removeCreatedFromCollection(paletteId);
    } else {
      removeFavoriteFromCollection(paletteId);
    }
    setPalettes(prev => prev.filter(p => p.id !== paletteId));
  };

  const handleEditPalette = (paletteId: string) => {
    // Navigate to edit page or open edit modal
    console.log('Edit palette:', paletteId);
  };

  // Get all unique tags
  const availableTags = Array.from(new Set(palettes.flatMap(p => p.tags || [])));

  const createdCount = palettes.filter(p => p.type === 'created').length;
  const favoriteCount = palettes.filter(p => p.type === 'favorite').length;

  if (loading) {
    return (
      <div className="min-h-screen font-rethink-sans">
        <main className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-5 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff008a] mx-auto mb-4"></div>
              <p className="text-gray-500">Loading your collection...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-rethink-sans">
      <CopyNotification show={showCopyNotification} color={copiedColor} />
      
      <main className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-5 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="lg:text-[40px] text-[30px] font-jersey-10  text-[#3A3A3A] mb-2">My Collection</h1>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span>{createdCount} Created</span>
            <span>{favoriteCount} Favorites</span>
            <span>{palettes.length} Total</span>
          </div>
        </div>

        {/* Search and Filter */}
        <SearchAndFilter
          filters={filters}
          onFiltersChange={setFilters}
          availableTags={availableTags}
        />

        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            {filteredPalettes.length} palette{filteredPalettes.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Palettes Grid */}
        <div className="space-y-5 sm:space-y-6 md:space-y-8">
          {filteredPalettes.length > 0 ? (
            filteredPalettes.map((palette) => (
              <CollectionPaletteCard
                key={palette.id}
                palette={palette}
                onColorCopy={showNotification}
                onRemoveFromCollection={handleRemoveFromCollection}
                onEditPalette={handleEditPalette}
              />
            ))
          ) : (
            <div className="py-12 flex flex-col items-center gap-2">
              {/* <div className="text-gray-400 text-6xl mb-4">🎨</div> */}
              <img src={Tea} alt="waiting" className="w-20" />
              <p className="text-gray-500 text-lg">
                {palettes.length === 0 
                  ? "Your collection is empty" 
                  : "No palettes match your search"
                }
              </p>
              <p className="text-gray-400 text-sm">
                {palettes.length === 0 
                  ? "Start by creating palettes or marking some as favorites" 
                  : "Try adjusting your search filters"
                }
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Collection;