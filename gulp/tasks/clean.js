const gulp = require('gulp')

const paths = require('../paths')

const clean = () => (
  gulp
    .src(paths.appBuild, { read: false, allowEmpty: true })
    .pipe(require('gulp-clean')())
)

module.exports = clean
