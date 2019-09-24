let buttonTags = document.querySelectorAll('button:not(.restart-game)');
let nextPlayerX = true;
let numberOfMovesInGame = 0;
setButtonActions();

let containerTag = document.getElementsByClassName('container')[0];
let gameOverMessageDivTag = document.querySelector('#game-over-message-div');
let gameOverMessagePTag = document.querySelector('#game-over-message-div p')

let positions = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];

let consoleTag = document.getElementById('console');

gameOverMessageDivTag.style.display = 'none';

gameOverMessageDivTag.addEventListener('click', function() {
    gameOverMessageDivTag.style.display = 'none';
    containerTag.style.display = 'block';
});

function setButtonActions() {
    for (let i = 0; i < buttonTags.length; i++) {
        buttonTags[i].addEventListener('click', function() {
            if (isWinner(nextPlayerX ? 'O' : 'X') || numberOfMovesInGame === 9) {
                makePositionsEmpty();
                } else if (buttonTags[i].textContent != 'X' && buttonTags[i].textContent != 'O') {
                    if (nextPlayerX) {
                buttonTags[i].style.color = 'aqua';
            } else {
                buttonTags[i].style.color = 'red';
            }
                buttonTags[i].textContent = nextPlayerX ? 'X' : 'O';
                positions[parseInt(i / 3)][parseInt(i % 3)] = nextPlayerX ? 'X' : 'O'; 
                ++numberOfMovesInGame;
                doActionIfWon(isWinner(nextPlayerX ? 'X' : 'O'), nextPlayerX ? 'X' : 'O');
            nextPlayerX = !nextPlayerX;
            }
           consoleTag.textContent += numberOfMovesInGame + ')\n';
            for (let i = 0; i < positions.length; i++) {
                for (let j = 0; j < positions[i].length; j++) {
                    if (positions[i][j] != '-') {
                        consoleTag.textContent += positions[i][j];
                        if (j != 2) {
                        consoleTag.textContent += ' ';
                        }
                    } else {
                        consoleTag.textContent += '—';
                    }
                    
                    
                }
                consoleTag.textContent += '\n';
            }
        });
    }
    
    let restartButtons = document.getElementsByClassName('restart-game');
    for (let i = 0; i < restartButtons.length; i++) {
        restartButtons[i].addEventListener('click', function() {
            makePositionsEmpty();
        });
    }
}

function isWinner(xOrY) {
    for (let i = 0; i < 3; i++) {
        if ((positions[i][0] == xOrY && positions[i][1] == xOrY && positions[i][2] == xOrY) ||
           (positions[0][i] == xOrY && positions[1][i] == xOrY && positions[2][i] == xOrY)) {
            return true;
        }
    }
    
    if (positions[0][0] == xOrY && positions[1][1] == xOrY && positions[2][2] == xOrY) {
        return true;
    } else if (positions[0][2] == xOrY && positions[1][1] == xOrY && positions[2][0] == xOrY) {
        return true;
    }
    return false;
}

function doActionIfWon(won, xOrY) {
    if (won) {
        gameOverMessagePTag.textContent = `${xOrY} won/laimėjo ${xOrY == 'X' ? 'kryžiukai' : 'nuliukai'}.`;
       containerTag.style.display = 'none'; 
        gameOverMessageDivTag.style.display = 'block';
    } else if (numberOfMovesInGame == 9) {
        gameOverMessagePTag.textContent = 'draw/lygiosios';
        containerTag.style.display = 'none';
        gameOverMessageDivTag.style.display = 'block';
    }
}

function makePositionsEmpty() {
     for (let i = 0; i < buttonTags.length; i++) {
        buttonTags[i].style.color = 'black';
    }
                for (let i = 0; i < buttonTags.length; i++) {
                    buttonTags[i].textContent = '-';
                }
                positions = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
    numberOfMovesInGame = 0;
}