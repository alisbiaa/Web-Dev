import { xyCoord } from "./helper.js";

export class AppView {
  constructor(game) {
    this.game = game;
    this.form = document.querySelector('form')
    this.button = this.form.querySelector('button')
    this.boardDiv = document.querySelector('#board')
    this.statusDiv = document.querySelector('#status')
    this.button.addEventListener('click', this.onGenerate.bind(this))
    this.boardDiv.addEventListener('click', this.onSelectCard.bind(this))
  }

  onGenerate(e) {
    const {form, game} = this
    e.preventDefault()
    const n = form.querySelector('#n').valueAsNumber
    const m = form.querySelector('#m').valueAsNumber
    if (n * m % 2 !== 0) {
      return
    }
    game.initBoard(n, m)
    this.render(game)
  }

  onSelectCard(e) {
    const {boardDiv, game} = this
    const card = e.target.closest('.card')
    if (boardDiv.contains(card)) {
      if (game.flippedCards().length === 2) {
        return
      }
      const {x, y} = xyCoord(card)
      game.selectCard(y, x)
      this.update(game)
      if (game.flippedCards().length === 2) {
        setTimeout(this.turnBackAndRender.bind(this), 1000)
      }
    }
  }
  turnBackAndRender() {
    const {game} = this
    game.turnBack()
    this.update(game)
  }


  render(game) {
    this.renderBoard(game.board)
    this.renderStatus(game.countSolved(), game.gameState)
  }
  update(game) {
    this.updateBoard(game.board)
    this.renderStatus(game.countSolved(), game.gameState)
  }
  
  updateBoard(board) {
    board.forEach((row, i) => row.forEach((card, j) => {
      document.querySelector(`table tr:nth-child(${i+1}) td:nth-child(${j+1}) .card`).classList.toggle('flipped', card.flipped || card.solved)
      document.querySelector(`table tr:nth-child(${i+1}) td:nth-child(${j+1}) .card`).classList.toggle('solved', card.solved)
    }))
  }
  renderBoard(board) {
    this.boardDiv.innerHTML = `
      <table>
        ${board.map(row => `
          <tr>
            ${row.map(card => `
              <td>
                <div class="card ${card.flipped || card.solved ? 'flipped' : ''} ${card.solved ? 'solved' : ''}">
                  <div class="front">${card.value}</div>
                  <div class="back"></div>
                </div>
              </td>
            `).join('')}
          </tr>
        `).join('')}
      </table>`
  }
  
  renderStatus(solved, gameState) {
    this.statusDiv.innerHTML = `
      <p>Game state: ${gameState}</p>
      <p>You have already solved ${solved} cards.</p>
    `
  }
}



