function createMap(earthquakes) {

    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: API_KEY
    });
  
    var baseMaps = {
      "Light Map": lightmap
    };
  

    var overlayMaps = {
      "Mag": EarthquakeMag
    };
  
  
    var map = L.map("map-id", {
      center: [40.73, -74.0059],
      zoom: 12,
      layers: [lightmap, EarthquakeMag]
    });
  
   
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  
  function createMarkers(response) {
  
    var earthquakes = response.data.earthquake;
  
    var magMarkers = [];
  
    for (var index = 0; index < earthquakes.length; index++) {
      var earthquake = earthquakes[index];
  
    
      var magMarker = L.marker([earthquake.lat, earthquake.lon])
        .bindPopup("<h3>" + earthquake.name + "<h3><h3>Capacity: " + earthquake.capacity + "</h3>");
  
      
      magMarkers.push(magMarker);
    }
  
    
    createMap(L.layerGroup(magMarkers));
  }
  

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";


d3.json(url).then(function(response) {
  
    console.log(response);

});







