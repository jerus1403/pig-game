
let scores, roundScore, activePlayer, gameContinue, lastDice;
let diceDom1 = document.querySelector('.dice1');
let diceDom2 = document.querySelector('.dice2');

init();

//ROLL DICE BUTTON

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gameContinue) {
    // 1. GET RANDOM NUMBER
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    console.log('Current dice: ' + dice1);
    console.log('Dice 2: ' + dice2);
    // 2. DISPLAY THE RESULT
    diceDom1.style.display = 'block';
    diceDom2.style.display = 'block';
    diceDom1.src = 'dice-' + dice1 + '.png';
    diceDom2.src = 'dice-' + dice2 + '.png';
    
    if ( dice1 !== 1 && dice2 !== 1) {
      // keep rolling and add scores
      roundScore +=  dice1 + dice2;
      document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
      //switch player
      // scores[activePlayer] = 0;
      document.getElementById('current-' + activePlayer).textContent = 0;
      switchPlayer();
    }

    // lastDice1 = dice1;
    // console.log('Last dice: ' + lastDice1);
  }
});

//HOLD BUTTON

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gameContinue) {
    // 1. ADD CURRENT SCORE TO GLOBAL SCORE
      scores[activePlayer] += roundScore;

    // 2. UPDATE UI
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // 3. INPUT FINAL SCORE
      let finalScore = parseFloat(document.querySelector('.final-score').value);
      let scoreNum;
      if (finalScore >= 0 && Number.isInteger(finalScore) && finalScore) {
        scoreNum = finalScore;
      } else {
        scoreNum = 0;
      }
    // 4. CHECK WHO REACHES 100 POINTS FIRST WINS THE GAME
      if (scores[activePlayer] >= scoreNum) {
        gameContinue = false;
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        diceDom1.style.display = 'none';
        diceDom2.style.display = 'none';
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
  diceDom1.style.display = 'none';
  diceDom2.style.display = 'none';
}

//INITIALIZED FUNCTION

function init () {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gameContinue = true;
  diceDom1.style.display = 'none';
  diceDom2.style.display = 'none';
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
};
