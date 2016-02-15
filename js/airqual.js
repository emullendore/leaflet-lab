
//for my Lab 1, still doesn't show up on the webpage and I can't figure out why
//nothing for console log either and it appears correctly conntected with index.html
function createMap(){

  var map=L.map('map3', {

    center:[-20,30],
    zoom: 2
  });
L.tilelayer('https://a.tiles.mapbox.com/v4/emullendore.p5gjble8/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZW11bGxlbmRvcmUiLCJhIjoiY2lranhtcXQ4MDkya3Z0a200aGk0ZGRzMyJ9.zybsg8x8T8dh7mOgqTLiTg', {
  attirbution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  id: 'emullendore.p5gjble8',
  accessToken:'pk.eyJ1IjoiZW11bGxlbmRvcmUiLCJhIjoiY2lranhtcXQ4MDkya3Z0a200aGk0ZGRzMyJ9.zybsg8x8T8dh7mOgqTLiTg'
}).addTo(map);
  getData(map);
};
console.log(map);
function getData(map){
  $.ajax('data/airqual.geojson', {
    dataType: "json",
    success: function(response){
      var geojsonMarkerOptions={
        radius: 5,
        fillColor: "#35ab54",
        color: "#000",
        weight: 0.4,
        opacity: 1,
        fillOpacity: 1.0
      };
      L.geojson(response, {
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
      }

    }).addTo(map);
    }
  })
};
$(document).ready(createMap);
console.log("hi");
