// Constants for board dimensions
const rows = 5;
const cols = 5;

// Generate the game board
const board = document.getElementById('game');
const lights = [];
let hintCounter = 0; // Counter to track the number of hints used

// Initialize the board
function createBoard() {
    board.innerHTML = ""; // Clear previous board
    for (let r = 0; r < rows; r++) {
        lights[r] = [];
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('click', () => toggleLight(r, c));
            board.appendChild(cell);
            lights[r][c] = false; // All lights start off
        }
    }
}

// Toggle a single light and its neighbors
function toggleLight(r, c) {
    toggle(r, c); // Toggle the clicked light
    toggle(r - 1, c); // Above
    toggle(r + 1, c); // Below
    toggle(r, c - 1); // Left
    toggle(r, c + 1); // Right

    if (checkWin()) {
        setTimeout(() => {
            alert('You win!');
            resetBoard();
        }, 100);
    }
}

// Toggle the light at a specific position
function toggle(r, c) {
    if (r >= 0 && r < rows && c >= 0 && c < cols) {
        const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
        lights[r][c] = !lights[r][c];
        cell.classList.toggle('is-off');
    }
}

// Randomize the board with a solvable configuration
function randomizeBoard() {
    for (let i = 0; i < 7; i++) { // Reduced the number of random toggles
        const randomRow = Math.floor(Math.random() * rows);
        const randomCol = Math.floor(Math.random() * cols);
        toggleLight(randomRow, randomCol); // Simulate random clicks
    }
}

// Check if all lights are off
function checkWin() {
    return lights.every(row => row.every(light => !light));
}

// Reset the board for a new game
function resetBoard() {
    lights.forEach((row, r) => {
        row.forEach((_, c) => {
            const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
            cell.classList.remove('is-off');
            lights[r][c] = false;
        });
    });
    hintCounter = 0; // Reset hint counter
    randomizeBoard();
}

// Provide a hint by highlighting a random lit square
function provideHint() {
    const litSquares = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (lights[r][c]) {
                litSquares.push({ row: r, col: c });
            }
        }
    }

    // Highlight a random lit square if any are found
    if (litSquares.length > 0) {
        const randomIndex = Math.floor(Math.random() * litSquares.length);
        const { row, col } = litSquares[randomIndex];
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cell.classList.add('hint');
        setTimeout(() => {
            // Toggle off the light after hint
            toggleLight(row, col); 
            cell.classList.remove('hint'); // Remove hint class after 1 second
        }, 1000); // Highlight for 1 second

        // Increment the hint counter and check if max hints are reached
        hintCounter++;
        if (hintCounter >= 10) {
            autoSolve();
        }
    } else {
        alert('All lights are already off! You are close to winning!');
    }
}

// Automatically solve the puzzle
function autoSolve() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (lights[r][c]) {
                toggleLight(r, c); // Toggle all lit squares
            }
        }
    }
    alert('You Loose the game will be restarted after 10 hints!');
    resetBoard();
}

// Add button functionality
document.getElementById('refreshButton').addEventListener('click', resetBoard);
document.getElementById('hintButton').addEventListener('click', provideHint);

// Initialize the game
createBoard();
randomizeBoard();
