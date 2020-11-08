/*
 * @Description: 编译appjs
 * @Author: bangdong.chen
 * @Date: 2020-03-24 09:58:09
 * @LastEditors: bangdong.chen
 * @LastEditTime: 2020-10-27 18:51:14
 */
'use strict';
const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const gulpLoadPlugins = require('gulp-load-plugins');
const rename = require('gulp-rename');
const minimist = require('minimist');
const handleErrors = require('./handleErrors');

const originPath = `${process.cwd()}/src/app.config.origin.ts`;

const options = minimist(process.argv.slice(2), {});

// 文件名
let fileName = 'app.config.js';
function compileAppJs(opt) {
  return gulp
    .src([ originPath ])
    .pipe(plumber(handleErrors))
    .pipe(
      babel({
        parserOpts: {
          plugins: [
            // 'jsx',
            // 'typescript',
            'classProperties',
            'decorators-legacy',
            'dynamicImport',
          ],
        },
        plugins: [ 'macros' ],
      })
    )
    .pipe(rename(fileName))
    .pipe(gulp.dest(`${process.cwd()}/src/`));
}

module.exports = gulp.series(compileAppJs, function(done) {
  console.log(`✅  创建src/${fileName}文件成功!`);
  done();
});
