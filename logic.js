var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

d3.json(url).then(function(data) {
    console.log(data)
});

var MyMap;

d3.json(url).then(createMarkers);

function createMarkers(response) {

  for (var i = 0; i < response.features.length; i++) {
    var depth = response.features[i].geometry.coordinates[2];
    var date = response.features[i].properties.time;
    var place = response.features[i].properties.place;
    var location = [response.features[i].geometry.coordinates[0], response.features[i].geometry.coordinates[1]];
    var magnitude = response.features[i].properties.mag;
      console.log(location);

    var earthquakeMarker = L.marker(location).bindPopup("<h3>" + response.features[i].properties.place + "<h3><h3>Magnitude: " + response.features[i].properties.mag + "</h3>" + "<h3><h3>Depth" + response.features[i].geometry.coordinates[2] + "</h3>" + "<h3><h3>Date: " + response.features[i].properties.time+ "</h3>");

    earthquakeMarkers.push(earthquakeMarker);

    var earthquakeCircles = L.circle (location, {
      color: "#0000FF", 
      radius: earthquakeRadius(magnitude)
    });

    earthquakeCircles.push(earthquakeCircle);
  }
function earthquakequakeRadius(magnitude) {
  return ((magnitude+1) ** 3) * 20000;
}
  createMap(L.layerGroup(earthquakeMarkers));
  addCircles(L.layerGroup(earthquakeCircles));
}

function createMap(earthquake) {
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  var baseMaps = {
    "Light Map": lightmap
  };

  var overlayMaps = {
    "Earthquakes": earthquakes,
  };

  myMap = L.map("map-id", {
    center: [40, -75],
    zoom: 8,
    layers: [lightmap, earthquakes]
  });


}

function addCircles(earthquakeCircles){
  earthquakeCircles.addTo(myMap);
  createLegend();
}


 