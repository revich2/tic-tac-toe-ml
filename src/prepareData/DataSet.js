'use strict'

const { initBoard, boardToNeuroData } = require('./helpers')

class DataSet {
  constructor(game) {
    this.game = game
  }

  boardToLine(board) {
    return board.reduce((acc, row) => [...acc, ...row], [])
  }

  boardToLineAndExpectedMove(prevBoard, nextBoard) {
    const boardLength = prevBoard.length

    let resultExpected = Array(boardLength)
      .fill(0)
      .map(() => Array(boardLength).fill(0))

    let isCrossesMove = false

    for (let i = 0; i < prevBoard.length; i++) {
      for (let j = 0; j < prevBoard.length; j++) {
        const prevCeil = prevBoard[i][j]
        const nextCeil = nextBoard[i][j]

        if (prevCeil !== nextCeil && nextCeil === 1) {
          resultExpected[i][j] = 1

          isCrossesMove = true
        }
      }
    }

    return {
      resultExpected: this.boardToLine(resultExpected),
      isCrossesMove,
    }
  }

  createDataSetForXWinsChangedExpected2(boardSize, dataCount) {
    let inputs = []
    let expected = []

    let gamesCount = 0
    while (gamesCount < dataCount) {
      this.game.setBoard(initBoard(boardSize))

      this.game.playGame(result => {
        if (result.winner === 1) {
          const history = result.history

          history.forEach((board, index) => {
            if (index < history.length - 1) {
              const { isCrossesMove, resultExpected } = this.boardToLineAndExpectedMove(board, history[index + 1])

              if (isCrossesMove) {
                inputs = [...inputs, boardToNeuroData(board)]
                expected = [...expected, resultExpected]
              }
            }
          })

          gamesCount++
        }
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
