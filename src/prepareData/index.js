'use strict'

const Game = require('./Game')
const RandomBot = require('./RandomBot')

const DataSet = require('./DataSet')

const randomBot = new RandomBot()
const game = new Game(randomBot)

module.exports = {
  game,
  dataSet: new DataSet(game),
}
