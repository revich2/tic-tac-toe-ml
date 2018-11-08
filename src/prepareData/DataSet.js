'use strict'

const { initBoard, boardToNeuroData } = require('./helpers')

class DataSet {
  constructor(game) {
    this.game = game
  }

  createDataSetFullHistory(boardSize, gamesCount) {
    let inputs = []
    let expected = []

    for (let i = 0; i < gamesCount; i++) {
      this.game.setBoard(initBoard(boardSize))
      this.game.playGame(result => {
        inputs = [...inputs, ...result.history.map(board => boardToNeuroData(result.board))]

        const winner = result.winner === undefined ? 0.5 : result.winner
        expected = [...expected, ...Array(result.history.length).fill(winner)]
      })

      this.game.resetGame()
    }

    return {
      inputs,
      expected,
    }
  }
}

module.exports = DataSet
