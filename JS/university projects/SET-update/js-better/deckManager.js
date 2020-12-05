class deckManager{
    num = [1, 2, 3];
    shape = ["oval", "triangle" , "square"];
    shading = ["solid", "stripped", "outlined"];
    color = ["red", "purple", "green"];

    createDeck(difficulty) {
        let advancedDeck = []; // 81 card
        let startDeck = []; // 27 card

        let i = 0, j = 0;
        for (let n of this.num)
            for (let s of this.shape)
                for (let sh of this.shading)
                    for (let c of this.color) {
                        advancedDeck.push({num: n, shape: s, shade: sh, clr: c, index: i});
                        i++;
                    }

        for (let n of this.num) {
            for (let sh of this.shape)
                for (let c of this.color) {
                    startDeck.push({num: n, shape: sh, shade: "solid", clr: c, index: j});
                    j++;
                }
        }

        if (difficulty === "starter") return this.shuffleDeck(startDeck);
        else if (difficulty === "advanced") return this.shuffleDeck(advancedDeck);
    }

    shuffleDeck(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

}

export {deckManager};