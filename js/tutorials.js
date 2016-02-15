// //This is my tutorials document
//
// //Quick Start Guide
//
// //set view of map with lat, lon, and zoom
// var map = L.map('map').setView([44, -89], 8);
// //use url with id and access_token and load content
// L.tileLayer('https://b.tiles.mapbox.com/v4/emullendore.p4d6m6dj/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZW11bGxlbmRvcmUiLCJhIjoiY2lranhtcXQ4MDkya3Z0a200aGk0ZGRzMyJ9.zybsg8x8T8dh7mOgqTLiTg', {
//   attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//   maxZoom: 18,
//   id: 'emullendore.p4d6m6dj',
//  accessToken: 'pk.eyJ1IjoiZW11bGxlbmRvcmUiLCJhIjoiY2lranhtcXQ4MDkya3Z0a200aGk0ZGRzMyJ9.zybsg8x8T8dh7mOgqTLiTg'
// }).addTo(map);
//
// //create vars marker, circle, and polygon that will make elements on map
// var marker=L.marker([44,-88]).addTo(map);
//
// var circle=L.circle([44,-88.1], 10000,{
//  color: 'blue',
//  fillColor: '#f03',
//  fillOpacity: 0.2
// }).addTo(map);
//
// var polygon =L.polygon([
//  [44.1,-88.4],
//  [44,-87],
//  [44.3,-88]
// ]).addTo(map);
// //create popups associated with each element
// marker.bindPopup("<b>Hello world!</b><b>I am a popup.").openPopup();
// circle.bindPopup("circle!");
// polygon.bindPopup("triangle");
// //make a popup that is not binded to a var
// var popup=L.popup()
//  .setLatLng([44.8,-88.5])
//  .setContent("I am a standalone popup.")
//  .openOn(map);
//
//  var popup = L.popup();
// //make popup that will yeild lat/lon
// //e.latlng stringified for ease of reading
//  function onMapClick(e) {
//      popup
//          .setLatLng(e.latlng)
//          .setContent("You clicked the map at " + e.latlng.toString())
//          .openOn(map);
//  }
// //this popup is activated on click
//  map.on('click', onMapClick);
//
//
// //Using GeoJSON with Leaflet

// //this script may not actually work with my map
// //i know for a fact they don't
//
// //create feature, point, with properties name, amenity, popupContent
// var geojsonFeature = {
//     "type": "Feature",
//     "properties": {
//         "name": "Coors Field",
//         "amenity": "Baseball Stadium",
//         "popupContent": "This is where the Rockies play!"
//     },
//     "geometry": {
//         "type": "Point",
//         "coordinates": [44, -89]
//     }
//   };
//
// L.geoJson(geojsonFeature).addTo(map);
// console.log(map);
//
// //create lines
// var myLines=[{
//   "type":"LineString",
//   "coordinates":[[44,-90],[45,-90],[46,-91]]}
// ];
// //specify line styles
// var myStyle = {
//     "color": "#ff7800",
//     "weight": 5,
//     "opacity": 0.65
// };
//
// L.geoJson(myLines, {
//     style: myStyle
// //add lines to map
// }).addTo(map);
// //create two polygons, one with property Repbulican
// // the other, Democrat
// var states = [{
//     "type": "Feature",
//     "properties": {"party": "Republican"},
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[
//             [-104.05, 48.99],
//             [-97.22,  48.98],
//             [-96.58,  45.94],
//             [-104.03, 45.94],
//             [-104.05, 48.99]
//         ]]
//     }
// }, {
//     "type": "Feature",
//     "properties": {"party": "Democrat"},
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[
//             [-109.05, 41.00],
//             [-102.06, 40.99],
//             [-102.03, 36.99],
//             [-109.04, 36.99],
//             [-109.05, 41.00]
//         ]]
//     }
// }];
// //assign styles, depending on properties
// L.geoJson(states, {
//     style: function(feature) {
//         switch (feature.properties.party) {
//             case 'Republican': return {color: "#ff0000"};
//             case 'Democrat':   return {color: "#0000ff"};
//         }
//     }
// }).addTo(map);
//
//
// //new marker created
// var geojsonMarkerOptions = {
//     radius: 12,
//     fillColor: "#ff7800",
//     color: "#000",
//     weight: 1,
//     opacity: 1,
//     fillOpacity: 0.8
// };
//
// L.geoJson(geojsonFeature, {
//     //create layer for geoJson points, in 'feature' layer, located
//     //at 'latlng'
//     pointToLayer: function (feature, latlng) {
//         return L.circleMarker(latlng, geojsonMarkerOptions);
//     }
// }).addTo(map);
//
// //create features Coors Field and Busch Fields
// var someFeatures = [{
//     "type": "Feature",
//     "properties": {
//         "name": "Coors Field",
//         "show_on_map": true //opt to show this features
//     },
//     "geometry": {
//         "type": "Point",
//         "coordinates": [-104.99404, 39.75621]
//     }
// }, {
//     "type": "Feature",
//     "properties": {
//         "name": "Busch Field",
//         "show_on_map": false //opt to hide this feature
//     },
//     "geometry": {
//         "type": "Point",
//         "coordinates": [-104.98404, 39.74621]
//     }
// }];
//
// L.geoJson(someFeatures, {
//     filter: function(feature, layer) {
//         return feature.properties.show_on_map;
//     }
// }).addTo(map);
//
// $(document).ready();
