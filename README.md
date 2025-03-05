# Dark Store Placement & Heatmap Visualization

## Overview
This project provides an interactive web application to visualize optimal dark store placements and heatmap representations based on CSV data containing latitude, longitude, and location information. The application leverages Leaflet.js for mapping, Turf.js for distance calculations, and PapaParse for CSV file parsing.

## Features
- **Glassmorphism UI**: Modern and aesthetic design using blur effects.
- **CSV Upload**: Accepts a CSV file with Latitude, Longitude, and Location columns.
- **Store Placement Mapping**: Filters store locations to ensure optimal spacing and prevents clustering within a 3km radius.
- **Heatmap Generation**: Displays heat intensity based on selected locations.
- **Leaflet Integration**: Uses OpenStreetMap tiles for interactive mapping.

## Technologies Used
- **HTML, CSS, JavaScript**
- **Leaflet.js** (for mapping)
- **PapaParse.js** (for CSV parsing)
- **Turf.js** (for distance calculations)

## Installation & Usage
1. Clone the repository or download the files.
2. Open the `index.html` file in a web browser.
3. Upload a CSV file with the following format:

   ```csv
   Latitude,Longitude,Location
   18.5204,73.8567,Pune
   19.0760,72.8777,Mumbai
   ```

4. Click on **Generate Store Map** to plot optimal store placements.
5. Click on **Generate Heatmap** to visualize the heat intensity.

## File Structure
```
- index.html        # Main HTML file with UI and script references
- style.css         # Contains the Glassmorphism styling
- script.js         # JavaScript logic for parsing CSV, map rendering, and heatmap
```

## Dependencies
- [Leaflet.js](https://leafletjs.com/)
- [PapaParse.js](https://www.papaparse.com/)
- [Turf.js](https://turfjs.org/)

## Future Improvements
- Implement user-defined radius for store placements.
- Allow different heatmap gradient colors.
- Integrate real-time location tracking.

## License
This project is open-source and available for modification and redistribution.

