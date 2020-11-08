const gulp = require('gulp');

const compileAppJs = require(`${process.cwd()}/scripts/compileAppJs`);
exports.compileAppJs = gulp.series(compileAppJs);

