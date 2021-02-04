// ---------------------------------------------
// Paddle Class [work in progress]
// ---------------------------------------------
class Paddle {
  constructor(x, y, paddleWidth = 75, paddleHeight = 10, color) {
    this.x = x;
    this.y = y;
    this.paddleWidth = paddleWidth;
    this.height = paddleHeight;
    this.color = color;
  }

  render(canvas, ctx, rightPressed, leftPressed) {
    if (rightPressed && this.x < canvas.width - this.width) {
      this.x -= 7;
    } else if (leftPressed && this.x > 0) {
      this.x += 7;
    }
    ctx.beginPath();
    ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
export default Paddle;
