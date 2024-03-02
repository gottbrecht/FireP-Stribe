//Player1 er mig
//Player 2 computeren ()

const model = [ //spilleplade
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],

];

const boardElement = document.getElementById('game-board');

function renderBoard() {  //opretter html div-tags for hver celle i spillepladen og tilføjer klasser baseret på spillerens mønter(player1 eller player2).  
    boardElement.innerHTML = '';  

    for (let row = 0; row < model.length; row++) {
        for(let column = 0; column < model[row].length; column++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            if(model[row][column] === 1) {
                cell.classList.add('player1');
            }else if (model[row][column] === 2) {
                cell.classList.add('player2');
            }

            cell.addEventListener('click', () => handleMove(column));
            boardElement.appendChild(cell); //Tilføjes click eventhandler, der kalder 'handleMove' medpågældene kolonne, når cellen klikkes
        }
    }
}

function handleMove(column) { //spillerens træk 
    const row = findLowestEmptyRow(column);

    if(row !== -1) {
        model[row][column] = 1; //player1's mønt
        renderBoard();

        if(checkForWinner(row, column, 1)) {
            alert('Player1 wins!');
            resetGame();
            return;
        }

        computerMove();
    }
}

function computerMove() { //computerens træk
    const column = Math.floor(Math.random() * 7); //vælger tilfældig kolonne, finder laveste tomme række og placerer mønt
    const row = findLowestEmptyRow(column);

    if (row !== -1) {
        model[row][column] = 2; //player two
        renderBoard();

    if(checkForwinner(row, column, 2)) {
        alert('Player2 wins!');
        resetGame();
        return;
    }
}
}


function findLowestEmptyRow(column) { //finder laveste tomme række i en given kolonne. Hvis kolonnen er fuld, returnerer den -1
    for(let row = model.length - 1; row >= 0; row--) {
        if(model[row][column] === 0) {
            return row;
        }
    }
    return -1; //column is full
}

function checkForWinner(row, column, player) { //tjekker for en vinder
  const horizontalCount = countInDirection(row, column, player, 0, 1) + countInDirection(row, column, player, 0, -1) - 1;
  const verticalCount = countInDirection(row, column, player, 1, 0) + countInDirection(row, column, player, -1, 0) - 1;
  const diagonal1Count = countInDirection(row, column, player, 1, 1) + countInDirection(row, column, player, -1, -1) - 1;
  const diagonal2Count = countInDirection(row, column, player, 1, -1) + countInDirection(row, column, player, -1, 1) - 1;

  
  if (horizontalCount >= 4 || verticalCount >= 4 || diagonal1Count >= 4 || diagonal2Count >= 4) {
    return true;
  }

    return false;
}

function countInDirection(row, column, player, rowIncrement, colIncrement) {
    let count = 0;
    while (
      row >= 0 && row < model.length &&
      column >= 0 && column < model[row].length &&
      model[row][column] === player
    ) {
      count++;
      row += rowIncrement;
      column += colIncrement;
    }
    return count;
  }



function resetGame() {
    for (let row = 0; row < model.length; row++) {
      for (let column = 0; column < model[row].length; column++) {
        model[row][column] = 0;
      }
    }
    renderBoard();
  }
  
  
  renderBoard();

