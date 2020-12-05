export class Game {
  constructor() {
    this.board = []
    this.gameState = 0 // 0, 1, 2
  }

  init() {
    this.board = []
    this.gameState = 0
  }
  initBoard(n, m) {
    const numbers = Array(n * m / 2).fill(0).map((e, i) => i + 1)
    const values = [...numbers, ...numbers].sort((a, b) => Math.random() < 0.5 ? 1 : -1)
    this.board = Array(n).fill(0).map(() => Array(m).fill(0).map(() => ({
      value: values.shift(),
      flipped: false,
      solved: false,
    })))
    this.gameState = 1
  }
  selectCard(i, j) {
    const flipped = this.flippedCards()
    if (this.isFlipped(i, j) || this.isSolved(i, j) || flipped.length === 2) {
      return
    }
    // flip over
    this.board[i][j].flipped = true
    flipped.push(this.board[i][j])
    // check cards
    if (flipped.length === 2 && flipped[0].value === flipped[1].value) {
      flipped.forEach(card => {
        card.solved = true
        card.flipped = false
      })
    }
    // check win
    if (this.isWin()) {
      this.gameState = 2
    }
  }
  isFlipped(i, j) {
    return this.board[i][j].flipped
  }
  isSolved(i, j) {
    return this.board[i][j].solved
  }
  turnBack() {
    this.board.forEach(row => row.forEach(card => card.flipped = false))
  }
  isWin() {
    return this.board.every(row => row.every(card => card.solved))
  }
  flippedCards() {
    return this.board.flatMap(row => row.filter(card => card.flipped))
  }
  countSolved() {
    return this.board.flatMap(row => row.filter(card => card.solved)).length
  }
}

// const g = new Game()
// g.initBoard(3,4)
// console.log(g.board);
// g.select(0, 0)
// console.log(g.board);
// g.select(1, 0)
// console.log(g.board);
// g.select(2, 0)
// console.log(g.board);
// g.select(0, 2)
// console.log(g.board);