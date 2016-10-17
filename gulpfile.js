var gulp = require('gulp');

var browserify = require('browserify');
var babelify= require('babelify');
var watchify = require('watchify');

var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

var util = require('gulp-util');
var uglify = require('gulp-uglify');
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var notify = require("gulp-notify");
var sourcemaps = require('gulp-sourcemaps');
var streamify = require('gulp-streamify');
var minifyCss = require('gulp-minify-css');



// DEFAULT
gulp.task('default', ['viewer', 'vendors', 'css', 'editors', 'watch'], function() {
  
});


// Viewer files
gulp.task('viewer', function() {
  return gulp.src(['../../libs/three/tween.min.js', '../../libs/three/Detector.js', '../../libs/three/stats.min.js',
    '../../libs/three/TextGeometry.js', '../../libs/three/FontUtils.js',
    '../../libs/three/threex/THREEx.FullScreen.js',
    './viewer/tiny.3d.js', './viewer/tiny.animation.js', './viewer/tiny.gui.js', './viewer/tiny.loader.js',
    './viewer/tiny.controls.js', './viewer/tiny.animation.js',
    './viewer/tiny.scene.js', './viewer/tiny.material.js', './viewer/tiny.text.js',
    './viewer/tiny.events.js', './viewer/tiny.printer.js', './viewer/tiny.viewer.js', './viewer/tiny.editor.js'])
    .pipe(uglify())
    .pipe(rename({}))
    .pipe(concat("tiny.viewer.min.js"))
    .pipe(gulp.dest('./dist'));
});



// Vendors
gulp.task('vendors', function() {
  browserify({
    entries: ['./editor/Vendors.jsx'],
    transform: [babelify],
    debug:false,
  })
    .require('react').require('react-dom')
    .require('react-inline-edit').require('react-select').require('react-color')
    .require('flux').require('keymirror').require('object-assign')
    .bundle()
    .on('error', util.log.bind(util, 'Browserify Error'))
    .pipe(source('vendors.min.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('dist'));
});



// CSS Files
gulp.task('css', function() {
  return gulp.src([
    './node_modules/bootstrap-slider/css/bootstrap-slider.css',
    './node_modules/react-select/dist/default.css',
    './editor/style/tiny.editor.css'])
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(concat("tiny.editor.css"))
    .pipe(gulp.dest('../../../css/sites/store'));
});





// REACT
var path = {
  ENTRY_POINT: './editor/App.js',
  DEST_SRC: 'build',
  OUT: 'editors.js',
  DEST: 'dist',
  DEST_BUILD: 'dist',
  MINIFIED_OUT: 'editors.min.js',
};


// Editors
gulp.task('editors', function() {
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [babelify],
  })
    .external('jquery').external('react').external('react-dom')//.external('react/addons')
    .external('react-inline-edit').external('react-select').external('react-color')
    .external('flux').external('keymirror').external('object-assign')
    .bundle()
    .on('error', browserifyError)
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(path.DEST_BUILD));
});


// watch editors
gulp.task('watch', function() {
  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [babelify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .on('error', browserifyError)
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
      console.log('Updated editors');
  })
    .external('jquery').external('react').external('react-dom')//external('react/addons')
    .external('react-inline-edit').external('react-select').external('react-color')
    .external('flux').external('keymirror').external('object-assign')
    .bundle()
    .on('error', browserifyError)
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});


function browserifyError(err) {
  //util.log.bind(util, 'Browserify Error')
  util.log(util.colors.red('Error: ' + err.message));
}







