const gulp = require('gulp')

const lint = require('./lint')
const nodemon = require('./nodemon')

module.exports = gulp.series(lint, nodemon)
