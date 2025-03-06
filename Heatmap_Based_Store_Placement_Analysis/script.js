let storeData = [];
let map = L.map('map').setView([18.5204, 73.8567], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let heatmapMap = L.map('heatmap').setView([18.5204, 73.8567], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(heatmapMap);
let heatLayer;

document.getElementById('drop-zone').addEventListener('click', () => {
    document.getElementById('csvFileInput').click();
});

document.getElementById('csvFileInput').addEventListener('change', (event) => {
    readCSV(event.target.files[0]);
});

function getMarkerColor(storeType) {
    return storeType === "Retail" ? "blue" :
           storeType === "Restaurant" ? "green" :
           storeType === "Pharmacy" ? "red" : "orange";
}

function readCSV(file) {
    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
            storeData = result.data.map(row => ([ 
                parseFloat(row.Latitude), 
                parseFloat(row.Longitude), 
                row["Store Type"], 
                parseFloat(row["Foot Traffic"]) || 1, 
                parseFloat(row["Population Density"]) || 0 // Adding Population Density
            ]));
        }
    });
}

function processCSV() {
    if (!storeData.length) return alert("Please upload a CSV file first!");
    storeData.forEach(([lat, lon, storeType, footTraffic]) => {
        L.marker([lat, lon], {
            icon: L.icon({
                iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${getMarkerColor(storeType)}.png`,
                iconSize: [25, 41]
            })
        }).addTo(map).bindPopup(`<b>Store Type:</b> ${storeType}<br><b>Foot Traffic:</b> ${footTraffic}`);
    });
}

function generateHeatmap() {
    if (heatLayer) heatmapMap.removeLayer(heatLayer);
    if (!storeData.length) return alert("No data found! Upload a CSV first.");
    heatLayer = L.heatLayer(storeData.map(([lat, lon, , footTraffic]) => [lat, lon, footTraffic]), { 
        radius: 25, 
        blur: 15, 
        maxZoom: 10 
    }).addTo(heatmapMap);
}

function kMeansClustering(k) {
    if (!storeData.length) return alert("No data to cluster! Upload a CSV first.");

    // Function to calculate Euclidean distance
    function euclideanDistance(point1, point2) {
        return Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2));
    }

    // Initialize centroids randomly
    let centroids = [];
    while (centroids.length < k) {
        let randIndex = Math.floor(Math.random() * storeData.length);
        if (!centroids.some(centroid => centroid[0] === storeData[randIndex][0] && centroid[1] === storeData[randIndex][1])) {
            centroids.push(storeData[randIndex].slice(0, 2)); // Only use lat and lon for centroid
        }
    }

    let clusters = Array(k).fill().map(() => []);
    let prevCentroids = new Array(k).fill([0, 0]);

    // K-Means Loop
    while (JSON.stringify(centroids) !== JSON.stringify(prevCentroids)) {
        clusters = Array(k).fill().map(() => []);
        
        // Assign each point to the nearest centroid
        storeData.forEach(([lat, lon, storeType, footTraffic]) => {
            let closestCentroidIndex = centroids.reduce((closest, centroid, index) => {
                let dist = euclideanDistance([lat, lon], centroid);
                return dist < closest.dist ? { dist, index } : closest;
            }, { dist: Infinity }).index;
            
            clusters[closestCentroidIndex].push([lat, lon, storeType, footTraffic]);
        });

        prevCentroids = [...centroids];

        // Recalculate centroids
        centroids = clusters.map(cluster => {
            let sumLat = 0, sumLon = 0;
            cluster.forEach(([lat, lon]) => {
                sumLat += lat;
                sumLon += lon;
            });
            return [sumLat / cluster.length, sumLon / cluster.length];
        });
    }

    // Display clusters on the map
    clusters.forEach((cluster, clusterIndex) => {
        cluster.forEach(([lat, lon, storeType, footTraffic]) => {
            L.marker([lat, lon], {
                icon: L.icon({
                    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${clusterIndex + 1}.png`,
                    iconSize: [25, 41]
                })
            }).addTo(map).bindPopup(`<b>Store Type:</b> ${storeType}<br><b>Foot Traffic:</b> ${footTraffic}<br><b>Cluster:</b> ${clusterIndex + 1}`);
        });
    });
}

function recommendDarkStores() {
    if (!storeData.length) return alert("Please upload a CSV file first!");

    // Sort stores by population density and foot traffic to find optimal locations
    const potentialDarkStores = storeData
        .filter(([lat, lon, storeType, footTraffic, popDensity]) => {
            return storeType !== "Retail" && footTraffic < 50 && popDensity > 5000; // Criteria for Dark Store
        })
        .sort((a, b) => b[4] - a[4]); // Sort by Population Density

    // Display recommended dark stores on the map
    potentialDarkStores.forEach(([lat, lon, storeType, footTraffic, popDensity], index) => {
        L.marker([lat, lon], {
            icon: L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-3.png', // Dark Store Marker
                iconSize: [25, 41]
            })
        }).addTo(map).bindPopup(`<b>Recommended Dark Store Location</b><br><b>Population Density:</b> ${popDensity}<br><b>Foot Traffic:</b> ${footTraffic}`);
    });

    alert("Dark Store recommendations displayed on the map.");
}
