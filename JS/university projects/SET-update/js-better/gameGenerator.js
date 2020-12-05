import {deckManager} from "./deckManager.js";
import {boardManager} from "./boardManager.js";

export class gameGenerator{
    difficulty = document.querySelector(
        'input[name="difficulty"]:checked').value ;
    setChecker = document.querySelector("#setChecker:checked") ;
    setShower = document.querySelector("#setShower:checked") ;
    addCards = document.querySelector("#cardDistr:checked") ;
    constructor() {
        const playerNum = parseInt(document.querySelector("#playerNum").value) ;
        console.log(playerNum);
        if(playerNum <= 0) return ;
        // step 1 : generate deck
        this.deck = new deckManager().createDeck(this.difficulty);
        // step 2 : generate board
        this.board = new boardManager(this.deck);
        this.setUp();
    }

    setUp() {
        if(this.setChecker != null)
            document.querySelector("#checkButton").style.display = "block";
        if(this.setShower != null)
            document.querySelector("#showButton").style.display = "block";
        if(this.addCards != null)
            document.querySelector("#addButton").style.display = "block";
    }
}