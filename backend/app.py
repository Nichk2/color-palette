from flask import Flask, jsonify, request
from flask_cors import CORS
from typing import List, Dict
import requests
import os
from dotenv import load_dotenv
import random

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

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

    def get_trending_palettes(self, count: int = 5) -> List[Dict]:
        """Fetch trending palettes from Coolors API"""
        try:
            response = requests.get(
                "https://coolors.co/api/palettes/trending",
                timeout=10.0
            )

            if response.status_code == 200:
                data = response.json()
                palettes: List[Dict] = []

                for i, palette in enumerate(data.get('palettes', [])[:count]):
                    colors = [f"#{color['hex']}" for color in palette.get('colors', [])]
                    if len(colors) >= 5:
                        palettes.append({
                            "id": f"trending-{i}",
                            "name": palette.get('title', f'Trending Palette {i+1}'),
                            "colors": colors[:5],
                            "source": "Coolors Trending"
                        })

                return palettes
        except Exception as e:
            print(f"Error fetching from Coolors: {e}")

        return []

    def generate_random_palettes(self, theme: str, count: int = 5) -> List[Dict]:
        """Generate random color palettes using color theory"""
        palettes: List[Dict] = []

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
            colors: List[str] = []
            for base_color in base_colors[:4]:
                colors.append(base_color)

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
        hex_color = hex_color.lstrip('#')

        r = int(hex_color[0:2], 16)
        g = int(hex_color[2:4], 16)
        b = int(hex_color[4:6], 16)

        comp_r = 255 - r
        comp_g = 255 - g
        comp_b = 255 - b

        return f"#{comp_r:02x}{comp_g:02x}{comp_b:02x}"

# Initialize service
color_service = ColorPaletteService()

@app.route("/api/tags", methods=["GET"])
def get_popular_tags() -> "flask.Response":
    return jsonify(POPULAR_TAGS)

@app.route("/api/palettes", methods=["GET"])
def get_palettes_by_tag() -> "flask.Response":
    tag = request.args.get("tag", type=str)
    count = request.args.get("count", default=5, type=int)

    if not tag or tag not in POPULAR_TAGS:
        return jsonify({"detail": "Tag not found"}), 404

    try:
        palettes: List[Dict] = []

        curated = CURATED_PALETTES.get(tag, [])
        palettes.extend(curated[:min(2, count)])

        if len(palettes) < count:
            remaining = count - len(palettes)
            trending = color_service.get_trending_palettes(remaining)
            palettes.extend(trending)

        if len(palettes) < count:
            remaining = count - len(palettes)
            generated = color_service.generate_random_palettes(tag, remaining)
            palettes.extend(generated)

        for i, palette in enumerate(palettes):
            palette["id"] = f"{tag}-{i}"

        return jsonify({
            "tag": tag,
            "palettes": palettes[:count],
            "total": len(palettes[:count])
        })
    except Exception:
        curated = CURATED_PALETTES.get(tag, [])
        if not curated:
            curated = [
                {
                    "id": f"{tag}-fallback",
                    "name": f"{tag.title()} Palette",
                    "colors": ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57"],
                    "source": "Fallback"
                }
            ]

        return jsonify({
            "tag": tag,
            "palettes": curated[:count],
            "total": len(curated[:count]),
            "error": "Using fallback data"
        })

@app.route("/api/palettes/trending", methods=["GET"])
def get_trending_palettes() -> "flask.Response":
    count = request.args.get("count", default=10, type=int)
    try:
        trending = color_service.get_trending_palettes(count)

        if not trending:
            all_curated: List[Dict] = []
            for tag_palettes in CURATED_PALETTES.values():
                all_curated.extend(tag_palettes)

            random.shuffle(all_curated)
            trending = all_curated[:count]

        return jsonify({
            "palettes": trending,
            "total": len(trending)
        })
    except Exception as e:
        return jsonify({"detail": f"Error fetching trending palettes: {str(e)}"}), 500

@app.route("/api/palette/<palette_id>", methods=["GET"])
def get_palette_details(palette_id: str) -> "flask.Response":
    return jsonify({
        "id": palette_id,
        "name": "Sample Palette",
        "colors": ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57"],
        "description": "A vibrant and modern color palette perfect for digital designs.",
        "tags": ["modern", "vibrant", "digital"],
        "downloads": 1250,
        "likes": 89,
        "source": "Community"
    })

@app.route("/health", methods=["GET"])
def health() -> "flask.Response":
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8001)
