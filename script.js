"use strict";
//#region players
const player = (() => {
  //factories
  const _PLAYER_FACTORY = (name, playerSymbol) => {
    return { name, playerSymbol };
  };

  //init
  let playerX;
  let playerO;
  let currentPlayer = {};

  //querySelectors
  const _PLAYER_TEXT_INPUTS = document.querySelectorAll(".playerTextInput");

  const _START_GAME_BUTTON = document.querySelector("#startGameButton");

  //functions
  const _GET_NAME = (index) => {
    return _PLAYER_TEXT_INPUTS[index].value;
  };

  const _CREATE_PLAYERS = () => {
    playerX = _PLAYER_FACTORY(_GET_NAME(0), "x");
    playerO = _PLAYER_FACTORY(_GET_NAME(1), "o");
  };

  //event listeners
  _PLAYER_TEXT_INPUTS.forEach((textInput) => {
    textInput.addEventListener("change", () => {
      _CREATE_PLAYERS();
      currentPlayer = playerX;
    });
  });

  
_CREATE_PLAYERS();
 


  return {
    get currentPlayer() {
      return currentPlayer;
    },

    set currentPlayer(player) {
      currentPlayer = player;
    },

    get playerX() {
      return playerX;
    },

    get playerO() {
      return playerO;
    },
    set playerX(player) {
      playerX = player;
    },

    set playerO(player) {
      playerO = player;
    },
  };
})();

//#endregion players

//#region game
let game = (() => {
  //change all these player.play things into a get function

  const _GET_PLAYER_SYMBOL = () => player.currentPlayer.playerSymbol;
  const _TOGGLE_PLAYER = () => {
    if (player.currentPlayer === player.playerX) {
      player.currentPlayer = player.playerO;
    } else {
      player.currentPlayer = player.playerX;
    }
  };

  const _GAME_BOARD_SQUARES = document.querySelectorAll(".gameBoardSquare");

  _GAME_BOARD_SQUARES.forEach((square, squareNumber) =>
    square.addEventListener("click", () => {
      _RUN_GAME(squareNumber);
      _TIE_TEST();
      gameboard.RENDER();
    })
  );

  const _RUN_GAME = (squareNumber) => {
    if (gameboard.gameboardArray[squareNumber] === "") {
      gameboard.gameboardArray[squareNumber] = _GET_PLAYER_SYMBOL();
      _WIN_TEST(_GET_PLAYER_SYMBOL());

      _TOGGLE_PLAYER();
    }
  };

  const _WIN_TEST = (playerSymbol) => {
    if (
      (gameboard.gameboardArray[0] === playerSymbol &&
        gameboard.gameboardArray[1] === playerSymbol &&
        gameboard.gameboardArray[2] === playerSymbol) ||
      //#region rest of if statement logic
      //horizontal win
      (gameboard.gameboardArray[3] === playerSymbol &&
        gameboard.gameboardArray[4] === playerSymbol &&
        gameboard.gameboardArray[5] === playerSymbol) ||
      //horizontal win
      (gameboard.gameboardArray[6] === playerSymbol &&
        gameboard.gameboardArray[7] === playerSymbol &&
        gameboard.gameboardArray[8] === playerSymbol) ||
      //vertical win
      (gameboard.gameboardArray[0] === playerSymbol &&
        gameboard.gameboardArray[3] === playerSymbol &&
        gameboard.gameboardArray[6] === playerSymbol) ||
      //vertical win
      (gameboard.gameboardArray[1] === playerSymbol &&
        gameboard.gameboardArray[4] === playerSymbol &&
        gameboard.gameboardArray[7] === playerSymbol) ||
      //vertical win
      (gameboard.gameboardArray[2] === playerSymbol &&
        gameboard.gameboardArray[5] === playerSymbol &&
        gameboard.gameboardArray[8] === playerSymbol) ||
      //digonal win
      (gameboard.gameboardArray[0] === playerSymbol &&
        gameboard.gameboardArray[4] === playerSymbol &&
        gameboard.gameboardArray[8] === playerSymbol) ||
      //vertical win
      (gameboard.gameboardArray[2] === playerSymbol &&
        gameboard.gameboardArray[4] === playerSymbol &&
        gameboard.gameboardArray[6] === playerSymbol)
      //#endregion
    ) {
      gameboard.DISPLAY_RESULT(player.currentPlayer.name + " wins.");
    }
  };

  const _TIE_TEST = () => {
    if (gameboard.gameboardArray.some((item) => item === "")) {
      return;
    }
    gameboard.DISPLAY_RESULT("It's a tie.");
  };
})();

