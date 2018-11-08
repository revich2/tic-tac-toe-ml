const gulp = require('gulp')

const gutil = require('gulp-util')
const eslint = require('gulp-eslint')
const gulpIf = require('gulp-if')

const paths = require('../paths')

const isFixed = file => file.eslint !== null && file.eslint.fixed

const lint = () => (
  gulp
    .src(paths.appSrcGlob)
    .pipe(eslint({
      fix: gutil.env.fix
    }))
    .pipe(eslint.formatEach())
    .pipe(eslint.failOnError())
    .pipe(gulpIf(isFixed, gulp.dest(paths.appSrc)))
)

module.exports = lint
