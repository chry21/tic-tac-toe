const Player = (sign) => {
    this.sign = sign;

    const getSign = () => sign;

    return {
        getSign,
    }
}

//displayControllerModule contains all the functions and variables relative to all the elements with a function incorporate(click the field, restart button, turn message...)

const displayControllerModule = (() => {

    const fields = document.querySelectorAll(".not-active");
    const message= document.getElementById("message");

    fields.forEach(field =>
        field.addEventListener("click", (e) => {
            if(!checkIfActive(e.target)) {
                modifyFieldstatus(e.target)
                gameControllerModule.playRound(e.target.dataset.index)
                gameBoardModule.drawSign(e.target);
            }
        })
    )   

    const checkIfActive = (target) => {
        return target.classList.contains("active")
    }

    const modifyFieldstatus = (target) => {
        const numField = target.dataset.index;
        fields[numField].classList.add("active")
    }

    const setMessage = (text) => {
        message.textContent = text;
    }

    const resetTurnMessage = () => {
        message.textContent = "Player X' s turn";
    }

    const resetFieldsClasses = () => {
        fields.forEach(field => { 
            field.classList.remove("active");
            field.innerHTML = "";
        })
    }

    const restartBtn = document.getElementById("restartBtn");
    restartBtn.addEventListener("click", () => {
        resetTurnMessage();
        resetFieldsClasses();
        gameBoardModule.resetGameBoard();
        gameControllerModule.resetRounds()
    })

    return {
        setMessage,
    }
})();

//gameBoardModule contains all the functions and variables related to the gameboard interface

const gameBoardModule = (() => {
    let _gameBoard = ["", "", "", "", "", "", "", "", ""];
    let _currentSign = "X";

    const updateGameboard = (index, sign) => {
        _gameBoard[index] = sign;
        modifyCurrentSign(sign)
    }

    const modifyCurrentSign = (sign) => {
       _currentSign = sign;
    }

    const getCurrentSign = () => {
        return _currentSign
    }
    
    const drawSign = (field)  => {
        field.innerHTML = _currentSign;
    }

    const checkWinner = () => {
        if(_gameBoard[0] === "X" && _gameBoard[1] === "X" && _gameBoard[2] === "X") {
            return true;
        }
        return false;
    }

    const resetGameBoard = () => {
        _gameBoard = ["", "", "", "", "", "", "", "", ""];

        _currentSign = "X";
    }

    return {
        updateGameboard,
        getCurrentSign,
        drawSign,
        checkWinner,
        resetGameBoard,
    }
})()

//gameControllerModule contains all the logic

const gameControllerModule = (() => {
    const playerX = Player("X");
    const playerO = Player("O");

    let round = 1;

    const playRound = (index) => {
        if(!isGameOver()) {
            if(round % 2 !== 0) {
                gameBoardModule.updateGameboard(index, playerX.getSign())
                displayControllerModule.setMessage("Player O' s turn");  
            }
            else {
                gameBoardModule.updateGameboard(index, playerO.getSign())
                displayControllerModule.setMessage("Player X' s turn");
            }
            ++round;
        }
    }

    const isGameOver = () => {
        if(round >= 9) {
            displayControllerModule.setMessage("It's a draw");
            return true;
        }
        else if(gameBoardModule.checkWinner()) {
            displayControllerModule.setMessage(`Player ${gameBoardModule.getCurrentSign()} is the winner!`);
            return true;
        }

        return false;
    }

    const resetRounds = () => {
        round = 1;
    }

    return {
        playRound,
        resetRounds,
    }
})()



