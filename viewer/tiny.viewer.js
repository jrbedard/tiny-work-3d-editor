var container;
var scene, camera, renderer, controls;

var raycaster;
var mouse = {x:0, y:0};
var tooltip;

var twObject = null; // TinyWork Object3D containing all imported

var piece, params;
var requestId;
var stats;


var cameraPosInit;



function initTinyViewer(containerName, _piece, _params, onReady) {
  piece = _piece;
  params = _params;
  
  container = $("#"+containerName);
  container.empty();
  container.css({position:"relative", backgroundColor:"#cccdc9", textAlign:"center"}); // overflow:"hidden"
  
  console.log(container.width(), container.height());
  var loading = $("<div class='tinyLoading'</div>");
  loading.css({paddingTop:container.height()/2-60, fontSize:"140%", height:"100%", color:"#777"});
  loading.append("<i class='fa fa-3x fa-spin fa-cube'></i><br>");
  loading.append(getText("Loading")+"...");
  container.append(loading);
  //loading.fadeIn(1000);
  
  
  camera = new THREE.PerspectiveCamera(45, container.width() / container.height(), 1, 9000);
	
	// These variables set the camera behaviour and sensitivity.
  controls = new THREE.TinyControls(camera, container.get(0));
  controls.rotateSpeed = 1.5;
  controls.zoomSpeed = 3;
  controls.panSpeed = 2;
  controls.noZoom = true;
  controls.noPan = true;
  controls.staticMoving = false;
  controls.dynamicDampingFactor = 0.3;
	
	scene = new THREE.Scene();
	//scene.fog = new THREE.Fog( 0xcccdc9, 2, 15 );
  
  var ambient = new THREE.AmbientLight( 0x777777 );
	scene.add( ambient );
 	
	// front directional light.
	var directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(1, 1, 100).normalize();
	scene.add( directionalLight );
  
	// back directional light.
 	directionalLight = new THREE.DirectionalLight( 0xffffff );
	directionalLight.position.set(1, 1, -100).normalize();
	scene.add( directionalLight );
	
	// Lights
	//scene.add(new THREE.AmbientLight( 0x777777 ));
	//addShadowedLight( 1, 1, 1, 0xffffff, 1.35 );
	//addShadowedLight( 0.5, 1, -1, 0x888888, 1 );
  
  
	// renderer
  if(false) { // debug renderer with screenshots
    renderer = new THREE.WebGLRenderer({ alpha:false, antialiasing:true, preserveDrawingBuffer:true });
	} else {// viewer renderer
	  renderer = new THREE.WebGLRenderer({ alpha:false, antialiasing:true });
	}
	
	renderer.setSize(container.width(), container.height());
	renderer.setClearColor(0xcccdc9, 1);
	//renderer.setPixelRatio( window.devicePixelRatio );
	//renderer.shadowMapEnabled = true;
	//renderer.shadowMapCullFace = THREE.CullFaceBack;

  // initialize object to perform world/screen calculations
	raycaster = new THREE.Raycaster();
	
	
	//createToolTip(); // tiny.text.js
	
  if(!params.creator) {
    loadTinyWork(piece.id, onReady); // Load TW file
  }
}



// Load .TW
function loadTinyWork(pieceId, onReady) {
  var tinyPath = gSitePath+"piece/tw/"+pieceId+".tw";
  
  if(twObject) {
    scene.remove(twObject); // remove old
  }
  
  // Load TW
  loadTW(tinyPath, function(_twObject) { // tiny.loader.js
    
    controls.cameraSetup(); // my code
    
    //buildBoundingBox();
    
    console.log('mesh added');
    //console.log(scene);

    tinyWorkLoaded(onReady);
  });
}


// .TW Loaded
function tinyWorkLoaded(onReady) {
  
  $(".tinyLoading").remove();
  container.append(renderer.domElement); // show renderer

  tinyGUI(params); // GUI
  
  tinyEvents(); // EVENTS
  
  tinyLoop(); // LOOP
  
  if(onReady) { onReady(); }
}




// Loop
function tinyLoop() {
  if(requestId) {
    window.cancelAnimationFrame(requestId);
    requestId = undefined;
  }
  requestId = window.requestAnimationFrame(tinyLoop);
  
  controls.update(); // doesnt have to be here, but if not, needs to call it manually at a bunch of places
  
	picking();
	
	TWEEN.update();
	
	renderer.render(scene, camera); // render!
	
	if(stats) {
	  stats.update();
	}
}



// Picking
function picking() {
  raycaster.setFromCamera(mouse, camera);
  if(!twObject) { return; }
  var intersects = raycaster.intersectObject(twObject);
  
  if(intersects && intersects.length > 0) {
    //console.log("pcked");
  }
}






