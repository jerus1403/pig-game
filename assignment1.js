/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

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
    // 3. UPDATE THE SCORE IF THE ROLLED NUMBER IS NOT A 1
    // if(dice1 === 6 && lastDice1 === 6) {
    //   scores[activePlayer] = 0;
    //   document.querySelector('#score-' + activePlayer).textContent = 0;
    //   switchPlayer();
    // }
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
