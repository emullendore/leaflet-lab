

function createMap(){
var map=L.map('map3', {
    center:[37,-97],
    zoom: 4

  });
L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}.png?access_token=tk.eyJ1IjoiZW11bGxlbmRvcmUiLCJleHAiOjE0NTYxOTkwODksImlhdCI6MTQ1NjE5NTQ4OSwic2NvcGVzIjpbImVzc2VudGlhbHMiLCJzY29wZXM6bGlzdCIsIm1hcDpyZWFkIiwibWFwOndyaXRlIiwidXNlcjpyZWFkIiwidXNlcjp3cml0ZSIsInVwbG9hZHM6cmVhZCIsInVwbG9hZHM6bGlzdCIsInVwbG9hZHM6d3JpdGUiLCJzdHlsZXM6dGlsZXMiLCJzdHlsZXM6cmVhZCIsImZvbnRzOnJlYWQiLCJzdHlsZXM6d3JpdGUiLCJzdHlsZXM6bGlzdCIsInN0eWxlczpkcmFmdCIsImZvbnRzOmxpc3QiLCJmb250czp3cml0ZSIsImZvbnRzOm1ldGFkYXRhIiwiZGF0YXNldHM6cmVhZCIsImRhdGFzZXRzOndyaXRlIl0sImNsaWVudCI6Im1hcGJveC5jb20ifQ.P1wQOVhrbQW8syGvNBAzsQ&update=ikyt7', {
  attirbution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);
  getData(map);


map.options.maxZoom=6;
map.options.minZoom=4;

//map.options.LatLngBounds
};


 function pointToLayer(features, latlng, attributes){
   var attribute=attributes[0];
   var options={
     fillColor: "#828282",
     color: "#828281",
     weight: 1,
     opacity: 1,
     fillOpacity: 0.3
   };
  var attValue=Number(features.properties[attribute]);
  options.radius = calcPropRadius(attValue);
  var layer= L.circleMarker(latlng, options);
  var panelContent="<p><b>City:</b>"+" "+features.properties.City+"</p>";
  var year=attribute.split("_")[1];
  panelContent+="<p><b>Pollution in"+" "+ year +":</b>"+features.properties[attribute]+" "+"µg/m3</p>";

  var popupContent=features.properties.City+" "+features.properties[attribute]+"µg/m3";

  layer.bindPopup(panelContent,{
    offset: new L.Point(0, -options.radius),
    closeButton: false
  });

  layer.on({
    mouseover: function(){
      this.openPopup();
    },
    mouseout: function(){
      this.closePopup();
    },
  //  click: function(){
  //    $("#panel").html(popupContent);
  //  }
  });

  return layer;
};

function calcPropRadius(attValue){
  var scaleFactor=180;
  var area=attValue*scaleFactor;
  var radius=Math.sqrt(area/Math.PI);
  return radius
};

function createPropSymbols(data, map, attributes){
  L.geoJson(data, {
    pointToLayer: function(features, latlng){
      return pointToLayer(features, latlng, attributes);
      }
    }).addTo(map);
  };


function updatePropSymbols(map, attributes) {
  map.eachLayer(function(layer){
    if (layer.features && layer.features.properties[attribute]){
      var props=layer.features.properties;
      console.log(props);
      var radius=calcPropRadius(props[attribute]);
      layer.setRadius(radius);

      var popupContent="<p><b>City:</b>"+ props.City+"</p>";
      var year=attribute.split("_")[1];
      popupContent+="<p><b>Pollution level in" + year + ":</b>" + props[attribute]+ "PM2.5</p>";
      layer.bindPopup(popupContent, {
        offset: new L.Point(0, -raidus)
      });
    };
  });
};

function createSequenceControls(map, attributes){
  $('#panel').append('<input class="range-slider" type="range">');
  $('.range-slider').attr({
    max: 14,
    min: 0,
    value:0,
    step:1
  });

  $('#panel').append('<button class="skip" id="reverse"> Reverse</button>');

  $('#panel').append('<button class="skip" id="forward">Skip</button>');
  $('#reverse').html('<img src="images/Long Arrow Left-64.png"">');
  $('#forward').html('<img src="images/Long Arrow Right-64.png">');
  $('.skip').click(function(){
    var index=$('.range-slider').val();
    if ($(this).attr('id')=='forward'){
      index++;

      index=index> 14 ? 0 : index;
    } else if ($(this).attr('id')=='reverse'){
      index--;
      index=index < 0 ? 14 : index;
    };
    $('.range-slider').val(index);
    updatePropSymbols(map, attributes[index]);
    console.log(attributes[index]);


    });

  $('.range-slider').on('input', function() {
    var index=$(this).val();
    updatePropSymbols(map, attributes[index]);
    console.log(attributes[index]);
  });

};

function processData(data){
  var attributes=[];
  var propProcessData=data.features[0].properties;
  //console.log(data.features[0].properties);
  for (var attribute in propProcessData){
    if (attribute.indexOf("yr")>-1){
      attributes.push(attribute);
    };
  };
  console.log(attributes);
  return attributes;
};


function getData(map){
  $.ajax("data/airqual2.geojson", {
    dataType: "json",
    success: function(response){

      var attributes=processData(response);

      createPropSymbols(response, map, attributes);
      createSequenceControls(map, attributes);
      updatePropSymbols(map, attributes);
    }
  });
};

$(document).ready(createMap);
