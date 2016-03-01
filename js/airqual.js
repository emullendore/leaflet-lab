

function createMap(){
var map=L.map('map3', {
    center:[38,-97],
    zoom: 4,
    doubleClickZoom: false,
    maxBounds: bounds
  });
L.tileLayer('https://b.tiles.mapbox.com/v4/emullendore.p7n4hkl0/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZW11bGxlbmRvcmUiLCJhIjoiY2lranhtcXQ4MDkya3Z0a200aGk0ZGRzMyJ9.zybsg8x8T8dh7mOgqTLiTg', {
  attirbution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'

}).addTo(map);

  getData(map);


//create map, specifying tile source, center, and zoom of map


var bounds=[[22,-128],
    [49,-60]]

map.options.maxZoom=7;
map.options.minZoom=4;


// ]);
// bounds=new L.LatLngBounds(new L.LatLngBounds(22,-128), new L.LatLngBounds(49,-60));
// map.options.maxBounds=bounds;

//restrict zooming options --- IT DONT WORK

//map.options.LatLngBounds (to add later)
};


 function pointToLayer(features, latlng, attributes){
   //define attribute as first in array of attributes
   var attribute=attributes[0];
   //console.log(attribute);
   //give points color options
   var options={
     fillColor: "#828282",
     color: "#828282",
     weight: 1.2,
     opacity: 1,
     fillOpacity: 0.14
   };
  //define attValue as attribute value for each year, converting
  //to Number incase String
  var attValue=Number(features.properties[attribute]);
  //calculate symbol's size based on attribute value equal to radius
  options.radius = calcPropRadius(attValue);
  //create layer based on location, options
  var layer= L.circleMarker(latlng, options);
  //create content
  var panelContent="<p><b>City:</b>"+" "+features.properties.desc+"</p>";
  var year=attribute.split("_")[1];
  //concoct with additional text
  panelContent+="<p><b>Pollution Level in"+ year +": </b>"+features.properties[attribute]+" "+"ppb</p>";

  var popupContent=features.properties.city+" "+features.properties[attribute]+"µg/m3";
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
      click: function(){
      $("#dates").html(attribute.split("_")[1]);
      }
  });

  return layer;
};

//for calculating radius of symbols based on
//attValue
function calcPropRadius(attValue){
  var scaleFactor=50;
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
    //  console.log(props);
      //find radius
      var radius=calcPropRadius(props[attribute]);
      //apply to layer
      layer.setRadius(radius);
      //give popup content
      var popupContent="<p><b>City:</b>"+" "+ props.desc+"</p>";

      var year=attribute.split("_")[1];
      //console.log(year);

      popupContent+="<p><b>Pollution Level in "+" "+ year + ":</b>"+ " " + props[attribute]+" "+"ppb</p>";
      //bind popup with layer
      layer.bindPopup(popupContent, {

        offset: new L.Point(0, -radius)
      })
    }
  })
};

//process data by creating attributes array
function processData(data){
  var attributes=[];
  //define first item in array, this case info on Fresno, CA
  var propProcessData=data.features[0].properties;
  //console.log(propProcessData);

  //create loop to go through all cities
  for (var attribute in propProcessData){
    if (attribute.indexOf("yr")>-1){
      attributes.push(attribute);
      };
    };
  //console.log(attributes);
  return attributes;
};

function addCoalPlants(response, map) {
  var pPlantMarkerOptions={
    radius: 5,
    fillColor: "steelblue",
    color: "darkgrey",
    buffer: 3,
    weight: 1,
    opacity: 1,
    fillOpacity:1
    };

  L.geoJson(response, {
    pointToLayer: function(feature, latlng) {
      //define layer and popupContent
      var layer2 = L.circleMarker(latlng, pPlantMarkerOptions)
      var popupContent="<p><b>City: </b>"+feature.properties.desc+"</p>"
      popupContent+="<p><b>Plant: </b>"+feature.properties.PlantName+"</p>"
      //add functionality to button to add/remove layer2
      $('#overlayButton').click(function(){
      if (map.hasLayer(layer2)){
          map.removeLayer(layer2);
      } else {
        map.addLayer(layer2);
      }
    });
    //bind popup content to layer2
      layer2.bindPopup(popupContent);
      layer2.on({
    //provide functionality for mouseover and mouseout
          mouseover: function(){
            this.openPopup();
        },
          mouseout: function(){
            this.closePopup();
          }
        });
        return layer2;
      }
  }).addTo(map);
};

