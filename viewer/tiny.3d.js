// common 3D code

if(!Detector.webgl) Detector.addGetWebGLMessage();

//TEXTS += {
//  "Fullscreen":{fr:"Plein ecran"},
//}




//  U T I L S

function getObjData(key) {
  var data = (key in twObject.userData ? twObject.userData[key] : null);
  return data;
}


function getObjCenter() {
  var bbox = new THREE.Box3().setFromObject(twObject);
  var center = new THREE.Vector3();
  center.addVectors(bbox.min, bbox.max);
  center.divideScalar(2); // center of bbox    
  return center;
}

function getObjLongSide() {
  var bbox = new THREE.Box3().setFromObject(twObject);
  return Math.max(Math.abs(bbox.max.x-bbox.min.x), Math.abs(bbox.max.y-bbox.min.y), Math.abs(bbox.max.z-bbox.min.z));
}




function dataURLToBlob(dataURL) {
  var BASE64_MARKER = ';base64,';
  if (dataURL.indexOf(BASE64_MARKER) == -1) {
    var parts = dataURL.split(',');
    var contentType = parts[0].split(':')[1];
    var raw = decodeURIComponent(parts[1]);

    return new Blob([raw], {type: contentType});
  }

  var parts = dataURL.split(BASE64_MARKER);
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;

  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], {type: contentType});
};
