/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

let scores, roundScore, activePlayer, gameContinue;
let diceDom = document.querySelector('.dice');

init();

//ROLL DICE BUTTON

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gameContinue) {
    // 1. GET RANDOM NUMBER
    let dice = Math.floor(Math.random() * 6) + 1;
    console.log(dice);
    // 2. DISPLAY THE RESULT
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png';
    // 3. UPDATE THE SCORE IF THE ROLLED NUMBER IS NOT A 1
    if ( dice !== 1) {
      // keep rolling and add scores
      roundScore += dice;
      document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

//HOLD BUTTON

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gameContinue) {
    // 1. ADD CURRENT SCORE TO GLOBAL SCORE
      scores[activePlayer] += roundScore;

    // 2. UPDATE UI
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // 4. CHECK WHO REACHES 100 POINTS FIRST WINS THE GAME
      if (scores[activePlayer] >= 100) {
        gameContinue = false;
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        diceDom.style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      } else {
        switchPlayer();
      }
  }

});

//NEW GAME BUTTON

document.querySelector('.btn-new').addEventListener('click', init);

//SWITCH PLAYER FUNCTION

function switchPlayer () {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  diceDom.style.display = 'none';
}

//INITIALIZED FUNCTION

function init () {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gameContinue = true;
  diceDom.style.display = 'none';
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
