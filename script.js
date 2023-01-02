'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.querySelector('#score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');



const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    // currentScore += diceNum;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}
let playing, score, currentScore, activePlayer;

const init = function () {
    //starting condition
    score = [0, 0];
    playing = true;
    currentScore = 0;
    activePlayer = 0;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    document.querySelector('.dice').classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

init();

btnRoll.addEventListener('click', function () {

    if (playing) {
        //generate a rendom number
        const diceNum = Math.trunc(Math.random() * 6) + 1;

        //make dice appear
        diceEl.classList.remove('hidden');
        diceEl.src = `imgs/dice-${diceNum}.png`;

        //check for roll 1

        //if roll is not 1
        if (diceNum !== 1) {
            currentScore += diceNum;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        //if dice rolls 1
        else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

        if (score[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.querySelector(`#current--${activePlayer}`).textContent = 0;
            // document.getElementById(`current--${activePlayer}`).textContent = 0;
            document.querySelector('.dice').classList.add('hidden');
        }
        else {
            //switch the player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);