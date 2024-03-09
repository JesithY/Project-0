export const GameState = {
    INIT: 0, PLAYING: 1, DONE: 2,
}

export class card_game {

    constructor() {

        this.totalcardsCount=3;
        this.restartAppBalance=15;
        this.bal = 15;
        this.totalChallenge = 0;
        this.cardChallenge = [];
        this.won = 0;
        this.reset();

    }
    setWinner() {
        for (let i = 0; i < this.totalcardsCount; i++) {
            if (i == this.fbIndex)
            {
                this.bal = this.bal + (this.cardChallenge[i] * 2);
                this.won = (this.cardChallenge[i]*3);
            }
            else
                this.bal = this.bal - this.cardChallenge[i];
        }
    }

    increaseChallenge(position) {
        if (this.bal > this.totalChallenge) {
            this.totalChallenge++;
            this.cardChallenge[position]++;
        }
    }

    decreaseChallenge(position) {
        if (this.cardChallenge[position] > 0) {
            this.totalChallenge--;
            this.cardChallenge[position]--
        }
    }

   

    reset() {
        this.gameState = GameState.INIT;
        this.totalChallenge = 0;
        this.fbIndex = this.randomInteger(0, 2);
        for (let i = 0; i < this.totalcardsCount; i++) {
            this.cardChallenge[i] = 0
        }
    }

    randomInteger(min, max) {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }


}