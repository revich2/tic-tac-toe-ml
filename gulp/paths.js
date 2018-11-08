const fs = require('fs')
const path = require('path')

const constants = require('./constants')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

const nodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .map(resolveApp)

module.exports = {
  appBuild: resolveApp(constants.buildDir),
  appIndex: resolveApp(path.join(constants.srcDir, "index.js")),
  appPackageJson: resolveApp("package.json"),
  appSrc: resolveApp(constants.srcDir),
  appSrcGlob: resolveApp(path.join(constants.srcDir, "**/*.js")),
  appConfig: resolveApp(path.join(constants.srcDir, "config")),
  appNodeModules: resolveApp('node_modules'),
  nodePaths,
};
