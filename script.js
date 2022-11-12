const Player = (sign) => {
    this.sign = sign;

    const getSign = () => sign;

    return {
        getSign,
    }
}

const displayControllerModule = (() => {

    const fields = document.getElementsByClassName("not-active");

    for(let i = 0; i < fields.length; i++) {
        if(!fields[i].classList.contains("active")) {
            fields[i].addEventListener("click", (e) => {
                gameControllerModule.playRound()
                gameBoardModule.drawSign(e.target, gameBoardModule.getCurrentSign());
                fields[i].classList.add("active");
            })
        }
    }

    const restartBtn = document.getElementById("restartBtn");
    restartBtn.addEventListener("click", () => gameBoardModule.reset())

    return {
        
    }
})();

const gameBoardModule = (() => {
    let _gameBoard = [];
    
    const updateGameboard = (sign) => {
        _gameBoard.push(sign);
    }

    const getCurrentSign = () => _gameBoard[_gameBoard.length -1];
    
    const drawSign = (field, sign)  => {
        field.innerHTML = sign;
    }
    const reset = () => {
        _gameBoard = [];
    }

    return {
        updateGameboard,
        drawSign,
        getCurrentSign,
        reset,
    }
})()

const gameControllerModule = (() => {
    const playerX = Player("X");
    const playerO = Player("O");

    let round = 1;
    let isGameOver = false;

    const playRound = () => {
        if(round % 2 !== 0) {
            gameBoardModule.updateGameboard(playerX.getSign())
            
        }
        else {
            gameBoardModule.updateGameboard(playerO.getSign())
        }
        ++round;
    }

    return {
        playRound,
        round,
    }
})()



