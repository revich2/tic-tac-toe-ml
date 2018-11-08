const path = require('path')
const fs = require('fs')

const flow = require('lodash/flow')
const map = require('lodash/fp/map')
const mapKeys = require('lodash/fp/mapKeys')
const fromPairs = require('lodash/fp/fromPairs')
const camelCase = require('lodash/fp/camelCase')

const paths = require('./paths')
const constants = require('./constants')

const tasksPath = path.resolve(__dirname, 'tasks')
const tasks = fs.readdirSync(tasksPath).filter(filename => filename.endsWith(constants.tasksExtension))

module.exports = {
  paths,
  tasks: flow([
    map(filename => [
      path.basename(filename, constants.tasksExtension),
      require(path.resolve(tasksPath, filename))
    ]),
    fromPairs,
    mapKeys(camelCase)
  ])(tasks)
}
