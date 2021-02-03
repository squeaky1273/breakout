// ---------------------------------------------
// Background Class
// ---------------------------------------------
class Background {
  constructor(color) {
    this.color = color;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
export default Background;
