# Store Placement & Heatmap Visualizer

## Overview
This project is a web-based store placement and heatmap visualization tool using **Leaflet.js** and **Leaflet.heat**. Users can upload a CSV file containing store data, and the tool will generate:
1. A **store map** with categorized markers for different store types.
2. A **heatmap** representation of store foot traffic density.
3. The ability to **download a sample CSV** to understand the required format.

## Features
- **CSV File Upload:** Users can upload a CSV file containing store data.
- **Store Type Markers:** Different store types are color-coded.
- **Heatmap Generation:** Visualizes foot traffic intensity.
- **Interactive Map:** Clickable markers provide store details.
- **Sample CSV Download:** Provides a template for user reference.

## Technologies Used
- **HTML, CSS** (UI Styling)
- **JavaScript (Advanced)**
- **Leaflet.js** (Interactive Maps)
- **Leaflet.heat** (Heatmap Layer)
- **PapaParse.js** (CSV Parsing)

## Installation & Usage
### 1. Clone or Download the Repository
```sh
https://github.com/your-repo-url.git
```

### 2. Open `index.html` in a Web Browser
- No additional setup is required; the tool runs in a browser.

### 3. Upload a CSV File
- Format:
```csv
Latitude,Longitude,Store Type,Foot Traffic,Population Density,Time-of-Day Factor
18.52,73.85,Retail,High,Medium,Morning
19.07,72.87,Restaurant,Medium,High,Evening
12.97,77.59,Other,Low,Low,Night
```
- Click **"Generate Store Map"** to plot store locations.
- Click **"Generate Heatmap"** to visualize foot traffic density.
- Click **"Download Sample CSV"** to get a pre-formatted file.

## File Structure
```
project-folder/
├── index.html  # Main UI with JavaScript functionality
├── README.md   # Project documentation
```

## Troubleshooting
- Ensure you upload a **valid CSV file** with required headers.
- If the heatmap doesn’t appear, check if the CSV contains valid latitude and longitude values.

## License
This project is open-source and free to use under the MIT License.



