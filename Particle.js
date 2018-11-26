class Particle
{
  constructor(x, y, radius, color)
  {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  update()
  {
    this.draw();
  }

  draw()
  {
    CANVAS_CONTEXT.beginPath();
    CANVAS_CONTEXT.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    CANVAS_CONTEXT.strokeStyle = this.color;
    CANVAS_CONTEXT.stroke();
    CANVAS_CONTEXT.closePath();
  }
}
