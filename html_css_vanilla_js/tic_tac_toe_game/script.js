const board = document.querySelector('#board');
const cells = document.querySelectorAll('[data-cell]');
const resultOverlay = document.querySelector('#result-overlay');
const resultText = document.querySelector('#result-text');
const restartButton = document.querySelector("#restart-btn");
let isXsTurn;
let turnCount;
const winningConditions = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

function startGame() {
    cells.forEach(cell => cell.classList.remove('x', 'o'));
    resultOverlay.classList.remove('show');
    resultText.textContent = "";
    board.setAttribute('data-turn', 'x');
    isXsTurn = true;
    board.addEventListener('click', markCell)
    turnCount = 0;
}

function markCell(e) {
    const cell = e.target;

    // Check if cell is played
    if (cell.classList.contains('x') || cell.classList.contains('o'))
        return;

    // Mark Cell
    cell.classList.add(isXsTurn ? "x" : "o");

    // Update Turn Count
    turnCount++;

    // Check Win
    if (checkWin())
        endGame(false);

    // Check Draw
    if (turnCount === 9) {
        endGame(true)
    }

    // Change Turn
    isXsTurn = !isXsTurn;
    board.setAttribute('data-turn', isXsTurn ? "x" : "o")
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(cellIndex => {
            return cells[cellIndex - 1].classList.contains(isXsTurn ? "x" : "o")
        })
    })
}

function endGame(isDraw) {
    board.removeEventListener('click', markCell);
    if (isDraw)
        resultText.textContent = "Draw";
    else
        resultText.textContent = `${isXsTurn ? "X" : "O"} Wins`;
    resultOverlay.classList.add("show");
}

restartButton.addEventListener("click", startGame);

startGame();