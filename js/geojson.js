//$('#map2').html("Practice Map");

function createMap2(){
  //create map, assign to id 'map2'
  var map=L.map('map2', {
    //set center, zoom
    center: [0,30],
    zoom: 2
  });
  console.log(map2);
//source of tile layer
L.tileLayer('https://a.tiles.mapbox.com/v4/emullendore.p50l7ndp/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZW11bGxlbmRvcmUiLCJhIjoiY2lranhtcXQ4MDkya3Z0a200aGk0ZGRzMyJ9.zybsg8x8T8dh7mOgqTLiTg',{
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
}).addTo(map);
  //within createMap function getData command
  getData2(map);
};
//getData will use ajax to to access geojson filter
function getData2(map){
  $.ajax("data/MegaCities.geojson", {
    dataType: "json",
    //with success, function will give geojson marker options in appearence
    success: function(response){
      var geojsonMarkerOptions={
        radius:4,
        fillColor: "#2e4276",
        color: "#000",
        weight:0.5,
        opacity: 1,
        fillOpacity: 1.0
      };
      //points will be assigned to a layers, instead of simple markers created
      L.geoJson(response, {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  }).addTo(map);
}
})
};
//add map to document
//$(document).ready(createMap2);
