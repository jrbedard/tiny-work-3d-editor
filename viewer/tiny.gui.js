
// 2D GUI
function tinyGUI(params) {
  //console.log("GUI "+params)
  
  // stats
  if(params.stats) {
    // todo: remove if old
	  stats = new Stats();
	  stats.domElement.style.position = 'absolute';
	  stats.domElement.style.top = '0px';
	  container.appendChild( stats.domElement );
  }
  // axes
  if(params.axes) {
    buildAxes(500);
  }
  // grid
  if(params.grid) {
    //var grid = buildGrid();
    //scene.add(grid);
    //grid.rotation.x = Math.PI/4;
    
    //buildPlatform();
  }
  
  
  $("#tinyBottom").remove(); // remove old if there
  var bottomBar = $("<div id='tinyBottom'></div>");
  bottomBar.css({position:"absolute", border:"solid 0px", width:"600px", height:"38px", bottom:"0px", paddingLeft:"8px", textAlign:"left", display:"none"});
  container.append(bottomBar);
  
  if(params.home) {
    var homeBtn = $("<span id='homeBtn' class='tinyBtn' title='"+getText("Home Position")+"'><i class='fa fa-2x fa-home'></i></span>");
    bottomBar.append(homeBtn);
  }
  if(params.edit) {
    var editBtn = $("<span id='editBtn' class='tinyBtn' title='"+getText("Edit Design")+"'><i class='fa fa-2x fa-object-ungroup'></i></span>");
    bottomBar.append(editBtn);
  }
  if(params.print) {
    var printBtn = $("<span id='printBtn' class='tinyBtn' title='"+getText("Print Preview")+"'><i class='fa fa-2x fa-print'></i></span>");
    bottomBar.append(printBtn);
  }
  if(params.downloadSTL) {
    var downloadBtn = $("<span id='downloadBtn' class='tinyBtn' title='"+getText("Download STL")+"'><i class='fa fa-2x fa-save'></i></span>");
    bottomBar.append(downloadBtn);
  }
  if(params.screenshot) {
    var screenshotBtn = $("<span id='screenshotBtn' class='tinyBtn' title='"+getText("Capture Screenshot")+"'><i class='fa fa-2x fa-camera'></i></span>");
    bottomBar.append(screenshotBtn);
  }
  if(params.wireframe) {
    var wireframeBtn = $("<span id='wireframeBtn' class='tinyBtn' title='"+getText("Show Wireframe")+"'><i class='fa fa-2x fa-object-group'></i></span>");
    bottomBar.append(wireframeBtn);
  }
  
  
  if(params.fullscreen) {
    var fullscreenBtn = $("<span id='fullscreenBtn' class='tinyBtn pull-right' title='"+getText('Fullscreen')+"'><i class='fa fa-2x fa-arrows-alt'></i></span>");
    fullscreenBtn.css({textAlign:"right", marginTop:"-8px", marginRight:"0px", paddingRight:"0px"});
    bottomBar.append(fullscreenBtn);
  }
  
  
  if(params.examples) {
    // left, right arrows,
    // example name
  }
  
  if(params.playback) {
    var playBtn = $("<span id='playBtn' class='tinyBtn' title='"+getText("Start Printing")+"'><i class='fa fa-2x fa-play'></i></span>");
    bottomBar.append(playBtn);
    //var timeline = 
  }
  
  
  // All Buttons
  $(".tinyBtn").css({color:"#999", cursor:"pointer", marginRight:"20px", paddingTop:"8px"});
  $(".tinyBtn").hover(function() {
    $(this).css({color:"#444"});
  }, function() {
    $(this).css({color:"#999"});
  });
  $(".tinyBtn").tooltip({'z-index':'3000'});
  
  
  bottomBar.fadeIn();
  
  
  // GUI EVENTS handlers
  
  $("#editBtn").click(function() {
    $("#editPieceBtn").click();
  });
  
  $("#printBtn").click(function() {
    $("#tabs a[href='#printer']").tab('show'); // view page
    // todo: edit,creator pages
  });
  
  $("#homeBtn").click(function() {
    cameraResetAnimation(); // tiny.animation.js
  });
  
  $("#downloadBtn").click(function() {
    saveSTL(scene, piece.name); // tiny.exporter.js
  });
  
  $("#screenshotBtn").click(function() {
    var imgData = renderer.domElement.toDataURL("image/png");
    var blob = dataURLToBlob(imgData);
    saveAs(blob, piece.name);
  });
  
  $("#wireframeBtn").click(function() {
     buildWireframe();
  });
  
  
  $("#fullscreenBtn").click(function() {
    THREEx.FullScreen.request();
  });
}

