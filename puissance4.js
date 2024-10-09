document.getElementById('game-container').innerHTML = `
    <h2>Puissance 4</h2>
    <div id="game-board"></div>
    <p id="status"></p>
`;

const rows = 6;
const cols = 7;
let currentPlayer = 'Red';
let board = Array.from({ length: rows }, () => Array(cols).fill(null));

// Crée le plateau de jeu
function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleMove);
            gameBoard.appendChild(cell);
        }
    }
}

function handleMove(event) {
    const col = event.target.dataset.col;
    const emptyRow = findEmptyRow(col);

    if (emptyRow !== -1) {
        board[emptyRow][col] = currentPlayer;
        updateBoard();
        if (checkWin(emptyRow, col)) {
            document.getElementById('status').textContent = `${currentPlayer} gagne !`;
            disableBoard();
        } else if (board.flat().every(cell => cell)) {
            document.getElementById('status').textContent = 'Match nul !';
        } else {
            currentPlayer = currentPlayer === 'Red' ? 'Yellow' : 'Red';
            document.getElementById('status').textContent = `Tour de ${currentPlayer}`;
        }
    }
}

function findEmptyRow(col) {
    for (let row = rows - 1; row >= 0; row--) {
        if (!board[row][col]) {
            return row;
        }
    }
    return -1;
}

function updateBoard() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
            if (board[row][col] === 'Red') {
                cell.style.backgroundColor = 'red';
            } else if (board[row][col] === 'Yellow') {
                cell.style.backgroundColor = 'yellow';
            } else {
                cell.style.backgroundColor = 'white';
            }
        }
    }
}

function checkWin(row, col) {
    return (
        checkDirection(row, col, 1, 0) ||  // Horizontal
        checkDirection(row, col, 0, 1) ||  // Vertical
        checkDirection(row, col, 1, 1) ||  // Diagonal (/)
        checkDirection(row, col, 1, -1)    // Diagonal (\)
    );
}

function checkDirection(row, col, rowDir, colDir) {
    let count = 1;

    count += countTokens(row, col, rowDir, colDir);
    count += countTokens(row, col, -rowDir, -colDir);

    return count >= 4;
}

function countTokens(row, col, rowDir, colDir) {
    let count = 0;
    let r = row + rowDir;
    let c = col + colDir;

    while (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === currentPlayer) {
        count++;
        r += rowDir;
        c += colDir;
    }

    return count;
}

function disableBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.removeEventListener('click', handleMove));
}

// Initialisation du plateau de jeu
createBoard();
document.getElementById('status').textContent = `Tour de ${currentPlayer}`;
