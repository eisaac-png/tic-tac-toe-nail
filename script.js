const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const xWinsElement = document.getElementById('x-wins');
const oWinsElement = document.getElementById('o-wins');
const drawsElement = document.getElementById('draws');
let currentPlayer = 'X';
let board = Array(16).fill(null); // Updated to 16 for 4x4 grid
let xWins = 0;
let oWins = 0;
let draws = 0;

const winningCombinations = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
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
    event.target.style.backgroundImage = `url(${currentPlayer === 'X' ? 'nail.png' : 'toe.png'})`;

    const winner = checkWinner();
    if (winner) {
        if (winner === 'Tie') {
            alert("It's a tie!");
            draws++;
            drawsElement.textContent = draws;
        } else {
            alert(`${winner} wins!`);
            if (winner === 'X') {
                xWins++;
                xWinsElement.textContent = xWins;
            } else {
                oWins++;
                oWinsElement.textContent = oWins;
            }
        }
        board.fill(null);
        cells.forEach(cell => cell.style.backgroundImage = '');
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => cell.style.backgroundImage = '');
    currentPlayer = 'X';
}

cells.forEach((cell, index) => cell.dataset.index = index);
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
