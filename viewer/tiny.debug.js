

// TinyWork scene to txt
function getSceneObjects() {
  var objects = [];
  
  scene.traverse(function(obj) {
    if(!obj.parent || obj.parent.name != "tinywork") { return; }
    
    var info = {name: obj.name};
    if(obj.geometry) {
      info.faces = obj.geometry.faces.length;
    }
    
    var bbox = new THREE.Box3().setFromObject(obj);
    info.width = (bbox.max.x-bbox.min.x).toFixed(1);
    info.height = (bbox.max.y-bbox.min.y).toFixed(1);
    
    // todo: getObjData
    
    if(obj.material) {
      info.material = obj.material;
      //info.materialColor = obj.material.color.getHexString();
      //info.materialName = obj.material.name;
    }
    
    objects.push(info);
	});
	return objects;
}



function addDebugBox() {
  console.log('adding debug box');
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( {color: 0x00ff00, opacity:0.5, wireframe:true} );
  var cube = new THREE.Mesh( geometry, material );

  twObject = cube;

  scene.add(cube);
}