//MODULE 6
//function updateLegend(map, attribute){
//   var year=attribute.split("_")[1];
//   //console.log(year);
//   var content="SO2 Concentration in "+ year;
//   $('#temporal-legend').html(content); //ADD IN HTML AS DIV
//
//   var circleValues=getCircleValues(map, attribute);
//   //console.log(circleValues);
//   for (var key in circleValues){
//     var radius= calcPropRadius(circleValues[key]);
//
//     $('#'+key).attr({
//       cy: 59-radius,
//       r: radius
//     });
//     $('#'+key+'-text').text(Math.round(circleValues[key]*100)/100+ "ppb");
//   };
//
// };
//
// function getCircleValues(map, attribute){
//   var min = Infinity,
//       max = - Infinity;
//   map.eachLayer(function(layer){
//     if(layer.feature){
//
//         var attributeValue=Number(layer.feature.properties[attribute]);
//     };
//
//     if (attributeValue<min){
//         min=attributeValue;
//     };
//
//     if(attributeValue>max){
//         max=attributeValue;
//     };
//   });
//
//   var mean=(max+min)/2;
//
//   return {
//       max: max,
//       mean: mean,
//       min: min
//   };
// };
//
// function createLegend(map, attributes){
//     var LegendControl=L.Control.extend({
//       options: {
//         position: 'bottomright'
//       },
//
//       onAdd: function(map){
//           var container=L.DomUtil.create('div', 'legend-control-container');
//
//           $(container).append('<div id="temporal-legend">');
//           var svg='<svg id="attribute-legend" width="160px" height="60px">';
//
//           var circles={
//             max: 1,
//             mean: 40,
//             min: 159
//           };
//
//           for (var circle in circles){
//           svg += '<circle class="legend-circle" id="' + circle + '" fill="#F47821" fill-opacity="0.8" stroke="#000000" cx="30"/>';
//
// 				//text string
// 				  svg += '<text id="' + circle + '-text" x="65" y="' + circles[circle] + '"></text>';
// 			};
//
// 			//close svg string
// 			svg += "</svg>";
//
// 			//add attribute legend svg to container
// 			$(container).append(svg);
//
// 			return container;
// 		}
// });
//   map.addControl(new LegendControl());
//   updateLegend(map, attributes[0]);
// };



//create slider, arrows
function createSequenceControls(map, attributes){
  $('#panel').append('<input class="range-slider" type="range">');
  $('.range-slider').attr({
    //set max, min-- 1990 thru 2014-- at one step increments
    max: 24,
    min: 0,
    value:0,
    step:1
  });
//add forward, backward arrows with icons
  $('#panel').append('<button class="skip" id="reverse"> Reverse</button>');
  $('#panel').append('<button class="skip" id="forward">Skip</button>');
  $('#reverse').html('<img src="images/left2.png"">');
  $('#forward').html('<img src="images/right2.png">');
//click event listener
  $('.skip').click(function(){
    var index=$('.range-slider').val();
    //if forward clicked, increasing increments by 1
    if ($(this).attr('id')=='forward'){
      index++;
      index=index> 24 ? 0 : index;
      //else if reverse clicked, decreasing increments by 1
    } else if ($(this).attr('id')=='reverse'){
      index--;
      index=index < 0 ? 24 : index;
    };
//add slider
    $('.range-slider').val(index);
//should updatePropSymbols with interaction
    updatePropSymbols(map, attributes[index]);
    //console.log(attributes[index]);
  });

  $('.range-slider').on('input', function() {
    var index=$(this).val();
//updatePropSymbols with use of slider too
    updatePropSymbols(map, attributes[index]);
    //console.log(attributes[index]);
  });
};

//ajax callback function to get data from geojson
function getData(map){
  $.ajax("data/airqual_final.geojson", {
    dataType: "json",
    success: function(response){

      var attributes=processData(response);

      createPropSymbols(response, map, attributes);
      createSequenceControls(map, attributes);
      //createLegend(map, attributes);
    }
  });

  $.ajax({
    dataType: "json",
    url: "data/pplants.geojson",
    success: function(response){
      addCoalPlants(response, map);
    }
  })
};


$(document).ready(createMap);
