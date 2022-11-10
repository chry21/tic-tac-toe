const Player = (sign) => {
    this.sign = sign;

    const getSign = () => sign;

    return {
        getSign,
    }
}

const displayControllerModule = (() => {

    const fields = document.getElementsByClassName("field");
    for(field of fields) {
        field.addEventListener("click", () => {
            gameControllerModule.playRound();    
        })
    }

    const restartBtn = document.getElementById("restartBtn");
    restartBtn.addEventListener("click", () => gameBoardModule.reset())
})();

const gameBoardModule = (() => {
    let _gameBoard = [];
    
    const draw = (sign) => {
        _gameBoard.push(sign);
    }
    
    const reset = () => {
        _gameBoard = [];
    }

    return {
        draw,
        reset,
    }
})()

const gameControllerModule = (() => {
    const playerX = Player("X");
    const playerO = Player("O");

    let _round = 1;
    let isGameOver = false;

    const playRound = () => {
        if(_round % 2 !== 0) {
            gameBoardModule.draw(playerX.getSign())
            
        }
        else {
            gameBoardModule.draw(playerO.getSign())
        }
        ++_round;
    }

    return {
        playRound,
    }
})()



