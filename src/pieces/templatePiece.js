export default class TemplatePiece {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.shape = [];
    this.rotation = 0;
  }
  rotateRight = () => {
    this.getOldShape();
    this.shape = this.shape.map((row) => row.reverse());
    this.rotation += 1;
    if (this.rotation > 3) {
      this.rotation = 0;
    }
  };
  rotateLeft = () => {
    this.getOldShape();
    this.shape = this.shape.reverse();
    this.rotation -= 1;
    if (this.rotation < 0) {
      this.rotation = 3;
    }
  };
  getOldShape = () => {
    let oldShape = this.shape;

    this.shape = oldShape[0].map((_, y) => {
      return oldShape.map((row) => {
        return row[y];
      });
    });
  };
}
