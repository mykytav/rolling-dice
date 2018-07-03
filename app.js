const dice_1 = document.getElementById('dice-1');
const dice_2 = document.getElementById('dice-2');
const score_0 = document.getElementById('score-0');
const score_1 = document.getElementById('score-1');
const current_0 = document.getElementById('current-0');
const current_1 = document.getElementById('current-1');
const name_0 = document.getElementById('name-0');
const name_1 = document.getElementById('name-1');
const player_0_panel = document.querySelector('.player-0-panel');
const player_1_panel = document.querySelector('.player-1-panel');
const bnt_roll = document.querySelector('.btn-roll');
const btn_hold = document.querySelector('.btn-hold');
const btn_new = document.querySelector('.btn-new');
const input = document.getElementById('input');

let scores, roundScore, activePlayer, gamePlaying, lastDice;

//start the game
const init = () => {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  dice_1.style.display = 'none';
  dice_2.style.display = 'none';

  score_0.textContent = '0';
  score_1.textContent = '0';
  current_0.textContent = '0';
  current_1.textContent = '0';
  name_0.textContent = 'Player1';
  name_1.textContent = 'Player2';
  player_0_panel.classList.remove('winner');
  player_1_panel.classList.remove('winner');
  player_0_panel.classList.remove('active');
  player_1_panel.classList.remove('active');
  player_0_panel.classList.add('active');
};

const nextPlayer = () => {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  current_0.textContent = '0';
  current_1.textContent = '0';

  player_0_panel.classList.toggle('active');
  player_1_panel.classList.toggle('active');

  dice_1.style.display = 'none';
  dice_2.style.display = 'none';
};

init();

bnt_roll.addEventListener('click', () => {
  if (gamePlaying) {
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    dice_1.style.display = 'block';
    dice_2.style.display = 'block';
    dice_1.src = `dice-${dice1}.png`;
    dice_2.src = `dice-${dice2}.png`;

    //Update the round score IF the rolled number was NOT 6&&6 or 1&&1
    if (dice1 === 6 && dice2 === 6) {
      scores[activePlayer] = 0;
      document.querySelector(`#score-${activePlayer}`).textContent = '0';
      nextPlayer();
    } else if (dice1 !== 1 && dice2 !== 1) {
      roundScore = dice1 + dice2;
      document.querySelector(
        `#current-${activePlayer}`
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

btn_hold.addEventListener('click', () => {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;

    document.querySelector(`#score-${activePlayer}`).textContent =
      scores[activePlayer];

    let scoreLimit = input.value;
    let winningScore;

    scoreLimit ? (winningScore = scoreLimit) : (winningScore = 33);

    if (scores[activePlayer] >= winningScore) {
      document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
      dice_1.style.display = 'none';
      dice_2.style.display = 'none';
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add('winner');
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

btn_new.addEventListener('click', init);
