function doSingleFeaturePost(operation) { 
     
    var resourceUrl = document.getElementById("baseUrlField").value+operation; 
    
    if(operation == 'buffer'){
      resourceUrl = resourceUrl+'?distance=10';
    }
    
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

function doMultiFeaturePost(operation, sourceLayer){
  var resourceUrl = document.getElementById("baseUrlField").value+operation;
  
  var featuresJson = '['+getFlatGeometries(sourceLayer)+']';

  $.ajax({
    beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
    },
    type: "POST",
    url: resourceUrl,       
    data: featuresJson,
    dataType: "json",
    success: function(json){ 
       addFeature(json);
    }
  });
};

function divideMultiGeom(sourceLayer){
  var resourceUrl = document.getElementById("baseUrlField").value+'division';
  
  var featureJson = createFlatGeometry('id','EPSG:3857',getWkt(sourceLayer.getFeatures()[0]));

  $.ajax({
    beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
    },
    type: "POST",
    url: resourceUrl,       
    data: featureJson,
    dataType: "json",
    success: function(json){ 
      sourceResult.clear();
      for(var feature in json){
          addFeature(json[feature]);
        }  
    }
  });
};



function doLayersOperationPost(operation){
  var resourceUrl = document.getElementById("baseUrlField").value+operation;
  
  var sourceFeatures = '['+getFlatGeometries(predefinedVectorLayer.getSource())+']';
  var overlayFeatures = '['+getFlatGeometries(source)+']';
  var operationData = createOperationData(sourceFeatures, overlayFeatures);
  $.ajax({
    beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
    },
    type: "POST",
    url: resourceUrl,       
    data: operationData,
    dataType: "json",
    success: function(json){  
      if(operation == 'intersection' || operation == 'difference' 
        || operation == 'sym-difference'){
        addFeature(json);
      }else{
        for(var feature in json){
          addFeature(json[feature]);
        }  
      }
    
      
    }
  });
};

function divide(operation){
  var resourceUrl = document.getElementById("baseUrlField").value+operation;
  
  var fgeometries = getFlatGeometries(source);
  var geomToDivide = fgeometries[0];
  var divisionLine = fgeometries[1];
  var divisionData = createDivisionData(divisionLine, geomToDivide);
  alert(divisionData);
  $.ajax({
    beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
    },
    type: "POST",
    url: resourceUrl,       
    data: divisionData,
    dataType: "json",
    success: function(json){  
      for(var feature in json){
        addFeature(json[feature]);
      }  
    }
  });
};

function getFlatGeometries(layer){
  var features = [];    
  layer.forEachFeature(function(feature) {
      var flatGeometry = createFlatGeometry(feature.id,"EPSG:3857", getWkt(feature));
      features.push(flatGeometry);
  });
  
  return features;
};


function getWkt(feature){
  var ol3Geom = feature.getGeometry();
  var format = new ol.format.WKT();
  return format.writeGeometry(ol3Geom);
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
         radius: 3
       }),
       fill: fill,
       stroke: stroke
     })
   ];
  feature.setStyle(styles);
  //Add feature to layer
  sourceResult.addFeature(feature);
};

function clearMap(){
  source.clear();
  sourceResult.clear();
  map.removeLayer(predefinedVectorLayer);
};

function createOperationData(source, overlay){
  return '{"sourceData":'+source+',"overlayData":'+overlay+'}';
};

function createDivisionData(divisionLine, geomToDivide){
  return '{"divisionLine":'+divisionLine+',"geomToDivide":'+geomToDivide+'}';
};

function addFeaturesToPredefinedLayer(){
  map.addLayer(predefinedVectorLayer);
};
