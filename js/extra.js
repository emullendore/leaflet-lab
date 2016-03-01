




//NEEDED FOR POWERPLANT LAYER????

// function processData2(data){
//   var attributes2=[];
//
//   var ppd=data.features[0].properties;
//   console.log(ppd);
//
//   for (var attribute in ppd){
//     if(attribute.indexOf("Plant Name")> - 1){
//       attributes2.push(attribute);
//     };
//   };
//
//   return attributes2;
// };

// function pointToLayer(features, latlng, attributes2){
//   //var attribute=attributes2[0]
//   var options2={
//     fillColor: "#df7a74",
//     color: "#828281",
//     weight: 1,
//     opacity: 1,
//     fillOpacity:0.2
//     };
//   var popupContent=features.properties.desc
//   var layer2=L.circleMarker(latlng, options2);
//
//   layer2.bindPopup(popupContent, {
//     //offset: new L.Point(0,-options2),
//     closeButton: false
//   });
//
//   layer2.on({
//     mouseover: function(){
//       this.openPopup();
//     },
//     mouseout: function(){
//       this.closePopup();
//     }
//     });
//     return layer2;
//
// };


// var attributes2=processData2(response);
// addPopUps(response,map, attributes2);
