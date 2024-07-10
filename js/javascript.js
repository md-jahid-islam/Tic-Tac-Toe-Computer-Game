document.addEventListener('DOMContentLoaded', () => {
    const X_CLASS = 'x';
    const O_CLASS = 'o';
    const cellElements = document.querySelectorAll('[data-cell]');
    const board = document.querySelector('.board');
    const restartButton = document.getElementById('restartButton');
    const messageElement = document.getElementById('message');
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let oTurn;

    startGame();

    restartButton.addEventListener('click', startGame);

    function startGame() {
        oTurn = false;
        cellElements.forEach(cell => {
            cell.classList.remove(X_CLASS);
            cell.classList.remove(O_CLASS);
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick, { once: true });
        });
        setMessage("Player's turn (X)");
    }

    function handleClick(e) {
        const cell = e.target;
        const currentClass = X_CLASS;
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
            computerMove();
        }
    }

    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass);
    }

    function swapTurns() {
        oTurn = !oTurn;
    }

    function computerMove() {
        const availableCells = Array.from(cellElements).filter(cell => {
            return !cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS);
        });

        if (availableCells.length === 0) return;

        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const cell = availableCells[randomIndex];
        placeMark(cell, O_CLASS);
        if (checkWin(O_CLASS)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
            setMessage("Player's turn (X)");
        }
    }

    function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(currentClass);
            });
        });
    }

    function endGame(draw) {
        if (draw) {
            setMessage("Draw!");
        } else {
            setMessage(`${oTurn ? "Computer (O)" : "Player (X)"} Wins!`);
        }
        cellElements.forEach(cell => cell.removeEventListener('click', handleClick));
    }

    function isDraw() {
        return Array.from(cellElements).every(cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
        });
    }

    function setMessage(message) {
        messageElement.textContent = message;
    }
});
