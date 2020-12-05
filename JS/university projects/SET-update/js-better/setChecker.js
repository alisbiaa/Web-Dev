
export class setChecker {

    constructor(deck, howManyCards) {
        this.deck = deck ;
        this.howManyCards = howManyCards ;
    }

    result() {
        let arrOfIndexes = [];
        let arrOfCards = [];
        let arrOfHtml = []
        for (let i = 1; i <= 12; i++) {
            let cardImg = document.querySelector(`#board div:nth-child(${i}) img:nth-child(1)`);
            if (cardImg.dataset.selected === "1") {
                arrOfIndexes.push(cardImg.dataset.index);
                arrOfHtml.push(cardImg);
            }
        }
        for (let card of this.deck) {
            if (arrOfIndexes.includes(card.index.toString())) arrOfCards.push(card);
        }

        if (this.checkSet(arrOfCards[0], arrOfCards[1], arrOfCards[2])) {
            for (let i = 0; i < 3; i++) {
                arrOfHtml[i].style.borderColor = "green";
                try {
                    arrOfHtml[i].dataset.index = `${this.deck[i + this.howManyCards].index}`;
                }catch (error) {
                    arrOfHtml[i].dataset.index = `-1`;
                }
            }
        }

        for (let tmp of arrOfHtml) {
            tmp.style.border = "none";
            tmp.dataset.selected = "0";
        }

        return this.checkSet(arrOfCards[0], arrOfCards[1], arrOfCards[2]);
    }
    // to check if there is an available set


    checkSetButton() {
        const status = document.querySelector("#deckStatus");
        const cardHTML = document.getElementsByClassName("card");
        let result = false  ;
        let cards = [] ;
        for (let card of cardHTML) {
            if(card.dataset.index == "-1") continue ;
            cards.push(this.deck.filter(c => c.index == card.dataset.index)[0]);
        }
        // console.log(cards);
        for (let i = 0 ; i<cards.length ; i++ ) {
            let tmp = cards.filter(card => card != cards[i]);
            for(let j = 0 ; j < cards.length-2 ; j++)
                if (this.checkSet(cards[i] , tmp[j] , tmp[j+1])) {
                    result = true;
                    this.card1 = cards[i].index ;
                    this.card2 = tmp[j].index ;
                    this.card3 = tmp[j + 1].index;
                    // console.log(cards[i].index, tmp[j].index, tmp[j + 1].index);
                    break ;
                }
        }
        status.innerHTML = `${result ? "Yes, there is an available set on the board." : "No, there is no available set on the board"}`
        return result ;
    }

    showSetButton() {
        if (this.checkSetButton()=== false ) return ;
        const cardHTML = document.getElementsByClassName("card");
        // console.log(this.card1);
        // console.log(this.card2);
        // console.log(this.card3);
        // console.log(cardHTML[0].dataset.index);
        for(let card of cardHTML)
            if (card.dataset.index == this.card1 || card.dataset.index == this.card2 || card.dataset.index == this.card3  ) {
                card.style.border = "2px solid green";
                // console.log("hi")
            }
    }



    checkSet(c1, c2, c3) {
        function isDistinct(a, b, c) {
            return (a !== b) && (a !== c) && (c !== b);
        }

        function isIdentical(a, b, c) {
            return (a === b) && (a === c);
        }

        function checkColor() {
            return isDistinct(c1.clr, c2.clr, c3.clr) || isIdentical(c1.clr, c2.clr, c3.clr);
        }

        function checkNum() {
            return isDistinct(c1.num, c2.num, c3.num) || isIdentical(c1.num, c2.num, c3.num);
        }

        function checkShade() {
            return isDistinct(c1.shade, c2.shade, c3.shade) || isIdentical(c1.shade, c2.shade, c3.shade);
        }

        function checkShape() {
            return isDistinct(c1.shape, c2.shape, c3.shape) || isIdentical(c1.shape, c2.shape, c3.shape)
        }

        return checkColor() && checkNum() && checkShade() && checkShape();
    }
}