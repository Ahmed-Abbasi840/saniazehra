const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('resetBtn');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

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

function checkWinner() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      messageElement.textContent = `${gameBoard[a]} wins!`;
      disableAllButtons();
      gameOver = true;
      return;
    }
  }
  if (!gameBoard.includes('')) {
    messageElement.textContent = 'It\'s a draw!';
    disableAllButtons();
    gameOver = true;
  }
}

function handleCellClick(event) {
  const cellIndex = event.target.getAttribute('data-cell');
  
  if (gameBoard[cellIndex] || gameOver) return; // Ignore if cell is already filled or game is over

  gameBoard[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;
  
  checkWinner();

  if (!gameOver) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function disableAllButtons() {
  cells.forEach(cell => {
    cell.disabled = true;
  });
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.disabled = false;
  });
  messageElement.textContent = '';
  currentPlayer = 'X';
  gameOver = false;
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);