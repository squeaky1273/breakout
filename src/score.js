// ---------------------------------------------
// Score Class [work in progress]
// ---------------------------------------------
class Score {
  constructor(color = '#000000', score = 0, font = '20px Comic-San') {
    this.color = color;
    this.score = score;
    this.font = font;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Score: ${this.score}`, 8, 20);
  }

  update() {
    this.score += 1;
  }
}
export default Score;
