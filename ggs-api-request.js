function doSingleFeaturePost(operation) { 
     
    var resourceUrl = document.getElementById("baseUrlField").value+operation; 
    
    if(operation == 'buffer'){
      resourceUrl = resourceUrl+'?distance=10';
    }
    
    //var flatGeometry =  '{"id": "1","crs": "EPSG:3857","wkt": "'+ selectedWkt +'"}';
    var flatGeometry = createFlatGeometry("1","EPSG:3857",selectedWkt)
    $.ajax({
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Accept","application/json");
        },
        type: "POST",
        url: resourceUrl,       
        data: flatGeometry,
        dataType: "json",
        success: function(json){
          addFeature(json);
           
        }
    });
 };

function doUnionPost(){
 var resourceUrl = document.getElementById("baseUrlField").value+'union'; 
 alert("Not implemented yet!"+source.getFeatures().lenght);
};



function createFlatGeometry(id,crs,wkt){
    return '{"id": "'+id+'","crs": "'+crs+'","wkt": "'+ wkt +'"}';
};

function addFeature(json){
  var format = new ol.format.WKT();

  var feature = format.readFeature(json.wkt, {
    featureProjection: 'EPSG:3857'
  });
  
  /**
  *Estyles
  */
  var fill = new ol.style.Fill({
     color: 'rgba(255,0,0,0.4)'
   });
   var stroke = new ol.style.Stroke({
     color: 'red',
     width: 3
   });
   var styles = [
     new ol.style.Style({
       image: new ol.style.Circle({
         fill: fill,
         stroke: stroke,
         radius: 5
       }),
       fill: fill,
       stroke: stroke
     })
   ];
   feature.setStyle(styles);
  //Add feature to layer
  source.addFeature(feature);
};