class Particle
{
  constructor(x, y, radius, color)
  {
    this.x = x;
    this.y = y;
    this.velocity = {
      x: Math.random() - 0.5,
      y: Math.random() - 0.5
    };
    this.radius = radius;
    this.color = color;
  }

  update(particles)
  {
    this.draw();

    for(let i = 0; i < particles.length; i++)
    {
      if(this === particles[i])
      {
        continue;
      }

      if(get_distance(this.x, this.y, particles[i].x, particles[i].y) - (this.radius + particles[i].radius) < 0)
      {

      }
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
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
