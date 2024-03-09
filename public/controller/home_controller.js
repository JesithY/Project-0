import { game, updateWindow,setCurrentChallenge, homePageView,} from "../view/home_page.js";
import { GameState } from "../model/card_game.js";
import { currentUser } from "./firebase_auth.js";
import { DEV } from "../model/constants.js";
import { addCardGameRecord } from "./firestore_controller.js";

export function up_challenge(event, position, type) {
    const element = event.target.closest('div').querySelector('.span');
    const play= document.getElementById("play");

    if (type === 'increase') {
        game.increaseChallenge(position);

    }
    else if (type === 'decrease') {
        game.decreaseChallenge(position);

    }
    element.textContent = game.cardChallenge[position];

    if (game.totalChallenge > 0) {
        play.disabled = false;
    }
    if (game.bal === game.totalChallenge) {
        const incr = document.querySelectorAll('inc');
        for (let i = 0; i < incr.length; i++) {
            incr[i].disabled = true;
        }

    }
    if(game.cardChallenge[position]>0)
    {
        event.target.closest('div').querySelector('span').previousElementSibling.disabled = false;
    }
    if (game.totalChallenge == 0) {
        play.disabled = true;
    }
    setCurrentChallenge(game.totalChallenge);

}
export function onClickNewGame(e) {
    if(game.bal>0)
    {
        game.reset();
    }
    game.gameState = GameState.PLAYING;
    updateWindow();

}
export function onClickRestartGame(e) {
    game.reset();
    game.bal = game.restartAppBalance;
    homePageView();
    updateWindow();
}

export async function savePlayRecord() {
    const blnc = game.bal ;
    const challenge = game.totalChallenge;
    const email = currentUser.email;
    const restartApp =false;
    const timeStamp = Date.now();
    const won= game.won;
    const playRecord = { balance: blnc,bet: challenge,email, restart: restartApp, timestamp: timeStamp, won };

    const div = document.createElement('div');
    div.classList.add('text-white', 'bg-primary');
    div.textContent = 'Saving to Firestore ...';
    document.getElementById('message').appendChild(div);


    try {
        await addCardGameRecord(playRecord);
    } catch (e) {
        if (DEV) console.log('failed to save play record', e);
        alert(`Failed to save: ${JSON.stringify(e)}`);
    }

    div.remove();

}

export async function onClickPlayGame(e) {
    game.gameState= GameState.DONE;
    game.setWinner();
    await savePlayRecord();
    updateWindow();
    

}