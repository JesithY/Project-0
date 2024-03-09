import { currentUser } from "../controller/firebase_auth.js";
import { root } from "./elements.js";
import { protectedView } from "./protected_view.js";
import { onClickPlayGame, onClickNewGame, up_challenge as up_challenge, onClickRestartGame } from "../controller/home_controller.js";
import { card_game } from "../model/card_game.js";
import { GameState } from "../model/card_game.js";


export let game = new card_game();


export const images= {
    FB: "/images/fb.png",
    EC: "/images/emptyCard.jpg",
    HC: "/images/hidden.jpg"

};

export async function homePageView() {
    if (!currentUser) {
        root.innerHTML = await protectedView();
        return;
    }
    const response = await fetch('/view/templates/home_page_template.html',
        { cache: 'no-store' });
    const divWrapper = document.createElement('div');
    divWrapper.innerHTML = await response.text();
    divWrapper.classList.add('m-4', 'p-4');
    ``
    root.innerHTML = '';
    root.appendChild(divWrapper);

    const inc = document.querySelectorAll('.inc');
    const dec = document.querySelectorAll('.dec');
    const restartApp = document.getElementById("restartapp");
    const play = document.getElementById("play");
    const newgame = document.getElementById("newgame");

    for (let i = 0; i < inc.length; i++) {
        inc[i].addEventListener('click', function (event) {
            up_challenge(event, i, 'increase'); 
        });

        dec[i].addEventListener('click', function (event) {
            up_challenge(event, i, 'decrease');
        });
    }
    newgame.onclick = onClickNewGame;
    play.onclick =onClickPlayGame;
    restartApp.onclick =onClickRestartGame;   
    updateWindow();
}

export function setBal()
{
    let bal = document.getElementById("bal");
    bal.innerHTML = "Balance:"+game.bal;
}

export function updateWindow() {
    const buttons = document.querySelectorAll('.button');
    const data = document.getElementById('data1');
    let allImages = document.querySelectorAll('.img-fluid');
    const newgame = document.getElementById('newgame');  
    const restartApp = document.getElementById("restartapp");
    const play = document.getElementById('play');
    const span = document.querySelectorAll('.span');
    let location = document.getElementById('location');
    
    setBal();
    setCurrentChallenge();
   
    switch (game.gameState) {
        case GameState.INIT:
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].id !== "newgame") {
                    buttons[i].disabled = true;
                }

            }
            let message = document.getElementById('message');
            message.innerHTML = 'Press[New Game] button to start!';
            break;

        case GameState.PLAYING:
            location.innerHTML= ""+ game. fbIndex;
            let message1 = document.getElementById('message');
            message1.innerHTML = 'Bet On cards and press [PLAY]';
            
                for (let i = 0; i < allImages.length; i++)
                {
                    allImages[i].src= images.HC;
                }

            for(let i = 0; i < buttons.length; i++)
                if (buttons[i].id === "play" || buttons[i].id === "restartapp") {
                    buttons[i].disabled = true;
                } else {
                    buttons[i].disabled = false;
                }
 
                for(let i=0; i<span.length; i++)
                {
                    span[i].textContent = game.cardChallenge[i];
                    span[i].previousElementSibling.disabled = true;
                    
                }
            break;
        case GameState.DONE:

            for (let i = 0; i < allImages.length; i++)
            {
                if(game.fbIndex === i)
                {
                    allImages[i].src= images.FB;
                    let message2 = document.getElementById('message')
                    message2.innerHTML = `You won ${game.won}
                                         by betting ${game.cardChallenge[game.fbIndex]} coins.
                                         <br>
                                         Press[New Game] button to play again`;
                }
                else
                {
                    allImages[i].src= images.EC;
                    let message3 = document.getElementById('message')
                    message3.innerHTML = `You won ${game.won}
                                         by betting ${game.totalChallenge} coins.
                                         <br>
                                         Press[New Game] button to play again`;

                }
            }
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].id !== "newgame") {
                    buttons[i].disabled = true;
                }
            
            play.disabled=true; 
            if(game.bal ===0)
            {
                restartApp.disabled =false;
                newgame.disabled =true;
            }
            break;
            
    }
}

}

export function setCurrentChallenge()
{
    let challenge = document.getElementById("challenge");
    challenge.innerHTML = "Current Bets:"+game.totalChallenge;
}
