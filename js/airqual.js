

function createMap(){
var map=L.map('map3', {
    center:[37,-97],
    zoom: 4
  });
L.tileLayer('https://b.tiles.mapbox.com/v4/emullendore.p7n4hkl0/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZW11bGxlbmRvcmUiLCJhIjoiY2lranhtcXQ4MDkya3Z0a200aGk0ZGRzMyJ9.zybsg8x8T8dh7mOgqTLiTg', {
  attirbution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);

  getData(map);

//create map, specifying tile source, center, and zoom of map

map.options.maxZoom=6;
map.options.minZoom=4;
//restrict zooming options

//map.options.LatLngBounds (to add later)
};


 function pointToLayer(features, latlng, attributes){
   //define attribute as first in array of attributes
   var attribute=attributes[0];
   //console.log(attribute);
   //give points color options
   var options={
     fillColor: "#828282",
     color: "#828281",
     weight: 1,
     opacity: 1,
     fillOpacity: 0.3
   };
  //define attValue as attribute value for each year, converting
  //to Number incase String
  var attValue=Number(features.properties[attribute]);
  //calculate symbol's size based on attribute value equal to radius
  options.radius = calcPropRadius(attValue);
  //create layer based on location, options
  var layer= L.circleMarker(latlng, options);
  //create content
  var panelContent="<p><b>City:</b>"+" "+features.properties.City+"</p>";
  var year=attribute.split("_")[1];
  //concoct with additional text
  panelContent+="<p><b>Pollution in"+" "+ year +":</b>"+features.properties[attribute]+" "+"µg/m3</p>";

  var popupContent=features.properties.City+" "+features.properties[attribute]+"µg/m3";
  //create popup and offset depending on radius
  layer.bindPopup(panelContent,{
    offset: new L.Point(0, -options.radius),
    closeButton: false
  });
  //event listeners for mouseover and mouseout
  layer.on({
    mouseover: function(){
      this.openPopup();
    },
    mouseout: function(){
      this.closePopup();
    },
  //removed clicking function (for now)
  //    click: function(){
  //    $("#panel").html(popupContent);
  //  }
  });

  return layer;
};

//for calculating radius of symbols based on
//attValue
function calcPropRadius(attValue){
  var scaleFactor=180;
  var area=attValue*scaleFactor;
  var radius=Math.sqrt(area/Math.PI);
  return radius
};


//create proportional symbols, add to map
function createPropSymbols(data, map, attributes){
  L.geoJson(data, {
    pointToLayer: function(features, latlng){
      return pointToLayer(features, latlng, attributes);
      }
    }).addTo(map);
};

//updatePropSymbols to resize depnding on radius
function updatePropSymbols(map, attribute) {
  map.eachLayer(function(layer){
    //console.log(layer[attribute]);
    if (layer.feature && layer.feature.properties[attribute]){
      //define props to find value of each attribute
      var props=layer.feature.properties;

      //find radius
      var radius=calcPropRadius(props[attribute]);
      //apply to layer
      layer.setRadius(radius);
      //give popup content
      var popupContent="<p><b>City:</b>"+ props.City+"</p>";

      var year=attribute.split("_")[1];
      console.log(year);

      popupContent+="<p><b>Pollution level in" + year + ":</b>" + props[attribute]+ "PM2.5</p>";
      //bind popup with layer
      layer.bindPopup(popupContent, {

        offset: new L.Point(0, -radius)
      })//.addTo(map)
    }
  })//.addTo(map);
};



//create slider, arrows
function createSequenceControls(map, attributes){
  $('#panel').append('<input class="range-slider" type="range">');
  $('.range-slider').attr({
    //set max, min-- 2000 thru 2014-- at one step increments
    max: 14,
    min: 0,
    value:0,
    step:1
  });
//add forward, backward arrows with icons
  $('#panel').append('<button class="skip" id="reverse"> Reverse</button>');
  $('#panel').append('<button class="skip" id="forward">Skip</button>');
  $('#reverse').html('<img src="images/Long Arrow Left-64.png"">');
  $('#forward').html('<img src="images/Long Arrow Right-64.png">');
//click event listener
  $('.skip').click(function(){
    var index=$('.range-slider').val();
    //if forward clicked, increasing increments by 1
    if ($(this).attr('id')=='forward'){
      index++;
      index=index> 14 ? 0 : index;
      //else if reverse clicked, decreasing increments by 1
    } else if ($(this).attr('id')=='reverse'){
      index--;
      index=index < 0 ? 14 : index;
    };
//add slider
    $('.range-slider').val(index);
//should updatePropSymbols with interaction
    updatePropSymbols(map, attributes[index]);
    console.log(attributes[index]);
    });

  $('.range-slider').on('input', function() {
    var index=$(this).val();
//updatePropSymbols with use of slider too
    updatePropSymbols(map, attributes[index]);
    console.log(attributes[index]);
  });

};


//process data by creating attributes array
function processData(data){
  var attributes=[];
  //define first item in array, this case info on Fresno, CA
  var propProcessData=data.features[0].properties;
  //console.log(data.features[0].properties);
  //create loop to go through all cities
  for (var attribute in propProcessData){
    if (attribute.indexOf("yr")>-1){
      attributes.push(attribute);
    };
  };
  //console.log(attributes);
  return attributes;
};


//ajax callback function to get data from geojson
function getData(map){
  $.ajax("data/airqual2.geojson", {
    dataType: "json",
    success: function(response){

      var attributes=processData(response);

      createPropSymbols(response, map, attributes);
      createSequenceControls(map, attributes);

    }
  })
};


$(document).ready(createMap);
