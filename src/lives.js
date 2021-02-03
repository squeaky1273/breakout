// ---------------------------------------------
// Lives Class
// ---------------------------------------------
class Lives {
  constructor(x, y, color = '#000000', lives, font) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.lives = lives;
    this.font = font;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Lives: ${this.lives}`, this.y, 20);
  }

  loseLife() {
    this.lives -= 1;
  }
}
export default Lives;
