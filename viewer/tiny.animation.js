

// https://github.com/tweenjs/tween.js
// https://github.com/tweenjs/tween.js/blob/master/examples/03_graphs.html


function cameraResetAnimation() {
  if(!camera) { return; }
  controls.enabled = false; // disable controls

  var tween = new TWEEN.Tween(camera.position)
    .to(cameraPosInit, 1000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(function() {
        //camera.lookAt(controls.target);
    }).onComplete(function() {
      //camera.lookAt(object.position);
      //console.log(cameraPosInit);
      //camera.rotation.set(0, 0, 0);
      camera.position.copy(cameraPosInit);
      controls.enabled = true;
    }).start();
}


function pan180Animation() {
  if(!camera) { return; }
  controls.enabled = false; // disable controls
  
}


function lookAt(id) {
  if(!camera) { return; }
  controls.enabled = false; // disable controls
  
  var tween = new TWEEN.Tween(camera.position)
    .to(cameraPosInit, 1000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(function() {
        //camera.lookAt(controls.target);
    }).onComplete(function() {
      //camera.lookAt(object.position);
      //console.log(cameraPosInit);
      camera.position.copy(cameraPosInit);
      controls.enabled = true;
    }).start();
}

