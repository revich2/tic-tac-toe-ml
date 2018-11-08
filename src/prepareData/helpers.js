'use strict'

const initBoard = size =>
  Array(size)
    .fill(null)
    .map(() => Array(size).fill(null))

const getWinnerConditions = board => {
  let conditions = board // all rows

  let columns = [] // all columns
  for (let i = 0; i < board.length; i++) {
    let column = []

    for (let j = 0; j < board.length; j++) {
      column.push(board[j][i])
    }

    columns.push(column)
    column = []
  }

  let diag = [] // diagonales
  let antiDiag = []
  for (let i = 0; i < board.length; i++) {
    diag.push(board[i][i])
    antiDiag.push(board[i][board.length - 1 - i])
  }

  conditions = [...conditions, ...columns, diag, antiDiag]

  return conditions
}

const isFullBoard = board => {
  const boardSize = board.length

  let countFilled = 0

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] !== null) {
        countFilled++
      }
    }
  }

  const countCeils = boardSize * boardSize

  return countFilled === countCeils ? true : false
}

const checkWinner = board => {
  const arrayOfConditions = getWinnerConditions(board)

  let winner = null
  for (let i = 0; i < arrayOfConditions.length; i++) {
    const condition = arrayOfConditions[i]
    const isLoserCondition = condition.some(o => o !== condition[0])

    if (!isLoserCondition) {
      winner = condition[0]
      break
    }
  }

  if (winner === null && isFullBoard(board)) {
    return undefined
  }

  return winner
}

const boardToNeuroData = board => {
  const boardSize = board.length

  let result = []

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      /* 
        stateCeil[0] - X (1) cross
        stateCeil[1] - 0 (0) zero
        stateCeil[2] - null (null) empty ceil
      */
      const stateCeil = Array(3).fill(0)
      const ceil = board[i][j]

      switch (ceil) {
        case null: {
          stateCeil[2] = 1
          break
        }

        case 1: {
          stateCeil[0] = 1
          break
        }

        case 0: {
          stateCeil[1] = 1
          break
        }

        default:
          break
      }

      result = [...result, ...stateCeil]
    }
  }

  return result
}

module.exports = {
  initBoard,
  checkWinner,
  boardToNeuroData,
}
