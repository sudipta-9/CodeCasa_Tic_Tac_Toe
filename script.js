document.addEventListener('DOMContentLoaded', function () {
  const boardElement = document.getElementById('board');
  const playerTurnElement = document.getElementById('player-turn');
  const resultModal = document.getElementById('result-modal');
  const resultTextElement = document.getElementById('result-text');
  let board = create_board();
  let player = 1;

  function create_board() {
    const board = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        row.push(0);
      }
      board.push(row);
    }
    return board;
  }

  function print_board() {
    boardElement.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.textContent = board[i][j] === 1 ? 'X' : (board[i][j] === 2 ? 'O' : '');
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
      }
    }
  }

  function handleCellClick() {
    const row = parseInt(this.dataset.row);
    const col = parseInt(this.dataset.col);
    const cell = row * 3 + col;

    if (!is_valid_move(cell)) {
      alert("Invalid move!");
      return;
    }

    make_move(cell, player);

    const winner = game_over();
    if (winner !== 0) {
      print_board();
      resultTextElement.textContent = `Player ${winner} wins!`;
      resultModal.style.display = 'flex';
    } else if (winner === -1) {
      print_board();
      resultTextElement.textContent = "The game is a draw!";
      resultModal.style.display = 'flex';
    } else {
      player = 3 - player; // Switch players
      print_board();
      playerTurnElement.textContent = `Player ${player}'s Turn`;
    }
  }

  function is_valid_move(cell) {
    return board[Math.floor(cell / 3)][cell % 3] === 0;
  }

  function make_move(cell, currentPlayer) {
    board[Math.floor(cell / 3)][cell % 3] = currentPlayer;
  }

  function check_winner(currentPlayer) {
    // (Add your Python check_winner logic here)
  }

  function game_over() {
    for (const currentPlayer of [1, 2]) {
      if (check_winner(currentPlayer)) {
        return currentPlayer;
      }
    }

    if (board.every(row => row.every(cell => cell !== 0))) {
      return -1; // Draw
    }

    return 0; // Game not over yet
  }

  function restartGame() {
    board = create_board();
    player = 1;
    resultModal.style.display = 'none';
    playerTurnElement.textContent = `Player ${player}'s Turn`;
    print_board();
  }

  print_board();
});
