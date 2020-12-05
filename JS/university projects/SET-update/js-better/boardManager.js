import {setChecker} from "./setChecker.js";
import {playersManager} from "./playersManager.js";

class boardManager{
    howManyPulledCard = 0 ; // how many card we did pull from our deck
    howManyCardOnTheBoard = 0 ; //  how many card we have on board
    nSel = 0 ; // number of cards selected at once
    // difficulty = document.querySelector('input[name="difficulty"]:checked').value ;
    board = document.querySelector("#board") ;
    checkButton = document.querySelector("#checkButton") ;
    showButton = document.querySelector("#showButton");
    addButton = document.querySelector("#addButton");
    players = document.querySelector("#players");



    constructor(deck) {
        this.deck = deck;
        this.generateBoard() ;
        this.renderBoard();
        this.delegate(this.board, "click", "img", e=>{this.onSelect(e)});
        this.delegate(this.players, "click", "div", e=> {this.onSelectPlayer()});
        this.checkButton.addEventListener("click",  e=> {new setChecker(this.deck).checkSetButton()}) ;
        this.showButton.addEventListener("click", e => {new setChecker(this.deck).showSetButton()});
        this.addButton.addEventListener("click",  e=> this.add3Cards()) ;
    }

    generateBoard() {
        this.howManyPulledCard +=12 ;
        this.howManyCardOnTheBoard +=12 ;
        for(let i = 0 ; i<this.howManyCardOnTheBoard; i++) {
            this.board.innerHTML += ` <div class="cardContainer col-4"> <img class="card" data-index="${this.deck[i].index}" data-selected="0"></div> `
        }
    }

    renderBoard() {
        for(let i = 1 ; i<= this.howManyCardOnTheBoard ; i++) {
            //select img selector
            let cardImg = document.querySelector(`#board div:nth-child(${i}) img:nth-child(1)`);
            // select the card related to this html selector
            let index = cardImg.dataset.index ;
            let card = this.deck.filter(card => card.index== index) ;
            // upload the image
            try {
                cardImg.src = `./cards/${card[0].num}-${card[0].shape}-${card[0].shade}-${card[0].clr}.png `;
            }catch (e) {
                cardImg.src = `./cards/blank.png`;
            }
        }
        const remain= this.deck.length - this.howManyPulledCard ;
        if(this.isGameOver()) {
            document.querySelector("#deckStatus").innerHTML = "Game OVER";
            this.board.style.display = "none";
            const scoreDiv = document.querySelector("#scores");
            const players = document.querySelectorAll(".rp");
            const scoresArr = [] ;
            for(let player of players)
                scoresArr.push({name : player.dataset.name , score : parseFloat(player.dataset.score)})
            scoresArr.sort(function(a, b) {
                return b.score - a.score;
            });

            for(let score of scoresArr)
                scoreDiv.innerHTML += `<h3> ${score.name} -- score : ${score.score} </h3> <hr>`

            scoreDiv.style.display = "block";
            console.log(scoresArr);

        }
        else
            document.querySelector("#deckStatus").innerHTML = `${this.howManyPulledCard>=this.deck.length ? this.deck.length : this.howManyPulledCard} : cards pulled <br> ${remain>0? remain:0 } : cards remained`;

    }
    //i need to come back for this
    isGameOver() {
        let blank = false ;
        const cards = document.getElementsByClassName("card");
        for(let card of cards)
            if(card.dataset.index == "-1") {
                blank = true;
                break ;
            }
        if (blank) {
            return !(new setChecker(this.deck).checkSetButton());
        }
        return false ;
    }

    delegate(parent, type, selector, handler) {
        parent.addEventListener(type, function (event) {
            const targetElement = event.target.closest(selector);

            if (this.contains(targetElement)) {
                handler.call(targetElement, event);
            }
        });
    }

    onSelect(event) {
        const status = document.querySelector("#pStatus");
        const playerSelected = status.dataset.psel  ;
        if (playerSelected == "0") return ;
        let target = event.target;
        let selected = target.dataset.selected ;
        // console.log(selected);
        if (selected==="0" && this.nSel<3) {
            target.style.border = "1px solid red";
            target.dataset.selected = "1";
            this.nSel++ ;
        } else if (selected==="1") {
            target.style.border= "none";
            target.dataset.selected = "0";
            this.nSel-- ;
        }
        if (this.nSel===3) {
            this.stopTimer();
            this.nSel = 0 ;
            let check = new setChecker(this.deck, this.howManyPulledCard).result();
            if(check) {
                this.howManyPulledCard +=3 ;
                this.renderBoard();
                new playersManager().winner();
            }
            else {
                new playersManager().loser();
            }
            new playersManager().render();
            // console.log(this.howManyPulledCard) ;
            // new playersManager().resetPlayers();
        }
        this.board.dataset.nsel = this.nSel.toString();
    }

    add3Cards() {
        for(let i = this.howManyPulledCard ; i<this.howManyPulledCard+3; i++) {
            this.board.innerHTML += ` <div class="cardContainer col-4"> <img class="card" data-index="${this.deck[i].index}" data-selected="0"></div> `
        }
        this.howManyPulledCard+=3  ;
        this.howManyCardOnTheBoard+=3 ;
        this.renderBoard();
    }

    timer = null ; 

    onSelectPlayer() {
        this.timer = setTimeout(() =>{new playersManager().loser(); new playersManager().render(); this.resetSelection() } , 10000);
    }
    stopTimer() {
        clearTimeout(this.timer);
    }

    resetSelection() {
        this.nSel = 0;
        this.board.dataset.nsel = this.nSel.toString();
        const cardSelected = document.querySelectorAll(".card");
        for (let card of cardSelected) {
            if(card.dataset.selected == "1")             {
                card.dataset.selected = "0";
                card.style.border = "none";
            }

        }


    }


}

export {boardManager};