// ---------------------------------------------
// Ball Class [work in progress]
// ---------------------------------------------
class Ball {
  constructor(x = 250, y = 160, dx = 2, dy = 2, ballRadius = 10, color = '#0095DD') {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.ballRadius = ballRadius;
    this.color = color;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.closePath();
  }

  move(canvas) {
    // this is what moves the ball (literaly)
    if (this.x + this.dx > canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
      this.dx = -(this.dx);
    }
    if (this.y + this.dy > canvas.height - this.ballRadius || this.y + this.dy < this.ballRadius) {
      this.dy = -(this.dy);
    }
    this.x += this.dx;
    this.y += this.dy;
  }
}
export default Ball;
