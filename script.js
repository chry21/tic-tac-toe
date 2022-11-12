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
        fields[i].addEventListener("click", (e) => {
            if(!checkIfActive(e.target)) {
                modifyFieldstatus(e.target)
                gameControllerModule.playRound()
                gameBoardModule.drawSign(e.target);
            }
        })
    }

    const checkIfActive = (target) => {
        return target.classList.contains("active")
    }

    const modifyFieldstatus = (target) => {
        const numField = target.dataset.value;
        fields[numField].classList.add("active")
    }

    const restartBtn = document.getElementById("restartBtn");
    restartBtn.addEventListener("click", () => gameBoardModule.reset())

    return {
        fields,
    }
})();



const gameBoardModule = (() => {
    let _gameBoard = [];
    
    const updateGameboard = (sign) => {
        _gameBoard.push(sign);
    }

    const getCurrentSign = () => _gameBoard[_gameBoard.length -1];

    const drawSign = (field)  => {
        field.innerHTML = getCurrentSign();
    }

    const reset = () => {
        _gameBoard = [];
        const fields = displayControllerModule.fields
        for(let i = 0; i < fields.length; i++) {
            fields[i].innerHTML = "";
            fields[i].classList.remove("active")
        }
    }

    return {
        updateGameboard,
        getCurrentSign,
        drawSign,
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



