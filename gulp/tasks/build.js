const gulp = require('gulp')

const clean = require('./clean')
const lint = require('./lint')
const compile = require('./compile')

module.exports = gulp.series(clean, lint, compile)
