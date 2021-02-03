// ---------------------------------------------
// Paddle Class
// ---------------------------------------------
class Paddle {
  constructor(x, y, paddleWidth = 75, paddleHeight = 10, color) {
    this.x = x;
    this.y = y;
    this.paddleWidth = paddleWidth;
    this.height = paddleHeight;
    this.color = color;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.paddleWidth, this.paddleHeight);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
export default Paddle;
