const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
let currentPlayer = 'X';
let board = Array(16).fill(null); // Adjusted for 16 cells
let xWins = 0;
let oWins = 0;
let draws = 0;

const winningCombinations = [
    // Horizontal wins
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    // Vertical wins
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    // Diagonal wins
    [0, 5, 10, 15],
    [3, 6, 9, 12]
];

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c, d] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c] && board[a] === board[d]) {
            return board[a];
        }
    }
    return board.includes(null) ? null : 'Tie';
}

function handleClick(event) {
    const index = event.target.dataset.index;
    if (board[index] || checkWinner()) return;

    board[index] = currentPlayer;
    event.target.style.backgroundImage = currentPlayer === 'X' ? "url('nail.png')" : "url('toe.png')";

    const winner = checkWinner();
    if (winner) {
        if (winner === 'Tie') {
            alert("It's a tie!");
            updateDraws();
        } else {
            alert(`${winner} wins!`);
            updateScore(winner);
        }
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function updateScore(winner) {
    if (winner === 'X') {
        xWins += 1;
        document.getElementById('x-score').textContent = xWins;
    } else if (winner === 'O') {
        oWins += 1;
        document.getElementById('o-score').textContent = oWins;
    }
}

function updateDraws() {
    draws += 1;
    document.getElementById('draw-score').textContent = draws;
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => cell.style.backgroundImage = ''); // Clear the images
    currentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
