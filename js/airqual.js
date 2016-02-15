function createMap(){
  var map=L.map('map3', {
    center:[-20,30],
    zoom: 2
    console.log(map3);
  });
L.tilelayer('https://api.tiles.mapbox.com/v4/emullendore.p5gjble8/{z}/{x}/{y}.png?access_token=tk.eyJ1IjoiZW11bGxlbmRvcmUiLCJleHAiOjE0NTU1MDQ4MTUsImlhdCI6MTQ1NTUwMTIxNCwic2NvcGVzIjpbImVzc2VudGlhbHMiLCJzY29wZXM6bGlzdCIsIm1hcDpyZWFkIiwibWFwOndyaXRlIiwidXNlcjpyZWFkIiwidXNlcjp3cml0ZSIsInVwbG9hZHM6cmVhZCIsInVwbG9hZHM6bGlzdCIsInVwbG9hZHM6d3JpdGUiLCJzdHlsZXM6dGlsZXMiLCJzdHlsZXM6cmVhZCIsImZvbnRzOnJlYWQiLCJzdHlsZXM6d3JpdGUiLCJzdHlsZXM6bGlzdCIsInN0eWxlczpkcmFmdCIsImZvbnRzOmxpc3QiLCJmb250czp3cml0ZSIsImZvbnRzOm1ldGFkYXRhIiwiZGF0YXNldHM6cmVhZCIsImRhdGFzZXRzOndyaXRlIl0sImNsaWVudCI6Im1hcGJveC5jb20ifQ.3j5JD4yfm35ZI-jkaovXtg&update=iknbu', {
  attirbution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
}).addTo(map);
  getData(map);
};

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
      L.geojson(response,
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
      }

    }).addTo(map);
    }
  })
};
$(document).ready(createMap);
