
// Create/Edit .tw files

function initCreator(fileName) {
  if(fileName && fileName != "") {
    var str = fileName.split('.');
    if(!str || str.length != 2) {
      return;
    }
    
    // todo: change the UI (check radio, name input)
    var path = {fileType:str[1].toUpperCase(), fileName:str[0]};
    console.log(path);
    
    creatorLoadFile(path, function() {
      
    }, function() {
      
    });
  }
}


// Load OBJ,STL,TW files
function creatorLoadFile(path, onReady, onError) {
  var tinyPath = gSitePath+"piece/"+path.fileType.toLowerCase()+"/"+path.fileName+"."+path.fileType.toLowerCase();
  tinyPath += "?t="+(new Date().getTime()); // no cache
  
  if(twObject) {
    scene.remove(twObject);
  }
  
  var loader = null;
  if(path.fileType=="OBJ") {
    loader = new THREE.OBJLoader(); // OBJLoader.js
  } else if(path.fileType=="STL") {
    loader = new THREE.STLLoader(); // STLLoader.js
  } else if(path.fileType=="TW") {
    loader = new THREE.TWLoader(); // tiny.loader.js
  } else {
    console.error("Invalid file type"); return;
  }
  
	loader.load(tinyPath, function(obj) {
	  twObject = obj;
	  
	  twObject.scale.set(1.0, 1.0, 1.0);
    twObject.name = "tinywork";
	  
	  scene.add(twObject);
	  
	  controls.cameraSetup();
    
    buildNormalArrows();
    //buildBoundingBox();
    
    console.log('mesh created');
    //console.log(scene);
    
    tinyWorkLoaded(onReady); // viewer.js
	
	}, function(e) {
	  onError(e);
	}, function(p) {
	});
}



// editor data
function saveUserData(data) {
  // data to be exported in .TW
}



// Save File
function creatorSaveFile(path, options) {
  var tinyPath = path.fileName+"."+path.fileType.toLowerCase();
  
  // switch exporter
  var exporter = null;
  if(path.fileType=="OBJ") {
    exporter = new THREE.OBJExporter(); // tiny.exporter.js
  } else if(path.fileType=="STL") {
    exporter = new THREE.STLExporter(); // tiny.exporter.js
  } else if(path.fileType=="TW") {
    exporter = new THREE.TWExporter(); // tiny.creator.js
  } else {
    console.error("Invalid file type"); return;
  }
  
  var twString = exporter.parse(scene, options);
  var blob = null;
  
  if(options.compress) { // compress
    console.log("compressing...");
    var zip = new JSZip();
    zip.file("model.tw", twString);
    blob = zip.generate({ // https://stuk.github.io/jszip/documentation/api_jszip/generate.html
      type:"blob",
      compression:"DEFLATE",
      compressionOptions:{level:6},
      mimeType:"application/zip"
    });
  } else {
    blob = new Blob([twString], {type:'octet/stream'}); // uncompressed
  }
  
  console.log("saving "+tinyPath);
  saveAs(blob, tinyPath); // Save
}




// .TW Exporter
THREE.TWExporter = function() {};

THREE.TWExporter.prototype = {
	constructor: THREE.TWExporter,

	parse: function(object, opts) {
	  var output = {piece:"1", name:"", exporter:"Tiny.Work"};

    output.platform = {material:{color: 0xffddff, specular: 0x111111, shininess: 200, opacity:0.7}}, //size:{x:100,y:20,z:300}
    output.lights = {};
    output.view = {rotation:[]};
    output.print = {rotation:[-Math.PI/2,0,0]};
    output.printing = {};
    output.supports = {};

    output.geometries = [];
    output.materials = [];
    var materials = {}; // for geometries reference
    
		var parseObject = function(child) {
			var geometry = child.geometry;

			if(geometry instanceof THREE.Geometry && child.parent && child.parent.name == 'tinywork') {
			  
			  var name = child.name;
			  if(!name || name == "") {
			    name = "default";
			  }
        console.log("exporting "+name);
				
        geometry.mergeVertices(); // remove duplicate vertices
        
        var mat = child.material; // geometry's material
        if(mat) {
          materials[mat.name] = mat;
        }

        // todo: userdata?

        // JSON
        var geoJSON = geometry.toJSON();
        geoJSON.metadata.generator = "Tiny.Work Exporter";
        geoJSON.name = name;
        
        // todo: obfuscate here
        var key = Math.floor(Math.random()*(100))+1; // 1-100
        geoJSON.key = key;
        for(var f=0;f<geoJSON.data.faces.length;f++) {
          var face = geoJSON.data.faces[f];
          geoJSON.data.faces[f] = face;
        }
        for(var v=0;v<geoJSON.data.vertices.length;v++) {
          var vert = geoJSON.data.vertices[v];
          geoJSON.data.vertices[v] = vert;
        }
        
        console.log(geoJSON);
        output.geometries.push(geoJSON);
			}
		};
    
		object.traverse(parseObject);
		

		// materials
		$.each(materials, function(name, mat) {
		  
      // JSON
      var matJSON = mat.toJSON();
      matJSON.metadata.generator = "Tiny.Work Exporter";
      matJSON.name = name;

      console.log(matJSON);
      output.materials.push(matJSON);
    });

    var outStr = JSON.stringify(output);
		return outStr;
	}
};
