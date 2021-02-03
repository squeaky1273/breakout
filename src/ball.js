// ---------------------------------------------
// Ball Class
// ---------------------------------------------
class Ball {
  constructor(x = 0, y = 0, dx = 2, dy = -2, ballRadius = 10, color = '#0095DD') {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.ballRadius = ballRadius;
    this.color = color;
    this.twoPI = Math.PI * 2;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.ballRadius, 0, this.twoPI);
    ctx.fillStyle = this.color;
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.closePath();
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }
}
export default Ball;
