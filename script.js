const Player = (sign) => {
    this.sign = sign;

    const getSign = () => sign;

    return {
        getSign,
    }
}

//displayControllerModule contains all the functions and variables relative to all the elements with a function incorporate(click the field, restart button, turn message...)

const displayControllerModule = (() => {

    const fields = document.getElementsByClassName("not-active");
    const message = document.getElementById("playerTurn");

    for(let i = 0; i < fields.length; i++) {
        fields[i].addEventListener("click", (e) => {
            if(!checkIfActive(e.target)) {
                modifyFieldstatus(e.target)
                gameControllerModule.playRound(e.target.dataset.index)
                gameBoardModule.drawSign(e.target);
                changeTurnMessage()
            }
        })
    }

    const checkIfActive = (target) => {
        return target.classList.contains("active")
    }

    const modifyFieldstatus = (target) => {
        const numField = target.dataset.index;
        fields[numField].classList.add("active")
    }

    const changeTurnMessage = () => {
        const nextSign = gameBoardModule.getCurrentSign() === "X" ? "O" : "X";
        message.textContent = `Player ${nextSign}' s turn`;
    }

    const resetTurnMessage = () => {
        message.textContent  = "Player X' s turn"
    }

    const restartBtn = document.getElementById("restartBtn");
    restartBtn.addEventListener("click", () => {
        gameBoardModule.reset();
        resetTurnMessage();
        gameControllerModule.resetRounds()
    })

    return {
        fields,
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

    const reset = () => {
        _gameBoard = ["", "", "", "", "", "", "", "", ""];

        const fields = displayControllerModule.fields
        for(let i = 0; i < fields.length; i++) {
            fields[i].innerHTML = "";
            fields[i].classList.remove("active")
        }

        _currentSign = "X";
    }

    return {
        updateGameboard,
        getCurrentSign,
        drawSign,
        reset,
    }
})()

//gameControllerModule contains all the logic

const gameControllerModule = (() => {
    const playerX = Player("X");
    const playerO = Player("O");

    let round = 1;
    let isGameOver = false;

    const playRound = (index) => {
        console.log(round)
        if(round % 2 !== 0) {
            gameBoardModule.updateGameboard(index, playerX.getSign())
            
        }
        else {
            gameBoardModule.updateGameboard(index, playerO.getSign())
        }
        ++round;
    }

    const resetRounds = () => {
        round = 1;
    }

    return {
        playRound,
        resetRounds,
    }
})()



