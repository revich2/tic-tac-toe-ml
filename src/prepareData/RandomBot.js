'use strict'

class RandomBot {
  makeMove(currentBoard) {
    const boardSize = currentBoard.length

    let i = 0,
      j = 0

    do {
      i = Math.floor(Math.random() * boardSize)
      j = Math.floor(Math.random() * boardSize)
    } while (currentBoard[i][j] !== null)

    return { row: i, column: j }
  }
}

module.exports = RandomBot
