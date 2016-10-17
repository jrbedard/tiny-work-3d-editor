

// Tiny 3D Text 
THREE.Tiny3DText = function(id, text, style) {
  this.id = id || 'text1';
  this.text = text || "";
  this.style = style || {};
  this.pivotAngle = 0; // rotation wrapper angle
  this._update();
};


THREE.Tiny3DText.prototype = {
  constructor: THREE.Tiny3DText,

  updateText: function(text) {
    this.text = text;
    this._update();
  },

  updateStyle: function(style) {
    this.style.fontFamily = style.fontFamily;
    this.style.fontWeight = style.fontWeight;
    this.style.fontStyle = style.fontStyle;

    this.style.curveSegments = style.curveSegments;
    this.style.bevelEnabled = style.bevelEnabled;
    this.style.bevelThickness = style.bevelThickness;
    this.style.bevelSize = style.bevelSize;
    this.style.bevelSegments = style.bevelSegments;
    this._update();
  },

  // Rotate 3D Text around its own center
  rotate: function(angle) {
    var textPivot = twObject.getObjectByName(this.id+"_pivot");
    if(!textPivot) { return; }

    this.pivotAngle = angle*(Math.PI/180);
    textPivot.rotation.z = this.pivotAngle;
  },

  // Scale 3D Text
  scale: function(scale) {
    this.style.size = scale;
    this._update();
  },

  // 3D Text's height = Depth
  extrude: function(depth) {
    this.style.height = depth;
    this._update();
  },


  // Translate 3D Text
  translate: function(pos) {

  },

  export: function() {

  },



  // Update
  _update: function() {
    
    var lastObj = twObject.getObjectByName(this.id);
    if(lastObj) {
      twObject.remove(lastObj); // remove if creating same text ID 
    }
    var lastPivot = twObject.getObjectByName(this.id+"_pivot");
    if(lastPivot) {
      twObject.remove(lastPivot);
    }

    var textGeo = new THREE.TextGeometry(this.text, {
      size: this.style.size || 20, // size <- scale
      height: this.style.height || 4, // depth <- extrude

      font: this.style.fontFamily || "helvetiker", // helvetiker, optimer, gentilis, droid sans, droid serif
      weight: this.style.fontWeight ||  "normal",  // normal bold
      style: this.style.fontStyle || "normal", // normal italic

      curveSegments: this.style.curveSegments || 4,

      bevelEnabled: this.style.bevelEnabled || false,
      bevelThickness: this.style.bevelThickness || 2,
      bevelSize: this.style.bevelSize || 1.5,
      bevelSegments: this.style.bevelSegments || 3,
    });


    // todo: this.style.textAlign


    textGeo.computeBoundingBox();
    textGeo.computeVertexNormals();

    // todo: material from mesh
    var material = new THREE.MeshFaceMaterial( [
      new THREE.MeshPhongMaterial({color: 0xffffff, shading: THREE.FlatShading}), // front
      new THREE.MeshPhongMaterial({color: 0xffffff, shading: THREE.FlatShading}) // side
    ]);

    var textMesh = new THREE.Mesh(textGeo, material);
    textMesh.name = this.id;
    
    // for rotation
    var box = new THREE.Box3().setFromObject(textMesh);
    box.center(textMesh.position);
    textMesh.position.multiplyScalar(-1);

    // pivot for rotation
    var pivot = new THREE.Group();
    pivot.name = this.id + "_pivot";
    pivot.rotation.z = this.pivotAngle;

    pivot.add(textMesh);
    twObject.add(pivot);
    //scene.add(pivot);
    
    this.textMesh = textMesh;
  }
};







// ToolTip
THREE.TinyToolTip = function() {};

THREE.TinyToolTip.prototype = {
  constructor: THREE.TinyToolTip,

};


// tooltip
function createToolTip() {
  
	// create a canvas element
	var canvas1 = document.createElement('canvas');
	var context1 = canvas1.getContext('2d');
	context1.font = "Bold 20px Arial";
	context1.fillStyle = "rgba(75, 75, 75, 0.75)";
  context1.fillText('Hello, world!', 0, 20);
  
  var texture1 = new THREE.Texture(canvas1);
  texture1.minFilter = THREE.NearestFilter;
	texture1.needsUpdate = true;
  
  // TOOLtip sprite
  var spriteMaterial = new THREE.SpriteMaterial({map:texture1, useScreenCoordinates:true});//, alignment: THREE.SpriteAlignment.topLeft });
	
	tooltip = new THREE.Sprite(spriteMaterial);
	tooltip.scale.set(200,100,1.0);
	tooltip.position.set( 50, 50, 0 );
	scene.add(tooltip);
}

