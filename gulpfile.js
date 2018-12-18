'use strict';

var gulp = require('gulp');
let glob = require('glob'); // 批量找文件
let paths = require('path');
var electron = require('electron-connect').server.create();
var electronPackage = require('electron-packager');
let webpack = require('webpack');
let webpackConfig = require('./webpack.production.js');
// var runSequence = require('run-sequence');

let timeoutList = {}; // 防止多次保持按键和git更新时

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
  // gulp.watch(['./renderer/renderer.js', './web/pageA/index.html'], electron.reload);
});

// gulp.task('reload:browser', function () {
//   // Restart main process
//   electron.restart();
// });

// gulp.task('reload:renderer', function () {
//   // Reload renderer process
//   electron.reload();
// });

const renderRenderer = () => {
  console.log(123132);
  electron.reload();
}

gulp.task('packager', function() {
  electronPackage();
});

gulp.task('goweb', () => {
  const matches = glob.sync(
    `${__dirname}/web/{!dist,/src/**/*.*}`
  );
  // console.log(matches);
  gulp.watch(matches).on('change', event => {
    console.log(+new Date());
    const key = event.path;
    if (!timeoutList[key]) {
      console.log('get in');
      timeoutList[key] = true;
      webpack(webpackConfig, (err, state) => {
        console.log('====================End====================');
        if (!err) {
          renderRenderer();
        }
      });
    }
  });
});

gulp.task('go', ['goweb', 'serve']);

gulp.task('default', ['serve']);