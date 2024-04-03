   document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const restartBtn = document.getElementById('restartBtn');
    const resultScreen = document.getElementById('resultScreen');
    const resultMessage = document.getElementById('resultMessage');
    const newGameBtn = document.getElementById('newGameBtn');
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    // Load audio elements
    const clickSound = document.getElementById('clickSound');
    const gameFinishSound = document.getElementById('gameFinishSound');

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();

        // Reset playback position and play click sound
        clickSound.currentTime = 0;
        clickSound.play();
    }

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < 8; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            resultMessage.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            resultScreen.style.display = 'block';
            gameFinishSound.play(); // Play game finish sound
            return;
        }

        let roundDraw = !gameState.includes('');
        if (roundDraw) {
            resultMessage.textContent = "It's a draw!";
            gameActive = false;
            resultScreen.style.display = 'block';
            gameFinishSound.play(); // Play game finish sound
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }

    function handleRestartGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        status.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = '');
        resultScreen.style.display = 'none';
    }

    function handleNewGame() {
        handleRestartGame();
        resultScreen.style.display = 'none';
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartBtn.addEventListener('click', handleRestartGame);
    newGameBtn.addEventListener('click', handleNewGame);

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    status.textContent = `Player ${currentPlayer}'s turn`;
});
