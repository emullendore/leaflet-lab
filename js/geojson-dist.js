function createMap(){var a=L.map("map",{center:[0,30],zoom:2});L.tileLayer("https://a.tiles.mapbox.com/v4/emullendore.p50l7ndp/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZW11bGxlbmRvcmUiLCJhIjoiY2lranhtcXQ4MDkya3Z0a200aGk0ZGRzMyJ9.zybsg8x8T8dh7mOgqTLiTg",{attribution:'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'}).addTo(a),getData(a)}function getData(a){$.ajax("data/MegaCities.geojson",{dataType:"json",success:function(e){var t={radius:4,fillColor:"#35ab54",color:"#000",weight:.5,opacity:1,fillOpacity:1};L.geoJson(e,{pointToLayer:function(a,e){return L.circleMarker(e,t)}}).addTo(a)}})}$("#map2").html("Practice Map"),$(document).ready(createMap);
