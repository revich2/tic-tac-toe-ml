'use strict'

const gulp = require('gulp')

const { tasks } = require('./gulp')

Object.keys(tasks).forEach(taskName => gulp.task(taskName, tasks[taskName]))
