
var printScene; // print mode scene

const PRINTERS = {
  'ideabuilder1': {}  
};



function initPrinter() {
  printScene = new THREE.Scene();
  
  // todo: add twObject
  
  var print = getObjData("print");
  if(print && ("rotation" in print) && print["rotation"].length==3) {
    twObject.rotation.fromArray(print.rotation);
  } else {
    twObject.rotation.set(-Math.PI/2, 0, 0);
  }
  
  var center = getObjCenter();
  var longSide = getObjLongSide();
  
  controls.target = center; // center of object
  camera.position.x = center.x;
  camera.position.y = center.y + longSide*1.5;

  buildPrinter();
}


function buildPrinter() {
  // override platform params for printer
  var platformData = {};
  
  var platform = buildPlatform(platformData); // Build Platform
  
  var bbox = new THREE.Box3().setFromObject(platform);
  var size = bbox.size();
  
  // platform HOLDER
  var holderBox = new THREE.BoxGeometry(size.x/10, size.x/2, size.x/10);
  var holderMat = new THREE.MeshPhongMaterial({color: 0xaaaadd, specular: 0x111111, shininess: 100, opacity:0.7, transparent:true});
  var holder = new THREE.Mesh(holderBox, holderMat);
  
  holder.position.x = platform.position.x;
  holder.position.y = platform.position.y - size.x/4;
  holder.position.z = platform.position.z;
  
  holder.name = "holder";
  sceneRemove("holder");
  scene.add(holder);
  
  
  // printer bottom
  
  // printer glass
  
  
  // extruder
  
  
}

