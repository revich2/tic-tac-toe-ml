'use strict'

const { checkWinner } = require('./helpers')

class Game {
  constructor(bot) {
    this.bot = bot
    this.currentMove = 1
    this.movesHistory = []
    this.board = null
  }

  setBoard(board) {
    this.board = board
    this._pushBoardToHistory(board)
  }

  setInitialMove(move) {
    this.currentMove = move
  }

  _pushBoardToHistory(board) {
    const _board = JSON.parse(JSON.stringify(board))
    this.movesHistory = [...this.movesHistory, _board]
  }

  _changeCurrentMove(currentMove) {
    this.currentMove = currentMove === 0 ? 1 : 0
  }

  playGame(cb) {
    let winner = null

    while (winner === null) {
      const { row, column } = this.bot.makeMove(this.board)

      this.board[row][column] = this.currentMove
      this._pushBoardToHistory(this.board)

      this._changeCurrentMove(this.currentMove)

      winner = checkWinner(this.board)
    }

    if (cb) {
      cb({ winner, board: this.board, history: this.movesHistory })
    }
  }

  resetGame() {
    this.board = null

    this.movesHistory = []
    this.currentMove = 1
  }
}

module.exports = Game