//#endregion game

//#region gameboard
const gameboard = (() => {
  //init
  let gameboardArray = ["", "", "", "", "", "", "", "", ""];

  //querySelectors
  const _PLAYER_TEXT_INPUTS = document.querySelectorAll(".playerTextInput");

  const _GAME_BOARD_SQUARES = document.querySelectorAll(".gameBoardSquare");

  const _GAME_BOARD_CONTAINER = document.querySelector("#gameBoardContainer");

  const _START_GAME_BUTTON = document.querySelector("#startGameButton");

  const _TOP_CONTAINER_1 = document.querySelector("#topContainer1");

  const _NAME_BOTH_PLAYER_POP_UP = document.querySelector(
    "#nameBothPlayerPopUp"
  );

  const _NAME_BOTH_PLAYER_OK_BUTTON = document.querySelector(
    "#nameBothPlayerOkButton"
  );

  const _RESULT_POP_UP = document.querySelector("#resultPopUp");

  const _RESULT_MESSAGE = document.querySelector("#resultMessage");

  const _NEW_GAME_BUTTON = document.querySelector("#newGameButton");

  //eventListeners
  _START_GAME_BUTTON.addEventListener("click", () => {
    if (_THERE_ARE_2_PLAYER_NAMES()) {
      _TOGGLE_DISPLAY(_GAME_BOARD_CONTAINER);
      _TOGGLE_DISPLAY(_TOP_CONTAINER_1);
    } else {
      _TOGGLE_DISPLAY(_NAME_BOTH_PLAYER_POP_UP);
      _TOGGLE_DISPLAY(_TOP_CONTAINER_1);
    }
  });

  _NAME_BOTH_PLAYER_OK_BUTTON.addEventListener("click", () => {
    _TOGGLE_DISPLAY(_NAME_BOTH_PLAYER_POP_UP);
    _TOGGLE_DISPLAY(_TOP_CONTAINER_1);
  });

  _NEW_GAME_BUTTON.addEventListener("click", () => {
    _CLEAR_ARRAY();
    _CLEAR_PLAYERS();
    _TOGGLE_DISPLAY(_TOP_CONTAINER_1);
    _TOGGLE_DISPLAY(_GAME_BOARD_CONTAINER);
    _TOGGLE_DISPLAY(_RESULT_POP_UP);
    _CLEAR_PLAYER_TEXT_INPUTS();
    RENDER();
    
  });

  //functions

  const _CLEAR_PLAYER_TEXT_INPUTS = () => {
    _PLAYER_TEXT_INPUTS.forEach((item) => {
      item.value = "";
    });
  };

  const DISPLAY_RESULT = (message) => {
    _RESULT_MESSAGE.textContent = message;
    _TOGGLE_DISPLAY(_RESULT_POP_UP);
    _TOGGLE_BLUR_ELEMENT(_GAME_BOARD_CONTAINER);
  };

  const _THERE_ARE_2_PLAYER_NAMES = () => {
    return player.playerX.name !== "" && player.playerO.name !== "";
  };

  const RENDER = () => {
    _GAME_BOARD_SQUARES.forEach((item, index) => {
      item.textContent = gameboardArray[index];
    });
  };

  const _TOGGLE_DISPLAY = (element) => {
    element.classList.toggle("displayFlex");
    element.classList.toggle("displayNone");
  };

  const _CLEAR_ARRAY = () => {
    gameboardArray = ["", "", "", "", "", "", "", "", ""];
  };
  const _CLEAR_PLAYERS = () => {
    player.PlayerX = "";
    player.playerO = "";
  };

  return {
    RENDER,
    DISPLAY_RESULT,
    get gameboardArray() {
      return gameboardArray;
    },
  };
})();
//#endregion gameboard
