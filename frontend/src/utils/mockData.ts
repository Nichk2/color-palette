// Mock data service for GitHub Pages deployment
// This provides static data when the Flask backend is not available

export interface MockPalette {
  id: string;
  name: string;
  colors: string[];
  source: string;
  description?: string;
  tags?: string[];
  downloads?: number;
  likes?: number;
}

export const MOCK_TAGS = [
  "autumn", "cold", "cyberpunk", "beach", "desert", "neon", 
  "harvest", "frost", "vintage", "blossom", "storm", "ocean",
  "forest", "sunset", "gradient", "pastel", "warm", "monochrome",
  "tropical", "spring", "winter", "summer", "elegant", "cozy"
];

export const MOCK_PALETTES: Record<string, MockPalette[]> = {
  "autumn": [
    {
      id: "autumn-1",
      name: "Autumn Leaves",
      colors: ["#8B4513", "#CD853F", "#D2691E", "#FF8C00", "#FFD700"],
      source: "Curated",
      description: "Warm autumn colors inspired by falling leaves",
      tags: ["autumn", "warm", "cozy"],
      downloads: 1250,
      likes: 89
    },
    {
      id: "autumn-2", 
      name: "Harvest Moon",
      colors: ["#B8860B", "#DAA520", "#F4A460", "#DEB887", "#D2B48C"],
      source: "Curated",
      description: "Golden tones reminiscent of harvest season",
      tags: ["autumn", "harvest", "warm"],
      downloads: 980,
      likes: 76
    }
  ],
  "cyberpunk": [
    {
      id: "cyberpunk-1",
      name: "Neon Nights",
      colors: ["#FF00FF", "#00FFFF", "#FF1493", "#7FFF00", "#1E90FF"],
      source: "Curated",
      description: "Electric neon colors for futuristic designs",
      tags: ["cyberpunk", "neon", "futuristic"],
      downloads: 2100,
      likes: 156
    },
    {
      id: "cyberpunk-2",
      name: "Digital Dreams",
      colors: ["#FF0080", "#8000FF", "#0080FF", "#00FF80", "#FF8000"],
      source: "Curated", 
      description: "Bold digital colors from cyberspace",
      tags: ["cyberpunk", "digital", "bold"],
      downloads: 1750,
      likes: 142
    }
  ],
  "beach": [
    {
      id: "beach-1",
      name: "Ocean Breeze",
      colors: ["#4682B4", "#87CEEB", "#B0E0E6", "#F0F8FF", "#E0FFFF"],
      source: "Curated",
      description: "Refreshing ocean blues and sky tones",
      tags: ["beach", "ocean", "calm"],
      downloads: 1650,
      likes: 98
    },
    {
      id: "beach-2",
      name: "Sunset Beach",
      colors: ["#FF7F50", "#FF6347", "#FFD700", "#FFA500", "#FF69B4"],
      source: "Curated",
      description: "Warm sunset colors over sandy beaches",
      tags: ["beach", "sunset", "warm"],
      downloads: 1420,
      likes: 87
    }
  ],
  "cold": [
    {
      id: "cold-1", 
      name: "Winter Frost",
      colors: ["#B0C4DE", "#E6E6FA", "#F0F8FF", "#F5F5F5", "#DCDCDC"],
      source: "Curated",
      description: "Cool winter tones and icy blues",
      tags: ["cold", "winter", "frost"],
      downloads: 890,
      likes: 64
    },
    {
      id: "cold-2",
      name: "Arctic Chill", 
      colors: ["#4169E1", "#6495ED", "#87CEEB", "#ADD8E6", "#E0F6FF"],
      source: "Curated",
      description: "Deep arctic blues and glacial whites",
      tags: ["cold", "arctic", "blue"],
      downloads: 720,
      likes: 52
    }
  ],
  "desert": [
    {
      id: "desert-1",
      name: "Desert Sand",
      colors: ["#DEB887", "#F4A460", "#D2B48C", "#BC9A6A", "#A0522D"],
      source: "Curated",
      description: "Earthy desert sands and canyon colors",
      tags: ["desert", "earth", "sand"],
      downloads: 1340,
      likes: 91
    },
    {
      id: "desert-2", 
      name: "Cactus Bloom",
      colors: ["#8FBC8F", "#9ACD32", "#6B8E23", "#556B2F", "#808000"],
      source: "Curated",
      description: "Desert plant greens and natural earth tones",
      tags: ["desert", "green", "natural"],
      downloads: 1120,
      likes: 78
    }
  ],
  "neon": [
    {
      id: "neon-1",
      name: "Electric Energy",
      colors: ["#FF073A", "#39FF14", "#FF10F0", "#FFFF33", "#00F0FF"],
      source: "Generated",
      description: "High-energy neon colors that pop",
      tags: ["neon", "bright", "electric"],
      downloads: 1890,
      likes: 134
    }
  ],
  "pastel": [
    {
      id: "pastel-1", 
      name: "Soft Dreams",
      colors: ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFBA", "#BAE1FF"],
      source: "Generated",
      description: "Gentle pastel tones for elegant designs",
      tags: ["pastel", "soft", "gentle"],
      downloads: 2250,
      likes: 178
    }
  ]
};

export const TRENDING_PALETTES: MockPalette[] = [
  ...MOCK_PALETTES.cyberpunk,
  ...MOCK_PALETTES.pastel, 
  ...MOCK_PALETTES.beach.slice(0, 1),
  ...MOCK_PALETTES.autumn.slice(0, 1),
  ...MOCK_PALETTES.neon
].slice(0, 10);

// Mock API functions that simulate the Flask backend
export class MockApiService {
  static async getTags(): Promise<string[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_TAGS;
  }

  static async getPalettesByTag(tag: string, count: number = 5): Promise<{
    tag: string;
    palettes: MockPalette[];
    total: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const tagPalettes = MOCK_PALETTES[tag] || [];
    const palettes = tagPalettes.slice(0, count);
    
    // If we don't have enough palettes for this tag, mix in some trending ones
    if (palettes.length < count) {
      const additional = TRENDING_PALETTES
        .filter(p => !palettes.find(existing => existing.id === p.id))
        .slice(0, count - palettes.length);
      palettes.push(...additional);
    }

    return {
      tag,
      palettes,
      total: palettes.length
    };
  }

  static async getTrendingPalettes(count: number = 10): Promise<{
    palettes: MockPalette[];
    total: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const palettes = TRENDING_PALETTES.slice(0, count);
    return {
      palettes,
      total: palettes.length
    };
  }

  static async getPaletteDetails(paletteId: string): Promise<MockPalette> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Find the palette in our mock data
    for (const category of Object.values(MOCK_PALETTES)) {
      const palette = category.find(p => p.id === paletteId);
      if (palette) return palette;
    }
    
    const trending = TRENDING_PALETTES.find(p => p.id === paletteId);
    if (trending) return trending;
    
    // Fallback palette if not found
    return {
      id: paletteId,
      name: "Sample Palette",
      colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57"],
      description: "A vibrant and modern color palette perfect for digital designs.",
      tags: ["modern", "vibrant", "digital"],
      downloads: 1250,
      likes: 89,
      source: "Community"
    };
  }

  static async checkHealth(): Promise<{ status: string }> {
    return { status: "ok" };
  }
}