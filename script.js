const Player = (sign) => {
    this.sign = sign;

    const getSign = () => sign;

    return {
        getSign,
    }
}

//displayControllerModule contains all the functions and variables related to all the elements with a function incorporate(click the field, restart button, turn message...)

const displayControllerModule = (() => {

    const fields = document.querySelectorAll(".not-active");
    const message= document.getElementById("message");
    const restartBtn = document.getElementById("restartBtn");

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
        message.textContent = "Player X's turn";
    }

    const resetFieldsClasses = () => {
        fields.forEach(field => { 
            field.classList.remove("active");
            field.innerHTML = "";
        })
    }

    restartBtn.addEventListener("click", () => {
       restartAll();
    })

    const restartAll = () => {
        resetTurnMessage();
        resetFieldsClasses();
        gameBoardModule.resetGameBoard();
        gameControllerModule.resetRounds()
    }
  
    return {
        setMessage,
    }
})();

//gameBoardModule contains all the functions and variables related to the gameboard

const gameBoardModule = (() => {
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let _currentSign = "X";

    const updateGameboard = (fieldIndex, sign) => {
        gameBoard[fieldIndex] = sign;
        _currentSign = sign;
        console.log(gameBoard)
    }
    
    const drawSign = (field)  => {
        field.innerHTML = _currentSign;
    }

    const resetGameBoard = () => {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        _currentSign = "X";
    }

    return {
        gameBoard,
        updateGameboard,
        drawSign,
        resetGameBoard,
    }
})()

//gameControllerModule contains all the logic

const gameControllerModule = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    let round = 1;

    const playRound = (fieldIndex) => {
        gameBoardModule.updateGameboard(fieldIndex, getCurrentSign());

        if(checkWinner()) {
            displayControllerModule.setMessage(`Player ${getCurrentSign()} is the winner!`)
        }
        else if(round === 9) {
            displayControllerModule.setMessage("It's a draw!");
        }
        else {
            displayControllerModule.setMessage(`Player ${getCurrentSign()}'s turn`)
            round++;
        }
        
    }

    const getCurrentSign = () => {
        return (round % 2 !== 0) ? playerX.getSign() : playerO.getSign();
    }

    const checkWinner = () => {
        if(gameBoardModule.gameBoard [0] === "X" && gameBoardModule.gameBoard [1] === "X" && gameBoardModule.gameBoard [2] === "X") {
            return true;
        }
        return false;
    }

    const resetRounds = () => {
        round = 1;
    }

    return {
        playRound,
        getCurrentSign,
        resetRounds,
        
    }
})()



