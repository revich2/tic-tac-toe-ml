const gulp = require('gulp')

const paths = require('../paths')

const compile = () => (
  gulp
    .src(paths.appSrcGlob)
    .pipe(gulp.dest(paths.appBuild))
)

module.exports = compile
