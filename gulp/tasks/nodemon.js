const paths = require('../paths')

const nodemon = (done) => {
  const monitor = require('gulp-nodemon')({
    script: paths.appIndex,
    exec: 'node --inspect=0.0.0.0:9229',
    watch: paths.appSrc,
  })

  monitor.once('start', done)
  monitor.on('restart', (files) => {
    console.log('restarted', files)
  })

  return monitor
}

module.exports = nodemon
