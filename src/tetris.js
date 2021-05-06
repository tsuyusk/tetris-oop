import createKeyboardListener from "./keyboard/keyboardListener.js";
import MainArena from "./arenas/mainArena.js";
import NextArena from "./arenas/nextArena.js";
import colors from "./colors/colors.js";

const makeTetris = (
  { mainContext, mWidth, mHeight },
  { nextContext, nWidth, nHeight },
  theme,
  pointsElement
) => {
  let points = 0;
  let clearedRows = 1;

  pointsElement.innerText = points;

  let nextArena = new NextArena(nWidth, nHeight, nextContext, theme);
  let mainArena = new MainArena(mWidth, mHeight, mainContext, theme);
  let renderLoop;
  createKeyboardListener();
  renderLoop = setInterval(() => {
    mainArena.draw();
    nextArena.draw();
  });

  document.addEventListener("clearedRow", () => {
    clearedRows *= 2;
    points += clearedRows * 10;
    pointsElement.innerText = points;
  });

  document.addEventListener("GameOver", () => {
    clearInterval(renderLoop);
    mainContext.fillStyle = colors[theme][0];
    mainContext.fillRect(0, 0, 400, 400);
    mainContext.fillStyle = "#fff";
    mainContext.fillText("Game over, press F5 to restart", mWidth / 2, mHeight / 2);

    nextContext.fillStyle = colors[theme][0];
    nextContext.fillRect(0, 0, 400, 400);
  });
};

export default makeTetris;
