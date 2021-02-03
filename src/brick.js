// ---------------------------------------------
// Brick Class
// ---------------------------------------------
class Brick {
  constructor(x, y, brickWidth = 75, brickHeight = 20, color) {
    this.x = x;
    this.y = y;
    this.brickWidth = brickWidth;
    this.brickHeight = brickHeight;
    this.status = 1;
    this.color = color;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.brickWidth, this.brickHeight);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
export default Brick;
