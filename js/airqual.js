

function createMap(){
var map=L.map('map3', {
    center:[37,-97],
    zoom: 4
  });
L.tileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attirbution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);
  getData(map);
};
function getData(map){
  $.ajax("data/airqual.geojson", {
    dataType: "json",
    success: function(response){
      //create marker options
      var geojsonMarkerOptions={
        radius: 5,
        fillColor: "#35ab54",
        color: "#000",
        weight: 0.4,
        opacity: 1,
        fillOpacity: 1.0
      };
      L.geoJson(response, {
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
      }

    }).addTo(map);
    }
  })
};
$(document).ready(createMap);
