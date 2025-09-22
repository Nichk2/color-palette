import React, { useState, useEffect } from "react";
import type { Palette } from "../types";
import { CopyNotification } from "../components/Home/CopyNotification";
import { PaletteCard } from "../components/Home/PaletteCard";
import { addFavoriteToCollection, removeFavoriteFromCollection } from "../src/utils/storage";
import { LoadingPalette } from "../components/Home/LoadingPalette";
import { TagsSection } from "../components/Home/TagSection";

const Home: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>(""); 
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loadingPalettes, setLoadingPalettes] = useState(false);
  const [loadingTags, setLoadingTags] = useState(true);
  const [error, setError] = useState<string>("");
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [copiedColor, setCopiedColor] = useState("");

  const API_BASE_URL = "http://localhost:8001";

  // Show copy notification
  const showNotification = (color: string) => {
    setCopiedColor(color);
    setShowCopyNotification(true);
    setTimeout(() => setShowCopyNotification(false), 2000);
  };

  const handleAddToFavorites = (palette: Palette) => {
    addFavoriteToCollection(palette);
    showNotification("All colors");
  };

  const handleRemoveFromFavorites = (paletteId: string) => {
    removeFavoriteFromCollection(paletteId);
  };

  // Fetch tags on component mount
  useEffect(() => {
    fetchTags();
  }, []);

  // Load palettes when selectedTag changes
  useEffect(() => {
    if (selectedTag) {
      fetchPalettes(selectedTag);
    } else if (allTags.length > 0) {
      // Load palettes for the first tag by default
      const firstTag = allTags[0];
      setSelectedTag(firstTag);
    }
  }, [selectedTag, allTags]);

  const fetchTags = async () => {
    try {
      setLoadingTags(true);
      const response = await fetch(`${API_BASE_URL}/api/tags`);
      if (!response.ok) throw new Error("Failed to fetch tags");
      const data = await response.json();
      setAllTags(data);
    } catch (err) {
      console.error("Error fetching tags:", err);
      setError("Failed to load tags");
      // Fallback tags
      setAllTags([
        "autumn",
        "cold",
        "cyberpunk",
        "beach",
        "desert",
        "neon",
        "harvest",
        "frost",
        "vintage",
        "blossom",
        "storm",
      ]);
    } finally {
      setLoadingTags(false);
    }
  };

  const fetchPalettes = async (tag: string) => {
    setLoadingPalettes(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/palettes?tag=${encodeURIComponent(tag)}&count=6`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch palettes: ${response.status}`);
      }

      const data = await response.json();
      setPalettes(data.palettes || []);

      // Show warning if using fallback data
      if (data.error) {
        setError("Using cached data - some features may be limited");
      }
    } catch (err) {
      console.error("Error fetching palettes:", err);
      setError("Failed to load palettes - showing demo data");

      // Fallback palettes
      setPalettes([
        {
          id: "fallback-1",
          name: `${tag.charAt(0).toUpperCase() + tag.slice(1)} Palette 1`,
          colors: ["#FF6B6B", "#4ECDC4", "#556270", "#C7F464", "#FFA5A5"],
          source: "Demo Data",
        },
        {
          id: "fallback-2",
          name: `${tag.charAt(0).toUpperCase() + tag.slice(1)} Palette 2`,
          colors: ["#6A11CB", "#2575FC", "#8E2DE2", "#4A00E0", "#1A2980"],
          source: "Demo Data",
        },
        {
          id: "fallback-3",
          name: `${tag.charAt(0).toUpperCase() + tag.slice(1)} Palette 3`,
          colors: ["#FF9A8B", "#FF6B6B", "#FF8EAD", "#FB3569", "#FF3C3C"],
          source: "Demo Data",
        },
      ]);
    } finally {
      setLoadingPalettes(false);
    }
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
  };

  return (
    <div className="min-h-screen font-rethink-sans">
      {/* Copy Notification Modal */}
      <CopyNotification show={showCopyNotification} color={copiedColor} />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-5 lg:px-8 py-6 sm:py-8">
        {/* Popular Styles Section */}
        <TagsSection
          tags={allTags}
          selectedTag={selectedTag}
          onTagSelect={handleTagSelect}
          isLoading={loadingTags}
          error={error}
        />

        {/* Palettes Grid */}
        <div className="space-y-5 sm:space-y-6 md:space-y-8">
          {loadingPalettes ? (
            /* Loading Skeletons */
            <>
              {[...Array(3)].map((_, index) => (
                <LoadingPalette key={index} />
              ))}
            </>
          ) : (
            /* Actual Palettes */
            <>
              {palettes.length > 0 ? (
                palettes.map((palette) => (
                  <PaletteCard 
                    key={palette.id} 
                    palette={palette} 
                    onColorCopy={showNotification}
                    onAddToFavorites={handleAddToFavorites}
                    onRemoveFromFavorites={handleRemoveFromFavorites}
                  />
                ))
              ) : (
                <div className="text-center py-8 sm:py-12">
                  <p className="text-gray-500 text-base sm:text-lg">
                    No palettes found for "{selectedTag}"
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm mt-2">
                    Try selecting a different style or check your connection
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Load More Button (Optional) */}
        {palettes.length > 0 && !loadingPalettes && (
          <div className="text-center mt-8 sm:mt-12">
            <button
              onClick={() => fetchPalettes(selectedTag)}
              className="bg-[#ff008a] text-white px-6 cursor-pointer py-2.5 sm:px-8 sm:py-3 rounded-full font-medium hover:bg-[#e0007a] transition-colors text-sm sm:text-base"
            >
              Load More Palettes
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;