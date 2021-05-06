import colors from "../colors/colors.js";

export default class TemplateArena {
  constructor(width, height, context, theme) {
    this.theme = theme;
    this.context = context;
    this.currentPiece = [];
    this.arena = this.makeArena(width, height);
  }
  draw = () => {
    let { context } = this;
    const currentArena = this.getCurrentArena();

    currentArena.forEach((row, y) => {
      row.forEach((value, x) => {
        context.fillStyle = colors[this.theme][value];
        context.fillRect(20 * x, 20 * y, 20, 20);
        context.strokeStyle = "#121212";
        context.strokeRect(20 * x, 20 * y, 20, 20);
      });
    });
  };

  getCurrentArena = () => {
    let currentArena = this.arena.map((row) => row.slice());
    this.renderPiece(currentArena);
    return currentArena;
  };

  renderPiece = (arena) => {
    let { currentPiece } = this;

    currentPiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          arena[y + currentPiece.y][x + currentPiece.x] = value;
        }
      });
    });
  };

  makeArena = (width, height) => {
    let arena = [];
    while (--height) {
      arena.push(new Array(width).fill(0));
    }
    return arena;
  };
}
