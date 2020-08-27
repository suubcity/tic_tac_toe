"use strict";
//#region players
const playerFactory = (name, playerSymbol) => {
  //assign a prototype function that returns the player symbol.
  return { name, playerSymbol };
};

let player1 = playerFactory("Martyn", "x");

let player2 = playerFactory("Dave", "o");
//#endregion players

//#region gameboard
let gameboard = (() => {
  let _gameboardArray = ["", "", "", "", "", "", "", "", ""];

  const _GAME_BOARD_SQUARES = document.querySelectorAll(".gameBoardSquare");

  _GAME_BOARD_SQUARES.forEach((square, squareNumber) =>
    square.addEventListener("click", () => {
      _update_gameboardArray(squareNumber);
      
      RENDER();
    })
  );

  const _update_gameboardArray = (squareNumber) => {
    if (_gameboardArray[squareNumber] === "") {
      _gameboardArray[squareNumber] = game.GET_PLAYER()["playerSymbol"];
      game.TOGGLE_PLAYER();
    }
  };

  const RENDER = () => {
    _GAME_BOARD_SQUARES.forEach((item, index) => {
      item.textContent = _gameboardArray[index];
    });
  };
  return { RENDER, _gameboardArray };
})();
//#endregion gameboard

//#region game
let game = (() => {
  let _currentPlayer = player1;
  const GET_PLAYER = () => _currentPlayer;
  const TOGGLE_PLAYER = () => {
    if (_currentPlayer === player1) {
      _currentPlayer = player2;
    } else {
      _currentPlayer = player1;
    }
  };
  return { TOGGLE_PLAYER, GET_PLAYER };
})();

//#endregion game



// gameboard.RENDER();



let playerTest = player1;
