'use strict';

var gulp = require('gulp');
var electron = require('electron-connect').server.create();
var electronPackage = require('electron-packager');

// var electron = require('../../').server.create({
//   useGlobalElectron: true,
//   logLevel: 2
// });

gulp.task('serve', function () {
  // Start browser process
  electron.start();
  // Restart browser process
  gulp.watch(['main.js', './main/index.js'], electron.restart);

  // Reload renderer process
  gulp.watch(['./renderer/renderer.js', './web/pageA/index.html'], electron.reload);
});

gulp.task('reload:browser', function () {
  // Restart main process
  electron.restart();
});

gulp.task('reload:renderer', function () {
  // Reload renderer process
  electron.reload();
});

gulp.task('packager', function() {
  electronPackage();
})

gulp.task('default', ['serve']);