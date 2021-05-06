import TemplateArena from "./templateArena.js";
import {
  PieceI,
  PieceJ,
  PieceL,
  PieceO,
  PieceS,
  PieceT,
  PieceZ,
} from "../pieces/pieces.js";

export default class MainArena extends TemplateArena {
  constructor(width, height, context, theme) {
    super(width, height, context, theme);
    this.width = width;
    this.bag = [];
    this.currentPiece = [];
    this.restart();
    this.autoDropLoop = setInterval(() => {
      this.move("ArrowDown");
    }, 1000);
    this.addListeners();
  }

  restart = () => {
    this.shuffleBag();
    this.getNewPiece();
  };

  shuffleBag = () => {
    let initialBag = [PieceS, PieceZ, PieceJ, PieceL, PieceT, PieceO, PieceI];
    const newRandomBag = () => initialBag.sort(() => Math.random() - 0.5);
    this.bag = newRandomBag();
  };

  getNewPiece = () => {
    if (this.bag.length === 0) {
      this.shuffleBag();
    }

    let currentPiece = this.bag.shift();
    this.currentPiece = new currentPiece(Math.floor([this.width / 2] - 1), 0);

    if (this.checkCollision()) {
      clearInterval(this.autoDropLoop);
      let event = new Event("GameOver");
      document.dispatchEvent(event);
    }
    let nextPieceEvent = new CustomEvent("nextPiece", {
      detail: { piece: this.bag[0] },
    });

    document.dispatchEvent(nextPieceEvent);
  };

  onCollision = () => {
    this.currentPiece.y--;
    this.arena = this.getCurrentArena();
    this.checkLines();
    this.getNewPiece();
  };

  move = (key) => {
    let moves = {
      ArrowUp: () => {
        this.currentPiece.rotateRight();
        if (this.checkCollision()) {
          this.currentPiece.rotateLeft();
        }
      },
      ArrowDown: () => {
        this.currentPiece.y++;
        if (this.checkCollision()) {
          this.onCollision();
        }
      },
      ArrowLeft: () => {
        this.currentPiece.x--;
        if (this.checkCollision()) {
          this.currentPiece.x++;
        }
      },
      ArrowRight: () => {
        this.currentPiece.x++;
        if (this.checkCollision()) {
          this.currentPiece.x--;
        }
      },
      " ": () => {
        while (true) {
          this.currentPiece.y++;
          if (this.checkCollision()) {
            this.onCollision();
            return false;
          }
        }
      },
    };
    let currentMove = moves[key];
    if (currentMove) {
      currentMove();
    }
  };

  checkLines = () => {
    const { arena } = this;
    arena.forEach((row, y) => {
      let valuesSum = 0;
      row.forEach((value) => {
        if (value !== 0) {
          valuesSum += 1;
          if (valuesSum === 10) {
            arena.splice(y, 1);
            arena.unshift(new Array(this.width).fill(0));

            let event = new Event("clearedRow");
            document.dispatchEvent(event);
          }
        }
      });
    });
  };

  checkCollision = () => {
    const { currentPiece, arena } = this;

    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (
          currentPiece.shape[y][x] !== 0 &&
          (arena[y + currentPiece.y] &&
            arena[y + currentPiece.y][x + currentPiece.x]) !== 0
        ) {
          return true;
        }
      }
    }
    return false;
  };

  addListeners = () => {
    document.addEventListener("keyPressed", (event) => {
      this.move(event.detail.key);
    });
  };
}
