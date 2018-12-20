'use strict';

var gulp = require('gulp');
let glob = require('glob'); // 批量找文件
let paths = require('path');
var electron = require('electron-connect').server.create();
var electronPackage = require('electron-packager');
let webpack = require('webpack');
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
  electron.reload();
}

gulp.task('packager', function() {
  electronPackage();
});

gulp.task('watch_web', () => {
  // const matches = glob.sync( // 记录entry触发项目开始监听
  //   `${__dirname}/web/{!dist,/src/**/*.*}`
  // );
  const matches = ['E:/electron/Mac-sample/web/src/index.js'];
  gulp.watch(matches).on('change', event => {
    const key = event.path;
    if (!timeoutList[key]) { // 处理product中多项目情况
      console.log('Start Listening');
      timeoutList[key] = true;
      webpack(require('./webpack.production.js').webpackDevConf, (err, state) => {
        // console.log(state);
        // console.log(err);
        if (!err) {
          renderRenderer();
          console.log('====================End====================');
        }
      });
    }
  });
});

gulp.task('go', ['watch_web', 'serve']);

gulp.task('default', ['serve']);