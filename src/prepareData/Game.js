'use strict'

const { checkWinner } = require('./helpers')

class Game {
  constructor(bot) {
    this.bot = bot
    this.currentMove = 1
    this.movesHistory = []
  }

  setBoard(board) {
    this.board = board
  }

  setInitialMove(move) {
    this.currentMove = move
  }

  _pushBoardToHistory(board) {
    this.movesHistory.push(board)
  }

  _changeCurrentMove(currentMove) {
    this.currentMove = currentMove === 0 ? 1 : 0
  }

  playGame(cb) {
    const { row, column } = this.bot.makeMove(this.board)

    this.board[row][column] = this.currentMove
    this._changeCurrentMove(this.currentMove)

    this._pushBoardToHistory(this.board)

    const winner = checkWinner(this.board)

    if (winner === null) {
      this.playGame(cb)
    } else if (cb) {
      cb({ winner, board: this.board, history: this.movesHistory })
    }
  }

  resetGame() {
    delete this.board

    this.movesHistory = []
    this.currentMove = 1
  }
}

module.exports = Game
