//$('#map2').html("Practice Map");

function createMap(){
  var map=L.map('map2', {
    center: [0,30],
    zoom: 2
  });
L.tileLayer('https://a.tiles.mapbox.com/v4/emullendore.p50l7ndp/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZW11bGxlbmRvcmUiLCJhIjoiY2lranhtcXQ4MDkya3Z0a200aGk0ZGRzMyJ9.zybsg8x8T8dh7mOgqTLiTg',{
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
}).addTo(map);

  getData(map);
};

function getData(map){
  $.ajax('data/MegaCities.geojson', {
    dataType: "json",
    success: function(response){
      var geojsonMarkerOptions={
        radius:4,
        fillColor: "#35ab54",
        color: "#000",
        weight:0.5,
        opacity: 1,
        fillOpacity: 1.0
      };
      //pointToLayer stuff, geojsonMarkerOptions
      L.geoJson(response, {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  }).addTo(map);
}
})
};
$(document).ready(createMap);
