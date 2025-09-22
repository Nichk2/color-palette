from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any, Optional
import httpx
import os
from dotenv import load_dotenv
import random
import json
import asyncio
from urllib.parse import quote

# Load environment variables
load_dotenv()

app = FastAPI(title="InspirAI API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# Enhanced tags with better categorization
POPULAR_TAGS = [
    "autumn", "cold", "cyberpunk", "beach", "desert", "neon", 
    "harvest", "frost", "vintage", "blossom", "storm", "ocean",
    "forest", "sunset", "gradient", "pastel", "warm", "monochrome",
    "tropical", "spring", "winter", "summer", "elegant", "cozy"
]

# Curated color palettes for different moods/themes
CURATED_PALETTES = {
    "autumn": [
        {
            "name": "Autumn Leaves",
            "colors": ["#8B4513", "#CD853F", "#D2691E", "#FF8C00", "#FFD700"],
            "source": "Curated"
        },
        {
            "name": "Harvest Moon",
            "colors": ["#B8860B", "#DAA520", "#F4A460", "#DEB887", "#D2B48C"],
            "source": "Curated"
        }
    ],
    "cyberpunk": [
        {
            "name": "Neon Nights",
            "colors": ["#FF00FF", "#00FFFF", "#FF1493", "#7FFF00", "#1E90FF"],
            "source": "Curated"
        },
        {
            "name": "Digital Dreams",
            "colors": ["#FF0080", "#8000FF", "#0080FF", "#00FF80", "#FF8000"],
            "source": "Curated"
        }
    ],
    "beach": [
        {
            "name": "Ocean Breeze",
            "colors": ["#4682B4", "#87CEEB", "#B0E0E6", "#F0F8FF", "#E0FFFF"],
            "source": "Curated"
        },
        {
            "name": "Sunset Beach",
            "colors": ["#FF7F50", "#FF6347", "#FFD700", "#FFA500", "#FF69B4"],
            "source": "Curated"
        }
    ],
    "cold": [
        {
            "name": "Winter Frost",
            "colors": ["#B0C4DE", "#E6E6FA", "#F0F8FF", "#F5F5F5", "#DCDCDC"],
            "source": "Curated"
        },
        {
            "name": "Arctic Chill",
            "colors": ["#4169E1", "#6495ED", "#87CEEB", "#ADD8E6", "#E0F6FF"],
            "source": "Curated"
        }
    ],
    "desert": [
        {
            "name": "Desert Sand",
            "colors": ["#DEB887", "#F4A460", "#D2B48C", "#BC9A6A", "#A0522D"],
            "source": "Curated"
        },
        {
            "name": "Cactus Bloom",
            "colors": ["#8FBC8F", "#9ACD32", "#6B8E23", "#556B2F", "#808000"],
            "source": "Curated"
        }
    ]
}

class ColorPaletteService:
    def __init__(self):
        self.coolors_api_base = "https://coolors.co/api"
        
    async def get_trending_palettes(self, count: int = 5) -> List[Dict]:
        """Fetch trending palettes from Coolors API"""
        try:
            async with httpx.AsyncClient() as client:
                # Coolors has a simple API for trending palettes
                response = await client.get(
                    "https://coolors.co/api/palettes/trending",
                    timeout=10.0
                )
                
                if response.status_code == 200:
                    data = response.json()
                    palettes = []
                    
                    for i, palette in enumerate(data.get('palettes', [])[:count]):
                        colors = [f"#{color['hex']}" for color in palette.get('colors', [])]
                        if len(colors) >= 5:  # Ensure we have at least 5 colors
                            palettes.append({
                                "id": f"trending-{i}",
                                "name": palette.get('title', f'Trending Palette {i+1}'),
                                "colors": colors[:5],  # Take first 5 colors
                                "source": "Coolors Trending"
                            })
                    
                    return palettes
        except Exception as e:
            print(f"Error fetching from Coolors: {e}")
        
        return []
    
    async def generate_random_palettes(self, theme: str, count: int = 5) -> List[Dict]:
        """Generate random color palettes using color theory"""
        palettes = []
        
        # Base colors for different themes
        theme_bases = {
            "autumn": ["#8B4513", "#CD853F", "#D2691E", "#FF8C00"],
            "cyberpunk": ["#FF00FF", "#00FFFF", "#FF1493", "#7FFF00"],
            "beach": ["#4682B4", "#87CEEB", "#20B2AA", "#FF7F50"],
            "cold": ["#B0C4DE", "#E6E6FA", "#F0F8FF", "#4169E1"],
            "desert": ["#DEB887", "#F4A460", "#D2B48C", "#CD853F"],
            "neon": ["#FF073A", "#39FF14", "#FF10F0", "#FFFF33"],
            "forest": ["#228B22", "#32CD32", "#90EE90", "#006400"],
            "sunset": ["#FF6B35", "#F7931E", "#FFD23F", "#EE4B2B"],
        }
        
        base_colors = theme_bases.get(theme, ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"])
        
        for i in range(count):
            # Generate variations of base colors
            colors = []
            for base_color in base_colors[:4]:
                # Add the base color
                colors.append(base_color)
            
            # Add a complementary color
            colors.append(self._get_complementary_color(base_colors[0]))
            
            palettes.append({
                "id": f"{theme}-generated-{i}",
                "name": f"{theme.title()} Palette {i+1}",
                "colors": colors[:5],
                "source": "Generated"
            })
        
        return palettes
    
    def _get_complementary_color(self, hex_color: str) -> str:
        """Generate a complementary color"""
        # Remove # if present
        hex_color = hex_color.lstrip('#')
        
        # Convert to RGB
        r = int(hex_color[0:2], 16)
        g = int(hex_color[2:4], 16)
        b = int(hex_color[4:6], 16)
        
        # Get complementary color
        comp_r = 255 - r
        comp_g = 255 - g
        comp_b = 255 - b
        
        # Convert back to hex
        return f"#{comp_r:02x}{comp_g:02x}{comp_b:02x}"

# Initialize service
color_service = ColorPaletteService()

@app.get("/api/tags", response_model=List[str])
async def get_popular_tags():
    """Returns a list of popular tags for the gradient carousel."""
    return POPULAR_TAGS

@app.get("/api/palettes")
async def get_palettes_by_tag(tag: str, count: int = 5):
    """
    Returns color palettes for a specific tag using multiple sources.
    """
    if tag not in POPULAR_TAGS:
        raise HTTPException(status_code=404, detail="Tag not found")
    
    try:
        palettes = []
        
        # First, I need to try to get curated palettes for this tag
        curated = CURATED_PALETTES.get(tag, [])
        palettes.extend(curated[:min(2, count)])  # Add up to 2 curated palettes
        
        # If I need more palettes, try to fetch from trending
        if len(palettes) < count:
            remaining = count - len(palettes)
            trending = await color_service.get_trending_palettes(remaining)
            palettes.extend(trending)
        
        # If I still need more, generate random ones
        if len(palettes) < count:
            remaining = count - len(palettes)
            generated = await color_service.generate_random_palettes(tag, remaining)
            palettes.extend(generated)
        
        # Ensure unique IDs
        for i, palette in enumerate(palettes):
            palette["id"] = f"{tag}-{i}"
        
        return {
            "tag": tag,
            "palettes": palettes[:count],  # Ensure I don't exceed requested count
            "total": len(palettes[:count])
        }
        
    except Exception as e:
        # Fallback to curated palettes only
        curated = CURATED_PALETTES.get(tag, [])
        if not curated:
            # Ultimate fallback
            curated = [
                {
                    "id": f"{tag}-fallback",
                    "name": f"{tag.title()} Palette",
                    "colors": ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57"],
                    "source": "Fallback"
                }
            ]
        
        return {
            "tag": tag,
            "palettes": curated[:count],
            "total": len(curated[:count]),
            "error": "Using fallback data"
        }

@app.get("/api/palettes/trending")
async def get_trending_palettes(count: int = 10):
    """Get trending color palettes from various sources."""
    try:
        trending = await color_service.get_trending_palettes(count)
        
        if not trending:
            # Fallback to a mix of curated palettes
            all_curated = []
            for tag_palettes in CURATED_PALETTES.values():
                all_curated.extend(tag_palettes)
            
            # Shuffle and take requested count
            random.shuffle(all_curated)
            trending = all_curated[:count]
        
        return {
            "palettes": trending,
            "total": len(trending)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching trending palettes: {str(e)}")

@app.get("/api/palette/{palette_id}")
async def get_palette_details(palette_id: str):
    """Get detailed information about a specific palette."""
    # This would typically query a database
    # For now, return a sample palette
    return {
        "id": palette_id,
        "name": "Sample Palette",
        "colors": ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57"],
        "description": "A vibrant and modern color palette perfect for digital designs.",
        "tags": ["modern", "vibrant", "digital"],
        "downloads": 1250,
        "likes": 89,
        "source": "Community"
    }
    
@app.middleware("http")
async def add_cors_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "*"
    return response

@app.options("/{full_path:path}")
async def options_handler(full_path: str):
    return JSONResponse(status_code=200, content={})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)  