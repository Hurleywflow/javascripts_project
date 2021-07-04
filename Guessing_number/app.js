/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
const min = 1;
const max = 10;
const winningNum = getRandomNum(min, max);
let guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', (e) => {
	if (e.target.className === 'play-again') {
		window.location.reload();
	}
});

// Listen for guess
guessBtn.addEventListener('click', () => {
	const guess = parseInt(guessInput.value);

	// Validate
	if (isNaN(guess) || guess < min || guess > max) {
		setMessage(`Please enter a number between ${min} and ${max}`, 'red');
	}

	switch (guess) {
		case winningNum:
			//! Game over - won
			gameOver(true, `${winningNum} is correct, YOU WIN!`);
			break;
		default:
			// Wrong number
			guessesLeft -= 1;

			switch (guessesLeft) {
				case 0:
					//! Game over - lost
					gameOver(
						false,
						`Game Over, you lost. The correct number was ${winningNum}`
					);
					break;
				default:
					//! Game continues - answer wrong
					// Change border color
					guessInput.style.borderColor = 'red';

					// Clear Input
					guessInput.value = '';

					// Tell user its the wrong number
					setMessage(
						`${guess} is not correct, ${guessesLeft} guesses left`,
						'red'
					);
					break;
			}
			break;
	}
});

// Game over
function gameOver(won, msg) {
	let color;
	won === true ? (color = 'green') : (color = 'red');

	// Disable input
	guessInput.disabled = true;

	// Change border color
	guessInput.style.borderColor = color;

	// Set text color
	message.style.color = color;

	// Set message
	setMessage(msg);

	// PLay again
	guessBtn.value = 'Play Again';
	guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum() {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color) {
	message.style.color = color;
	message.textContent = msg;
}
