import {boardManager} from "./boardManager.js";

export class playersManager {

    playersNum = document.querySelector("#playerNum");
    playersList = document.querySelector("#playersNames > ul");
    coll = document.querySelector(".collapsible");
    // pSel = 0 ; // this variable is to identify how many players are selected at a time (max 1 ) ;
    players = document.querySelector("#players");

    constructor() {
        this.coll.addEventListener("click", function (event) {
            event.preventDefault();
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight){
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        })
        this.playersNum.addEventListener("blur" , e=> {this.createPlayersNames()})
        // this.createPlayers();
    }


    createPlayersNames () {
        // console.log(this.playersNum.value) ;
        // console.log(this.playersNum.dataset.recent) ;
        // console.log(this.playersList);

        if(this.playersNum.value == this.playersNum.dataset.recent)
            return ;
        else {
            this.playersList.innerHTML = "";
            for(let  i = 0 ; i<this.playersNum.value ; i++) {
                this.playersList.innerHTML += `<li> <input type="text" value="player ${i+1}" class="p"> </li>`
            }
        }
    }

    createPlayers() {
        const playerNum = parseInt(document.querySelector("#playerNum").value) ;
        // console.log(playerNum);
        if(playerNum <= 0) return ;
        const playersHtml = document.getElementsByClassName("p") ;
        let playersNames = [] ;
        for (let p of playersHtml )
            playersNames.push(p.value);
        for (let name of playersNames)
            this.players.innerHTML += `<div class="rp" data-name="${name}"  data-score="0" data-selected="0" data-canPlay="1"> <span> ${name} | 0</span></div>`
        this.delegate(this.players, "click", "div", e=> {this.onSelect(e)});
        const start  = document.querySelector("#start") ;
        start.disabled = true ;
    }

    resetPlayers() {
        // this.pSel = 0 ;
        document.querySelector("#pStatus").innerHTML = "Select player  : ";
        document.querySelector("#pStatus").dataset.psel = "0";
        const playersHtml = document.getElementsByClassName("rp");
        for (let p of playersHtml) {
            p.dataset.selected = "0";
            p.dataset.canplay = "1";
            p.style.backgroundColor =  "#555555";
        }
    }

    // this to increment the score of the selected player with 1
    winner() {
        const playersHtml = document.getElementsByClassName("rp");
        for (let p of playersHtml) {
            if (p.dataset.selected=="1") {
                // console.log(p.dataset.name) ;
                // console.log(p.dataset.score) ;
                p.dataset.score = (parseInt(p.dataset.score) + 1).toString() ;
                // console.log(p.dataset.score) ;
                break ;
            }
        }
        this.resetPlayers() ;
    }

    // this to -1 the score of the selected player
    loser(){
        document.querySelector("#pStatus").innerHTML = "Select player  : ";
        document.querySelector("#pStatus").dataset.psel = "0";
        const playersHtml = document.getElementsByClassName("rp");
        for (let p of playersHtml) {
            if (p.dataset.selected=="1") {
                p.dataset.score = (parseInt(p.dataset.score) - 1 ).toString() ;
                p.dataset.canplay = "0" ;
                p.style.backgroundColor =  "black";
                p.dataset.selected ="0"  ;
                break ;
            }
        }
        if(this.checkAllLosers()) this.resetPlayers();
    }

    checkAllLosers() {
        let result = true ;
        const playersHtml = document.getElementsByClassName("rp");
        for (let p of playersHtml) {
            if(p.dataset.canplay =="1")  result = false ;
        }
        return result ;
    }
    onSelect(event) {
        const status = document.querySelector("#pStatus");
        let target = event.target;
        let selected = target.dataset.selected ;
        const canplay = target.dataset.canplay ;
        const cardsSelected = document.querySelector("#board").dataset.nsel;
        if (canplay=="0" || cardsSelected !=="0") return ;

        // console.log(selected);
        if (selected==="0") {
            if(status.dataset.psel !="0") return ;
            target.style.backgroundColor = "#FE676E";
            target.dataset.selected = "1";
            // this.pSel++ ;
            status.innerHTML = "You have selected a player";
            status.dataset.psel = "1";
        } else if (selected==="1") {
            target.style.backgroundColor=  "#555555";
            target.dataset.selected = "0";
            // this.pSel-- ;
            status.innerHTML = "Select player  : ";
            status.dataset.psel = "0";
        }

    }

    delegate(parent, type, selector, handler) {
        parent.addEventListener(type, function (event) {
            const targetElement = event.target.closest(selector);

            if (this.contains(targetElement)) {
                handler.call(targetElement, event);
            }
        });
    }

    render() {
        const test = document.querySelectorAll(".rp");
        for(let t of test)
            t.innerHTML = `<span> ${t.dataset.name} | ${t.dataset.score} </span> ` ;
        // console.log(test);
    }

    timerFunction() {
        const cardsSelected = document.querySelector("#board").dataset.nsel;
        const playersSelected = document.querySelector("#pStatus").dataset.psel ;
        // if (playersSelected == "0" ) return ;
        this.loser();

    }
}