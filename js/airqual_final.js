

function createMap(){
  //set panning bounds
  var bounds=[[19,-130],[55,-30]]
  var map=L.map('map3', {
      center:[38,-97],
      zoom: 4,
      doubleClickZoom: false,
      maxBounds: bounds
    });

    L.tileLayer('https://b.tiles.mapbox.com/v4/emullendore.p7n4hkl0/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZW11bGxlbmRvcmUiLCJhIjoiY2lranhtcXQ4MDkya3Z0a200aGk0ZGRzMyJ9.zybsg8x8T8dh7mOgqTLiTg', {

  }).addTo(map);

  getData(map);

  //create map, specifying tile source, center, and zoom of map
  map.options.maxZoom=8;
  map.options.minZoom=4;

};

function createPopup(properties, attribute, layer, radius){
  var panelContent="<p><b>City:</b>"+" "+properties.desc+"</p>";
  var year=attribute.split("_")[1];
  //concoct with additional text
  panelContent+="<p><b>Pollution Level in "+ year +": </b>"+properties[attribute]+" "+"ppb</p>";
  layer.bindPopup(panelContent,{
    //position popup depending on radius
    offset: new L.point(0,-radius)
  });
};


function pointToLayer(features, latlng, attributes){
 //define attribute as first in array of attributes
 var attribute=attributes[0];
 //give points color options
 var options={
   fillColor: "#828282",
   weight: 1,
   opacity: 1,
   fillOpacity: 0.14
 };
  //define attValue as attribute value for each year, converting to Number incase String
  var attValue=Number(features.properties[attribute]);
  //calculate symbol's size based on attribute value equal to radius
  options.radius = calcPropRadius(attValue);
  //create layer based on location, options
  var layer= L.circleMarker(latlng, options);

  createPopup(features.properties, attribute, layer, options.radius)

  //set initial condition that if >75 (above Ambient Air Quality Standards), indicate
  if (features.properties[attribute]>75){
    var line={color: 'darkorange'}
    layer.setStyle(line);
  };
  if (features.properties[attribute]<=75){
    var line={color: "grey"}
    layer.setStyle(line);
    }
  //event listeners for mouseover and mouseout
  layer.on({
    mouseover: function(){
      this.openPopup();
    },
    mouseout: function(){
      this.closePopup();
    },

  });

  return layer;
};

//for calculating radius of symbols based on
//attValue
function calcPropRadius(attValue){
  var scaleFactor=30;
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

    if (layer.feature && layer.feature.properties[attribute]){
      //define props to find value of each attribute
      var props=layer.feature.properties;
      //find radius
      var radius=calcPropRadius(props[attribute]);
      //apply to layer
      layer.setRadius(radius);
      //give popup content

      createPopup(props, attribute, layer, radius);
      updateLegend(map, attribute);
    //if value above 75, min SO2 AAQS, indicate
    if (layer.feature && layer.feature.properties[attribute] > 75){
      var line = {color: 'darkorange'}
      layer.setStyle(line);
    //if value below 75, return to grey
    };
    if (layer.feature && layer.feature.properties[attribute] <= 75){
      var line = {color: "grey"}
      layer.setStyle(line);
    };
  }
})
};
//process data by creating attributes array
function processData(data){
  var attributes=[];
  //define first item in array, this case info on Fresno, CA
  var propProcessData=data.features[0].properties;

  //create loop to go through all cities
  for (var attribute in propProcessData){
    if (attribute.indexOf("yr")>-1){
      attributes.push(attribute);
      };
    };
  return attributes;
};

//ACTIVITY 6
//5th Operator: overlay of coal-fired power plants
function addCoalPlants(response, map) {
  var pPlantMarkerOptions={
    radius: 5,
    fillColor: "steelblue",
    color: "darkslategray",
    buffer: 3,
    weight: 0.6,
    opacity: 1,
    fillOpacity:1
    };

  L.geoJson(response, {
    //convert point to layer, add pop ups, interactivty with overlayButton
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


function createLegend(map, attributes){
    var LegendControl=L.Control.extend({
      options: {
        position: 'bottomright'
      },

    onAdd: function(map){
      //create legend, adding div legend
        var container=L.DomUtil.create('div', 'legend-control-container');

        $(container).append('<div id="temporal-legend">');

        var svg= '<svg id="attribute-legend" width="235px" height="135px">';
        //position labels for legend just so
        var circles={
          max: 50,
          mean: 70,
          min: 90
        };
        for (var circle in circles){
          //style circles
          svg += '<circle class="legend-circle" id="' + circle + '" fill="#828282" fill-opacity="0.14" stroke="grey" cx="70"/>';
           //text string
           svg += '<text id="' + circle + '-text" x="150" y="' + circles[circle] + '"></text>';
       }
        //close svg string
        svg += "</svg>";

        //add attribute legend svg to container
        $(container).append(svg);
      return container;
      }
  });
  map.addControl(new LegendControl());
  updateLegend(map, attributes[0]);
};

function updateLegend(map, attribute){
  //add content to legend
  var year = attribute.split("_")[1];
  var content="Pollution Level in "+year;
  $('#temporal-legend').html(content);

  var circleValues = getCircleValues(map, attribute);
  //make symbols in legend change dynamically
  for (var key in circleValues){
    var radius=calcPropRadius(circleValues[key]);
    $('#'+key).attr({
      cy:129 - radius,
      r: radius
    });

    $('#'+key+'-text').text(Math.round(circleValues[key]*100)/100+" ppb");
  }
};

function getCircleValues(map, attribute){
  //vars set to determine max, min values
  var min=Infinity,
      max=-Infinity;
  map.eachLayer(function(layer){
    if(layer.feature){
      //set attributeValue so that all values within properties will be
      //looked at
      var attributeValue=Number(layer.feature.properties[attribute]);
      console.log(attributeValue);
      if(attributeValue< min){//which will always be the case
        min=attributeValue;
      };

      if(attributeValue>max){
        max=attributeValue;
      };
    //there will min the min and max values in each sequencing
    };
  });

  var mean=(max+min)/2;
//and a mean value too

  return{
    max: max,
    mean: mean,
    min: min
  };
};

//create slider, arrows
function createSequenceControls(map, attributes){
  //add slider, arrows
  var SequenceControl=L.Control.extend({
    options: {
      position: 'bottomleft'
    },
    onAdd: function(map){
      //create sequence-control-container div element
      var container=L.DomUtil.create('div','sequence-control-container');

      $(container).append('<input class="range-slider" type="range">');
      $(container).append('<button class="skip" id="reverse"> Reverse</button>');
      $(container).append('<button class="skip" id="forward">Skip</button>');
      //prevent interaction with basemap when using slider, arrows
      $(container).on('mousedown dblclick', function(e){
        L.DomEvent.stopPropagation(e);
      });

      return container;
    }
  });
  map.addControl(new SequenceControl());


  $('.range-slider').attr({
    //set max, min-- 1990 thru 2014-- at one step increments
    max: 24,
    min: 0,
    value:0,
    step:1
  });
//add forward, backward arrows with icons

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
    updateLegend(map, attributes[index]);
    });

  $('.range-slider').on('input', function() {
    var index=$(this).val();
//updatePropSymbols with use of slider too
    updatePropSymbols(map, attributes[index]);
    updateLegend(map, attributes[index]);
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
      createLegend(map, attributes);
    }
  });
//add power plants geojson
  $.ajax("data/pplants.geojson",{
    dataType: "json",
    success: function(response){
      addCoalPlants(response, map);
    }
  })
};


$(document).ready(createMap);
