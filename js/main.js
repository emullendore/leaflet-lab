 var map = L.map('map').setView([16, 23], 6);
 L.tileLayer('https://b.tiles.mapbox.com/v4/emullendore.p4d6m6dj/6/16/23.png?access_token=pk.eyJ1IjoiZW11bGxlbmRvcmUiLCJhIjoiY2lraG54bTI2MDIzb3VjajdtZzAyYWhpbSJ9.r-Q0c0qgDzXAx1Rpkw_aoA', {
   attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
   maxZoon: 18,
   id: 'emullendore.p4d6m6dj',
  accessToken: 'pk.eyJ1IjoiZW11bGxlbmRvcmUiLCJhIjoiY2lraG54bTI2MDIzb3VjajdtZzAyYWhpbSJ9.r-Q0c0qgDzXAx1Rpkw_aoA'
}).addTo(map);
