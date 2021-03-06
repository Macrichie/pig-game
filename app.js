let scores, roundScore, activePlayer, gamePlaying, lastDice;

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

init();


// Roll dice
document.querySelector('.btn-roll').addEventListener('click', ()=> {
    if(gamePlaying) {
        //1. Get random number
        let dice1 = Math.floor(Math.random()*6) + 1;
        let dice2 = Math.floor(Math.random()*6) + 1;

        //2. Display the result
        // let diceDOM = document.querySelector('.dice');
        // diceDOM.style.display = 'block';
        // diceDOM.src = 'dice-' + dice + '.png';
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';


        //3. Update the round score IF the rolled number is NOT equal to 1
        if(dice1 !== 1 && dice2 !== 1) {
            // Add score
            roundScore += dice1+dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            // Next Player
            nextPlayer();
        }


        /*
        if(dice === 6 && lastDice === 6) {
            // Player loses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();

        } else if(dice !== 1) {
            // Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            // Next Player
            nextPlayer();
        }

        lastDice = dice;
        */
    }

});


// Hold
document.querySelector('.btn-hold').addEventListener('click', () => {
    if(gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        let input = document.querySelector('.final-score').value;
        let winningScore;

            //if input value equals undefined, 0, null or "" then COERCED to false
            //anything else is COERCED to true
        if(input) {
            winningScore = input;
        }else {
            winningScore = 100; // set default winning score
        }


        // Check if player won
        if(scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';

            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // Next Player
            nextPlayer();
        }
    }

});


function nextPlayer() {
        // Next Player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';


        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');

        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
        //document.querySelector('.dice').style.display = 'none';
}


// New Game
document.querySelector('.btn-new').addEventListener('click', init);





//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = `<em>${dice}<em>`;

//document.querySelector('.dice').hidden = true;

