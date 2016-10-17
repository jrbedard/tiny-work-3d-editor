

// Global user EVENTS:

function tinyEvents() {
  
  // WINDOW RESIZE
  $(window).on('resize', function() {
    //camera.aspect = 600 / 480;
    //camera.updateProjectionMatrix();
	  //renderer.setSize(600, 480);
  });
  
  
  // MOUSE MOVE
  container.mousemove(function(event) {
    // the following line would stop any other event handler from firing (such as the mouse's TrackballControls)
	  event.preventDefault();
    
	  // update sprite position
	  //tooltip.position.set( event.clientX, event.clientY - 20, 0 );
	  
	  // update the mouse variable
	  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  });
  
  
  // MOUSE CLICK
  container.click(function(event) {
    //console.log("Clicked");
  });
  
  // todo: keydowns
}
