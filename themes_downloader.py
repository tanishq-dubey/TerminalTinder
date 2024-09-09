import requests
import json

# Base URL for the Gogh JSON files in the GitHub repository
base_url = "https://raw.githubusercontent.com/Gogh-Co/Gogh/master/json/"

# GitHub API URL to list the contents of the "json" directory
api_url = "https://api.github.com/repos/Gogh-Co/Gogh/contents/json"

# Function to scrape all theme filenames from the GitHub API
def fetch_theme_filenames():
    response = requests.get(api_url)
    if response.status_code == 200:
        files = response.json()
        # Filter JSON files and return their names
        return [file["name"] for file in files if file["name"].endswith(".json")]
    else:
        print(f"Failed to fetch theme filenames from GitHub API, status code: {response.status_code}")
        return []

# Helper function to map Gogh colors to the desired format
def map_theme_colors(theme_data):
    return {
        "name": theme_data.get("name", "Unknown Theme"),
        "colors": {
            "primary": {
                "background": theme_data.get("background", "#000000"),
                "foreground": theme_data.get("foreground", "#FFFFFF"),
            },
            "normal": {
                "black": theme_data.get("color_01", "#000000"),
                "red": theme_data.get("color_02", "#000000"),
                "green": theme_data.get("color_03", "#000000"),
                "yellow": theme_data.get("color_04", "#000000"),
                "blue": theme_data.get("color_05", "#000000"),
                "magenta": theme_data.get("color_06", "#000000"),
                "cyan": theme_data.get("color_07", "#000000"),
                "white": theme_data.get("color_08", "#000000"),
            },
            "bright": {
                "black": theme_data.get("color_09", "#000000"),
                "red": theme_data.get("color_10", "#000000"),
                "green": theme_data.get("color_11", "#000000"),
                "yellow": theme_data.get("color_12", "#000000"),
                "blue": theme_data.get("color_13", "#000000"),
                "magenta": theme_data.get("color_14", "#000000"),
                "cyan": theme_data.get("color_15", "#000000"),
                "white": theme_data.get("color_16", "#000000"),
            }
        }
    }

# List to hold all the themes
themes = []

# Fetch all theme filenames from the GitHub API
theme_filenames = fetch_theme_filenames()

# Loop through the list of theme filenames and fetch each theme
for filename in theme_filenames:
    theme_url = base_url + filename
    response = requests.get(theme_url)
    if response.status_code == 200:
        theme_data = response.json()
        formatted_theme = map_theme_colors(theme_data)
        themes.append(formatted_theme)
    else:
        print(f"Failed to fetch {filename}")

# Output the formatted themes as a JSON array
output_file = "formatted_themes.json"
with open(output_file, "w") as out_file:
    json.dump(themes, out_file, indent=2)

print(f"Formatted themes saved to {output_file}")
