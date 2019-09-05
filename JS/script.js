let buttonTags = document.querySelectorAll('button');
let nextPlayerX = true;
setButtonActions();

let positions = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];

function setButtonActions() {
    for (let i = 0; i < buttonTags.length; i++) {
        buttonTags[i].addEventListener('click', function() {
            if (buttonTags[i].textContent != 'X' && buttonTags[i].textContent != 'O') {
                buttonTags[i].textContent = nextPlayerX ? 'X' : 'O';
                positions[parseInt(i / 3)][parseInt(i % 3)] = nextPlayerX ? 'X' : 'O'; 
                doActionIfWon(isWinner(nextPlayerX ? 'X' : 'O'), nextPlayerX ? 'X' : 'O');
            nextPlayerX = !nextPlayerX;
            }
           document.getElementById('console').textContent += ' ' + positions;
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
        alert(xOrY + ' won.');
            setTimeout(function() {
                for (let i = 0; i < buttonTags.length; i++) {
                    buttonTags[i].textContent = '-';
                }
                positions = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
            }, 2000);
    }
}