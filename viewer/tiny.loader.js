
// TinyWork Loader : loads editable 3D mesh templates


function loadTW(path, onLoad, onError) {
  
  // todo: check path
  if(true) { // todo: debug
    path += "?t="+(new Date().getTime()); // no caching
  }
  
  //console.log(path);
	var loader = new THREE.TWLoader();
	loader.load(path, function(_twObject) {
    
    console.log(_twObject);
		_twObject.scale.set(1.0, 1.0, 1.0);
    _twObject.name = "tinywork";
    
    for(var c=0; c<_twObject.children.length;c++) {
      var mesh = _twObject.children[c];
      var name = mesh.name;
      // todo: according to name,props: behavior ?
    }
    
    twObject = _twObject;

    /*
    // TEXT DEBUG
    twObject.texts = {};
    if(true) {
      //twObject.texts['MEDIA'] = new THREE.Tiny3DText('MEDIA', "test", null); // tiny.text
      //twObject.texts['MEDIA2'] = new THREE.Tiny3DText('MEDIA2', "", null); // tiny.text
    }
    */

    scene.add(twObject); // ADDED to SCENE
    onLoad(twObject);
    
	}, function(xhr) {
		//console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	
	}, function(err) {
	  if(onError) { onError(); }
	  console.log( 'An error happened while loading /TW' );
	});
}



//  L O A D E R
// ObjectLoader modified
// https://github.com/mrdoob/three.js/blob/master/src/loaders/ObjectLoader.js 

THREE.TWLoader = function(manager) {
	this.manager = (manager !== undefined) ? manager : THREE.DefaultLoadingManager;
	this.baseUrl = '';
	this.options = {};
};


// TW Loader
THREE.TWLoader.prototype = {
	constructor: THREE.TWLoader,

	load: function(url, onLoad, onProgress, onError) {
		var scope = this;
    var texturePath = this.texturePath && (typeof this.texturePath === "string") ? this.texturePath : THREE.Loader.prototype.extractUrlBase(url);

		var loader = new THREE.XHRLoader(scope.manager);
		loader.setCrossOrigin(this.crossOrigin);
		//loader.setResponseType("text");
		
		loader.load(url, function(data) {
      var text = data;
      var compressed = (data[0]=='P' && data[1]=='K'); 
      
      if(compressed) { // if zip
        console.log('inflating...');
        var zip = new JSZip(data);
        text = zip.file("model.tw");
        //text = zip.asBinary();
      }
      
      //console.log(text);
      var json = JSON.parse(text);
      var metadata = json.metadata;

      if(metadata !== undefined) {
        if(metadata.type === 'object') {
          console.error('THREE.JSONLoader: '+url+' should be loaded with THREE.ObjectLoader instead.');
          return;
        }
      }

      var container = scope.parse(json, texturePath);
      onLoad(container); // twObject

		}, onProgress, onError );
	},



	parse: function(json, texturePath) {
		console.time('TWLoader');

    var geometries = this.parseGeometries(json.geometries, json.key);
    var materials = this.parseMaterials(json.materials, []);
    if(json.animations) {
      var animations = this.parseAnimations(json.animations);
    }
    var pieceObj = this.parsePieceData(json.piece);

    var container = new THREE.Object3D(); // twObject
    
    for(var g=0; g<geometries.length; g++) { // All Geometries
      var geo = geometries[g];
      var mat = materials[0];

      var mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.visible = true;

      container.add(mesh);
    }

    //container.userData = userData;
    
    console.timeEnd('TWLoader');
    return container;
  },



  parseGeometries: function(json, key) {
    var geometries = [];
    var geometryLoader = new THREE.JSONLoader();
    var bufferGeometryLoader = new THREE.BufferGeometryLoader();

    for(var i = 0, l = json.length; i < l; i++) {
      var geo = json[i];

      // todo: un-obfuscate here
      for(var f=0;f<geo.data.faces.length;f++) {
        var face = geo.data.faces[f];
        geo.data.faces[f] = face;
      }
      for(var v=0;v<geo.data.vertices.length;v++) {
        var vert = geo.data.vertices[v];
        geo.data.vertices[v] = vert;
      }

      var geometry;
      switch(geo.type) {
        case 'BufferGeometry':
          geometry = bufferGeometryLoader.parse(geo);
          break;

        case 'Geometry':
          geometry = geometryLoader.parse(geo.data, this.texturePath).geometry;
          break;

        default:
          console.warn('THREE.ObjectLoader: Unsupported geometry type "' + geo.type + '"');
          continue;
      }

      geometry.uuid = geo.uuid;
      geometry.name = geo.name;
      geometries.push(geometry);
    }
    return geometries;
  },


  parseMaterials: function(json, textures) {
    var materials = [];
    var loader = new THREE.MaterialLoader();
    loader.setTextures(textures);

    for(var i = 0, l = json.length; i < l; i++) {
      var material = loader.parse( json[ i ] );
      materials.push(material);
    }
    return materials;
  },


  parseAnimations: function(json) {
    var animations = [];

    for(var i = 0; i < json.length; i++) {
      var clip = THREE.AnimationClip.parse( json[i] );
      animations.push(clip);
    }
    return animations;
  },


  parsePieceData: function(json) {
    var obj;
    return obj;
  },

};



