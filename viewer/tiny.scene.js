
// remove object from scene if there
function sceneRemove(name) {
  var old = scene.getObjectByName(name);
  if(old) {
    scene.remove(old); // remove old
  }
}


// Axes
function buildAxes(length) {
  var axes = new THREE.Object3D();
  axes.name = "axes";
  axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF8888, false ) ); // +X
  axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFF8888, true) ); // -X
  axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x88FF88, false ) ); // +Y
  axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x88FF88, true ) ); // -Y
  axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x8888FF, false ) ); // +Z
  axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x8888FF, true ) ); // -Z
  
  axes.name = "axes";
  sceneRemove("axes");
  scene.add(axes);
  return axes;
}
function buildAxis(src, dst, colorHex, dashed) {
  var geom = new THREE.Geometry(), mat;

  if(dashed) {
    mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
  } else {
    mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
  }
  geom.vertices.push( src.clone() );
  geom.vertices.push( dst.clone() );
  geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines
  var axis = new THREE.Line( geom, mat, THREE.LineSegments );
  axis.name = "axis";
  return axis;
}


// Grid
function buildGrid() {
  // todo: around object, and no diagonals
  var planeW = 10; // pixels
  var planeH = 10; // pixels 
  var numW = 50; // how many wide (50*50 = 2500 pixels wide)
  var numH = 50; // how many tall (50*50 = 2500 pixels tall)
  var mesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry( planeW*numW, planeH*numH, planeW, planeH ),
      new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true})
  );
  var grid = new THREE.EdgesHelper(mesh, 0x00ffff);
  grid.material.linewidth = 2;
  
  grid.name = "grid";
  sceneRemove("grid");
  scene.add(grid);
  return grid;
}


// Bounding Box
function buildBoundingBox() {
  var helper = new THREE.BoundingBoxHelper(twObject, 0xff0000);
  helper.update();
  //console.log(helper);
  
  var mesh = new THREE.Mesh(
    helper.geometry.clone(),
    new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true})
  );
  
  var bbox = new THREE.EdgesHelper(mesh, 0x00ffff);
  bbox.material.linewidth = 2;
  
  helper.name = "boundingBox";
  sceneRemove("boundingBox");
  scene.add(helper); // If you want a visible bounding box
  return helper;
}


// Normals for faces/vertices
function buildNormalArrows(showVert) {
  scene.traverse(function(object) {
    if(object instanceof THREE.Mesh) {
      
      var faceNormals = new THREE.FaceNormalsHelper(object, 2, 0xffa500, 1);
      faceNormals.name = "faceNormals";
      sceneRemove("faceNormals");
      scene.add(faceNormals);
      
      var vertexNormals = new THREE.VertexNormalsHelper(object, 2, 0xffff00, 1);
      vertexNormals.name = "vertexNormals";
      sceneRemove("vertexNormals");
      scene.add(vertexNormals);
		}
	});
}


// Wireframe
function buildWireframe() {
  scene.traverse(function(object) {
    if(object instanceof THREE.Mesh) {
      
      object.material = new THREE.MeshBasicMaterial( { color: 0x222222, wireframe: true} );
    }
  });
}



// 3D Platform
function buildPlatform(platformData) {
  var data = platformData ? platformData : getObjData("platform"); // param or from .tw
  
  var longSide = getObjLongSide();
  var size = data.size ? data.size : new THREE.Vector3(longSide*1.5, longSide/10, longSide*1.25);
  var platformBox = new THREE.BoxGeometry(size.x, size.y, size.z);
  
  var mat = data.material ? data.material : {color: 0xddddff, specular: 0x111111, shininess: 200, opacity:0.7};
  var platformMat = new THREE.MeshPhongMaterial(mat);
  platformMat.transparent = true;
  // todo: overrides
  
  var platform = new THREE.Mesh(platformBox, platformMat);
  
  var bbox = new THREE.Box3().setFromObject(twObject);
  var center = getObjCenter();  
  platform.position.x = center.x;
  platform.position.y = bbox.min.y - size.y/2;
  platform.position.z = center.z;
  
  platform.name = "platform";
  sceneRemove("platform");
  scene.add(platform);
  return platform;
}




// Mini-Cube - todo: build orientation mini-cube like on instructables http://www.instructables.com/id/3D-Printable-Canadian-Coin-Organizer/
function buildMiniCube() {

}


// Scale object - todo: scale object, 25Cents? pencil?
function buildScaleObject() {
}










