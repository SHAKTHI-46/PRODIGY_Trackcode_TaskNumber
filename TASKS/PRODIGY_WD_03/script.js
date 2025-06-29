const board = document.getElementById('board');
let cells = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;

function renderBoard() {
  board.innerHTML = '';
  cells.forEach((cell, i) => {
    const div = document.createElement('div');
    div.className = 'cell';
    div.textContent = cell;
    div.onclick = () => handleClick(i);
    board.appendChild(div);
  });
}

function handleClick(i) {
  if (cells[i] || gameOver) return;
  cells[i] = currentPlayer;

  if (checkWinner()) {
    document.getElementById('status').textContent = `${currentPlayer} wins!`;
    gameOver = true;
  } else if (!cells.includes(null)) {
    document.getElementById('status').textContent = `Draw!`;
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }

  renderBoard();
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => cells[index] === currentPlayer)
  );
}

// Initialize the board
renderBoard();
