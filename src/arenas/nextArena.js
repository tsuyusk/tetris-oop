import TemplateArena from "./templateArena.js";

export default class NextArena extends TemplateArena {
  constructor(width, height, nextContext, theme) {
    super(width, height, nextContext, theme);
    this.arenaPos = { width, height };
    this.addNextPieceListener();
  }
  addPiece = (Piece) => {
    let { arenaPos } = this;
    // ! Se não encaixar, muda aqui em baixo
    let nextPiece = new Piece(
      (arenaPos.width / 2 - 2) | 0,
      (arenaPos.height / 2 - 2) | 0
    );
    if (nextPiece) {
      this.currentPiece = nextPiece;
    }
  };

  addNextPieceListener = () => {
    document.addEventListener("nextPiece", (ev) => {
      let nextPiece = ev.detail.piece;
      if (nextPiece) {
        this.addPiece(nextPiece);
      }
    });
  };
}
