const cells = document.querySelectorAll('.game-cell');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');
let xIsNext = true;

cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true })
});

resetButton.addEventListener('click', resetGame)

function handleClick(e) {
  const cell = e.target;
  const currentSymbol = xIsNext ? 'X' : 'O';
  placeSymbol(cell, currentSymbol);

  if (checkWin(currentSymbol)) {
    gameStatus.textContent = `${currentSymbol} Wins!`;
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
  } else if (isBoardFull()) {
    gameStatus.textContent = "It's a Draw!";
  } else {
    xIsNext = !xIsNext;
  }
}

function placeSymbol(cell, symbol) {
  cell.textContent = symbol;
  cell.setAttribute('aria-label', `cell filled with ${symbol}`)
}

function checkWin(symbol) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombinations.some(combination =>
    combination.every(index => cells[index].textContent === symbol));
}

function isBoardFull() {
  return Array.from(cells).every(cell => cell.textContent !== '');
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
    cell.setAttribute('aria-label', `cell ${Array.from(cells).indexOf(cell) + 1}`);
  });
  gameStatus.textContent = "Rematch!";
  xIsNext = true;
}

function handleClick(e) {
  const cell = e.target;
  const currentSymbol = xIsNext ? 'X' : 'O';
  
  placeSymbol(cell, currentSymbol);

  if (checkWin(currentSymbol)) {
    gameStatus.textContent = `${currentSymbol} Wins!`;
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
  } else if (isBoardFull()) {
    gameStatus.textContent = "It's a Draw!";
  } else {
    xIsNext = !xIsNext;
    if (!xIsNext) {
      makeAIMove();
    }
  }
}

function makeAIMove() {
  // The AI will select a random unselected cell
  const unselectedCells = Array.from(cells).filter(cell => cell.textContent === '');
  const randomIndex = Math.floor(Math.random() * unselectedCells.length);
  
  if (unselectedCells.length > 0) {
    xIsNext = !xIsNext;
    placeSymbol(unselectedCells[randomIndex], 'O');
    unselectedCells[randomIndex].removeEventListener('click', handleClick);

    if (checkWin('O')) {
      gameStatus.textContent = "O Wins!";
      cells.forEach(cell => cell.removeEventListener('click', handleClick));
    } else if (isBoardFull()) {
      gameStatus.textContent = "It's a Draw!";
    }
  }
}
