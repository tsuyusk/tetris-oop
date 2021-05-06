import TemplatePiece from "./templatePiece.js";

export class PieceS extends TemplatePiece {
  constructor(x, y) {
    super(x, y);
    this.shape = [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ];
  }
}

export class PieceZ extends TemplatePiece {
  constructor(x, y) {
    super(x, y);
    this.shape = [
      [2, 2, 0],
      [0, 2, 2],
      [0, 0, 0],
    ];
  }
}

export class PieceL extends TemplatePiece {
  constructor(x, y) {
    super(x, y);
    this.shape = [
      [3, 0, 0],
      [3, 0, 0],
      [3, 3, 0],
    ];
  }
}

export class PieceJ extends TemplatePiece {
  constructor(x, y) {
    super(x, y);
    this.shape = [
      [0, 4, 0],
      [0, 4, 0],
      [4, 4, 0],
    ];
  }
}

export class PieceT extends TemplatePiece {
  constructor(x, y) {
    super(x, y);
    this.shape = [
      [0, 0, 0],
      [5, 5, 5],
      [0, 5, 0],
    ];
  }
}

export class PieceO extends TemplatePiece {
  constructor(x, y) {
    super(x, y);
    this.shape = [
      [0, 0, 0],
      [6, 6, 0],
      [6, 6, 0],
    ];
  }
}

export class PieceI extends TemplatePiece {
  constructor(x, y) {
    super(x, y);
    this.shape = [
      [7, 0, 0, 0],
      [7, 0, 0, 0],
      [7, 0, 0, 0],
      [7, 0, 0, 0],
    ];
  }
}
