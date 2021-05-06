import makeArena from "./src/tetris.js";

const mainArena = document.querySelector(".mainArena");
const mainArenaCtx = mainArena.getContext("2d");

const nextArena = document.querySelector(".nextArena");
const nextArenaCtx = nextArena.getContext("2d");

const selector = document.querySelector(".themeSelect");

const pointsElement = document.querySelector(".points");

const startButton = document.querySelector(".start");

const start = () => {
  let userChoice = selector.options[selector.selectedIndex].value;
  startButton.removeEventListener("click", start);
  document.querySelector(".options").style.display = "none";
  makeArena(
    { mainContext: mainArenaCtx, mWidth: 10, mHeight: 19 },
    { nextContext: nextArenaCtx, nWidth: 8, nHeight: 9 },
    userChoice,
    pointsElement
  );
};

const waitToStart = () => {
  mainArenaCtx.fillStyle = "#000";
  nextArenaCtx.fillStyle = "#000";
  mainArenaCtx.fillRect(0, 0, 400, 400);
  nextArenaCtx.fillRect(0, 0, 400, 400);
  startButton.addEventListener("click", start);
};

waitToStart();
